"use client";

import { useEffect, useMemo, useState } from "react";

interface EventCountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const calculateTimeLeft = (targetDate: string): TimeLeft => {
  const difference =
    new Date(targetDate).getTime() - new Date().getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor((difference / 1000) % 60),
    completed: false,
  };
};

export default function EventCountdown({
  targetDate,
}: EventCountdownProps) {
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = useMemo(
    () => [
      {
        label: "Days",
        value: timeLeft.days,
      },
      {
        label: "Hours",
        value: timeLeft.hours,
      },
      {
        label: "Minutes",
        value: timeLeft.minutes,
      },
      {
        label: "Seconds",
        value: timeLeft.seconds,
      },
    ],
    [timeLeft]
  );

  if (!mounted) {
    return (
      <section
        aria-label="Event countdown loading"
        className="w-full py-10"
      >
        <div className="mx-auto flex max-w-6xl justify-center gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 w-28 animate-pulse rounded-3xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </section>
    );
  }

  if (timeLeft.completed) {
    return (
      <section
        aria-label="Event status"
        className="w-full py-16"
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-8 backdrop-blur-xl">
            <h2 className="text-3xl font-black tracking-wide text-white md:text-5xl">
              🚀 JIGISHA 5.0 IS LIVE
            </h2>

            <p className="mt-4 text-gray-300">
              The wait is over. Welcome to JIGISHA 5.0.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Countdown until JIGISHA 5.0 begins"
      className="relative w-full py-16"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_65%)]" />

      <div className="mx-auto max-w-7xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">
            Countdown To Innovation
          </p>

          <h2 className="text-3xl font-black text-white md:text-5xl">
            JIGISHA 5.0
          </h2>
        </div>

        {/* Countdown Grid */}
        <div
          role="timer"
          aria-live="polite"
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/40
                hover:bg-white/10
              "
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center">
                <span
                  aria-label={`${item.value} ${item.label} remaining`}
                  className="
                    text-4xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  {String(item.value).padStart(2, "0")}
                </span>

                <span
                  className="
                    mt-3
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-cyan-300
                    sm:text-sm
                  "
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Screen Reader Content */}
        <span className="sr-only">
          {timeLeft.days} days, {timeLeft.hours} hours,
          {timeLeft.minutes} minutes and {timeLeft.seconds}
          seconds remaining until JIGISHA 5.0 begins.
        </span>
      </div>
    </section>
  );
}