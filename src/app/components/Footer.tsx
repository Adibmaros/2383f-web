"use client";

import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const defaultSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { label: "Google Drive", href: "https://drive.google.com/drive/folders/1UhHMdUBfGVrofgoA9l1Q42uG7dglZ7lq?usp=drive_link" },
      { label: "Members Profile", href: "/dashboard/profile" },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({
  companyName = "SI-F'23 ",
  description = "Making the world a better place through constructing elegant hierarchies.",
  sections = defaultSections,
  contactInfo = {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, Suite 100, City, ST 12345",
  },
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-900 text-gray-600 dark:text-gray-300 mt-10 shadow-md relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-50"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index} className="relative">
              <h3 className="text-gray-900 dark:text-white text-sm font-semibold uppercase tracking-wider mb-4 flex items-center">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="relative inline-block">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/si23f_radenfatah" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-200" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              © {currentYear} {companyName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
