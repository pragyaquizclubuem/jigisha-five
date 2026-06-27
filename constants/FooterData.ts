/** Footer section data — single source of truth for all footer content. */

// ── Types ──────────────────────────────────────────────────────────────────────

export interface FooterContact {
  /** Display name shown next to the phone/email */
  name: string;
  /** The raw phone number or email address */
  value: string;
  /** "phone" or "email" — drives the icon and the href scheme */
  type: "phone" | "email";
}

export interface FooterSocial {
  label: string;
  href: string;
  /** Key used to pick the correct icon component */
  icon: "instagram" | "facebook" | "linkedin";
}

export interface FooterSectionLink {
  label: string;
  href: string;
}

export interface FooterContributor {
  name: string;
  role: string;
}

// ── Contact Data ───────────────────────────────────────────────────────────────

export const footerContacts: FooterContact[] = [
  { name: "Supriyo Mondal", value: "9749967441", type: "phone" },
  { name: "Sneha Priya", value: "7878396475", type: "phone" },
  { name: "Mahulee Lahiri", value: "9674623159", type: "phone" },
  { name: "Santi Alu", value: "7001478230", type: "phone" },
  {
    name: "Pragya Official",
    value: "pragyatheofficialquizclubuem@gmail.com",
    type: "email",
  },
];

// ── Social Links ───────────────────────────────────────────────────────────────

export const footerSocials: FooterSocial[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/pragyauemk",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/pragyauemk",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/pragya-uemk",
    icon: "linkedin",
  },
];

// ── Section Quick-Links ────────────────────────────────────────────────────────

export const footerSectionLinks: FooterSectionLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Queries?", href: "/contact" },
];

// ── Organized By ───────────────────────────────────────────────────────────────

export interface OrganizedByItem {
  name: string;
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
}

export const organizedBy: OrganizedByItem[] = [
  {
    name: "University of Engineering and Management, Kolkata",
    logoSrc: "/images/uem.avif",
    logoAlt: "University of Engineering & Management",
    logoWidth: 106,
    logoHeight: 77,
  },
  {
    name: "Institute of Engineering and Management, Kolkata",
    logoSrc: "/images/iem.avif",
    logoAlt: "Institute of Engineering & Management",
    logoWidth: 109,
    logoHeight: 79,
  },
];

// ── Jigisha Brand Image ───────────────────────────────────────────────────────

export const jigishaBrand = {
  src: "/images/jigisha.avif",
  alt: "Jigisha — Annual Quiz Festival",
  width: 758,
  height: 212,
};

// ── About / Tagline ────────────────────────────────────────────────────────────

export const footerTagline =
  "The Annual Quiz Festival of University of Engineering & Management, Kolkata. It is hosted by PRAGYA — The Official Quiz Club of UEM Kolkata.";

// ── Contributors (shown inside the TEAM PRAGYA modal) ──────────────────────────

export const footerContributors: FooterContributor[] = [
  { name: "Barshan Banerjee", role: "Lead Developer & Project Architecture" },
  { name: "Supriyo Mondal", role: "Frontend Development & Component Design" },
  { name: "Ritam Das Gupta", role: "Frontend Development & Component Design" },
  { name: "Anadir Paul", role: "Frontend Development & Asset Integration" },
  { name: "Mahulee Lahiri", role: "UI/UX Design & Visual Identity" },
];
