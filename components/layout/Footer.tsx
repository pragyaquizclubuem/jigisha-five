"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { footerSocials, jigishaBrand } from "@/constants/FooterData";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/icons/Icons";
import ContributorsModal from "./ContributorsModal";
import SectionWrapper from "@/components/wrappers/SectionWrapper";

/* ── Static data ─────────────────────────────────────────────────────────────── */

const SOCIAL_MAP = {
  instagram: InstagramIcon,
  facebook:  FacebookIcon,
  linkedin:  LinkedInIcon,
} as const;

const SOCIAL_COLORS: Record<string, string> = {
  instagram: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]",
  facebook:  "hover:bg-[#1877F2]",
  linkedin:  "hover:bg-[#0A66C2]",
};

const NAV_LEFT  = [["Home", "/"], ["About Us", "#homeAbout"], ["Our Quizzes", "#quizzes"]] as const;
const NAV_RIGHT = [["Gallery", "#gallery"], ["Brochure", "#brochure"], ["FAQ", "#faq"]] as const;

/* ── Component ───────────────────────────────────────────────────────────────── */

export default function Footer() {
  const [open, setOpen] = useState(false);
  const openModal  = useCallback(() => setOpen(true),  []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      <footer
        id="site-footer"
        aria-label="Site footer"
        className="relative w-full overflow-hidden bg-[#09050F] text-white selection:bg-[#5C00AD]/40"
      >
        {/* ── Atmospheric glows ─────────────────────────────────────────────── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {/* Violet bloom — left */}
          <div className="absolute -left-32 -top-20 h-[420px] w-[420px] rounded-full bg-[#5C00AD]/12 blur-[120px]" />
          {/* Amber glow — right */}
          <div className="absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[#FFB900]/6 blur-[100px]" />
        </div>

        {/* ── Ghost watermark — truly centred, visible ──────────────────────── */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
        >
          <p
            className="whitespace-nowrap font-roboto-condensed font-black uppercase leading-none"
            style={{ fontSize: "22vw", color: "rgba(255,255,255,0.045)" }}
          >
            JIGISHA 5.0
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            HERO BAND — big wordmark + tagline + socials
        ═══════════════════════════════════════════════════════════════════ */}
        <SectionWrapper as="div" className="relative z-10" contentClassName="py-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">

              {/* Brand */}
              <div className="flex flex-col gap-3">
                <Image
                  src={jigishaBrand.src}
                  alt={jigishaBrand.alt}
                  width={jigishaBrand.width}
                  height={jigishaBrand.height}
                  className="h-auto w-44 object-contain sm:w-52"
                  priority
                />
                <p className="max-w-xs text-[0.72rem] leading-relaxed text-white/45">
                  The Annual Quiz Festival of University of Engineering &amp;&nbsp;Management,
                  Kolkata — hosted by PRAGYA.
                </p>
              </div>

              {/* Social cluster */}
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#B07EFF]/70">
                  Follow Us
                </p>
                <div className="flex items-center gap-2.5">
                  {footerSocials.map(({ label, href, icon }) => {
                    const Icon  = SOCIAL_MAP[icon];
                    const hover = SOCIAL_COLORS[icon] ?? "hover:bg-[#5C00AD]";
                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow on ${label}`}
                        className={`footer-social-orb group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition-all duration-300 hover:border-transparent hover:text-white hover:scale-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B07EFF] ${hover}`}
                      >
                        <Icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
                      </a>
                    );
                  })}
                </div>
              </div>

        </SectionWrapper>

        {/* ═══════════════════════════════════════════════════════════════════
            MAIN BAND — Navigation + Contact pills
        ═══════════════════════════════════════════════════════════════════ */}
        <SectionWrapper as="div" className="relative z-10" contentClassName="py-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">

              {/* Nav — left pages (hidden on mobile — ham menu covers this) */}
              <div className="hidden sm:flex flex-col gap-1.5">
                <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[#B07EFF]/70">
                  Navigate
                </p>
                {NAV_LEFT.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="footer-nav-link inline-block w-fit text-[0.78rem] font-semibold uppercase tracking-widest text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Nav — right pages (hidden on mobile) */}
              <div className="hidden sm:flex flex-col gap-1.5">
                <p className="mb-2 text-[0.58rem] font-bold uppercase tracking-[0.3em] opacity-0 select-none">&nbsp;</p>
                {NAV_RIGHT.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    className="footer-nav-link inline-block w-fit text-[0.78rem] font-semibold uppercase tracking-widest text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Contact — editorial list style */}
              <div className="flex flex-col gap-3">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-[#B07EFF]/70">
                  Contact
                </p>
                <div className="flex flex-col">
                  <a href="tel:9749967441" className="group py-1.5 text-sm text-white/55 transition-colors hover:text-white">
                    <span className="text-white/30 text-xs">Supriyo Mondal</span>
                    <span className="block font-mono font-semibold text-white/80 group-hover:text-white">+91 97499 67441</span>
                  </a>
                  <a href="tel:7878396475" className="group py-1.5 text-sm text-white/55 transition-colors hover:text-white">
                    <span className="text-white/30 text-xs">Sneha Priya</span>
                    <span className="block font-mono font-semibold text-white/80 group-hover:text-white">+91 78783 96475</span>
                  </a>
                  <a
                    href="mailto:pragyatheofficialquizclubuem@gmail.com"
                    className="group mt-3 py-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    <span className="text-white/30 text-xs">Email</span>
                    <span className="block break-all font-medium text-white/75 group-hover:text-white">
                      pragyatheofficial<wbr />quizclubuem@gmail.com
                    </span>
                  </a>
                </div>
              </div>
          </div>
        </SectionWrapper>

        {/* ═══════════════════════════════════════════════════════════════════
            BOTTOM BAR
        ═══════════════════════════════════════════════════════════════════ */}
        <SectionWrapper as="div" className="relative z-10 bg-[#07030C]" contentClassName="py-5 flex flex-col items-center justify-between gap-2 sm:flex-row sm:gap-0">

            {/* Left — copyright */}
            <p className="text-sm font-medium text-white/65 text-center sm:text-left">
              © 2026 Jigisha 5.0 &nbsp;&middot;&nbsp; All rights reserved.
            </p>

            {/* Right — team credit */}
            <p className="text-sm font-medium text-white/65 text-center sm:text-right">
              Designed &amp; built by&nbsp;
              <button
                type="button"
                onClick={openModal}
                className="font-bold text-[#B07EFF] underline underline-offset-4 decoration-[#B07EFF]/30 transition-all duration-200 hover:text-white hover:decoration-white/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B07EFF] rounded-sm cursor-pointer"
              >
                Team Pragya
              </button>
            </p>
        </SectionWrapper>
      </footer>

      <ContributorsModal isOpen={open} onClose={closeModal} />
    </>
  );
}
