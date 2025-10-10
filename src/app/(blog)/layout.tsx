"use client";

import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <main className="dark:bg-gray-600/30">{children}</main>
    </div>
  );
}
