"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import VideoGrid from "@/app/components/VideoGrid";
import VideoCategories from "@/app/components/VideoCategories";
import VideoSearch from "@/app/components/VideoSearch";
import { Video, videos as allVideos, categories } from "@/lib/videos";

export default function VideosPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Semua";
  const initialSearch = searchParams.get("q") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter videos based on category and search term
  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      // Filter by category
      const categoryMatch = activeCategory === "Semua" || video.category === activeCategory;

      // Filter by search term
      const searchMatch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || video.description.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // Update URL query params
    const url = new URL(window.location.href);
    if (category === "Semua") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.pushState({}, "", url);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Update URL query params
    const url = new URL(window.location.href);
    if (term) {
      url.searchParams.set("q", term);
    } else {
      url.searchParams.delete("q");
    }
    window.history.pushState({}, "", url);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Video Kelas</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Kumpulan video pembelajaran, kegiatan, dan tutorial untuk mahasiswa Kelas 2383F</p>
      </motion.div>

      {/* Search Bar */}
      <VideoSearch onSearch={handleSearch} initialSearchTerm={searchTerm} />

      {/* Categories */}
      <VideoCategories activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Videos Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">{filteredVideos.length > 0 ? <p>Menampilkan {filteredVideos.length} video</p> : <p>Tidak ditemukan video yang sesuai dengan kriteria pencarian</p>}</div>

          <VideoGrid videos={filteredVideos} />
        </>
      )}

      {/* Empty state */}
      {!isLoading && filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Tidak ada video yang ditemukan</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Coba ubah filter atau kata kunci pencarian</p>
          <button
            onClick={() => {
              setActiveCategory("Semua");
              setSearchTerm("");
              // Reset URL params
              window.history.pushState({}, "", window.location.pathname);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}
