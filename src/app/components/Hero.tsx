"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, LogOut, User, Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  username?: string;
  userRole?: string;
  loginButtonText?: string;
  loginHref?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Sistem Informasi F",
  subtitle = "Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨",
  secondaryButtonText = "Keluar",
  onSecondaryClick = () => {},
  username,
  userRole = "Anggota Kelas 2383F",
  loginButtonText = "Masuk sebagai Anggota Kelas",
  loginHref = "/dashboard",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when window is resized to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        // sm breakpoint
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 lg:pt-20">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-500/10 dark:to-purple-500/10 backdrop-blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(0,0,0,0))]" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/30 dark:bg-purple-500/20 rounded-full blur-xl animate-pulse delay-75" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200/30 dark:bg-pink-500/20 rounded-full blur-xl animate-pulse delay-150" />
      </div>

      {/* Collapsible Navigation Header */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={menuRef}>
          {/* Mobile Menu Toggle & Desktop Content */}
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-full">
              {username ? (
                // Authenticated User - Desktop
                <>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Selamat datang,</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{userRole}</p>
                    </div>
                  </div>

                  <button
                    onClick={onSecondaryClick}
                    className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700 text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {secondaryButtonText}
                  </button>
                </>
              ) : (
                // Guest User - Desktop
                <div className="ml-auto">
                  <Link
                    href={loginHref}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-105 transform shadow-lg hover:shadow-xl"
                  >
                    <User className="w-4 h-4 mr-2" />
                    {loginButtonText}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Title */}
            <div className="sm:hidden flex-1 text-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{username ? userRole : "Menu"}</h2>
            </div>

            {/* Spacer for mobile layout balance */}
            <div className="sm:hidden w-9"></div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="sm:hidden overflow-hidden border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="py-4 space-y-4">
                  {username ? (
                    // Authenticated User - Mobile
                    <>
                      {/* User Info */}
                      <div className="flex items-center space-x-3 px-2 py-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Selamat datang,</p>
                          <p className="text-base font-semibold text-gray-900 dark:text-white truncate">{username}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userRole}</p>
                        </div>
                      </div>

                      {/* Welcome Message */}
                      <div className="px-2 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Dashboard Kelas Tersedia</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Jelajahi galeri dan kenangan bersama</p>
                      </div>

                      {/* Logout Button */}
                      <button
                        onClick={() => {
                          onSecondaryClick();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700 text-white font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        {secondaryButtonText}
                      </button>
                    </>
                  ) : (
                    // Guest User - Mobile
                    <>
                      {/* Welcome Message */}
                      <div className="px-4 py-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium">Selamat Datang!</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">Masuk untuk mengakses dashboard kelas</p>
                      </div>

                      {/* Login Button */}
                      <Link
                        href={loginHref}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                      >
                        <User className="w-5 h-5 mr-3" />
                        {loginButtonText}
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Title with better responsive sizing */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Enhanced Image Container with better responsive handling */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="relative w-full mx-auto mb-8 sm:mb-12 group">
              <div className="relative aspect-video max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl dark:shadow-gray-900/50 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                <Image
                  src="/hero2.jpg"
                  alt="Hero image showcasing Sistem Informasi F community"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 70vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Enhanced Subtitle with better typography */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="max-w-4xl mx-auto mb-10">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-light px-4">{subtitle}</p>
            </motion.div>

            {/* Call-to-action section for authenticated users */}
            {username && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Selamat datang di dashboard kelas</p>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Jelajahi galeri dan kenangan bersama</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Enhanced Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent" />
      </div>
    </div>
  );
};

export default Hero;
