"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { authAtom } from "@/lib/atoms/authAtom";
import ProtectedRoute from "@/components/ProtectedRoute";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleLogout = () => {
    // Hapus data dari localStorage
    setAuth(null);
    // Redirect ke login
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {/* Hapus tombol logout dari sini karena sudah dipindahkan ke Hero */}
        <Hero
          title="Sistem Informasi F"
          subtitle="Persahabatan adalah ikatan tanpa syarat, di mana jiwa saling menemukan cerminan, dan kehadiran menjadi pelipur tanpa perlu kata-kata.🌿✨"
          secondaryButtonText="Logout"
          onPrimaryClick={() => {}}
          onSecondaryClick={handleLogout} // Teruskan handleLogout ke Hero sebagai onSecondaryClick
          username={auth?.username} // Meneruskan username ke Hero
        />
        <ImageCarousel />
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
