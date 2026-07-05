import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VendyProvider } from "@/lib/context/vendy-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vendy — Commerce guidé pour boutiques indépendantes",
  description:
    "Vendy simplifie l'e-commerce pour petites boutiques, créateurs et vendeurs indépendants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <VendyProvider>{children}</VendyProvider>
      </body>
    </html>
  );
}
