import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// ── CameraIcon ───────────────────────────────────────────────────────────────
export function CameraIcon({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Outer camera body */}
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      {/* Lens outer */}
      <circle cx="12" cy="13" r="4" />
      {/* Lens flash dot */}
      <circle cx="12" cy="13" r="1" fill="currentColor" />
      {/* Flash box */}
      <line x1="19" y1="9" x2="19.01" y2="9" strokeWidth="3" />
    </svg>
  );
}

// ── PhotoCloudIcon ───────────────────────────────────────────────────────────
export function PhotoCloudIcon({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Cloud outline */}
      <path d="M17.5 19A5.5 5.5 0 0 0 18 8.02a9 9 0 0 0-17.5 2A6 6 0 0 0 5 22h12.5a4.5 4.5 0 0 0 0-9z" />
      {/* A small photo landscape representation inside */}
      <rect x="8" y="12" width="8" height="6" rx="1" strokeWidth="1.5" />
      <path d="M8 16l2-2 1.5 1.5M16 17l-3-3-1.5 1.5" strokeWidth="1.5" />
    </svg>
  );
}

// ── StarIcon ──────────────────────────────────────────────────────────────────
export function StarIcon({ className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* 4-pointed star / sparkle shape */}
      <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
    </svg>
  );
}
