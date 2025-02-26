"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/authAtom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero
        title="Sistem Informasi F"
        subtitle="Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨"
        primaryButtonText="Dashboard"
        secondaryButtonText="Logout"
        onPrimaryClick={() => {}}
      />

      <ImageCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-8">
              <a href="#" className="group text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                <Facebook className="h-6 w-6 transition-all duration-300 ease-in-out group-hover:scale-110" />
              </a>

              <a href="#" className="group text-gray-400 hover:text-sky-500 dark:hover:text-sky-400" aria-label="Twitter">
                <Twitter className="h-6 w-6 transition-all duration-300 ease-in-out group-hover:scale-110" />
              </a>

              <a href="https://www.instagram.com/si23f_radenfatah" className="group text-gray-400 hover:text-pink-500 dark:hover:text-pink-400" aria-label="Instagram">
                <Instagram className="h-6 w-6 transition-all duration-300 ease-in-out group-hover:scale-110" />
              </a>

              <a href="#" className="group text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 transition-all duration-300 ease-in-out group-hover:scale-110" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 dark:text-gray-400 font-medium">© 2025 SI F'23. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
