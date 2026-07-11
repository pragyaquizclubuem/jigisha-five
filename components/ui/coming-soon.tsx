"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Hammer, Wrench, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComingSoonProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: "hammer" | "sparkles" | "rocket" | "wrench";
}

export function ComingSoon({
  title = "Coming Soon",
  description = "We are currently building this page. Stay tuned for updates!",
  className,
  icon = "sparkles",
}: ComingSoonProps) {
  const IconComponent = {
    hammer: Hammer,
    sparkles: Sparkles,
    rocket: Rocket,
    wrench: Wrench,
  }[icon];

  return (
    <div
      className={cn(
        "relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden p-8 text-center",
        className
      )}
    >
      {/* Neo-brutalist Card Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative z-10 flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border-4 border-black bg-[#FFB900] px-8 py-12 shadow-[8px_8px_0_0_#000] sm:px-12 sm:py-16"
      >
        {/* Floating Icon Badge */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
            rotate: [-2, 2, -2],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-black bg-[#D7ABFF] shadow-[4px_4px_0_0_#000]"
        >
          <IconComponent
            className="h-12 w-12 text-black"
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Text Content */}
        <div className="space-y-4">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="font-roboto-condensed text-4xl font-black uppercase tracking-widest text-black sm:text-5xl"
            style={{ textShadow: "2px 2px 0px white" }}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-lg font-bold text-black/80 sm:text-xl"
          >
            {description}
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-4 -top-4 text-4xl">✨</div>
        <div className="absolute -bottom-4 -right-4 text-4xl">🚀</div>
        
        {/* Progress bar styled in neo-brutalism */}
        <div className="mt-4 h-4 w-full max-w-[200px] overflow-hidden rounded-full border-2 border-black bg-white">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
            className="h-full w-1/2 rounded-full border-r-2 border-black bg-[#513081]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default ComingSoon;
