"use client";

/**
 * NavLink — minimal Client Component.
 *
 * This is intentionally kept as small as possible so the parent Navbar.tsx
 * can remain a Server Component. The ONLY reason this is a Client Component
 * is to call usePathname() for active-page detection.
 *
 * Props:
 *   href      — destination route
 *   label     — visible text (also used for accessibility)
 *   onClick   — optional callback (used by mobile menu to close on navigate)
 *   className — extra Tailwind classes (e.g. "block w-full text-center")
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

export default function NavLink({
  href,
  label,
  onClick,
  className = "",
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={[
        // Container
        "nav-link-btn",
        "relative inline-block overflow-hidden",
        "px-5 xl:px-8 py-2.5 rounded-[14px] border-2 border-black",
        // Typography — larger, bolder
        "font-bold uppercase tracking-widest text-sm xl:text-base font-roboto-condensed",
        // Focus ring
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#513081] focus-visible:ring-offset-2",
        // Active state: always purple bg, white text, no hover effect needed
        isActive
          ? "bg-[#513081] text-white border-black cursor-default"
          : "bg-transparent text-black border-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Bottom-fill hover slab — only shown for inactive items */}
      {!isActive && (
        <span aria-hidden="true" className="nav-fill-layer" />
      )}
      {/* Label — always on top */}
      <span className="nav-link-label">{label}</span>
    </Link>
  );
}
