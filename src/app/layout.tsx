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
  title: "Miami Lifestyle Watersports | Jet Ski • Jet Car • Luxury Yacht Charters",
  description:
    "Book jet ski rentals, jet car rentals, and luxury yacht charters in Miami. Premium watersport experiences at 2400 Collins Ave, Miami Beach. Call (774) 823-4024.",
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
  metadataBase: new URL("https://www.miamilifestylewatersports.com"),
  openGraph: {
    title: "Miami Lifestyle Watersports | Jet Ski • Jet Car • Luxury Yachts",
    description:
      "Miami's #1 watersports experience. Jet skis, jet cars & luxury yacht charters. Book online in minutes — deposits start at $40.",
    url: "https://www.miamilifestylewatersports.com",
    siteName: "Miami Lifestyle Watersports",
    images: [
      {
        url: "/images/jetski-aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Miami Lifestyle Watersports — Jet Ski on Miami waters",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miami Lifestyle Watersports | Jet Ski • Jet Car • Luxury Yachts",
    description:
      "Miami's #1 watersports experience. Jet skis, jet cars & luxury yacht charters. Book online — deposits start at $40.",
    images: ["/images/jetski-aerial.jpg"],
  },
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
      <body className="min-h-full flex flex-col bg-[#0B0B0C] text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
