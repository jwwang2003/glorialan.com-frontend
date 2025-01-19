"use client";

import Navbar from "@/_components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Navbar parentPath="/dashboard" />
      </div>
      <div className="p-2 grow">
        {children}
      </div>
    </div>
  )
}