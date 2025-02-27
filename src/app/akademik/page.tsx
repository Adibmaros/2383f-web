"use client";

import React, { useState } from "react";
import { Clock, BookOpen, GraduationCap, Search, FileText, Calendar, Bell, ChevronDown, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContentItem {
  text: string;
  link?: string;
}

interface SectionData {
  title: string;
  iconName: string;
  iconColor: string;
  content: ContentItem[];
}

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  content: ContentItem[];
  isOpen: boolean;
  onClick: () => void;
}

const iconComponents: { [key: string]: LucideIcon } = {
  FileText,
  Search,
  Calendar,
  BookOpen,
  GraduationCap,
  Bell,
  Clock,
};

const AccordionItem = ({ title, icon, content, isOpen, onClick }: AccordionItemProps) => (
  <Card className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <button className="w-full flex items-center justify-between" onClick={onClick}>
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-semibold ml-3 text-gray-800 dark:text-white">{title}</h2>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="space-y-3 text-gray-600 dark:text-gray-300 mt-4">
          {content.map((item, index) => (
            <li key={index}>
              {item.link ? (
                <a href={item.link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                  • {item.text}
                </a>
              ) : (
                <>• {item.text}</>
              )}
            </li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

const academicData: SectionData[] = [
  {
    title: "Syarat Seminar Proposal",
    iconName: "FileText",
    iconColor: "text-blue-600 dark:text-blue-400",
    content: [{ text: "Telah menyelesaikan minimal 100 SKS" }, { text: "IPK minimal 2.5" }, { text: "Lulus MK metodologi penelitian ( min. nilai C )" }, { text: "Sudah memiliki judul atau tema penelitian" }],
  },
  {
    title: "Mencari Judul Skripsi",
    iconName: "Search",
    iconColor: "text-purple-600 dark:text-purple-400",
    content: [
      { text: "Repository Skripsi", link: "https://repository.example.com" },
      { text: "Database Jurnal Online", link: "https://journal.example.com" },
      { text: "Konsultasi dengan dosen pembimbing" },
      { text: "Panduan Penulisan", link: "https://guide.example.com" },
    ],
  },
  // Add more sections as needed
];

const AcademicPage = () => {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Portal Akademik Semester 4</h1>
        <p className="text-gray-600 dark:text-gray-300">Informasi penting untuk persiapan tugas akhir dan kebutuhan akademik</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-4">
        {academicData.map((section, index) => {
          const IconComponent = iconComponents[section.iconName];
          return <AccordionItem key={index} title={section.title} icon={<IconComponent className={`w-8 h-8 ${section.iconColor}`} />} content={section.content} isOpen={openSections.includes(index)} onClick={() => toggleSection(index)} />;
        })}
      </div>

      <div className="max-w-6xl mx-auto mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>Untuk informasi lebih lanjut, silakan hubungi Pembimbing Akademik</p>
      </div>
    </div>
  );
};

export default AcademicPage;
