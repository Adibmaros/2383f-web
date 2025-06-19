"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/lib/videos";

interface VideoCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const VideoCategories: React.FC<VideoCategoriesProps> = ({ activeCategory, onCategoryChange }) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onCategoryChange(category)}
          onMouseEnter={() => setHoveredCategory(category)}
          onMouseLeave={() => setHoveredCategory(null)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none focus:outline-none
                    ${activeCategory === category ? "text-white" : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}`}
        >
          {/* Background for active/hovered category */}
          {(activeCategory === category || hoveredCategory === category) && (
            <motion.div
              layoutId="categoryBackground"
              className={`absolute inset-0 rounded-full z-0 shadow-sm ${activeCategory === category ? "bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-600 dark:to-purple-600" : "bg-gray-100 dark:bg-gray-800/90"}`}
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          {/* Fix for transparent background when button is active but not hovered */}
          {activeCategory === category && hoveredCategory !== category && <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-600 dark:to-purple-600 -z-10"></div>}

          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default VideoCategories;
