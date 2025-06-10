"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Home() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Set timer untuk redirect setelah 3 detik
    const redirectTimer = setTimeout(() => {
      setIsRedirecting(true);
      router.push("/tamu");
    }, 3000);

    // Cleanup timer jika component unmount
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <>
      <Loading />
    </>
  );
}
