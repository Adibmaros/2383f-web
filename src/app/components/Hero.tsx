"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  username?: string; // Tambahkan prop username
}

const Hero: React.FC<HeroProps> = ({
  title = "Sistem Informasi F",
  subtitle = "Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨",
  secondaryButtonText = "Learn More",
  onSecondaryClick = () => {},
  username, // Terima username dari props
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mb-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-500/10 dark:to-purple-500/10 backdrop-blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(0,0,0,0))]" />
      </div>

      {/* User Navigation / Logout Button - Hanya tampil ketika ada username */}
      {username ? (
        <div className="relative flex justify-end items-center p-4 sm:p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="mr-4">
            <span className="text-gray-700 dark:text-gray-200">
              Selamat datang,{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {/* {username} */}
                Anggota Kelas 2383F
              </span>
            </span>
          </div>

          <button
            onClick={onSecondaryClick}
            className="inline-flex items-center px-4 py-2 rounded-lg
              bg-red-600 hover:bg-red-700 active:bg-red-800
              dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700
              text-white font-medium text-sm
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-800"
          >
            {secondaryButtonText}
          </button>
        </div>
      ) : (
        <div className="relative flex justify-end items-center p-4 sm:p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Link
            href={"/dashboard"}
            className="inline-flex items-center px-4 py-2 rounded-lg
              bg-green-600 hover:bg-green-700 active:bg-green-800
              dark:bg-green-500 dark:hover:bg-green-600 dark:active:bg-green-700
              text-white font-medium text-sm
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              dark:focus:ring-offset-gray-800"
          >
            Masuk sebagai Anggota Kelas
          </Link>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full aspect-video max-w-3xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl dark:shadow-gray-900/50"
            >
              <Image src="/hero2.jpg" alt="hero image" fill priority className="object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light">
              {subtitle}
            </motion.p>

            {/* Tambahkan tombol Dashboard jika diperlukan */}
            {username && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex justify-center">
                {/* <button onClick={onPrimaryClick} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button> */}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-32 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
