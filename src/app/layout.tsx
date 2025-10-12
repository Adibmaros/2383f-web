"use client";

import { Providers } from "./providers";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-kelas.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/logo-kelas.svg" />
        <link rel="apple-touch-icon" href="/logo-kelas.svg" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <div className="relative">{children}</div>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
