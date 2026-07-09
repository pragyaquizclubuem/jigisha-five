"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { navigationData } from "@/constants/NavigationData";
import { MenuIcon, PragyaLogo } from "@/components/icons/Icons";

const getGlowColor = (index: number | null) => {
  switch (index) {
    case 0: return "radial-gradient(circle at center, rgba(155, 114, 200, 0.35) 0%, rgba(18, 6, 31, 0) 70%)"; // HOME - Purple
    case 1: return "radial-gradient(circle at center, rgba(59, 130, 246, 0.35) 0%, rgba(18, 6, 31, 0) 70%)";  // ABOUT - Blue
    case 2: return "radial-gradient(circle at center, rgba(244, 63, 94, 0.35) 0%, rgba(18, 6, 31, 0) 70%)";   // EVENTS - Rose
    case 3: return "radial-gradient(circle at center, rgba(16, 185, 129, 0.35) 0%, rgba(18, 6, 31, 0) 70%)";  // FAMILY - Emerald
    case 4: return "radial-gradient(circle at center, rgba(245, 158, 11, 0.35) 0%, rgba(18, 6, 31, 0) 70%)";  // PARTNERS - Amber
    case 5: return "radial-gradient(circle at center, rgba(236, 72, 153, 0.35) 0%, rgba(18, 6, 31, 0) 70%)";  // CONTACT - Pink
    default: return "radial-gradient(circle at center, rgba(81, 48, 129, 0.15) 0%, rgba(18, 6, 31, 0) 70%)";   // Default
  }
};

/* ── Main component ────────────────────────────────────────────────────────── */
export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on route change by comparing current and previous pathname during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setIsOpen(false); menuButtonRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const trap  = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      }
    };
    document.addEventListener("keydown", trap);
    first?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen(p => !p), []);
  const close  = useCallback(() => { setIsOpen(false); menuButtonRef.current?.focus(); }, []);

  return (
    <>
      {/* ── MOBILE HEADER BAR ──────────────────────────────────────────────── */}
      <div className="
        flex items-center justify-between
        border-2 border-black rounded-3xl
        bg-[#FFEDE0]
        mx-2 mt-2 mb-2
        pl-4 pr-2 py-2
      ">
        <Link href="/" className="shrink-0 flex items-center h-12">
          <PragyaLogo className="h-12 w-auto block" />
        </Link>

        {/* Menu button — 2-line icon from Icons.tsx, morphs into ✕ */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggle}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-overlay"
          className="
            mobile-menu-btn shrink-0
            flex items-center justify-center
            h-12 w-12
            rounded-2xl border-2 border-black
            bg-transparent text-black
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#513081] focus-visible:ring-offset-2
          "
        >
          <MenuIcon isOpen={isOpen} className="h-10 w-10" />
        </button>
      </div>

      {/* ── FULL-SCREEN DARK OVERLAY ────────────────────────────────────────── */}
      {mounted && createPortal(
        <div
          ref={overlayRef}
          id="mobile-nav-overlay"
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
          aria-hidden={!isOpen}
          className="fixed inset-0 z-50 flex flex-col bg-[#12061f] overflow-hidden"
          style={{
            clipPath: isOpen
              ? "circle(150% at calc(100% - 38px) 40px)"
              : "circle(0% at calc(100% - 38px) 40px)",
            transition: "clip-path 0.75s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease",
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {/* Dynamic ambient background glow */}
          <div
            className="absolute inset-0 transition-all duration-1000 ease-out pointer-events-none opacity-40 mix-blend-screen"
            style={{ background: getGlowColor(hoveredIndex) }}
          />

          {/* ── Overlay top bar ───────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0 relative z-10">
            <Link href="/" className="shrink-0 flex items-center h-12">
              <PragyaLogo className="h-12 w-auto brightness-0 invert block" priority={false} />
            </Link>

            <button
              type="button"
              onClick={close}
              aria-label="Close navigation menu"
              className="
                mobile-menu-btn-dark shrink-0
                flex items-center justify-center
                h-12 w-12
                rounded-2xl border border-white/20
                bg-white/10 text-white
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-white/40
              "
            >
              {/* Locked in ✕ state */}
              <MenuIcon isOpen={true} className="h-6 w-6" />
            </button>
          </div>

          {/* ── Thin rule ─────────────────────────────────────────────────────── */}
          <div className="mx-6 h-px bg-white/10 shrink-0 relative z-10" />

          {/* ── Nav links — big editorial list ─────────────────────────────────── */}
          <nav
            aria-label="Mobile navigation"
            className="flex-1 flex flex-col justify-evenly w-full max-w-none md:max-w-[380px] mx-auto px-6 md:px-0 py-8 md:py-16 relative z-10"
          >
            {navigationData.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <div
                  key={item.href}
                  className={[
                    "transition-all duration-500 ease-out",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0",
                  ].join(" ")}
                  style={{ transitionDelay: isOpen ? `${80 + index * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "mobile-drawer-link",
                      "group flex items-center justify-between w-full",
                      "py-3 px-4 rounded-xl",
                      "font-roboto-condensed font-bold uppercase",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                      isActive ? "text-white" : "text-white/40",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
                      <span className={[
                        "text-xs md:text-sm tabular-nums font-normal block transform transition-all duration-500 ease-out",
                        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                        isActive ? "text-[#9b72c8]" : "text-white/20",
                      ].join(" ")}
                      style={{ transitionDelay: isOpen ? `${120 + index * 60}ms` : "0ms" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={[
                          "text-4xl md:text-6xl leading-none tracking-tight block transform transition-all duration-700 ease-out",
                          isOpen ? "translate-y-0" : "translate-y-full",
                        ].join(" ")}
                        style={{ transitionDelay: isOpen ? `${160 + index * 60}ms` : "0ms" }}
                      >
                        {item.label}
                      </span>
                    </div>
                    {isActive && (
                      <span className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-[#9b72c8] shrink-0" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* ── Footer ────────────────────────────────────────────────────────── */}
          <div className="shrink-0 px-8 pb-8 relative z-10">
            <div className="h-px bg-white/10 mb-5" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-roboto-condensed">
              Pragya · UEM Kolkata Quiz Club
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}