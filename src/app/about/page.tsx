// AboutPage.tsx
"use client";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">Persahabatan: Cerminan Jiwa dan Ikatan Tanpa Batas</h1>
        <p className="text-lg text-center mb-10">
          Kami adalah mahasiswa Program Studi Sistem Informasi angkatan 2023, kelas 2383F, Fakultas Sains dan Teknologi. Kami percaya bahwa persahabatan sejati hadir bukan hanya dalam tawa, tetapi juga dalam kesenyapan, saat kata-kata tak
          lagi diperlukan, namun hati tetap saling memahami.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Visi</h2>
            <p className="text-base text-gray-600">Menjadi komunitas yang solid, inovatif, dan inspiratif, yang mampu memberikan dampak positif melalui kolaborasi dan teknologi.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Misi</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Menjalin hubungan yang penuh kepercayaan dan keterbukaan.</li>
              <li>Berinovasi bersama untuk menciptakan solusi teknologi yang bermanfaat.</li>
              <li>Memberikan dukungan di setiap perjalanan akademik dan kehidupan.</li>
              <li>Membangun ruang berbagi ilmu yang hangat dan positif.</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">"Dalam persahabatan, jarak hanyalah angka. Kedekatan sejati terletak di hati."</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
