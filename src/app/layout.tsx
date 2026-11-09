import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Hind_Siliguri, Hind, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const fontDevanagari = Hind({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
    <html
      lang="en"
      className={cn(
        "font-sans antialiased",
        fontSans.variable,
        fontDisplay.variable,
        fontDevanagari.variable,
        fontMono.variable
      )}
    >
      <body className="bg-background text-foreground antialiased flex flex-col min-h-screen selection:bg-highlight selection:text-highlight-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-highlight focus:text-highlight-foreground focus:px-4 focus:py-2 focus:font-bold"
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
