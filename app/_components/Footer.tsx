import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return (
      <footer className="text-white bg-black flex flex-row px-5 py-3">
        { children }
      </footer>
  )
}