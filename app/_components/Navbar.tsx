"use client"

import Link from "next/link"
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const links = [
  {
    "name": "Home",
    "href": "/",
    "icon": ""
  },
  {
    "name": "Art",
    "href": "/art",
    "icon": ""
  },
  {
    "name": "Photo",
    "href": "/photo",
    "icon": "",
  },
  {
    "name": "ShanXi",
    "href": "/shanxi",
    "icon": "",
  },
  {
    "name": "FeiYi",
    "href": "/feiyi",
    "icon": "",
  },
  {
    "name": "About",
    "href": "/me",
    "icon": "",
  },
  {
    "name": "Shop",
    "href": "/shop",
    "icon": "",
  }
]

export default function Navbar() {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<String>("/");

  useEffect(() => {
    const match = pathname.match(/^\/?([^\/]+)/);

    if (!match && pathname == "/") {
      setCurrentPage("");
    } else if (match && match.length > 0) {
      setCurrentPage(match![1]);
    } else {
      // edge case, that might cause the website to crash?
    }
    
  }, [pathname]);

  return (
    <div className="nav-bar">
      {links.map((link) => {
        
        const isHighlight: boolean = link.href.split("/")[1] == currentPage;
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={ (isHighlight && "text-blue-500") + " text p-2 transition-colors hover:text-gray-400"}
          >
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </div>
  )
}