import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

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
    apple: [
      {
        url: "/logo-kelas.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3b82f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  openGraph: {
    title: "Kelas 2383F - Sistem Informasi",
    description: "Website resmi Kelas 2383F Program Studi Sistem Informasi",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/logo-kelas.svg",
        width: 1200,
        height: 630,
        alt: "Logo Kelas 2383F",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kelas 2383F - Sistem Informasi",
    description: "Website resmi Kelas 2383F Program Studi Sistem Informasi",
    images: ["/logo-kelas.svg"],
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
