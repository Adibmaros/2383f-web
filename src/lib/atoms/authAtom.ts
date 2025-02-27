// authAtom.ts
import { atom } from "jotai";

// Tipe data untuk user
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Atom dasar untuk autentikasi
export const authAtom = atom<User | null>(null);

// Atom turunan untuk status autentikasi
export const isAuthenticatedAtom = atom((get) => {
  const auth = get(authAtom);
  return auth !== null && auth.isAuthenticated === true;
});

// Fungsi untuk inisialisasi auth dari localStorage/cookie
export const initializeAuth = () => {
  try {
    // Ambil dari localStorage
    const storedAuth = localStorage.getItem("auth_user");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }

    // Atau coba dari cookie
    const cookies = document.cookie.split("; ");
    const authCookie = cookies.find((cookie) => cookie.startsWith("auth_user="));
    if (authCookie) {
      const authValue = authCookie.split("=")[1];
      return JSON.parse(decodeURIComponent(authValue));
    }
  } catch (error) {
    console.error("Error parsing auth data:", error);
  }

  return null;
};

// Fungsi untuk menyimpan auth di localStorage dan cookie
export const saveAuth = (auth: User | null) => {
  try {
    if (auth === null) {
      localStorage.removeItem("auth_user");
      document.cookie = "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict";
    } else {
      const stringValue = JSON.stringify(auth);
      localStorage.setItem("auth_user", stringValue);
      document.cookie = `auth_user=${encodeURIComponent(stringValue)}; path=/; max-age=604800; SameSite=Strict`;
    }
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};
