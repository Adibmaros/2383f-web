"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { DarkMode } from "@/components/DarkMode";

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
  { title: "Showcase", link: "showcase" },
  { title: "About", link: "/about" },
];

const Navbar: React.FC<NavbarProps> = ({ logo = "2383F", menuItems = defaultMenuItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownEnter = (index: number, hasDropdown: boolean) => {
    if (hasDropdown) setActiveDropdown(index);
  };

  const handleDropdownLeave = () => setActiveDropdown(null);

  return (
    <nav className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
              dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
            >
              {logo}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group" onMouseEnter={() => handleDropdownEnter(index, !!item.dropdown)} onMouseLeave={handleDropdownLeave}>
                <a
                  href={item.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 
                    dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium 
                    flex items-center transition-all duration-300"
                >
                  {item.title}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === index && (
                  <div
                    className="absolute z-10 -ml-4 mt-2 w-48 rounded-xl shadow-lg 
                    bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl 
                    ring-1 ring-black/5 dark:ring-white/10 
                    transform transition-all duration-300 origin-top"
                  >
                    <div className="py-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                            hover:bg-indigo-50 dark:hover:bg-indigo-900/30 
                            hover:text-indigo-600 dark:hover:text-indigo-400 
                            transition-all duration-300"
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
            <div className="flex items-center">
              <DarkMode />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkMode />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md 
                text-gray-600 dark:text-gray-300 
                hover:text-indigo-600 dark:hover:text-indigo-400 
                hover:bg-indigo-50 dark:hover:bg-indigo-900/30 
                transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.link}
                  className="block px-3 py-2 rounded-md text-base font-medium 
                    text-gray-700 dark:text-gray-300 
                    hover:text-indigo-600 dark:hover:text-indigo-400 
                    hover:bg-indigo-50 dark:hover:bg-indigo-900/30 
                    transition-all duration-300"
                >
                  {item.title}
                </a>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href="#"
                        className="block px-3 py-2 rounded-md text-base font-medium 
                          text-gray-500 dark:text-gray-400 
                          hover:text-indigo-600 dark:hover:text-indigo-400 
                          hover:bg-indigo-50 dark:hover:bg-indigo-900/30 
                          transition-all duration-300"
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
      )}
    </nav>
  );
};

export default Navbar;
