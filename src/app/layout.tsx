import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelas 2383F - Sistem Informasi",
  description: "Website resmi Kelas 2383F Program Studi Sistem Informasi",
  keywords: ["Sistem Informasi", "2383F", "Mahasiswa", "FST"],
  authors: [{ name: "Kelas 2383F" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="relative">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
