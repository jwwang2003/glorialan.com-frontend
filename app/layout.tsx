import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className={inter.className + " h-screen flex flex-col"}>
        <Header>
          <Navbar />
          <div className="md:hidden mt-auto">
            <Footer>Something</Footer>
          </div>
        </Header>
        <div className="flex flex-1 overflow-auto">
          {children}
        </div>
        <Footer>
          stuff
        </Footer>
      </body>
    </html>
  );
}
