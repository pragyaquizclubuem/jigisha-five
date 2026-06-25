export default function FlowerIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {Array.from({ length: 8 }).map((_, index) => {
        const rotation = index * 45;
        return (
          <ellipse
            key={rotation}
            cx="50"
            cy="26"
            rx="8.5"
            ry="21"
            transform={`rotate(${rotation} 50 50)`}
            fill="currentColor"
          />
        );
      })}
      <circle cx="50" cy="50" r="7.5" fill="currentColor" />
    </svg>
  );
}