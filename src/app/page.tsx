"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect langsung ke /dashboard tanpa kondisi
    router.push("/dashboard");
  }, [router]);

  // Halaman kosong (tidak menampilkan apa-apa)
  // atau bisa juga menampilkan loading jika ingin
  return null;
}
