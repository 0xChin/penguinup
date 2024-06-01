import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Penguinup",
  description: "Watch replays",
  icons: {icon: {url: '/logo.png'}}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><Suspense fallback={<div>Loading...</div>}>{children}</Suspense> </body>
    </html>
  );
}
