import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div id="header" className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row items-center gap-8 p-6 md:p-10 lg:p-12">
            {/* Content Section */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">Kelas 2383F</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">Karya Anggota Kelas</h1>

              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Yuk, intip berbagai proyek keren dan inovatif dari mahasiswa kelas 2383F! Liat sendiri gimana temen-temen seangkatan ngaplikasiin ilmunya lewat karya-karya mereka.
              </p>

              <div className="pt-2">
                <Link href={"/dashboard/karya-anggota/all"}>
                  <Button size="lg" className="group bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Lihat Semua Karya
                    <MoveRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 w-full lg:max-w-xl">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <img className="relative rounded-xl shadow-2xl w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-300" src="/karya/karya-anggota.jpg" alt="karya anggota" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
