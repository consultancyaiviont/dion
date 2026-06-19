import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miami Lifestyle Watersports — Jet Ski Rentals & Watersport Adventures",
  description:
    "Book jet ski rentals, parasailing, tubing, kayaking, yacht charters, and sunset tours in Miami. Premium watersport experiences with easy online booking and secure payment.",
  keywords: [
    "jet ski rental Miami",
    "jetski Miami",
    "Miami watersports",
    "water sports Miami",
    "yacht rental Miami",
    "yacht charter Miami",
    "parasailing Miami",
    "boat tours Miami",
    "boat rental Miami",
    "kayak rental Miami",
    "paddleboard Miami",
    "water activities Miami",
    "beach activities Miami",
    "jet ski tours Miami",
    "waverunner rental Miami",
    "banana boat Miami",
    "tubing Miami",
    "snorkeling Miami",
    "Miami Beach watersports",
    "South Beach jet ski",
    "Miami lifestyle",
    "water adventures Miami",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
