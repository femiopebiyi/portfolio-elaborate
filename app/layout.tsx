import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "FEMI OPEBIYI // Rust & Solana Systems Engineer",
  description:
    "Femi Opebiyi builds production-grade backend and on-chain systems in Rust and Solana. Indexers, protocols, real-time pipelines, shipped to mainnet. Available for freelance and contract work.",
  openGraph: {
    title: "FEMI OPEBIYI // Rust & Solana Systems Engineer",
    description:
      "Production-grade backend and on-chain systems in Rust and Solana. Available for freelance and contract work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
