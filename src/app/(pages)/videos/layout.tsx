import type { Metadata } from "next";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Video Kelas - 2383F Sistem Informasi",
  description: "Kumpulan video pembelajaran dan kegiatan Kelas 2383F Program Studi Sistem Informasi",
};

export default function VideosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
      <Footer />
    </>
  );
}
