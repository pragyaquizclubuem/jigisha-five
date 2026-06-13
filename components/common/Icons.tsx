"use client";

import Image from "next/image";

interface IconProps {
  className?: string;
}

// ── Hamburger ────────────────────────────────────────────────────────────────
export function Hamburger({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      <line x1="2" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="2" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── CloseIcon ─────────────────────────────────────────────────────────────────
export function CloseIcon({ className = "" }: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
      xmlns="http://www.w3.org/2000/svg" className={className}
      aria-hidden="true" focusable="false">
      <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// ── Logo components ───────────────────────────────────────────────────────────
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function PragyaLogo({ className = "", width = 96, height = 91 }: LogoProps) {
  return (
    <Image
      src="/images/pragya-logo.svg"
      width={width}
      height={height}
      alt="Pragya — UEM Kolkata Quiz Club"
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function UEMLogo({ className = "", width = 106, height = 77 }: LogoProps) {
  return (
    <Image
      src="/images/uem-logo.svg"
      width={width}
      height={height}
      alt="University of Engineering & Management"
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function IEMLogo({ className = "", width = 109, height = 79 }: LogoProps) {
  return (
    <Image
      src="/images/iem-logo.svg"
      width={width}
      height={height}
      alt="Institute of Engineering & Management"
      className={`object-contain ${className}`}
      priority
    />
  );
}