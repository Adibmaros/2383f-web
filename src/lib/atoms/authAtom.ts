import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Tipe data untuk user
export interface User {
  username: string;
  isAuthenticated: boolean;
}

// Atom utama yang menyimpan data user di localStorage
export const authAtom = atomWithStorage<User | null>("auth_user", null);

// Atom turunan untuk cek status auth
export const isAuthenticatedAtom = atom((get) => get(authAtom)?.isAuthenticated === true);
