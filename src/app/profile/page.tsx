"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { members } from "@/lib/data";

const ProfilePage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-zinc-100 
        dark:from-slate-900 dark:via-slate-800 dark:to-zinc-900 
        text-gray-800 dark:text-gray-100 py-16 px-6"
    >
      <Link
        href="/"
        className="inline-block mb-8 mx-auto max-w-3xl w-full px-6 text-indigo-600 dark:text-indigo-400 
          hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
      >
        ← Kembali ke Home
      </Link>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-4">Profil Anggota Kelas 2383F</h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Kami adalah mahasiswa Program Studi Sistem Informasi angkatan 2023, Fakultas Sains dan Teknologi. Inilah anggota tim yang siap berkolaborasi dan bertumbuh bersama.
        </motion.p>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg p-6 rounded-3xl 
                shadow-xl hover:shadow-2xl transition-all duration-300
                border border-gray-100 dark:border-gray-700"
            >
              <div className="relative mb-6">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }} className="relative group">
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r from-[#395A8C] to-[#2A4374] 
      rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"
                  ></div>
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="relative w-32 h-32 mx-auto rounded-full
        ring-4 ring-white dark:ring-slate-800 group-hover:ring-[#395A8C]/30
        dark:group-hover:ring-[#395A8C]/50 transition-all duration-300"
                  />
                </motion.div>
              </div>

              <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-center">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium mb-4 text-center">{member.role}</p>
              <Link
                href={`/profile/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-center px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 
                  text-indigo-600 dark:text-indigo-300 rounded-full 
                  hover:bg-indigo-100 dark:hover:bg-indigo-800/50 
                  transition-all duration-300 font-medium text-sm
                  hover:shadow-lg hover:scale-105"
              >
                Lihat detail
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-lg italic">"Kami percaya, bersama kita bisa mencapai hal-hal luar biasa."</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
