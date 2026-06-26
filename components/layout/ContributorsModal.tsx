"use client";

import { useCallback, useEffect, useRef } from "react";
import { footerContributors } from "@/constants/FooterData";

interface ContributorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContributorsModal — accessible overlay showing TEAM PRAGYA members.
 *
 * - Locks body scroll while open.
 * - Closes on Escape key or backdrop click.
 * - Traps focus inside the dialog.
 * - Uses CSS transitions (no JS animation libraries).
 */
export default function ContributorsModal({
  isOpen,
  onClose,
}: ContributorsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  /* ── Lock scroll ───────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── Escape key ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ── Focus trap ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", trap);
    closeBtnRef.current?.focus();
    return () => document.removeEventListener("keydown", trap);
  }, [isOpen]);

  /* ── Backdrop click ────────────────────────────────────────────────────── */
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      id="contributors-modal-backdrop"
      role="presentation"
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/60 backdrop-blur-sm
        contributors-modal-backdrop
      "
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contributors-modal-title"
        className="
          contributors-modal-panel
          relative w-[92vw] max-w-lg
          rounded-2xl border border-white/10
          bg-[#1E0D36] p-6 sm:p-8
          shadow-2xl
        "
      >
        {/* ── Close button ─────────────────────────────────────────────────── */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close contributors modal"
          className="
            absolute right-4 top-4
            flex h-8 w-8 items-center justify-center
            rounded-full text-white/60
            transition-colors hover:bg-white/10 hover:text-white
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#FFB900] focus-visible:ring-offset-2
            focus-visible:ring-offset-[#1E0D36]
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── Title ────────────────────────────────────────────────────────── */}
        <h2
          id="contributors-modal-title"
          className="
            mb-6 text-center
            font-roboto-condensed text-xl font-bold
            uppercase tracking-wider text-[#FFB900]
            sm:text-2xl
          "
        >
          Team Pragya
        </h2>

        {/* ── Contributors list ────────────────────────────────────────────── */}
        <ul className="space-y-3" role="list">
          {footerContributors.map((contributor) => (
            <li
              key={contributor.name}
              className="
                rounded-xl border border-white/5
                bg-white/[0.04] px-4 py-3
                transition-colors hover:bg-white/[0.08]
              "
            >
              <p className="font-roboto-condensed text-sm font-bold tracking-wide text-white sm:text-base">
                {contributor.name}
              </p>
              <p className="mt-0.5 text-xs text-white/50 sm:text-sm">
                {contributor.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
