"use client";

import { motion } from "framer-motion";
import AnimatedBackground from "../../components/AnimatedBackground";
import Timeline from "../../components/Timeline";
import ClassStats from "../../components/ClassStats";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function MemoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* <Navbar /> */}

      {/* Animated Background */}
      <AnimatedBackground />

      <main className="relative z-10">
        {/* Timeline Section */}
        <section className=" bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <Timeline />
        </section>
      </main>

      <Footer />
    </div>
  );
}
