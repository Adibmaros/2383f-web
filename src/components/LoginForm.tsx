// LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom, saveAuth } from "@/lib/atoms/authAtom";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi sederhana
    if (!username || !password) {
      setError("Username dan password harus diisi");
      return;
    }

    // Simulasi cek login (ganti dengan API call asli)
    // Di dunia nyata, lakukan validasi di server
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // contoh sederhana
      const user = {
        username: username,
        isAuthenticated: true,
      };

      // Update state
      setAuth(user);

      // Simpan ke localStorage dan cookie
      saveAuth(user);

      // Redirect dengan replace untuk menghindari history back
      router.replace("/dashboard");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                    focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 
                    focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                    text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
      <div className="float-end text-sm text-gray-500 hover:text-blue-500">
        <Link href="/tamu">Masuk sebagai tamu</Link>
      </div>
    </form>
  );
}
