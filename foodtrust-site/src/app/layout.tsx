import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nibia — The Food Center",
  description:
    "Nibia is The Food Center: search verified products, validate suppliers, and manage secure logistics with blockchain-grade checks.",
  keywords: [
    "Nibia",
    "food supply chain",
    "supplier validation",
    "logistics",
    "blockchain checks",
    "restaurants",
    "suppliers",
    "distributors",
    "regulators",
  ],
  openGraph: {
    title: "Nibia — The Food Center",
    description:
      "Trust, transparency, and ease-of-use for restaurants, suppliers, distributors, and regulators.",
    type: "website",
    url: "https://foodtrust.example",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased min-h-screen bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
