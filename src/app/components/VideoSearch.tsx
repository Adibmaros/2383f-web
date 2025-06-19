"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoSearchProps {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
}

const VideoSearch: React.FC<VideoSearchProps> = ({ 
  onSearch,
  initialSearchTerm = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle initial search term
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  // Handle search input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  // Clear search input
  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    inputRef.current?.focus();
  };

  // Submit search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative max-w-md w-full mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0.8, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative flex items-center transition-all duration-300 ${
          isFocused 
            ? "ring-2 ring-indigo-500 dark:ring-indigo-400" 
            : "ring-1 ring-gray-200 dark:ring-gray-700"
        }`}
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${
            isFocused 
              ? "text-indigo-500 dark:text-indigo-400" 
              : "text-gray-400 dark:text-gray-500"
          }`} />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Cari video..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/90 
                   text-gray-900 dark:text-gray-100 rounded-full 
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none backdrop-blur-sm
                   border border-gray-200 dark:border-gray-700"
        />
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 
                        hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VideoSearch;