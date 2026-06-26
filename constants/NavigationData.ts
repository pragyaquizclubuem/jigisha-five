export interface NavItem {
  label: string;
  href: string;
}

/**
 * Single source of truth for all navigation links.
 * The Navbar component MUST NOT hardcode any of these values.
 */
export const navigationData: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/#homeAbout",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Family",
    href: "/family",
  },
  {
    label: "Partners",
    href: "/partners",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
