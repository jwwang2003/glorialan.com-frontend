import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gloria Lan",
  description: "Gloria's personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-full flex flex-col"}>
        <div className="min-h-full flex flex-col flex-1">
          <Header>
            <Navbar />
            <div className="md:hidden mt-auto">
              <Footer>Something</Footer>
            </div>
          </Header>
          <div className="main">
            <Toaster position="bottom-center" />
            {children}
          </div>
        </div>
        <Footer>
          Copyright 2024
        </Footer>
        {/* Stylesheet for maplibre */}
        <link href='https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css' rel='stylesheet' />
      </body>
    </html>
  );
}
