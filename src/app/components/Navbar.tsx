"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { DarkMode } from "@/components/DarkMode";
import Link from "next/link";

interface MenuItem {
  title: string;
  link: string;
  dropdown?: string[];
}

interface NavbarProps {
  logo?: string;
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
];

const Navbar: React.FC<NavbarProps> = ({ logo = "2383F", menuItems = defaultMenuItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
      if (activeDropdown !== null) setActiveDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, activeDropdown]);

  const handleDropdownEnter = (index: number, hasDropdown: boolean) => {
    if (hasDropdown) setActiveDropdown(index);
  };

  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href={"/"}>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                {logo}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group" onMouseEnter={() => handleDropdownEnter(index, !!item.dropdown)} onMouseLeave={handleDropdownLeave}>
                <a
                  href={item.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2 rounded-xl text-sm font-medium flex items-center transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 group"
                >
                  {item.title}
                  {item.dropdown && <ChevronDown className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === index && (
                  <div className="absolute z-20 left-0 mt-2 w-56 rounded-2xl shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 transform transition-all duration-300 origin-top animate-in slide-in-from-top-2">
                    <div className="py-2">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 mx-2 rounded-xl"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Dark Mode Toggle - Desktop */}
            <div className="flex items-center ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <DarkMode />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <DarkMode />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? "rotate-45 top-3" : "top-1"}`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? "opacity-0" : "top-3"}`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isOpen ? "-rotate-45 top-3" : "top-5"}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with smooth animation */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="px-4 py-4 space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <a
                  href={item.link}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
                {item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
