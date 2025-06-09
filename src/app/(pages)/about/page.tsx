"use client";

import { motion } from "framer-motion";
import { Users, Target, Heart, Lightbulb, Shield, Star } from "lucide-react";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const AboutPage: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const values = [
    {
      icon: Heart,
      title: "Persahabatan Sejati",
      description: "Ikatan yang terjalin bukan hanya dalam suka, tetapi juga dalam duka. Kami saling mendukung di setiap langkah perjalanan.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Inovasi Berkelanjutan",
      description: "Selalu mencari cara baru untuk berkembang dan memberikan solusi terbaik melalui teknologi dan kreativitas.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Integritas & Kepercayaan",
      description: "Membangun fondasi yang kuat dengan kejujuran, transparansi, dan komitmen dalam setiap tindakan.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Star,
      title: "Keunggulan Bersama",
      description: "Meraih prestasi tidak sebagai individu, tetapi sebagai satu kesatuan yang saling mengangkat dan menginspirasi.",
      color: "from-purple-500 to-violet-500",
    },
  ];

  const missionItems = [
    "Menjalin hubungan yang penuh kepercayaan dan keterbukaan",
    "Berinovasi bersama untuk menciptakan solusi teknologi yang bermanfaat",
    "Memberikan dukungan di setiap perjalanan akademik dan kehidupan",
    "Membangun ruang berbagi ilmu yang hangat dan positif",
    "Menciptakan dampak positif untuk komunitas yang lebih luas",
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
          {/* Hero Section */}
          <section className="pt-10 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Tentang</span>
                  <br />
                  <span className="text-gray-800 dark:text-white">Kelas 2383F</span>
                </h1>

                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                  Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.
                </p>

                <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/50 dark:border-gray-700/50">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Program Studi Sistem Informasi • Angkatan 2023</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Vision */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden group h-full">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Visi</h2>
                      </div>

                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        Menjadi komunitas yang solid, inovatif, dan inspiratif, yang mampu memberikan dampak positif melalui kolaborasi, teknologi, dan nilai-nilai persahabatan yang kuat dalam membangun masa depan yang lebih baik.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mission */}
                <motion.div variants={cardVariants} whileHover="hover">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-10 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 overflow-hidden group h-full">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Misi</h2>
                      </div>

                      <ul className="space-y-4">
                        {missionItems.map((item, index) => (
                          <motion.li key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-start space-x-3 group/item">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors duration-200">{item}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-6 px-4 sm:px-6 lg:px-8 bg-white/30 dark:bg-gray-800/20">
            <div className="max-w-7xl mx-auto">
              <motion.div variants={itemVariants} className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Nilai-Nilai Kami</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Fondasi yang menguatkan setiap langkah perjalanan kami sebagai satu keluarga besar</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div key={index} variants={cardVariants} whileHover="hover" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-gray-700/50 text-center group overflow-hidden">
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                      <div className="relative z-10">
                        <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <value.icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Quote Section */}
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50">
                  <div className="text-6xl text-blue-500/20 dark:text-blue-400/20 mb-4">"</div>
                  <blockquote className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed mb-6">
                    Dalam persahabatan, jarak hanyalah angka. Kedekatan sejati terletak di hati, dan ikatan yang tulus akan tetap kuat meski terpisah ruang dan waktu.
                  </blockquote>
                  <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="font-medium">Kelas 2383F</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
