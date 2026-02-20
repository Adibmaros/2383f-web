"use client";

import { motion, Variants, Easing, easeInOut, easeOut } from "framer-motion";
import { Users, Clock, BookOpen } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut, 
    },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut", // Use string-based easing
    },
  },
};

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear", // Use string-based easing
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
      ease: easeOut, // Use Framer Motion easing function
    },
  },
};

const scaleVariants: Variants = {
  animate: {
    scale: [0.9, 1, 0.9],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut", // Use string-based easing
    },
  },
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-pink-400/10 rounded-full blur-3xl" />
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
        {/* Logo and Brand */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div variants={pulseVariants} animate="animate" className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg sm:text-xl">2383F</span>
            </motion.div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SI F'23</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sistem Informasi</p>
            </div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative">
            {/* Main Spinner */}
            <motion.div variants={spinnerVariants} animate="animate" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
              <div className="w-full h-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full"></div>
            </motion.div>

            {/* Floating Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -left-8"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [10, -10, 10],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -top-8 -right-8"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <Clock className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [-5, 15, -5],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Memuat Halaman</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Sedang menyiapkan konten untuk Anda...</p>
        </motion.div>

        {/* Animated Dots */}
        <motion.div variants={itemVariants} className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={scaleVariants}
              animate="animate"
              transition={{
                delay: index * 0.2,
              }}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mt-8 w-full max-w-xs mx-auto">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30" />
    </div>
  );
}
