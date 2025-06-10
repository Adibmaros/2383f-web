"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const QuoteSection = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl" />
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50">
            <div className="text-6xl text-blue-500/20 dark:text-blue-400/20 mb-4">"</div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-gray-200 italic leading-relaxed mb-6">
              Dalam persahabatan, jarak hanyalah angka. Kedekatan sejati terletak di hati, dan ikatan yang tulus akan tetap kuat meski terpisah ruang dan waktu.
            </blockquote>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">Kelas 2383F</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;
