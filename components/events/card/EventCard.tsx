"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Download, Users, MapPin, Phone, UserCircle, Share2, ChevronDown } from "lucide-react";
import { EventDetail } from "@/constants/eventData";

export default function EventCard({ event }: { event: EventDetail }) {
  const [descExpanded, setDescExpanded] = useState(false);

  const eventUrl = typeof window !== "undefined"
    ? `${window.location.origin}/events/${event.id}`
    : "";

  const handleShare = async () => {
    try {
      const shareData: ShareData = {
        title: event.title,
        text: `Check out this event: ${event.title}\n${event.description}\n\nRegister here: ${event.registerUrl || eventUrl}`,
        url: eventUrl,
      };

      if (event.bannerImg) {
        try {
          const response = await fetch(event.bannerImg);
          const blob = await response.blob();
          const file = new File([blob], `${event.title.replace(/\\s+/g, "_")}_Poster.jpg`, { type: blob.type });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            shareData.files = [file];
          }
        } catch (e) {
          console.error("Failed to fetch image for sharing", e);
        }
      }

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text!);
        alert("Event details copied to clipboard!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
      }
    }
  };

  const handleDownloadPoster = async () => {
    if (!event.bannerImg) return;
    try {
      const response = await fetch(event.bannerImg);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${event.title.replace(/\\s+/g, "_")}_Poster`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      window.open(event.bannerImg, '_blank');
    }
  };

  const idRule = event.rules?.find(r => r.toLowerCase().includes("id")) || "Participants must bring a valid ID card on the day of the event.";

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white rounded-3xl border-4 border-[#252525] shadow-[8px_8px_0_0_#252525] hover:shadow-[12px_12px_0_0_#252525] hover:-translate-y-1 overflow-hidden group transition-all duration-300 relative">
      
      {/* ── Left Area: Poster ── */}
      <div className="w-full lg:w-[320px] xl:w-[380px] shrink-0 relative aspect-[4/3] lg:aspect-[3/4] lg:min-h-full bg-gray-50 border-b-4 lg:border-b-0 lg:border-r-4 border-[#252525] overflow-hidden">
        {event.phoneImg && (
          <div className="absolute inset-0 lg:hidden overflow-hidden">
            <Image
              src={event.phoneImg}
              alt={`${event.title} poster mobile`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}
        {event.bannerImg && (
          <div className={`absolute inset-0 overflow-hidden ${event.phoneImg ? 'hidden lg:block' : ''}`}>
            <Image
              src={event.bannerImg}
              alt={`${event.title} poster desktop`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}
        {!event.phoneImg && !event.bannerImg && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-purple-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
        )}

        {/* Floating Share Button */}
        <button
          onClick={handleShare}
          title="Share Event"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#ffd166] border-2 border-[#252525] flex items-center justify-center text-[#252525] hover:bg-[#ffbe0b] hover:scale-110 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#252525] transition-all shadow-[2px_2px_0_0_#252525] z-20 active:scale-95"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* ── Content Area ── */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7 z-20 relative">
        
        {/* Title */}
        <h2 className="font-roboto-condensed text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-[#513081] mb-3 leading-tight tracking-wide group-hover:text-[#3d2462] transition-colors duration-300">
          {event.title}
        </h2>

        {/* Description */}
        <div className="mb-4 relative">
          <p className={`text-[14px] text-[#4b5563] leading-relaxed font-bold ${descExpanded ? '' : 'line-clamp-1'} transition-all duration-300`}>
            {event.description}
          </p>
          {event.description.length > 80 && (
            <button
              onClick={() => setDescExpanded(!descExpanded)}
              className="text-[11px] uppercase font-black tracking-widest text-[#513081] flex items-center gap-1 mt-1 hover:text-[#3d2462] transition-colors active:scale-95"
            >
              {descExpanded ? 'READ LESS' : 'READ MORE'} 
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${descExpanded ? 'rotate-180' : ''}`} />
            </button>
          )}
        </div>

        {/* Important Note */}
        <div className="mb-5 border-l-4 border-red-500 pl-3 py-1.5 bg-red-50 text-red-700 text-[12px] font-bold rounded-r-md">
          <span className="uppercase font-black text-red-800">Note: </span>
          {idRule}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {event.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-[#513081] text-white border-2 border-[#252525] rounded-full px-3 py-1 text-[11px] font-black tracking-wide shadow-[2px_2px_0_0_#252525] cursor-default hover:scale-105 hover:-translate-y-0.5 transition-transform"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 2x2 Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-3 sm:gap-x-4 mb-6 text-[11px] sm:text-[13px] font-bold text-[#4b5563]">
          <div className="flex items-center gap-1.5 sm:gap-2 group/item">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ef476f] shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform" />
            <span className="truncate">{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 group/item">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#06d6a0] shrink-0 group-hover/item:scale-125 group-hover/item:-rotate-12 transition-transform" />
            <span className="truncate">{event.timeRange}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 group/item">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#118ab2] shrink-0 group-hover/item:scale-125 group-hover/item:rotate-12 transition-transform" />
            <span className="truncate">{event.teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 group/item">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd166] shrink-0 group-hover/item:scale-125 group-hover/item:-rotate-12 transition-transform" />
            <span className="truncate">{event.mode}</span>
          </div>
        </div>

        {/* Quiz Masters & Contacts (2 Columns) */}
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          {/* Quiz Masters Block */}
          {event.quizMasters && event.quizMasters.length > 0 && (
            <div className="flex-1 bg-[#ecfdf5] rounded-xl p-4 border border-[#a7f3d0] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2 text-[#252525]">
                <UserCircle className="w-4 h-4" />
                <h3 className="font-black uppercase tracking-wider text-[11px]">Quiz Masters</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.quizMasters.map((qmName, i) => (
                  <span key={i} className="bg-white text-[#252525] px-3 py-1 rounded-full text-[12px] font-bold border border-[#a7f3d0] shadow-sm hover:scale-105 transition-transform cursor-default">
                    {qmName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information Block */}
          {event.contacts.length > 0 && (
            <div className="flex-1 bg-[#eff6ff] rounded-xl p-4 border border-[#bfdbfe] hover:shadow-md transition-shadow">
              <h3 className="font-black uppercase tracking-wider text-[11px] text-[#252525] mb-2">Contact</h3>
              <div className="flex flex-col gap-1.5">
                {event.contacts.map((c, i) => (
                  <a key={i} href={`tel:${c.phone}`} className="flex items-center gap-2 text-[#252525] hover:text-[#513081] hover:translate-x-1 transition-all w-fit text-[13px]">
                    <Phone className="w-3.5 h-3.5" />
                    <span><span className="font-bold">{c.name}</span> : {c.phone.replace("+91", "")}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spacer to push actions to bottom */}
        <div className="flex-1" />

        {/* Bottom Actions Row */}
        <div className="mt-auto flex flex-col sm:flex-row items-center gap-3 w-full">
          {event.id === "jana ojana" ? (
            event.registerUrl && (
              <Link
                href={event.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#513081] hover:bg-[#3d2462] text-white font-black tracking-wide text-[14px] border-2 border-[#252525] shadow-[4px_4px_0_0_#252525] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#252525] active:translate-y-0 active:shadow-[2px_2px_0_0_#252525] transition-all"
              >
                <UserCircle className="w-4 h-4" />
                Register with Rallyo
              </Link>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-gray-200 text-gray-500 font-black tracking-wide text-[14px] border-2 border-[#252525] opacity-60 cursor-not-allowed select-none transition-all">
              <UserCircle className="w-4 h-4 text-gray-500" />
              Coming Soon.........
            </div>
          )}

          <div className="flex flex-1 sm:flex-none w-full sm:w-auto gap-3">
            {(event.bannerImg || event.phoneImg) && (
              event.id === "jana ojana" ? (
                <button
                  onClick={handleDownloadPoster}
                  title="Download Poster"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white hover:bg-gray-50 text-[#252525] font-black tracking-wide text-[14px] border-2 border-[#252525] shadow-[4px_4px_0_0_#252525] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#252525] active:translate-y-0 active:shadow-[2px_2px_0_0_#252525] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="sm:hidden lg:inline">Download Poster</span>
                </button>
              ) : (
                <button
                  disabled
                  title="Download Poster Coming Soon"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gray-200 text-gray-500 font-black tracking-wide text-[14px] border-2 border-[#252525] opacity-60 cursor-not-allowed select-none transition-all"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                  <span className="sm:hidden lg:inline">Download Poster</span>
                </button>
              )
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
