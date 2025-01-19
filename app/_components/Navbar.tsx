"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { definedPaths, getPossiblePathsFrom } from "../../paths";

// -----------------------------------------------------------------------------
// 1. Helper function to build a path from multiple segments
// -----------------------------------------------------------------------------
/**
 * Cleans up and concatenates multiple segments into one path.
 * Example:
 *   buildNestedPath(["dashboard", "settings"]) => "/dashboard/settings"
 *   buildNestedPath(["/dashboard/", "/settings/"]) => "/dashboard/settings"
 */
function buildNestedPath(segments: string[]): string {
  const trimmed = segments.map((seg) =>
    seg.replace(/^\/+|\/+$/g, "") // remove leading/trailing slashes
  );
  // Filter out empty segments in case they exist
  const filtered = trimmed.filter(Boolean);
  return "/" + filtered.join("/");
}

// -----------------------------------------------------------------------------
// 2. NavLink
// -----------------------------------------------------------------------------
/**
 * NavLinkProps: extends next/link's LinkProps and adds
 * optional style or other common props you may want to pass.
 */
interface NavLinkProps extends LinkProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

/**
 * NavLink:
 * - Renders a Next.js <Link>
 * - Highlights if it's the active route
 * - Receives any ReactNode as children for flexible styling
 */
const NavLink: FC<NavLinkProps> = ({ href, children, ...props }) => {
  const router = usePathname();
  // Compare using asPath (includes query string) or pathname (excludes it)
  const isActive = router === href;

  return (
    <Link href={href} className={(isActive && "text-sky-300") + " nav-link text p-2 transition-colors hover:text-sky-500"}  {...props}>
      <span>
        {children}
      </span>
    </Link>
  );
};

// -----------------------------------------------------------------------------
// 3. NestedNavLink (Generalized)
// -----------------------------------------------------------------------------
/**
 * NestedNavLinkProps:
 * - `pathSegments`: array of path segments to build the final path
 *   e.g., ["dashboard", "settings"] => /dashboard/settings
 */
interface NestedNavLinkProps extends Omit<NavLinkProps, "href"> {
  pathSegments: string[];
}

/**
 * NestedNavLink:
 * - Uses an array of path segments to build a final URL path
 * - Then passes that path to NavLink for rendering/highlighting
 */
const NestedNavLink: FC<NestedNavLinkProps> = ({
  pathSegments,
  children,
  ...props
}) => {
  const nestedPath = buildNestedPath(pathSegments);

  return (
    <NavLink href={nestedPath} {...props}>
      {children}
    </NavLink>
  );
};

interface Navbar {
  parentPath?: string
}

export default function Navbar({
  parentPath = "/"
}: Navbar) {
  const links = getPossiblePathsFrom(definedPaths, parentPath);

  return (
    <>
      {links.map((link) => {
        return (
          <NestedNavLink key={link.name} pathSegments={link.path.split("/")}>
            {link.name}
          </NestedNavLink>
          // <NavLink
          //   key={link.name}
          //   href={link.href}
          // >
          //   <p className="">{link.name}</p>
          // </NavLink>
        );
      })}
    </>
  )
}