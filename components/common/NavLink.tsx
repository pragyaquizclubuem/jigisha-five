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
        // Pill shape — padding scales up at wider breakpoints
        "inline-block px-4 xl:px-5 py-2 rounded-full border",
        // Typography
        "font-bold uppercase tracking-wider text-xs xl:text-sm",
        // Transitions (CSS only — no animation libraries)
        "transition-colors duration-200 ease-in-out",
        // Visible keyboard focus ring (accessibility requirement)
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#513081] focus-visible:ring-offset-2",
        // Active vs inactive colours
        isActive
          ? "bg-[#513081] text-white border-[#513081]"
          : "bg-transparent text-black border-black hover:bg-[#513081]/10 hover:border-[#513081] hover:text-[#513081]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </Link>
  );
}
