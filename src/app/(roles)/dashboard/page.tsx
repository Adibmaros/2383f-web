// DashboardPage.tsx
"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom, saveAuth } from "@/lib/atoms/authAtom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Hero from "../../components/Hero";
import ImageCarousel from "../../components/ImageCarousel";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    // Set state ke null
    setAuth(null);

    // Hapus dari localStorage dan cookie
    saveAuth(null);

    // Force redirect ke login
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <Navbar />

        {/* Main Content Container with better spacing */}
        <main className="relative">
          <Hero
            title="Sistem Informasi F"
            subtitle="Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨"
            secondaryButtonText="Logout"
            onPrimaryClick={() => {}}
            onSecondaryClick={handleLogout}
            username={auth?.username}
          />

          {/* Gallery Section with improved spacing and container */}
          <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Galeri Kenangan</h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Koleksi momen berharga dan kenangan indah bersama teman-teman Sistem Informasi F</p>
              </div>
              <ImageCarousel />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
