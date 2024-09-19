"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowForward from '@mui/icons-material/ArrowForward';
import { usePathname } from "next/navigation";

const DEAFULT_SIG = 2;
const TOT_SIG = 3;

export default function Header({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const [sig, setSig] = useState<number>(DEAFULT_SIG);
  const toggleSig = () => {
    if (sig + 1 <= TOT_SIG) setSig(sig + 1);
    else setSig(0);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 bg-white h-20 flex flex-row px-8 py-2 items-center">
      <div className="logo-container">
        <Image
          className="logo"
          src={`/sig${sig}.png`}
          width={1000}
          height={500}
          alt="Signature Logo"
          onClick={toggleSig}
        />
      </div>
      <div
        className={
          (menuOpen ? "show-nav " : "") + "nav"
        }
      >
        <div className="ml-auto md:hidden" onClick={toggleMenu}>
          <ArrowForward />
        </div>
        {children}
      </div>
      <div className="ml-auto md:hidden" onClick={toggleMenu}>
        <MenuIcon />
      </div>
    </header>
  );
}
