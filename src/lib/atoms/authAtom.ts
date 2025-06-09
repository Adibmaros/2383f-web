// authAtom.ts
import { atom } from "jotai";

export interface AuthUser {
  username: string;
  isAuthenticated: boolean;
  role?: string;
}

// Main auth atom
export const authAtom = atom<AuthUser | null>(null);

// Derived atom untuk check authentication
export const isAuthenticatedAtom = atom((get) => {
  const auth = get(authAtom);
  return auth?.isAuthenticated ?? false;
});

// Helper functions
export const saveAuth = (auth: AuthUser | null) => {
  if (typeof window !== "undefined") {
    if (auth) {
      const authData = JSON.stringify(auth);
      localStorage.setItem("auth_user", authData);
      document.cookie = `auth_user=${encodeURIComponent(authData)}; path=/; max-age=86400`; // 24 hours
    } else {
      localStorage.removeItem("auth_user");
      document.cookie = "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
};

export const initializeAuth = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const storedAuth = localStorage.getItem("auth_user");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  } catch (error) {
    console.error("Error parsing stored auth:", error);
    localStorage.removeItem("auth_user");
  }

  return null;
};
