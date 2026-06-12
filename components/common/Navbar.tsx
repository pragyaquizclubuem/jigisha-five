/**
 * Navbar — Server Component
 *
 * This file intentionally has NO "use client" directive.
 * Only MobileNavigation and NavLink are Client Components.
 *
 * Architecture
 * ────────────
 * Navbar.tsx              ← Server Component  (this file)
 * ├─ UEM logo             ← static <Image />
 * ├─ Desktop nav links    ← NavLink (Client — active state only)
 * ├─ Pragya logo          ← static <Image />
 * ├─ Desktop nav links    ← NavLink (Client — active state only)
 * ├─ IEM logo             ← static <Image />
 * └─ MobileNavigation     ← Client Component (all interactive logic)
 *
 * Desktop layout (≥ 1280px / xl breakpoint)
 * ──────────────────────────────────────────
 * [ UEM ] | HOME · ABOUT · EVENTS | [ Pragya ] | FAMILY · PARTNERS · CONTACT | [ IEM ]
 *
 * Mobile layout (< 1280px)
 * ─────────────────────────
 * Closed:  [ Pragya ]  ·············  [ ☰ ]
 * Open:    Slide-down overlay with all 6 nav links
 *
 * Image paths
 * ───────────
 * Place the actual logo files in your project at:
 *   public/images/uem-logo.png
 *   public/images/pragya-logo.png
 *   public/images/iem-logo.png
 *
 * Integration
 * ───────────
 * <PageWrapper>
 *   <Navbar />
 *   …
 * </PageWrapper>
 */

import Image from "next/image";
import { navigationData } from "@/constants/NavigationData";
import MobileNavigation from "./MobileNavigation";
import NavLink from "./NavLink";

// Items left of the Pragya logo: Home · About · Events
const leftNav = navigationData.slice(0, 3);
// Items right of the Pragya logo: Family · Partners · Contact
const rightNav = navigationData.slice(3);

export default function Navbar() {
  return (
    /**
     * `relative` is required here so the MobileNavigation absolute dropdown
     * (position: absolute; top: 100%) anchors to this <header> element.
     */
    <header className="w-full bg-[#FFEDE0] sticky top-0 z-50 relative">

      {/* ══════════════════════════════════════════════════════════════════
          DESKTOP NAVIGATION
          Visible: xl (1280 px) and above
          Hidden : below xl → MobileNavigation takes over
      ══════════════════════════════════════════════════════════════════ */}
      <nav
        className="
          hidden xl:flex
          items-center justify-between
          border border-black rounded-2xl
          mx-4 my-2 2xl:mx-8
          px-4 py-1.5
        "
        aria-label="Main navigation"
      >
        {/* ── UEM Logo ──────────────────────────────────────────────── */}
        <div className="flex-shrink-0">
          <Image
            src="/images/uem-logo.png"
            width={106}
            height={77}
            alt="University of Engineering & Management"
            className="object-contain h-[77px] w-auto"
            priority
          />
        </div>

        {/* ── Centre: left links · Pragya · right links ─────────────── */}
        <div className="flex items-center gap-1.5 2xl:gap-2.5">

          {/* Left nav links: Home, About, Events */}
          {leftNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}

          {/* Pragya logo — central divider / brand mark */}
          <div className="mx-2 2xl:mx-4 flex-shrink-0">
            <Image
              src="/images/pragya-logo.png"
              width={96}
              height={91}
              alt="Pragya — UEM Kolkata Quiz Club"
              className="object-contain h-[91px] w-auto"
              priority
            />
          </div>

          {/* Right nav links: Family, Partners, Contact */}
          {rightNav.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        {/* ── IEM Logo ──────────────────────────────────────────────── */}
        <div className="flex-shrink-0">
          <Image
            src="/images/iem-logo.png"
            width={109}
            height={79}
            alt="Institute of Engineering & Management"
            className="object-contain h-[79px] w-auto"
            priority
          />
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE NAVIGATION
          Visible: below xl (1280 px)
          MobileNavigation is a self-contained Client Component.
          It renders its own header row (logo + button) AND the overlay.
      ══════════════════════════════════════════════════════════════════ */}
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
}
