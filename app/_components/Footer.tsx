import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return (
      <footer className="text-white bg-black flex flex-row px-5 py-3 font-extralight">
        { children }
        <div className="ml-auto flex flex-row gap-2">
          <p>EN</p>
          <p>CN</p>
          <p>ES</p>
        </div>
      </footer>
  )
}