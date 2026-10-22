import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "PharmaCalc | Clinical Calculators for Pharmacists",
  description:
    "Creatinine clearance, weight-based dosing, BSA, IV infusion rate and dilution calculators for pharmacists.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="antialiased selection:bg-blue-500/40">{children}</body>
    </html>
  );
}