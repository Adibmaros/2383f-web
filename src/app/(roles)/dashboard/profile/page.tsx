"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { members } from "@/lib/data";

const ProfilePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 8;
    if (window.innerWidth < 640) return 6; // Mobile: 6 items
    if (window.innerWidth < 1024) return 8; // Tablet: 8 items
    return 12; // Desktop: 12 items
  };

  const [itemsPerPage] = useState(getItemsPerPage());

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    return members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.role.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 
        dark:from-slate-900 dark:via-indigo-950/50 dark:to-purple-950/20 
        text-gray-800 dark:text-gray-100 py-6 sm:py-8 lg:py-12 px-3 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Kompak untuk mobile */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold 
              bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 
              dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300
              bg-clip-text text-transparent mb-3 sm:mb-4
              leading-tight px-2"
          >
            Profil Anggota Kelas 2383F
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-sm sm:text-base lg:text-lg text-center mb-4 sm:mb-6 
              max-w-3xl mx-auto text-gray-600 dark:text-gray-300 
              leading-relaxed px-4"
          >
            Mahasiswa Program Studi Sistem Informasi angkatan 2023
          </motion.p>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} className="max-w-md mx-auto mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Cari nama atau role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base
                bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                border border-indigo-200 dark:border-slate-600
                rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500
                focus:border-transparent transition-all duration-300
                placeholder-gray-500 dark:placeholder-gray-400"
            />
          </motion.div>

          {/* Results Info */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
            Menampilkan {currentMembers.length} dari {filteredMembers.length} anggota
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 
              mx-auto rounded-full"
          />
        </div>

        {/* Cards Grid - Optimized untuk mobile */}
        <motion.div
          key={currentPage} // Force re-animation on page change
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        >
          {currentMembers.map((member, index) => (
            <motion.div
              key={`${member.name}-${currentPage}`}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl 
                p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl 
                shadow-md hover:shadow-xl transition-all duration-300
                border border-white/20 dark:border-slate-700/50
                hover:border-indigo-200 dark:hover:border-indigo-700/50
                overflow-hidden"
            >
              {/* Background gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 
                dark:from-indigo-900/20 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 rounded-xl sm:rounded-2xl"
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Image - Lebih kecil untuk mobile */}
                <div className="relative mb-3 sm:mb-4">
                  <motion.div variants={imageVariants} whileHover="hover" className="relative group/image mx-auto w-fit">
                    {/* Animated background ring */}
                    <div
                      className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 
                      rounded-full opacity-0 group-hover:opacity-60 blur-sm transition-all duration-300"
                    />

                    {/* Image container - Responsive sizes */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto">
                      <Image
                        src={member.imageUrl.startsWith("/") ? member.imageUrl : `/${member.imageUrl}`}
                        alt={`Profile picture of ${member.name}`}
                        fill
                        sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                        className="rounded-full object-cover
                          ring-2 sm:ring-3 ring-white dark:ring-slate-800 
                          group-hover/image:ring-indigo-200 dark:group-hover/image:ring-indigo-700/50
                          transition-all duration-300
                          shadow-md group-hover/image:shadow-lg"
                        loading={index < 6 ? "eager" : "lazy"}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Member Info - Kompak untuk mobile */}
                <div className="text-center space-y-1 sm:space-y-2">
                  <h3
                    className="text-sm sm:text-base lg:text-lg font-bold 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    dark:from-indigo-400 dark:to-purple-400
                    bg-clip-text text-transparent 
                    group-hover:from-indigo-700 group-hover:to-purple-700
                    dark:group-hover:from-indigo-300 dark:group-hover:to-purple-300
                    transition-all duration-300 leading-tight"
                  >
                    {member.name}
                  </h3>

                  <p
                    className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 
                    font-medium leading-relaxed line-clamp-2"
                  >
                    {member.role}
                  </p>

                  {/* Detail Link - Lebih kecil untuk mobile */}
                  <Link
                    href={`/dashboard/profile/${member.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 
                      bg-gradient-to-r from-indigo-50 to-purple-50 
                      dark:from-indigo-900/30 dark:to-purple-900/30
                      text-indigo-600 dark:text-indigo-300 rounded-full 
                      hover:from-indigo-100 hover:to-purple-100
                      dark:hover:from-indigo-800/50 dark:hover:to-purple-800/50
                      transition-all duration-200 font-medium text-xs sm:text-sm
                      hover:shadow-md hover:scale-105
                      border border-indigo-100 dark:border-indigo-800/50
                      hover:border-indigo-200 dark:hover:border-indigo-700/50
                      backdrop-blur-sm"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex justify-center items-center space-x-2 sm:space-x-3 mb-8">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base font-medium
                bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                border border-indigo-200 dark:border-slate-600
                rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              ‹
            </button>

            {/* Page Numbers - Show limited on mobile */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 5) return true;
                if (page === 1 || page === totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && <span className="text-gray-400 text-sm">...</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ${
                      currentPage === page ? "bg-indigo-500 text-white shadow-md" : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-indigo-200 dark:border-slate-600 hover:bg-indigo-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 text-sm sm:text-base font-medium
                bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                border border-indigo-200 dark:border-slate-600
                rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              ›
            </button>
          </motion.div>
        )}

        {/* Footer Quote - Lebih kompak */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-center">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg 
                p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl 
                shadow-md border border-white/30 dark:border-slate-700/50"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
                dark:from-indigo-400/5 dark:to-purple-400/5 rounded-xl sm:rounded-2xl"
              />

              <p
                className="relative text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-200 
                italic font-medium leading-relaxed"
              >
                "Bersama kita bisa mencapai hal-hal luar biasa."
              </p>

              {/* Quote decoration */}
              <div
                className="absolute -top-1 -left-1 text-2xl sm:text-3xl text-indigo-200 dark:text-indigo-700/50 
                font-serif leading-none select-none"
              >
                "
              </div>
              <div
                className="absolute -bottom-2 -right-1 text-2xl sm:text-3xl text-indigo-200 dark:text-indigo-700/50 
                font-serif leading-none select-none rotate-180"
              >
                "
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
