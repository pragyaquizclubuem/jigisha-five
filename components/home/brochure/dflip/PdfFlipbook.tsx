'use client';

import { useEffect, useRef, useId } from 'react';

declare global {
  interface Window {
    DFLIP?: { parseBooks?: () => void };
    jQuery?: (el: HTMLElement) => { flipBook?: (source: string, options: Record<string, unknown>) => unknown };
    [key: `option_${string}`]: Record<string, unknown>;
  }
}

export type PdfFlipbookProps = {
  /** PDF path from public, e.g. "/menu.pdf". Required for PDF mode. */
  pdfUrl: string;
  /** Optional: ordered image URLs instead of PDF, e.g. ["/images/menu/page-1.png", ...]. */
  imageUrls?: string[];
  /** Height of the flipbook area in px. */
  height?: number;
  /** Optional custom class for the wrapper. */
  className?: string;
  /** When true, load DearFlip scripts (call once when modal is open so init runs with visible layout). */
  loadScript?: boolean;
};

let scriptsLoaded = false;
let scriptsLoading = false;
const scriptCallbacks: (() => void)[] = [];

function ensureScriptsLoaded(onReady: () => void) {
  if (scriptsLoaded) {
    onReady();
    return;
  }
  scriptCallbacks.push(onReady);
  if (scriptsLoading) return;
  scriptsLoading = true;

  // Load CSS
  if (!document.querySelector('link[href="/dflip/css/dflip.min.css"]')) {
    const link1 = document.createElement('link');
    link1.href = '/dflip/css/dflip.min.css';
    link1.rel = 'stylesheet';
    document.head.appendChild(link1);
  }
  if (!document.querySelector('link[href="/dflip/css/themify-icons.min.css"]')) {
    const link2 = document.createElement('link');
    link2.href = '/dflip/css/themify-icons.min.css';
    link2.rel = 'stylesheet';
    document.head.appendChild(link2);
  }

  // Load scripts
  const loadScript = (src: string): Promise<void> =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });

  loadScript('/dflip/js/libs/jquery.min.js')
    .then(() => loadScript('/dflip/js/dflip.min.js'))
    .then(() => {
      scriptsLoaded = true;
      scriptCallbacks.forEach((cb) => cb());
      scriptCallbacks.length = 0;
    })
    .catch(console.error);
}

/**
 * Renders a DearFlip PDF/image flipbook.
 * Pass loadScript=true when visible (e.g. modal open) so init runs with correct layout.
 */
export default function PdfFlipbook({
  pdfUrl,
  imageUrls,
  height = 600,
  className = '',
  loadScript = false,
}: PdfFlipbookProps) {
  const bookRef = useRef<HTMLDivElement>(null);
  const instanceId = useId().replace(/:/g, '_');
  const flipbookRef = useRef<unknown>(null);

  // Initialize DearFlip when loadScript becomes true
  useEffect(() => {
    if (!loadScript || typeof window === 'undefined') return;

    const origin = window.location.origin;
    const source = imageUrls?.length
      ? imageUrls.map((u) => (u.startsWith('http') ? u : `${origin}${u}`))
      : pdfUrl.startsWith('http') ? pdfUrl : `${origin}${pdfUrl}`;

    const options = {
      source,
      webgl: true,
      height,
      backgroundColor: 'transparent',
      enableDownload: true,
      controlsPosition: 'bottom',
      soundEnable: true,
      soundFile: '/dflip/sound/turn2a.mp3',
    };

    // Set global option for the instance
    const optionKey = `option_${instanceId}` as keyof Window;
    (window as unknown as Record<string, unknown>)[optionKey] = options;

    // Set attributes on the element
    const el = bookRef.current;
    if (el) {
      const sourceStr = Array.isArray(source) ? source[0] : source;
      el.setAttribute('source', sourceStr);
      el.setAttribute('height', String(height));
      el.setAttribute('webgl', 'true');
      el.setAttribute('backgroundcolor', 'transparent');
    }

    // Use requestAnimationFrame to ensure DOM is ready, then init
    const raf = requestAnimationFrame(() => {
      ensureScriptsLoaded(() => {
        // Re-initialize using DFLIP.parseBooks or jQuery
        setTimeout(() => {
          if (window.DFLIP?.parseBooks) {
            window.DFLIP.parseBooks();
          }
        }, 100);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      // Cleanup: remove any DearFlip-generated elements inside our container
      if (el) {
        el.innerHTML = '';
        el.className = '_df_book';
      }
      // Clear the global option
      delete (window as unknown as Record<string, unknown>)[optionKey];
      flipbookRef.current = null;
    };
  }, [loadScript, pdfUrl, imageUrls, height, instanceId]);

  return (
    <div
      className={`w-full flex justify-center items-center [backdrop-filter:none] ${className}`}
      style={{ minHeight: height, isolation: 'isolate' }}
    >
      <div
        ref={bookRef}
        className="_df_book"
        id={instanceId}
        style={{ minHeight: height }}
      />
    </div>
  );
}
