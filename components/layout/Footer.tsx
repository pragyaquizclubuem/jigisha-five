"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

import {
  footerContacts,
  footerSocials,
  organizedBy,
  jigishaBrand,
  footerTagline,
} from "@/constants/FooterData";
import {
  PhoneIcon,
  MailIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/layout/Icons";
import ContributorsModal from "./ContributorsModal";

/* ── Social icon resolver ──────────────────────────────────────────────────── */
const socialIconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
} as const;

/* ── Footer ────────────────────────────────────────────────────────────────── */
export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <footer
        id="site-footer"
        aria-label="Site footer"
        className="w-full bg-[#1E0D36] text-white"
      >
        {/* ── Main footer grid ─────────────────────────────────────────────── */}
        <div className="grid-layout-bleed">
          <div className="col-content py-5 sm:py-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

              {/* ── Column 1 — Brand + Tagline + Organized By ────────────── */}
              <div className="flex flex-col gap-4">
                {/* Jigisha brand image */}
                <Image
                  src={jigishaBrand.src}
                  alt={jigishaBrand.alt}
                  width={jigishaBrand.width}
                  height={jigishaBrand.height}
                  className="h-auto w-28 object-contain sm:w-32"
                  loading="lazy"
                  decoding="async"
                />

                <p className="max-w-[240px] text-[0.68rem] leading-relaxed text-white/60 sm:text-xs">
                  {footerTagline.split("PRAGYA").map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <span className="font-bold text-[#FFB900]">PRAGYA</span>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </p>

                {/* Organized By */}
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#FFB900]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FFB900]" aria-hidden="true" />
                    Organized By
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {organizedBy.map((org) => (
                      <div key={org.name} className="flex items-center gap-2.5">
                        <Image
                          src={org.logoSrc}
                          alt={org.logoAlt}
                          width={org.logoWidth}
                          height={org.logoHeight}
                          className="h-7 w-7 rounded-full border border-white/10 object-contain brightness-0 invert sm:h-8 sm:w-8"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="text-[0.7rem] leading-tight text-white/70 sm:text-xs">
                          {org.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Column 2 — Contact ───────────────────────────────────── */}
              <div>
                <h3 className="mb-3 font-roboto-condensed text-xs font-bold uppercase tracking-widest text-[#FFB900] sm:text-sm">
                  Contact
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {footerContacts.map((contact) => {
                    const href =
                      contact.type === "phone"
                        ? `tel:${contact.value}`
                        : `mailto:${contact.value}`;
                    const Icon =
                      contact.type === "phone" ? PhoneIcon : MailIcon;

                    return (
                      <li key={contact.value}>
                        <a
                          href={href}
                          className="
                            group inline-flex items-center gap-2
                            text-xs text-white/70 transition-colors
                            hover:text-[#FFB900]
                            focus-visible:outline-none focus-visible:text-[#FFB900]
                            sm:text-[0.8rem]
                          "
                          aria-label={
                            contact.type === "phone"
                              ? `Call ${contact.name}`
                              : `Email ${contact.name}`
                          }
                        >
                          <Icon
                            className="h-3.5 w-3.5 shrink-0 text-white/40 transition-colors group-hover:text-[#FFB900]"
                            aria-hidden="true"
                          />
                          <span>
                            <span className="font-semibold text-white/80 group-hover:text-[#FFB900] transition-colors">
                              {contact.name}
                            </span>
                            {" : "}
                            {contact.type === "phone"
                              ? `+91 ${contact.value.replace("+91", "").replace(/(\d{5})(\d{5})/, "$1 $2")}`
                              : contact.value}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>



              {/* ── Column 4 — Follow Us ─────────────────────────────────── */}
              <div>
                <h3 className="mb-3 font-roboto-condensed text-xs font-bold uppercase tracking-widest text-[#FFB900] sm:text-sm">
                  Follow Us
                </h3>
                <div className="flex items-center gap-3">
                  {footerSocials.map((social) => {
                    const Icon = socialIconMap[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${social.label}`}
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-lg border border-white/15
                          text-white/70 transition-all
                          hover:border-[#FFB900]/50 hover:text-[#FFB900]
                          hover:shadow-[0_0_12px_rgba(255,185,0,0.15)]
                          focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-[#FFB900] focus-visible:ring-offset-2
                          focus-visible:ring-offset-[#1E0D36]
                          sm:h-10 sm:w-10
                        "
                      >
                        <Icon className="h-4 w-4 sm:h-[1.15rem] sm:w-[1.15rem]" />
                      </a>
                    );
                  })}
                </div>
                <p className="mt-3 text-[0.68rem] leading-relaxed text-white/40 sm:text-xs">
                  Join our community for updates and announcements
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider with centered diamond ────────────────────────────────── */}
        <div className="grid-layout-bleed" aria-hidden="true">
          <div className="col-content flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
            <span className="text-[#FFB900] text-xs">◆</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
          </div>
        </div>

        {/* ── Bottom bar — copyright + designed by ─────────────────────────── */}
        <div className="grid-layout-bleed">
          <div className="col-content flex flex-col items-center gap-0.5 py-3 text-center">
            <p className="text-[0.7rem] text-white/50 sm:text-xs">
              Designed and developed by{" "}
              <button
                type="button"
                onClick={openModal}
                className="
                  font-bold text-white/80 underline decoration-[#FFB900]/40
                  underline-offset-2 transition-colors
                  hover:text-[#FFB900] hover:decoration-[#FFB900]
                  focus-visible:outline-none focus-visible:text-[#FFB900]
                  focus-visible:ring-2 focus-visible:ring-[#FFB900]
                  focus-visible:ring-offset-1 focus-visible:ring-offset-[#1E0D36]
                  rounded-sm
                "
              >
                TEAM PRAGYA
              </button>
            </p>
            <p className="text-[0.65rem] text-white/35 sm:text-[0.7rem]">
              © 2026 Jigisha 5.0. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Contributors modal ─────────────────────────────────────────────── */}
      <ContributorsModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
