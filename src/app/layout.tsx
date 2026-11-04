import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://msitm.edu.in"),
  title: {
    default: "MSITM — Meena Shah Institute of Technology and Management, Gonda",
    template: "%s — MSITM Gonda",
  },
  description:
    "Meena Shah Institute of Technology and Management (MSITM) Degree College, Gonda — BBA, BCA, MBA, MCA, NIELIT diplomas and certificate courses since 1998.",
  openGraph: {
    type: "website",
    siteName: "MSITM Gonda",
    title: "MSITM — Meena Shah Institute of Technology and Management, Gonda",
    description:
      "The No. 1 professional institute in Devipatan Mandal for IT and Management education since 1998.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white text-ink antialiased flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-gold-400 focus:text-navy-950 focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
