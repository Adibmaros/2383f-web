// DashboardPage.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { authAtom } from "@/lib/atoms/authAtom";
import { Users, BarChart3, Calendar, Camera, Settings, FileText, Heart, Award, Clock, ArrowRight, User, Shield } from "lucide-react";
import Navbar from "../../components/Navbar";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function DashboardPage() {
  const auth = useAtomValue(authAtom);

  const quickStats = [
    {
      label: "Total Anggota",
      value: "25",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      change: "+0 bulan ini",
    },
    {
      label: "Event Semester",
      value: "8",
      icon: Calendar,
      color: "from-green-500 to-green-600",
      change: "+2 yang akan datang",
    },
    {
      label: "Foto Galeri",
      value: "127",
      icon: Camera,
      color: "from-purple-500 to-purple-600",
      change: "+15 baru",
    },
    {
      label: "Prestasi",
      value: "12",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      change: "+3 semester ini",
    },
  ];

  const menuItems = [
    {
      title: "Profil Anggota",
      description: "Kelola dan lihat detail profil semua anggota kelas",
      href: "/dashboard/profile",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      features: ["Detail lengkap anggota", "Pencarian & filter", "Update informasi"],
    },
    {
      title: "Manajemen Konten",
      description: "Kelola foto, event, dan konten website kelas",
      href: "/dashboard/content",
      icon: FileText,
      color: "from-green-500 to-green-600",
      features: ["Upload foto baru", "Kelola event", "Edit informasi"],
    },
    {
      title: "Statistik & Analytics",
      description: "Lihat statistik lengkap dan analytics website",
      href: "/dashboard/analytics",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600",
      features: ["Data pengunjung", "Engagement metrics", "Report bulanan"],
    },
    {
      title: "Pengaturan",
      description: "Konfigurasi umum dan pengaturan sistem",
      href: "/dashboard/settings",
      icon: Settings,
      color: "from-orange-500 to-orange-600",
      features: ["Konfigurasi website", "Backup data", "User management"],
    },
  ];

  // Perbaiki array quickActions
  const quickActions = [
    {
      icon: User,
      label: "Tambah Anggota",
      href: "/dashboard/profile/add",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Camera,
      label: "Upload Foto",
      href: "/dashboard/content/photos",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Calendar,
      label: "Buat Event",
      href: "/dashboard/content/events",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: BarChart3,
      label: "Lihat Stats",
      href: "/dashboard/analytics",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <ProtectedRoute>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Header Section */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
              {/* User Greeting */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 dark:border-gray-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Admin Dashboard</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-gray-800 dark:text-white">Halo, </span>
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">{auth?.username || "Admin"}!</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Dashboard admin Kelas 2383F. Kelola semua aspek website dan data kelas dengan mudah.
              </motion.p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{stat.label}</h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.change}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Menu Grid */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Menu Utama</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Pilih menu untuk mengakses berbagai fitur dashboard</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {menuItems.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 + index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                  <Link href={item.href} className="block">
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden h-full">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-8 h-8 text-white" />
                          </div>

                          <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-2 transition-all duration-300" />
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{item.description}</p>

                        <div className="space-y-2">
                          {item.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-800/20">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }} className="text-center mb-12 pt-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Aksi Cepat</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Akses cepat ke fitur yang sering digunakan</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }} whileHover={{ scale: 1.05 }}>
                  <Link href={action.href} className="block">
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 text-center group">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm">{action.label}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
