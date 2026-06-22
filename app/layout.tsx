import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import {Navbar} from "@/components/navbar/Navbar";
import {Footer} from "@/components/footer/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { ComparisonBar } from "@/components/compare/ComparisonBar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PolicyLens - Understand Insurance Clearly",
  description: "Compare insurance policies and review coverage, premiums, and benefits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html
        lang="en"
        className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      >
        <body className="min-h-full flex flex-col">
          <Navbar />
          {children}
          <Footer />
          <ComparisonBar />
        </body>
      </html>
  );
}
