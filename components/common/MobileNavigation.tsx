"use client";


import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { navigationData } from "@/constants/NavigationData";
import { CloseIcon, Hamburger } from "./Icons";
import NavLink from "./NavLink";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">

        {/* Pragya logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/pragya-logo.svg"   
            width={56}
            height={53}
            alt="Pragya — UEM Kolkata Quiz Club"
            className="object-contain w-auto h-12"
            priority
          />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={toggle}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          className="
            relative flex h-10 w-10 items-center justify-center flex-shrink-0
            rounded-xl border border-black text-black
            transition-colors duration-200 ease-in-out
            hover:bg-[#513081]/10 hover:border-[#513081] hover:text-[#513081]
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#513081] focus-visible:ring-offset-2
          "
        >
          <span
            className={[
              "absolute transition-all duration-200 ease-in-out",
              isOpen
                ? "opacity-0 rotate-90 scale-50 pointer-events-none"
                : "opacity-100 rotate-0 scale-100",
            ].join(" ")}
          >
            <Hamburger />
          </span>

          <span
            className={[
              "absolute transition-all duration-200 ease-in-out",
              isOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50 pointer-events-none",
            ].join(" ")}
          >
            <CloseIcon />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={[
          "absolute top-full left-0 right-0 z-50",
          "bg-[#FFEDE0] border-t border-black",
          "transition-all duration-300 ease-in-out overflow-hidden",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
      >
        <ul
          className="flex flex-col gap-3 px-6 py-6 sm:px-10"
          role="list"
          aria-label="Navigation links"
        >
          {navigationData.map((item) => (
            <li key={item.href} role="listitem">
              <NavLink
                href={item.href}
                label={item.label}
                onClick={close}
                className="block w-full text-center py-3"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
