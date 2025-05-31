"use client";

import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { members } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Share2, Heart } from "lucide-react";

const ProfileDetailPage = ({ params }: any) => {
  const unwrapperParams: any = React.use(params);
  const { name } = unwrapperParams;
  const member = members.find((m) => m.name.toLowerCase().replace(/\s+/g, "-") === name);

  if (!member) {
    return notFound();
  }

  const details = [
    { label: "Hobi", value: member.hobbies, icon: "🎮", color: "from-blue-500 to-cyan-500" },
    { label: "Impian", value: member.dreams, icon: "⭐", color: "from-yellow-500 to-orange-500" },
    { label: "Motto", value: member.motto, icon: "💭", color: "from-purple-500 to-pink-500" },
    { label: "Makanan / Minuman Favorit", value: member.favoriteFood, icon: "🍽️", color: "from-green-500 to-emerald-500" },
    { label: "Pesan untuk Kelas", value: member.classMessage, icon: "💌", color: "from-rose-500 to-red-500" },
    { label: "Tujuan Kelas", value: member.classGoals, icon: "🎯", color: "from-indigo-500 to-blue-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const profileVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-4 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6 
        bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 
        dark:from-slate-900 dark:via-indigo-950/50 dark:to-purple-950/20"
    >
      {/* Main Content */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-4xl mx-auto mt-16">
        <Card
          className="backdrop-blur-xl bg-white/90 dark:bg-slate-800/80 
            shadow-xl border border-white/50 dark:border-slate-700/50
            rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          {/* Profile Header - Optimized for mobile */}
          <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6 pt-6 sm:pt-8">
            <motion.div variants={profileVariants} initial="hidden" animate="visible" className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto group">
              {/* Gradient Ring */}
              <div
                className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 
                  rounded-full opacity-70 group-hover:opacity-100 blur-sm transition-all duration-300
                  group-hover:animate-pulse"
              />

              {/* Profile Image */}
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={member.imageUrl.startsWith("/") ? member.imageUrl : `/${member.imageUrl}`}
                  alt={member.name}
                  className="w-full h-full object-cover 
                    ring-3 sm:ring-4 ring-white dark:ring-slate-800 
                    group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 
                    transition-all duration-300 group-hover:scale-105"
                />
              </div>

              {/* Status Indicator */}
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 
                bg-green-500 rounded-full border-2 sm:border-3 border-white dark:border-slate-800
                flex items-center justify-center"
              >
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse" />
              </div>
            </motion.div>

            {/* Name and Info */}
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-2 sm:space-y-3">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                dark:from-indigo-400 dark:to-purple-400
                bg-clip-text text-transparent"
              >
                {member.name}
              </h1>

              <div
                className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 
                bg-gradient-to-r from-indigo-50 to-purple-50 
                dark:from-indigo-900/30 dark:to-purple-900/30
                rounded-full border border-indigo-200 dark:border-indigo-800/50"
              >
                <p className="text-sm sm:text-base lg:text-lg text-indigo-600 dark:text-indigo-400 font-medium">{member.role}</p>
              </div>

              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 
                italic max-w-2xl mx-auto leading-relaxed px-2"
              >
                {member.bio}
              </p>
            </motion.div>
          </CardHeader>

          {/* Details Content */}
          <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {details.map((detail, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group overflow-hidden
                    bg-white/60 dark:bg-slate-700/40 backdrop-blur-sm
                    p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl 
                    shadow-md border border-white/50 dark:border-slate-600/50 
                    hover:shadow-lg hover:bg-white/80 dark:hover:bg-slate-700/60 
                    transition-all duration-300"
                >
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${detail.color} 
                    opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${detail.color} 
                        shadow-lg text-white flex items-center justify-center
                        group-hover:scale-110 transition-transform duration-300`}
                      >
                        <span className="text-lg sm:text-xl">{detail.icon}</span>
                      </div>
                      <h3
                        className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 
                        group-hover:text-gray-900 dark:group-hover:text-gray-100 
                        transition-colors duration-300"
                      >
                        {detail.label}
                      </h3>
                    </div>

                    {/* Content */}
                    <p
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-300 
                      leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200
                      transition-colors duration-300"
                    >
                      {detail.value}
                    </p>
                  </div>
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
