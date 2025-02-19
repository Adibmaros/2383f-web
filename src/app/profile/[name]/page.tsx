"use client";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { members } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface PageProps {
  params: { name: string };
}

const ProfileDetailPage = ({ params }: PageProps) => {
  const { name } = params;
  const member = members.find((m) => m.name.toLowerCase().replace(/\s+/g, "-") === name);

  if (!member) {
    return notFound();
  }

  const details = [
    { label: "Hobi", value: member.hobbies, icon: "🎮" },
    { label: "Impian", value: member.dreams, icon: "⭐" },
    { label: "Motto", value: member.motto, icon: "💭" },
    { label: "Makanan Favorit", value: member.favoriteFood, icon: "🍽️" },
    { label: "Pesan untuk Kelas", value: member.classMessage, icon: "💌" },
    { label: "Tujuan Kelas", value: member.classGoals, icon: "🎯" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
      <Link href="/profile" className="inline-block mb-8 mx-auto max-w-3xl w-full px-6 text-indigo-600 hover:text-indigo-800 transition-colors">
        ← Kembali ke daftar anggota
      </Link>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Card className="max-w-3xl mx-auto backdrop-blur-sm bg-white/80 shadow-xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-40 h-40 mx-auto">
              <img src={member.imageUrl} alt={member.name} className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl ring-4 ring-indigo-50" />
            </motion.div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">{member.name}</h1>
              <p className="text-xl text-indigo-600 font-medium">{member.role}</p>
              <p className="text-gray-600 italic max-w-2xl mx-auto text-lg">{member.bio}</p>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-8 px-6 pb-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.map((detail, index) => (
                <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{detail.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-700">{detail.label}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{detail.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProfileDetailPage;
