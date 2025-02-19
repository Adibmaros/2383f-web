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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 py-16 px-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-indigo-600 mb-4">Profil Anggota Kelas 2383F</h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-center mb-12 max-w-3xl mx-auto text-gray-600">
          Kami adalah mahasiswa Program Studi Sistem Informasi angkatan 2023, Fakultas Sains dan Teknologi. Inilah anggota tim yang siap berkolaborasi dan bertumbuh bersama.
        </motion.p>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div key={index} variants={cardVariants} whileHover="hover" className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
              <div className="relative mb-6">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <img src={member.imageUrl} alt={member.name} className="w-32 h-32 mx-auto rounded-full object-cover ring-4 ring-indigo-50" />
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-indigo-600 mb-2 text-center">{member.name}</h3>
              <p className="text-gray-600 font-medium mb-4 text-center">{member.role}</p>
              <Link
                href={`/profile/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block text-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full 
                hover:bg-indigo-100 transition-colors duration-200 font-medium text-sm"
              >
                Lihat detail
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-16 text-center">
          <p className="text-gray-600 text-lg italic">"Kami percaya, bersama kita bisa mencapai hal-hal luar biasa."</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
