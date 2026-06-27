"use client";

import Image from "next/image";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  GitHubIcon,
} from "@/components/icons/Icons";
import type { Contributor } from "@/constants/contributorData";

/* ── Brand-coloured icon definitions ──────────────────────────────── */
const SOCIALS = [
  {
    key:   "github"   as const,
    Icon:  GitHubIcon,
    label: "GitHub",
    bg:    "bg-[#24292e]",
    hover: "hover:brightness-125",
  },
  {
    key:   "linkedin" as const,
    Icon:  LinkedInIcon,
    label: "LinkedIn",
    bg:    "bg-[#0A66C2]",
    hover: "hover:brightness-110",
  },
  {
    key:   "insta"    as const,
    Icon:  InstagramIcon,
    label: "Instagram",
    /* Instagram gradient — applied via inline style below */
    bg:    "",
    hover: "hover:brightness-110",
    instagram: true,
  },
  {
    key:   "fb"       as const,
    Icon:  FacebookIcon,
    label: "Facebook",
    bg:    "bg-[#1877F2]",
    hover: "hover:brightness-110",
  },
] as const;

export default function ContributorCard({
  contributor,
}: {
  contributor: Contributor;
}) {
  const { name, role, image } = contributor;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* We don't filter activeSocials anymore, we map over all of them */

  return (
    <div className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur-md transition-all duration-300 hover:border-[#B07EFF]/25 hover:bg-white/8 hover:shadow-[0_4px_32px_rgba(92,0,173,0.18)] w-full">

      {/* ── Avatar ──────────────────────────────────────────────────── */}
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-2 border-white/20 ring-4 ring-transparent transition-all duration-300 group-hover:border-[#B07EFF]/60 group-hover:ring-[#B07EFF]/15">
        {/* Initials fallback */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-roboto-condensed text-2xl font-bold text-white/30"
        >
          {initials}
        </span>
        <Image
          src={image}
          alt={name}
          fill
          sizes="88px"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* ── Name & Role ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-0.5">
        <p className="font-roboto-condensed text-sm font-bold leading-tight text-white">
          {name}
        </p>
        <p className="text-[0.65rem] leading-snug text-white/45">
          {role}
        </p>
      </div>

      {/* ── Social icons ─────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {SOCIALS.map(({ key, Icon, label, bg, hover, ...rest }) => {
          const href = contributor[key] || "#";
          const isInsta = "instagram" in rest && rest.instagram;

          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on ${label}`}
              className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${bg} ${hover}`}
              style={
                isInsta
                  ? {
                      background:
                        "radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    }
                  : undefined
              }
            >
              <Icon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" />
            </a>
          );
        })}
      </div>

    </div>
  );
}
