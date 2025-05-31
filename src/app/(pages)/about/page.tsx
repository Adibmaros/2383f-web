"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div
      className="min-h-screen mt-5 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 
      dark:from-slate-900 dark:via-slate-800 dark:to-zinc-900 
      text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1
          className="text-4xl font-bold text-center mb-6 
          bg-clip-text text-transparent bg-gradient-to-r 
          from-indigo-600 to-purple-600 
          dark:from-indigo-400 dark:to-purple-400"
        >
          Persahabatan: Cerminan Jiwa dan Ikatan Tanpa Batas
        </h1>

        <p className="text-lg text-center mb-10 text-gray-700 dark:text-gray-300">
          Kami adalah mahasiswa Program Studi Sistem Informasi angkatan 2023, kelas 2383F, Fakultas Sains dan Teknologi. Kami percaya bahwa persahabatan sejati hadir bukan hanya dalam tawa, tetapi juga dalam kesenyapan, saat kata-kata tak
          lagi diperlukan, namun hati tetap saling memahami.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="bg-white/80 dark:bg-slate-800/50 p-8 rounded-2xl 
            shadow-lg backdrop-blur-xl border border-gray-100 dark:border-gray-700
            hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <h2
              className="text-2xl font-semibold mb-4 
              bg-clip-text text-transparent bg-gradient-to-r 
              from-indigo-600 to-purple-600 
              dark:from-indigo-400 dark:to-purple-400"
            >
              Visi
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300">Menjadi komunitas yang solid, inovatif, dan inspiratif, yang mampu memberikan dampak positif melalui kolaborasi dan teknologi.</p>
          </div>

          <div
            className="bg-white/80 dark:bg-slate-800/50 p-8 rounded-2xl 
            shadow-lg backdrop-blur-xl border border-gray-100 dark:border-gray-700
            hover:transform hover:scale-[1.02] transition-all duration-300"
          >
            <h2
              className="text-2xl font-semibold mb-4 
              bg-clip-text text-transparent bg-gradient-to-r 
              from-indigo-600 to-purple-600 
              dark:from-indigo-400 dark:to-purple-400"
            >
              Misi
            </h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-3">
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Menjalin hubungan yang penuh kepercayaan dan keterbukaan.</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Berinovasi bersama untuk menciptakan solusi teknologi yang bermanfaat.</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Memberikan dukungan di setiap perjalanan akademik dan kehidupan.</li>
              <li className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Membangun ruang berbagi ilmu yang hangat dan positif.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p
            className="text-gray-500 dark:text-gray-400 text-sm italic
            hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            "Dalam persahabatan, jarak hanyalah angka. Kedekatan sejati terletak di hati."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
