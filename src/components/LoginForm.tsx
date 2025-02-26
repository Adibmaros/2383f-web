"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/lib/atoms/authAtom";
import Link from "next/link";
import { Button } from "./ui/button";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      setAuth({
        username,
        isAuthenticated: true,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 px-4 py-2.5
          text-gray-900 dark:text-white
          focus:border-blue-500 dark:focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
          transition duration-200"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 px-4 py-2.5
          text-gray-900 dark:text-white
          focus:border-blue-500 dark:focus:border-blue-400 
          focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
          transition duration-200"
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 dark:bg-red-900/30 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2.5 px-4 
        rounded-lg text-sm font-medium text-white
        bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800 dark:focus:ring-blue-400
        disabled:opacity-50 disabled:cursor-not-allowed
        transition duration-200"
      >
        {loading ? (
          <span className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : (
          "Login"
        )}
      </button>
      <div className="float-right text-sm text-gray-500 hover:text-blue-500 dark:text-gray-400">
        <Link href={"/tamu"}>Login sebagai tamu</Link>
      </div>
    </form>
  );
}
