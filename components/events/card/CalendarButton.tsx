"use client";

import { CalendarPlus } from "lucide-react";
import { EventDetail } from "@/constants/eventData";

export default function CalendarButton({ event }: { event: EventDetail }) {
  const generateICS = () => {
    // Format date properly. Simplified assumption: date is parseable by JS Date or we extract.
    // Example: "September 14, 2026" and "10:00 AM - 12:30 PM"
    // In a real prod environment we'd use moment/date-fns, but we'll do simple parsing here.
    
    // For ICS we need YYYYMMDDTHHMMSSZ format. 
    // This is a naive implementation for the given strings.
    const dateObj = new Date(event.date);
    const startStr = event.timeRange.split("-")[0].trim(); // "10:00 AM"
    
    const [time, modifier] = startStr.split(" ");
    let [hours, minutes] = time.split(":");
    let hoursNum = parseInt(hours, 10);
    
    if (hoursNum === 12) {
      hoursNum = modifier.toUpperCase() === "AM" ? 0 : 12;
    } else if (modifier.toUpperCase() === "PM") {
      hoursNum += 12;
    }
    
    dateObj.setHours(hoursNum);
    dateObj.setMinutes(parseInt(minutes, 10));
    
    const endDateObj = new Date(dateObj.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours approx if not parsing end time
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "");
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Jigisha 5.0//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatDate(dateObj)}`,
      `DTEND:${formatDate(endDateObj)}`,
      `SUMMARY:${event.title} - Jigisha 5.0`,
      `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${event.mode}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={generateICS}
      title="Add to Calendar"
      className="inline-flex items-center gap-1.5 px-6 py-3 text-[12px] sm:text-[13px] font-black uppercase tracking-widest text-[#513081] bg-white rounded-full shadow-[0_4px_15px_rgba(81,48,129,0.05)] hover:shadow-[0_6px_20px_rgba(81,48,129,0.1)] hover:-translate-y-0.5 transition-all"
    >
      <CalendarPlus className="w-4 h-4" />
      Calendar
    </button>
  );
}
