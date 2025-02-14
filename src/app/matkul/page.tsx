import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { User, ChevronRight } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "keamanan-sistem-informasi",
    name: "Keamanan Sistem Informasi",
    lecturer: "Catur Eri Gunawan, S.T., M.Cs.",
    description: "Mempelajari konsep dan implementasi keamanan dalam sistem informasi modern.",
  },
  {
    id: "etika-profesi",
    name: "Etika Profesi",
    lecturer: "Aminullah Imal Alfresi, S.T., M.Kom.",
    description: "Membahas aspek etika dan profesionalisme dalam bidang teknologi informasi.",
  },
  {
    id: "analisis-dan-perancangan-sistem",
    name: "Analisis dan Perancangan Sistem",
    lecturer: "Evi Fadilah, M.Kom.",
    description: "Metodologi dan teknik dalam menganalisis dan merancang sistem informasi.",
  },
  {
    id: "rekayasa-perangkat-lunak",
    name: "Rekayasa Perangkat Lunak",
    lecturer: "Catur Eri Gunawan, S.T., M.Cs.",
    description: "Prinsip dan praktik dalam pengembangan perangkat lunak profesional.",
  },
  {
    id: "infrastruktur-teknologi-informasi",
    name: "Infrastruktur Teknologi Informasi",
    lecturer: "Fenny Purwani, M.Kom.",
    description: "Komponen dan manajemen infrastruktur TI modern.",
  },
  {
    id: "si-akuntansi-keuangan-syariah",
    name: "SI Akuntansi Keuangan Syariah",
    lecturer: "Sri Rahayu, M.Kom.",
    description: "Sistem informasi untuk pengelolaan keuangan berbasis syariah.",
  },
  {
    id: "teknik-multimedia",
    name: "Teknik Multimedia",
    lecturer: "M. Syendi Apriko, S.Pd., M.Kom.",
    description: "Pengembangan dan implementasi konten multimedia.",
  },
  {
    id: "interaksi-manusia-dan-komputer",
    name: "Interaksi Manusia dan Komputer",
    lecturer: "Indah Hidayanti, M.Kom.",
    description: "Prinsip desain antarmuka dan pengalaman pengguna.",
  },
];

const CourseListingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Daftar Mata Kuliah</h1>
          <p className="text-lg text-gray-600">Program Studi Sistem Informasi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/matkul/${course.id}`} key={course.id} className="transform transition-all duration-300 hover:scale-105">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-sm">{course.lecturer}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end text-blue-600">
                  <div className="flex items-center text-sm">
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseListingPage;
