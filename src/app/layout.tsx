import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kelas 2383F - Sistem Informasi",
  description: "Website resmi Kelas 2383F Program Studi Sistem Informasi",
  keywords: ["Sistem Informasi", "2383F", "Mahasiswa", "FST"],
  authors: [{ name: "Kelas 2383F" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: [
      {
        url: "/logo-kelas.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo-kelas.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-kelas.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo-kelas.svg" />
        <link rel="apple-touch-icon" href="/logo-kelas.svg" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="relative">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
