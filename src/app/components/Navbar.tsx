"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

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
  { title: "Home", link: "#" },
  { title: "Showcase", link: "#" },
  { title: "About", link: "/about" },
];

const Navbar: React.FC<NavbarProps> = ({ logo = "2383F", menuItems = defaultMenuItems }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const handleDropdownEnter = (index: number, hasDropdown: boolean) => {
    if (hasDropdown) {
      setActiveDropdown(index);
    }
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">{logo}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative" onMouseEnter={() => handleDropdownEnter(index, !!item.dropdown)} onMouseLeave={handleDropdownLeave}>
                <a href={item.link} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200">
                  {item.title}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </a>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === index && (
                  <div className="absolute z-10 -ml-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a key={subIndex} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                          {subItem}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a href={item.link} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
                  {item.title}
                </a>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem, subIndex) => (
                      <a key={subIndex} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200">
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
