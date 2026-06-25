import React from "react";

export function DoubleDShape({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 0C11.0457 0 20 8.95431 20 20C20 31.0457 11.0457 40 0 40Z"
        fill="currentColor"
      />
      <path
        d="M24 0C35.0457 0 44 8.95431 44 20C44 31.0457 35.0457 40 24 40Z"
        fill="currentColor"
      />
    </svg>
  );
}
