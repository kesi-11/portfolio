import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RichKid Graphix | Premium Graphic Design Portfolio",
  description: "Premium graphic design services - Brand identity, Event posters, Motion graphics & more. Available for projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f5f5f5]">{children}</body>
    </html>
  );
}