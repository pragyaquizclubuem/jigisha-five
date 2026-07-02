"use client";

import { useState, useEffect, useRef } from "react";
import { UEMLogo, PragyaLogo, IEMLogo } from "@/components/icons/Icons";
import { navigationData } from "@/constants/NavigationData";
import MobileNavigation from "./MobileNavigation";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";

// Items left of the Pragya logo: Home · About · Events
const leftNav = navigationData.slice(0, 3);
// Items right of the Pragya logo: Family · Partners · Contact
const rightNav = navigationData.slice(3);

export default function Navbar() {
  const pathname = usePathname();
  const [showNavbarOverride, setShowNavbarOverride] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // If scroll is locked (e.g. mobile drawer navigation or banner modal is active), keep navbar visible
      if (document.body.style.overflow === "hidden") {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 80) {
        // Always reveal navbar near the top of the page (prevents iOS rubber-band hide bugs)
        setIsVisible(true);
      } else if (delta > 10) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (delta < -10) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  const isJanaOjana = pathname === '/events/jana-ojana';

  if (isJanaOjana && !showNavbarOverride) {
    return (
      <div className="fixed top-5 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        <a
          href="/"
          className="pointer-events-auto flex items-center gap-1 font-roboto-condensed font-bold uppercase text-xs sm:text-sm text-black border-2 border-black bg-white rounded-full px-4 py-1.5 hover:bg-[#FFEDE0] transition-colors shadow-[4px_4px_0_0_#000]"
        >
          ← Back to Website
        </a>
        
        <button
          onClick={() => setShowNavbarOverride(true)}
          className="pointer-events-auto flex items-center gap-1 font-roboto-condensed font-bold uppercase text-xs sm:text-sm text-black border-2 border-black bg-[#D7ABFF] rounded-full px-4 py-1.5 hover:bg-white transition-colors cursor-pointer shadow-[4px_4px_0_0_#000]"
        >
          ☰ Show Navigation
        </button>
      </div>
    );
  }

  return (
    <header className={`w-full sticky top-0 z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>

      {/* DESKTOP NAVIGATION — xl (1280px) and above
          All 9 items in ONE flex row with justify-between so the
          gap between logos and nav links is identical to the gap between
          nav links themselves.                                              */}
      <nav
        className="
          hidden xl:flex
          items-center justify-between
          border-2 border-black rounded-[35px]
          bg-[#FFEDE0]
          mx-6 my-5
          px-8 py-2.5
        "
        aria-label="Main navigation"
      >
        {/* UEM Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <UEMLogo className="h-[60px] w-auto" />
        </div>

        {/* Left nav: Home · About · Events */}
        {leftNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}

        {/* Pragya logo — central brand mark */}
        <div className="shrink-0 flex items-center justify-center">
          <PragyaLogo className="h-[76px] w-auto" />
        </div>

        {/* Right nav: Family · Partners · Contact */}
        {rightNav.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}

        {/* IEM Logo */}
        <div className="shrink-0 flex items-center justify-center">
          <IEMLogo className="h-[60px] w-auto" />
        </div>
      </nav>

      {/* MOBILE NAVIGATION — below xl (1280px) */}
      <div className="xl:hidden">
        <MobileNavigation />
      </div>
    </header>
  );
}
