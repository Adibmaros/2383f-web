"use client";

import React from "react";
import { Heart, Instagram, Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">2383F</span>
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white">SI F'23</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan</p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.instagram.com/si23f_radenfatah"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 transition-all duration-300 hover:scale-110"
              aria-label="Instagram Kelas 2383F"
            >
              <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors duration-300" />
            </a>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto mb-6"></div>

          {/* Copyright */}
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center flex-wrap gap-1">
              <span>© {currentYear} Kelas 2383F</span>
              <span className="hidden sm:inline">•</span>
              <span className="sm:inline block">Program Studi Sistem Informasi</span>
            </p>

            <p className="text-gray-500 dark:text-gray-500 text-xs flex items-center justify-center gap-1">
              <span>Dibuat dengan</span>
              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>oleh Kelas 2383F</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
