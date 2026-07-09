"use client";

import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ShareButton({ title, text, url }: { title: string; text: string; url: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Share failed", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
      } catch {
        toast.error("Failed to copy link");
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      title="Share Event"
      aria-label="Share Event"
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-[#513081] shadow-[0_4px_15px_rgba(81,48,129,0.1)] hover:shadow-[0_6px_20px_rgba(81,48,129,0.2)] hover:scale-110 hover:-translate-y-0.5 transition-all"
    >
      <Share2 className="w-5 h-5" />
    </button>
  );
}
