import Link from "next/link"

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
  
  return (
    <div className="w-full flex flex-row items-center justify-end gap-6 font-light">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="text p-2"
          >
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  )
}