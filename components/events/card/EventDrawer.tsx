"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar, Clock, Users, MapPin, Phone } from "lucide-react";
import { EventDetail } from "@/constants/eventData";
import ShareButton from "./ShareButton";
import CalendarButton from "./CalendarButton";

interface EventDrawerProps {
  event: EventDetail;
  onClose: () => void;
}

export default function EventDrawer({ event, onClose }: EventDrawerProps) {

  const eventUrl = typeof window !== "undefined"
    ? `${window.location.origin}/events/${event.id}`
    : "";

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-[fadeIn_200ms_ease]"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed right-0 top-0 h-full z-50 w-full sm:w-[520px] lg:w-[600px] bg-[#FFEDE0] border-l-4 border-[#252525] shadow-[-12px_0_0_0_#252525] overflow-y-auto animate-[slideIn_280ms_cubic-bezier(0.22,1,0.36,1)]">

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-[#513081] border-b-4 border-[#252525] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map((tag, i) => (
                <span key={i} className="bg-[#D7ABFF] text-[#252525] border border-[#252525] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster */}
        {event.bannerImg && (
          <div className="relative w-full h-64 sm:h-72 border-b-4 border-[#252525]">
            <Image
              src={event.bannerImg}
              alt={`${event.title} Poster`}
              fill
              className="object-cover"
            />
            {/* Title overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#252525]/80 to-transparent p-5">
              <h2 className="font-roboto-condensed text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
                {event.title}
              </h2>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Info Pills Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 bg-white border-2 border-[#252525] px-3 py-2 rounded-lg shadow-[2px_2px_0_0_#252525] text-xs sm:text-sm">
              <Calendar className="w-4 h-4 text-[#513081] shrink-0" />
              <span className="font-medium text-[#252525]">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-[#252525] px-3 py-2 rounded-lg shadow-[2px_2px_0_0_#252525] text-xs sm:text-sm">
              <Clock className="w-4 h-4 text-[#513081] shrink-0" />
              <span className="font-medium text-[#252525]">{event.timeRange}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-[#252525] px-3 py-2 rounded-lg shadow-[2px_2px_0_0_#252525] text-xs sm:text-sm">
              <Users className="w-4 h-4 text-[#513081] shrink-0" />
              <span className="font-medium text-[#252525]">{event.teamSize}</span>
            </div>
            <div className="flex items-center gap-2 bg-white border-2 border-[#252525] px-3 py-2 rounded-lg shadow-[2px_2px_0_0_#252525] text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-[#513081] shrink-0" />
              <span className="font-medium text-[#252525]">{event.mode}</span>
            </div>
          </div>

          {/* Description */}
          <div className="font-body text-[#252525] text-sm leading-relaxed space-y-3">
            <p className="whitespace-pre-line">{event.description}</p>
            {event.rules.length > 0 && (
              <div className="bg-white/70 border-l-4 border-[#513081] p-3 rounded-r-lg">
                <ul className="list-disc pl-4 space-y-1 font-semibold text-xs sm:text-sm">
                  {event.rules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quiz Masters */}
          {event.quizMasters && event.quizMasters.length > 0 && (
            <div>
              <h3 className="font-roboto-condensed text-xl font-bold uppercase tracking-widest text-[#513081] mb-3 flex items-center gap-1.5">
                <Users className="w-5 h-5" />
                Quiz Masters
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.quizMasters.map((qmName, i) => (
                  <span key={i} className="bg-[#FFEDE0] text-[#513081] border-2 border-[#513081] px-3 py-1.5 rounded-full text-[13px] font-bold shadow-[2px_2px_0_0_#513081]">
                    {qmName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info */}
          {event.contacts.length > 0 && (
            <div className="bg-[#513081] text-[#FFEDE0] px-4 py-3 rounded-xl border-2 border-[#252525] shadow-[3px_3px_0_0_#252525]">
              <h4 className="font-bold uppercase tracking-widest text-[11px] mb-2">Contact Info</h4>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                {event.contacts.map((c, i) => (
                  <a key={i} href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs font-mono hover:text-[#D7ABFF] transition-colors">
                    <Phone className="w-3 h-3" />
                    {c.name}: {c.phone.replace("+91", "")}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2 border-t-2 border-[#252525]/20">
            <ShareButton title={event.title} text={event.description} url={eventUrl} />
            <CalendarButton event={event} />
            {event.bannerImg && (
              event.id === "jana ojana" ? (
                <a href={event.bannerImg} download className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#252525] bg-[#D7ABFF] rounded-full border-2 border-[#252525] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#252525] transition-all">
                  Download Poster
                </a>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-200 rounded-full border-2 border-[#252525] opacity-60 cursor-not-allowed select-none">
                  Download Poster
                </div>
              )
            )}
            {event.id === "jana ojana" ? (
              event.registerUrl && (
                <Link href={event.registerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FFEDE0] bg-[#513081] rounded-full border-2 border-[#252525] hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#252525] transition-all">
                  Register with Rallyo
                </Link>
              )
            ) : (
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-200 rounded-full border-2 border-[#252525] opacity-60 cursor-not-allowed select-none">
                Coming Soon.........
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
