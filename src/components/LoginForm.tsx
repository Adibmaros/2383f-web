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
  const [isLoading, setIsLoading] = useState(false);
  const [, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Username dan password harus diisi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        const user = {
          username,
          isAuthenticated: true,
        };
        setAuth(user);
        saveAuth(user);
        router.replace("/dashboard");
      } else {
        setError(data.message || "Login gagal");
      }
    } catch (error) {
      setError("Terjadi kesalahan, coba lagi nanti");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-4 sm:mt-6 space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="block w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                        dark:bg-gray-700/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                        transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500
                        text-sm sm:text-base"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="block w-full pl-8 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                        dark:bg-gray-700/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                        transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500
                        text-sm sm:text-base"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-1 sm:pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent 
                    text-sm font-medium rounded-lg text-white 
                    bg-gradient-to-r from-indigo-600 to-purple-600 
                    hover:from-indigo-700 hover:to-purple-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]
                    shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">Memproses...</span>
            </div>
          ) : (
            "Masuk"
          )}
        </button>
      </div>

      <div className="flex items-center justify-center pt-3 sm:pt-4">
        <div className="text-xs sm:text-sm">
          <span>Bukan anggota? </span>
          <Link
            href="/tamu"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 
                      transition-colors duration-200 hover:underline"
          >
            Masuk sebagai tamu
          </Link>
        </div>
      </div>
    </form>
  );
}
