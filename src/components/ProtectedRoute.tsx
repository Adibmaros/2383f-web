// ProtectedRoute.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { authAtom, isAuthenticatedAtom, initializeAuth, saveAuth } from "@/lib/atoms/authAtom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);

  // Inisialisasi auth saat komponen mount
  useEffect(() => {
    const initialAuth = initializeAuth();
    setAuth(initialAuth);
    setIsLoading(false);
  }, [setAuth]);

  // Cek autentikasi setelah inisialisasi
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Tetap tampilkan loading selama proses cek
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Tetap tampilkan loading jika belum terautentikasi
  // Ini mencegah flicker konten sebelum redirect
  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  // Tampilkan konten hanya jika terautentikasi
  return <>{children}</>;
}
