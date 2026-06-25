export default function CompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="rotate(45 12 12)">
        {/* Top needle pointing Up (becomes Up-Right when rotated 45deg) */}
        <path d="M12 4L6.5 11.5L12 10.2L17.5 11.5Z" fill="currentColor" />
        {/* Bottom needle pointing Down (becomes Down-Left when rotated 45deg) */}
        <path d="M12 20L6.5 12.5L12 13.8L17.5 12.5Z" fill="currentColor" />
      </g>
    </svg>
  );
}
