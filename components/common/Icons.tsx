/**
 * Icons — all project icons live here.
 *
 * Rules:
 * - No external icon libraries (lucide-react, react-icons, heroicons, etc.)
 * - All icons are pure inline SVG
 * - aria-hidden on every SVG (screen readers use button labels, not icons)
 */

interface IconProps {
  className?: string;
}

/**
 * Hamburger
 * Two horizontal lines — represents the closed state of the mobile menu.
 * Usage: <Hamburger />
 */
export function Hamburger({ className = "" }: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="2"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="2"
        y1="16"
        x2="20"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * CloseIcon
 * X mark — represents the open state of the mobile menu.
 * Usage: <CloseIcon />
 */
export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="17"
        y1="5"
        x2="5"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="5"
        x2="17"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
