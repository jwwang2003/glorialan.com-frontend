"use client";

import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

export default function Template({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ x: -10, y: 0, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      // exit={{ x: 0, y: 0, opacity: 0 }} // exit animations will not be supported
      transition={{ ease: "easeInOut", duration: 0.2 }}
      className="flex flex-1 overflow-auto relative"
    >
      {children}
    </motion.div>
  )
}