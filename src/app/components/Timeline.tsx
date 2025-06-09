"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, BookOpen, Trophy, Heart, Camera, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const timelineEvents = [
  {
    date: "Agustus 2023",
    title: "Awal Pertemuan Kelas 2383F",
    description: "Pertama kali bertemu sebagai mahasiswa Sistem Informasi F angkatan 2023. Moment bersejarah dimana pertemanan dimulai.",
    location: "Fakultas Sains dan Teknologi",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    date: "September 2023",
    title: "Pembelajaran Algoritma Bersama",
    description: "Hari-hari penuh tantangan mempelajari algoritma dan pemrograman. Saling membantu dalam mengerjakan tugas coding.",
    location: "Lab Komputer FST",
    icon: BookOpen,
    color: "bg-green-500",
  },
  {
    date: "Oktober 2023",
    title: "Proyek Kelompok Pertama",
    description: "Kolaborasi pertama dalam mengerjakan proyek sistem informasi. Belajar kerja tim yang solid.",
    location: "Ruang Diskusi",
    icon: Trophy,
    color: "bg-purple-500",
  },
  {
    date: "Januari 2024",
    title: "Kegiatan HIMSI",
    description: "Bergabung dalam kegiatan Himpunan Mahasiswa Sistem Informasi. Mempererat persaudaraan di luar kelas.",
    location: "Gedung FST",
    icon: Heart,
    color: "bg-red-500",
  },
  {
    date: "Maret 2024",
    title: "Bukber Kampoeng Kecil",
    description: "Bukber VVIP di Kampoeng Kecil KM 5. Momen kebersamaan yang tak terlupakan dengan menu istimewa.",
    location: "Kampoeng Kecil KM 5",
    icon: Coffee,
    color: "bg-orange-500",
  },
  {
    date: "Juni 2024",
    title: "Akhir Semester 4 di JB",
    description: "Perayaan akhir semester dengan berbagai permainan seru termasuk estafet sedotan. Moment pelepas penat setelah ujian.",
    location: "JB (Venue Perayaan)",
    icon: Camera,
    color: "bg-pink-500",
  },
  {
    date: "September 2024",
    title: "Last Moment with Mr. Andi",
    description: "Momen perpisahan yang berkesan bersama dosen pembimbing yang telah membimbing perjalanan akademik kami.",
    location: "Ruang Dosen",
    icon: Heart,
    color: "bg-indigo-500",
  },
];

export default function Timeline() {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Icon animation variants
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Memory Timeline</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Perjalanan berkesan Kelas 2383F dari awal hingga sekarang</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
        {/* Timeline line */}
        <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} transition={{ duration: 2, delay: 0.5 }} className="absolute left-8 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg" />

        {timelineEvents.map((event, index) => (
          <motion.div key={index} variants={itemVariants} className="relative pl-20 pb-16 last:pb-0">
            {/* Timeline dot with icon */}
            <motion.div variants={iconVariants} className={`absolute left-4 w-8 h-8 ${event.color} rounded-full border-4 border-white dark:border-gray-900 shadow-xl flex items-center justify-center z-10`}>
              <event.icon className="w-4 h-4 text-white" />
            </motion.div>

            {/* Card with hover effects */}
            <motion.div
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 group-hover:border-l-purple-500 overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Subtle background animation on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{event.date}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{event.title}</h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{event.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
