import Image from "next/image";
import { ReactNode } from "react";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="sticky top-0 bg-white h-20 flex flex-row px-10 py-2">
      <div className="h-full w-fit relative self-start">
        <Image className="h-full w-fit object-contain" src="/sig.png" width={1000} height={500} alt="Signature" />
      </div>
      {children}
    </header>
  );
}
