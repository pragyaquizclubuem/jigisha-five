"use client";

import PageWrapper from "@/components/wrappers/PageWrapper";
import EventCard from "@/components/events/card/EventCard";
import { eventData } from "@/constants/eventData";
import { motion, Variants } from "framer-motion";

export default function EventPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
  };

  return (
    <PageWrapper>
      <div className="flex-1 py-10 md:py-16 px-4 sm:px-6 lg:px-8 w-full relative z-10 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto mb-16 text-center"
        >
          <h1 className="font-roboto-condensed text-6xl sm:text-7xl md:text-[100px] font-black uppercase tracking-tight mb-6">
            <span className="text-[#252525] drop-shadow-[4px_4px_0_rgba(217,0,255,0.4)] mr-4 tracking-wider">OUR</span> 
            <span className="text-[#d900ff] drop-shadow-[4px_4px_0_#252525] tracking-wider">EVENTS</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-body max-w-2xl mx-auto text-[#252525] font-bold leading-relaxed">
            Explore the flagship quizzes and thrilling events. Team up, step up, and conquer the ultimate arena!
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[1200px] w-full mx-auto flex flex-col gap-10"
        >
          {eventData.map((event) => (
            <motion.div key={event.id} variants={itemVariants} className="flex w-full">
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageWrapper>
  );
}
