// DashboardPage.tsx
"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom, saveAuth } from "@/lib/atoms/authAtom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    // Set state ke null
    setAuth(null);

    // Hapus dari localStorage dan cookie
    saveAuth(null);

    // Force redirect ke login
    // Gunakan replace untuk menghindari kembali ke halaman ini
    router.replace("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Hero
          title="Sistem Informasi F"
          subtitle="Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨"
          secondaryButtonText="Logout"
          onPrimaryClick={() => {}}
          onSecondaryClick={handleLogout}
          username={auth?.username}
        />
        <ImageCarousel />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
