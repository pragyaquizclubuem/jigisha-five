"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons/Icons";
import ContributorCard from "./ContributorCard";
import { contributorData } from "@/constants/contributorData";

interface ContributorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContributorsModal({
  isOpen,
  onClose,
}: ContributorsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* Focus trap + Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Team Pragya — Contributors"
      className="fixed inset-0 z-200 flex items-center justify-center p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* ── Backdrop ──────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#07030C]/80 backdrop-blur-xl"
      />

      {/* ── Panel ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_32px_96px_rgba(0,0,0,0.7)] backdrop-blur-2xl">

        {/* Ambient glows inside panel */}
        <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#5C00AD]/20 blur-[70px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#FFB900]/8 blur-[50px]" />

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="relative flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-[#B07EFF]/70">
              Designed &amp; built by
            </p>
            <h2 className="font-roboto-condensed text-xl font-black uppercase tracking-widest text-white sm:text-2xl">
              Team Pragya
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close contributors modal"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/40 transition-all duration-200 hover:border-[#B07EFF]/40 hover:bg-[#5C00AD]/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B07EFF]"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* ── Cards — Grid Layout ──────────────────────── */}
        <div className="relative overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contributorData.map((contributor) => (
              <ContributorCard key={contributor.name} contributor={contributor} />
            ))}
          </div>
        </div>

        {/* ── Footer strip ────────────────────────────────────────────── */}
        <div className="relative shrink-0 border-t border-white/10 px-6 py-3 sm:px-8">
          <p className="text-center text-[0.6rem] text-white/25">
            © 2026 Jigisha 5.0 · All rights reserved
          </p>
        </div>

      </div>
    </div>
  );
}
