"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import Footer from "../../components/Footer";

// Lazy load komponen berat
const Timeline = lazy(() => import("../../components/Timeline"));
const ClassStats = lazy(() => import("../../components/ClassStats"));
const AnimatedBackground = lazy(() => import("../../components/AnimatedBackground"));

// Loading component untuk Suspense
const ComponentLoading = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export default function MemoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Lazy load Animated Background */}
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>

      <main className="relative z-10">
        {/* Hero Section - Simple tanpa animasi berat */}
        <section className="pt-7 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Memories</span>
                <br />
                <span className="text-gray-800 dark:text-white">Kelas 2383F</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Perjalanan berkesan dan momen-momen berharga yang telah kita lalui bersama</p>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section dengan Lazy Loading */}
        <section className="py-12 bg-white/30 dark:bg-gray-800/20 backdrop-blur-sm">
          <Suspense fallback={<ComponentLoading />}>
            <Timeline />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
