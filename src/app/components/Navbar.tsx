"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Users, Clock, BarChart3, User, LogOut, UserCheck, Video } from "lucide-react";
import { useAtom } from "jotai";
import { authAtom, saveAuth } from "@/lib/atoms/authAtom";
import { useRouter } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    setAuth(null);
    saveAuth(null);
    router.push("/tamu"); // Redirect ke tamu bukan login
    setIsOpen(false);
  };

  // Navigation items berdasarkan status auth
  const getNavItems = () => {
    const baseItems = [
      { name: "Beranda", href: "/tamu", icon: Home },
      { name: "Tentang", href: "/about", icon: Users },
      { name: "Memories", href: "/memories", icon: Clock },
      { name: "Profil Anggota", href: "/dashboard/profile", icon: UserCheck },
      { name: "Video Kelas", href: "/videos", icon: Video },
    ];

    if (auth?.isAuthenticated) {
      return [...baseItems, { name: "Dashboard", href: "/dashboard", icon: BarChart3 }, { name: "Profil Anggota", href: "/dashboard/profile", icon: User }];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/tamu" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">2383F</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">SI F'23</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            {/* Auth Actions */}
            <div className="flex items-center space-x-4">
              <DarkModeToggle />

              {/* {auth?.isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Halo, {auth.username}</span>
                  <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              )} */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DarkModeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Auth Actions */}
                {/* <div className="px-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  {auth?.isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Masuk sebagai: <span className="font-medium">{auth.username}</span>
                      </div>
                      <button onClick={handleLogout} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
                      <User className="w-5 h-5" />
                      <span>Login</span>
                    </Link>
                  )}
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
