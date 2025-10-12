"use client";

import { useQuery } from "@tanstack/react-query";
import { Karya } from "@/types/karya";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { formatDistance } from "date-fns";
import { id } from "date-fns/locale";

const DEFAULT_IMAGE = "/images/placeholder.jpg";

export default function KaryaAnggotaPage() {
  const [selectedKarya, setSelectedKarya] = useState<Karya | null>(null);

  const { data: karya, isLoading } = useQuery<Karya[]>({
    queryKey: ["karya-anggota"],
    queryFn: async () => {
      const res = await fetch("/api/karya-anggota");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const handleKaryaClick = (item: Karya) => {
    setSelectedKarya(item);
  };

  const formatTitleForUrl = (title: any): string => {
    return title ? title.toString().toLowerCase().replace(/\s+/g, "-") : "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="p-6 mt-6 text-center text-4xl font-serif text-gray-900 dark:text-white">Hasil Karya Anggota Kelas - 2383F</h1>

      {/* Grid Layout */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {karya?.map((item: any) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800/30 rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 overflow-hidden cursor-pointer
                       border border-gray-200 dark:border-gray-700/30 backdrop-blur-sm"
              onClick={() => setSelectedKarya(item)}
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.imageUrl || DEFAULT_IMAGE}
                  alt={item.title || "Karya preview"}
                  className="w-full h-full object-cover transition-transform duration-300
                           hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = DEFAULT_IMAGE;
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Oleh: <span className="font-medium">{item.dibuatOleh}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedKarya} onOpenChange={() => setSelectedKarya(null)}>
        <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
          {selectedKarya && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedKarya.title}</DialogTitle>
              </DialogHeader>

              <div className="mt-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img
                    src={selectedKarya.imageUrl || DEFAULT_IMAGE}
                    alt={selectedKarya.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        {formatDistance(new Date(selectedKarya.createdAt), new Date(), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </span>
                    </div>
                    <div>
                      Oleh: <span className="font-medium">{selectedKarya.dibuatOleh}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{selectedKarya.description}</p>

                  {/* URL Display and Action Button */}
                  {selectedKarya.link && (
                    <div className="pt-4 space-y-3">
                      <div className="text-sm text-gray-600 dark:text-gray-300 break-all">
                        <span className="font-medium">URL:</span> {selectedKarya.link}
                      </div>
                      <a
                        href={selectedKarya.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 
                                 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        Lihat Karya <ExternalLinkIcon className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
