// ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { authAtom, isAuthenticatedAtom, initializeAuth } from "@/lib/atoms/authAtom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // Optional: default true
  redirectTo?: string; // Optional: default "/login"
}

export default function ProtectedRoute({ children, requireAuth = true, redirectTo = "/login" }: ProtectedRouteProps) {
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const initialAuth = initializeAuth();
        setAuth(initialAuth);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [setAuth]);

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isLoading, requireAuth, isAuthenticated, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Mengarahkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
