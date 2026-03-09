import type { Metadata } from "next";
import { Josefin_Sans, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalProtection from "./components/GlobalProtection";
import CircuitLines from "./components/CircuitLines";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdullah Shaimy | Developer & Designer",
  description:
    "Personal portfolio of Abdullah Shaimy, a Developer and Designer from Sri Lanka — crafting high-performance web applications and elegant digital experiences.",
  keywords: ["portfolio", "full-stack developer", "web development", "Next.js", "React", "UI/UX", "brand identity", "Abdullah Shaimy"],
  openGraph: {
    title: "Abdullah Shaimy | Developer & Designer",
    description: "Crafting High-Performance Web Applications & Elegant Digital Experiences",
    type: "website",
  },
};

import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${josefin.variable} ${lato.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CircuitLines />
          <GlobalProtection />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
