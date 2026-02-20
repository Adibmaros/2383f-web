
import { NextResponse } from "next/server";
import OpenAI from "openai";
import prisma from "@/lib/prisma";// Import prisma instance
import { members } from "@/lib/data";

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build",
    baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
        }

        // 1. Fetch Dynamic Data from Database
        const karyaData = await prisma.karya.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: { title: true, description: true, dibuatOleh: true }
        });

        const karyaList = karyaData.length > 0
            ? karyaData.map(k => {
                return `- **${k.title}** (oleh ${k.dibuatOleh}): ${k.description}`;
            }).join("\n")
            : "- Belum ada data karya.";

        // 2. Fetch Static Members Data
        const membersList = members.length > 0
            ? members.map((m: any) => {
                const photo = m.imageUrl ? `\n![Foto ${m.name}](${m.imageUrl})` : "";
                return `- **${m.name}** (${m.role})${photo}\n  *Bio:* ${m.bio}\n  *Hobi:* ${m.hobbies}\n  *Cita-cita:* ${m.dreams}\n  *Motto:* "${m.motto}"`;
            }).join("\n\n")
            : "- Belum ada data anggota.";

        // 3. Construct Dynamic System Prompt
        const DYNAMIC_SYSTEM_PROMPT = `
Anda adalah **"Asisten Kelas 2383F"**, representasi virtual resmi dari mahasiswa **Sistem Informasi Kelas 2383F Angkatan 2023**.
Tugas utama Anda adalah memberikan informasi mengenai kelas, anggota, dan karya-karya dari kelas 2383F.

## Identitas & Etika
- **Posisi:** Official AI Representative Kelas 2383F.
- **Nilai:** Mengedepankan kebajikan, kesopanan, persahabatan, dan kekeluargaan.
- **Gaya Bahasa:**
  - Gunakan Bahasa Indonesia yang gaul namun sopan, asik, dan tetap ramah.
  - Tunjukkan rasa hormat dan eratnya persahabatan kelas.

## Knowledge Base

### Visi Kelas
Menjadi komunitas yang solid, inovatif, dan inspiratif, yang mampu memberikan dampak positif melalui kolaborasi, teknologi, dan nilai-nilai persahabatan yang kuat dalam membangun masa depan yang lebih baik.

### Data Anggota Kelas
${membersList}

### Karya Terbaru Mahasiswa
${karyaList}

## Aturan Format Respons (WAJIB)
Agar jawaban terlihat rapi dan menarik di website:
1. **DILARANG KERAS** menggunakan tag HTML (seperti \`<br>\`, \`<b>\`). Gunakan Markdown murni.
2. **Struktur:** Gunakan Heading (\`###\`) untuk sub-judul bila perlu.
3. **List:** Gunakan bullet points (\`-\`) untuk rincian.
4. **Bold:** Gunakan \`**teks**\` untuk penekanan.
5. **Foto Anggota:** Jika menyebutkan nama anggota secara spesifik dan diminta profilnya, WAJIB tampilkan fotonya dengan format markdown gambar \`![Nama](URL)\` berdasarkan data yang tersedia.
6. **Paragraf:** Buat paragraf pendek (maksimal 3 baris) agar nyaman dibaca.

## Batasan (Refusal Policy)
Jika menerima pertanyaan di luar konteks Kelas 2383F, perkuliahan, atau karya anggota:
> "Mohon maaf, saya Asisten Kelas 2383F yang dikhususkan untuk melayani informasi seputar Kelas 2383F. Silakan ajukan pertanyaan terkait hal tersebut ya!"
`;

        // 3. Call Chat Completion with Fallback
        const requestPayload = [
            { role: "system", content: DYNAMIC_SYSTEM_PROMPT },
            ...messages
        ];

        let reply = "";
        try {
            // Try primary requested model
            const completion = await client.chat.completions.create({
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                messages: requestPayload,
                temperature: 0.7,
                max_tokens: 600,
            });
            reply = completion.choices[0]?.message?.content || "";
        } catch (primaryError) {
            console.warn("Primary model failed, switching to fallback:", primaryError);
            // Fallback to a stable model
            const fallbackCompletion = await client.chat.completions.create({
                model: "llama3-70b-8192", // Known stable model on Groq
                messages: requestPayload,
                temperature: 0.7,
                max_tokens: 600,
            });
            reply = fallbackCompletion.choices[0]?.message?.content || "";
        }

        if (!reply) {
            throw new Error("No response from AI models");
        }

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("Error in chat API:", error);
        const errorMessage = error?.message || "Internal Server Error";
        return NextResponse.json({ error: errorMessage, details: error }, { status: 500 });
    }
}
