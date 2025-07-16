"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Clock, Info, LogIn, Users, Heart, Star, ArrowRight, UserCheck, Film } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ImageCarousel from "../../components/ImageCarousel";

export default function TamuPage() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Hero Section - More Elegant */}
        <section className="relative pt-14 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-4xl mx-auto">
              {/* Main Title */}
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Sistem Informasi</span>
                <br />
                <span className="text-gray-800 dark:text-white">Kelas 2383F</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.
                <span className="inline-block ml-2">🌿✨</span>
              </motion.p>

              {/* CTA Buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/memories"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Jelajahi Memories
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Jelajahi Kelas 2383F</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Temukan berbagai informasi menarik tentang perjalanan dan pencapaian kelas kami</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Memories Card */}
              {/* <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Link href="/memories" className="block">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Clock className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Timeline & Stats</h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Perjalanan berkesan, statistik menarik, dan pencapaian kelas dari masa ke masa</p>

                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Lihat Memories</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div> */}

              {/* About Card */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Link href="/about" className="block">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Info className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tentang Kelas</h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Visi, misi, dan informasi lengkap tentang Program Studi Sistem Informasi</p>

                      <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Pelajari Lebih</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Profile Card */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Link href="/dashboard/profile" className="block">
                  <div className="relative bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100 dark:from-orange-900/20 dark:via-pink-900/20 dark:to-purple-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-200/50 dark:border-orange-700/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <UserCheck className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Profil Anggota</h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Kenali setiap anggota kelas 2383F dengan detail profil lengkap dan pencapaian mereka</p>

                      <div className="flex items-center text-orange-600 dark:text-orange-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Lihat Profil</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>

                      {/* Special Badge */}
                      <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">22 Anggota</div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Videos Card - NEW */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                <Link href="/videos" className="block">
                  <div className="relative bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-indigo-200/50 dark:border-indigo-700/50 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Video pattern background */}
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                      <div className="grid grid-cols-4 gap-1 p-2">
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div key={i} className="aspect-video bg-indigo-900 rounded" />
                        ))}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Film className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Video Kelas</h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">Tonton video pembelajaran, tutorial, dan dokumentasi kegiatan kelas 2383F</p>

                      <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>Lihat Video</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>

                      {/* Special Badge */}
                      <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">8+ Video</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Galeri Kenangan</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Momen-momen berharga yang telah kita lalui bersama</p>
            </motion.div>

            <ImageCarousel />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Kelas dalam Angka</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {[
                { icon: Users, label: "Anggota", value: "22", color: "from-blue-500 to-purple-600" },
                { icon: Heart, label: "Semester", value: "5", color: "from-green-500 to-teal-600" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 dark:border-gray-700/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
