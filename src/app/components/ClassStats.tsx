"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, Calendar, MapPin, Heart, BookOpen, Coffee, Camera } from "lucide-react";

// Mock data - ganti dengan data asli dari classMembers
const classData = {
  totalMembers: 25,
  maleMembers: 15,
  femaleMembers: 10,
  uniqueHobbies: 18,
  uniqueCities: 12,
  semester: 5,
  year: 2023,
  events: 7,
  photos: 50,
};

const stats = [
  {
    title: "Total Anggota",
    value: classData.totalMembers,
    subtitle: `${classData.maleMembers} Laki-laki, ${classData.femaleMembers} Perempuan`,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    trend: "+0 dari bulan lalu",
  },
  {
    title: "Berbagai Hobi",
    value: classData.uniqueHobbies,
    subtitle: "Coding, Gaming, Musik, dll",
    icon: Trophy,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
    trend: "+2 hobi baru",
  },
  {
    title: "Semester Aktif",
    value: classData.semester,
    subtitle: "Tahun ke-3 perkuliahan",
    icon: Calendar,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    trend: "Semester ganjil",
  },
  {
    title: "Asal Daerah",
    value: classData.uniqueCities,
    subtitle: "Dari berbagai kota",
    icon: MapPin,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    trend: "Sulawesi & sekitar",
  },
  {
    title: "Event Bersama",
    value: classData.events,
    subtitle: "Moment tak terlupakan",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    trend: "Lebih banyak lagi!",
  },
  {
    title: "Mata Kuliah",
    value: "20+",
    subtitle: "Sudah dijalani bersama",
    icon: BookOpen,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
    trend: "Masih berlanjut",
  },
  {
    title: "Dokumentasi",
    value: classData.photos,
    subtitle: "Foto & video kenangan",
    icon: Camera,
    color: "text-pink-600",
    bgColor: "bg-pink-100 dark:bg-pink-900/20",
    trend: "+10 foto baru",
  },
  {
    title: "Tahun Angkatan",
    value: classData.year,
    subtitle: "Generasi terbaik!",
    icon: Coffee,
    color: "text-amber-600",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
    trend: "Forever 2023F",
  },
];

export default function ClassStats() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Class Statistics</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Data menarik tentang Kelas 2383F dalam angka</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
            }}
          >
            <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700 dark:text-gray-200">{stat.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
                  <div className="text-xs text-gray-400 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-gray-700">{stat.trend}</div>
                </div>

                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <stat.icon className="w-full h-full" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Kelas 2383F - Lebih dari Sekedar Teman Sekelas</h3>
            <p className="text-blue-100 text-lg mb-6">
              Dari {classData.totalMembers} mahasiswa dengan {classData.uniqueHobbies} hobi berbeda, kami telah menciptakan {classData.events} moment tak terlupakan dan mendokumentasikannya dalam {classData.photos}+ foto kenangan.
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Persahabatan Sejati</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Prestasi Bersama</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Solid Team</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
