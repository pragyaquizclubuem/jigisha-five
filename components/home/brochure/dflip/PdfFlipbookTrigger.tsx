'use client';

import { useState, useCallback, useEffect } from 'react';
import PdfFlipbook, { type PdfFlipbookProps } from './PdfFlipbook';
import { CloseIcon } from '@/components/icons/Icons';

export type PdfFlipbookTriggerProps = PdfFlipbookProps & {
  /** Button label when no children provided. */
  triggerLabel?: string;
  /** Extra class for the trigger button. */
  triggerClassName?: string;
  /** Custom trigger element (e.g. a link or card). If not set, a button with triggerLabel is used. */
  children?: React.ReactNode;
};

/**
 * Renders a trigger (button or children). On click, opens a full-screen overlay
 * with a blurred transparent background and the PDF flipbook inside.
 */
export default function PdfFlipbookTrigger({
  pdfUrl,
  imageUrls,
  height = 600,
  triggerLabel = 'View PDF',
  triggerClassName = '',
  children,
}: PdfFlipbookTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(height);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // When modal opens, size flipbook to viewport so no scroll is needed
  useEffect(() => {
    if (!isOpen) return;
    const setHeight = () => setViewportHeight(Math.max(400, window.innerHeight - 80));
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, [isOpen]);

  return (
    <>
      {children ? (
        <div
          onClick={open}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && open()}
          className={`cursor-pointer ${triggerClassName}`}
        >
          {children}
        </div>
      ) : (
        <button
          type="button"
          onClick={open}
          className={`px-5 py-2.5 rounded-lg font-medium transition-colors bg-catering-primary-1 text-white hover:bg-catering-primary-2 focus:outline-none focus:ring-2 focus:ring-catering-primary-1 focus:ring-offset-2 focus:ring-offset-catering-secondary-1 ${triggerClassName}`}
        >
          {triggerLabel}
        </button>
      )}

      {/* Portal for full-screen overlay to escape parent stacking contexts */}
      {isOpen && (
        <Portal>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="PDF flipbook viewer"
            className="fixed inset-0 z-9999 flex flex-col animate-in fade-in duration-200"
          >
            {/* Blurred backdrop with high z-index */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={close}
              aria-hidden="true"
            />

            {/* Full-screen content area */}
            <div
              className="relative z-10 w-full h-full flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shrink-0 flex justify-end p-4 absolute top-0 right-0 z-50">
                <button
                  type="button"
                  onClick={close}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                  aria-label="Close"
                >
                  <CloseIcon className="w-8 h-8" />
                </button>
              </div>

              <div className="w-full h-full flex items-center justify-center p-4 lg:p-10">
                <PdfFlipbook pdfUrl={pdfUrl} imageUrls={imageUrls} height={viewportHeight} className="w-full h-full shadow-2xl" loadScript={true} />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}

// Simple Portal component to render children into document.body
function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return typeof document !== 'undefined'
    ? require('react-dom').createPortal(children, document.body)
    : null;
}
