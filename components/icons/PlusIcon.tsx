import React from "react";

interface PlusIconProps {
  className?: string;
}

/**
 * A plus (+) icon that can be rotated 45° via CSS to become a close (×) icon.
 * Uses two rounded strokes forming a cross.
 */
export default function PlusIcon({ className = "" }: PlusIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 5v14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
