import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Improves performance by showing fallback font until Inter loads
  preload: true,
  // Only load the weights we need
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "GitHub Portfolio | ChengjiePL",
  description: "A personal portfolio website built with Next.js and GitHub API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add preconnect for GitHub API */}
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />

        {/* Add preload for critical assets */}
        <link rel="preload" href="/portfolio/placeholder.svg" as="image" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
