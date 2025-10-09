"use client";

import { motion, Variants, easeInOut } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search, Users, Clock } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const bounceVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      name: "Beranda",
      href: "/tamu",
      icon: Home,
      color: "from-blue-500 to-purple-600",
      description: "Kembali ke halaman utama",
    },
    {
      name: "Tentang Kelas",
      href: "/about",
      icon: Users,
      color: "from-green-500 to-teal-600",
      description: "Pelajari tentang kelas 2383F",
    },
    {
      name: "Memories",
      href: "/memories",
      icon: Clock,
      color: "from-orange-500 to-pink-600",
      description: "Lihat kenangan dan timeline",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* 404 Number with Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div variants={floatVariants} animate="animate" className="relative inline-block">
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">404</h1>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60"
            />

            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60"
            />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL yang dimasukkan salah.</p>
        </motion.div>

        {/* Brand Identity */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">2383F</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">SI F'23</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sistem Informasi</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={link.href} className="block p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${link.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">{link.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/tamu"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Kembali ke Beranda
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="ml-2"
            >
              →
            </motion.div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Halaman Sebelumnya
          </button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div variants={itemVariants} className="mt-12 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-3">
            <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Saran Pencarian</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Coba periksa ejaan URL atau gunakan navigasi menu untuk menemukan halaman yang Anda cari.</p>
        </motion.div>
      </motion.div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
    </div>
  );
}
