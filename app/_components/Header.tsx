"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { usePathname, useRouter } from "next/navigation";

import { Keybind, Keybinds } from "@/components/Keybindings";
import toast from "react-hot-toast";

// Signature logo settings
const ENABLE_SIG_SWITCH: boolean = false;
const DEFAULT_SIG_ID: number = 2;
const TOT_SIG: number = 3;

export default function Header({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [curSigId, setSigId] = useState<number>(DEFAULT_SIG_ID);
  const [canSigSwitch, setCanSigSwitch] = useState<boolean>(ENABLE_SIG_SWITCH);
  const toggleSigSwitch = () => {
    if (canSigSwitch) {
      if (curSigId + 1 <= TOT_SIG) setSigId(curSigId + 1);
      else setSigId(0); // loop around
    } else {
      // signature switch is disabled, do nothing
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const openSecret = () => {
    router.push("/secret");
    toast.success("欢迎回家！");
  }

  // Handling key-binds here
  useEffect(() => {
    const fired = [false];
    const onKeyDown = (e: KeyboardEvent) => {
      // if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      //   console.log("command + enter clicked");
      // }
      
      // binding single keybinds
      // Keybind(
      //   e,
      //   (e) => e.key === "Enter" && (e.ctrlKey || e.metaKey),
      //   () => {
      //     console.log("command + enter clicked");
      //   },
      //   fired
      // );

      // binding multiple keybinds
      Keybinds(
        e,
        [
          (e) => e.key === "Enter" && (e.ctrlKey || e.metaKey),
        ],
        [
          openSecret
        ],
        fired
      );
    };
    const onKeyUp = (e: KeyboardEvent) => {
      fired[0] = false;
    }
    
    // Attach global keyboard bindings
    document.body.addEventListener("keydown", onKeyDown);
    document.body.addEventListener("keyup", onKeyUp);

    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
      document.body.removeEventListener("keyup", onKeyUp);
    };
  }, [router]);

  // Handling signature logo long press backdoor
  let startTimestamp:number = 0;
  const triggerThreshold:number = 1000;  // 1000ms (1s)
  const onMouseUp = () => {
    const curTimestamp = new Date().getTime();
    if(curTimestamp - startTimestamp >= triggerThreshold) {
      openSecret();
    }
  }
  const onMouseDown = () => {
    startTimestamp = new Date().getTime();
  }

  return (
    <header
      className="sticky top-0 bg-white h-20 flex flex-row px-8 py-2 z-10 items-center"
    >
      <div className="logo-container pointer-events-none">
        <Image
          className="logo"
          src={`/sig${curSigId}.png`}
          width={1000}
          height={500}
          alt="Signature Logo"
          onClick={toggleSigSwitch}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
      <div className={(menuOpen ? "show-nav " : "") + "nav"}>
        <div className="ml-auto md:hidden" onClick={toggleMenu}>
          <ArrowForward />
        </div>
        {/* Navigation bar items here */}
        {children}
      </div>
      <div className="ml-auto md:hidden" onClick={toggleMenu}>
        <MenuIcon />
      </div>
    </header>
  );
}
