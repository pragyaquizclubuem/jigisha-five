"use client";

import { useEffect, useState } from "react";

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
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    completed: false,
  };
};

const css = `
  @keyframes pulseOuter {
    0%, 100% { box-shadow: 0 0 0 0 rgba(168,85,247,0.4), 0 0 30px rgba(123,47,190,0.3); }
    50%       { box-shadow: 0 0 0 8px rgba(168,85,247,0), 0 0 50px rgba(123,47,190,0.5); }
  }
  @keyframes colonBlink {
    0%, 100% { opacity: 1;   transform: scale(1);    }
    50%      { opacity: 0.4; transform: scale(0.9); }
  }
  @keyframes slideInTop {
    0%   { transform: translateY(-70%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideOutBottom {
    0%   { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(70%); opacity: 0; }
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 200%;  }
  }
  @keyframes tileGlow {
    0%, 100% { box-shadow: inset 0 2px 8px rgba(0,0,0,0.4), 0 0 0  0   rgba(255,184,0,0);    }
    50%      { box-shadow: inset 0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,184,0,0.15); }
  }
  @keyframes labelPulse {
    0%, 100% { letter-spacing: 0.5px; }
    50%      { letter-spacing: 1.5px; }
  }
  @keyframes celebrate {
    0%   { transform: scale(1);            }
    25%  { transform: scale(1.08) rotate(-1deg);   }
    50%  { transform: scale(1.05) rotate(1deg);    }
    75%  { transform: scale(1.08) rotate(-0.5deg); }
    100% { transform: scale(1);            }
  }
  @keyframes textReveal {
    0%   { opacity: 0; transform: translateY(30px) scale(0.8);  }
    60%  { opacity: 1; transform: translateY(-5px) scale(1.05); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }
  @keyframes bangRing {
    0%   { transform: scale(0.3); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes outerPulseEnd {
    0%, 100% { box-shadow: 0 0 0  0  rgba(255,184,0,0.5); }
    50%      { box-shadow: 0 0 0 12px rgba(255,184,0,0);  }
  }
  @keyframes subtleBreathe {
    0%, 100% { transform: scale(1);     }
    50%      { transform: scale(1.005); }
  }

  .jg-outer {
    background: #7B2FBE;
    border-radius: 24px;
    padding: 28px 32px;
    display: inline-flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    animation: subtleBreathe 4s ease-in-out infinite;
    max-width: 100%;
  }
  .jg-shimmer-bar {
    position: absolute;
    top: 0; left: -100%;
    width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    animation: shimmer 3.5s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }
  .jg-tile {
    background: #5A1A99;
    border-radius: 18px;
    width: 148px;
    height: 132px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    position: relative;
    overflow: hidden;
    animation: tileGlow 3s ease-in-out infinite;
    transition: transform 0.15s ease;
  }
  .jg-tile:hover { transform: translateY(-3px); }
  .jg-tile-shimmer {
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
    animation: shimmer 4s ease-in-out infinite;
    pointer-events: none;
  }
  .jg-num-wrap {
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .jg-digit-wrap {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .jg-num {
    font-family: "Arial Black", Arial, sans-serif;
    font-size: 68px;
    font-weight: 900;
    color: #fff;
    line-height: 1;
    letter-spacing: -2px;
    position: absolute;
    font-variant-numeric: tabular-nums;
  }
  .jg-slide-in { animation: slideInTop 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
  .jg-slide-out { animation: slideOutBottom 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
  .jg-lbl {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: #FFB800;
    letter-spacing: 0.5px;
    animation: labelPulse 3s ease-in-out infinite;
    z-index: 2;
  }
  .jg-dots {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0 16px;
    justify-content: center;
    align-items: center;
    animation: colonBlink 1s ease-in-out infinite;
  }
  .jg-dot {
    width: 12px;
    height: 12px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }
  .jg-end {
    background: #7B2FBE;
    border-radius: 24px;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: relative;
    overflow: hidden;
    animation: outerPulseEnd 1.5s ease-in-out infinite, celebrate 2s ease-in-out 0.3s;
    text-align: center;
    max-width: 100%;
  }
  .jg-end-title {
    font-family: "Arial Black", Arial, sans-serif;
    font-size: 52px;
    font-weight: 900;
    color: #fff;
    letter-spacing: -1px;
    animation: textReveal 0.8s cubic-bezier(0,0,0.2,1.4) forwards;
  }
  .jg-end-sub {
    font-family: Arial, sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: #FFB800;
    letter-spacing: 2px;
    animation: textReveal 0.8s cubic-bezier(0,0,0.2,1.4) 0.2s both;
  }
  .jg-ring {
    position: absolute;
    border: 3px solid rgba(255,184,0,0.6);
    border-radius: 50%;
    width: 80px; height: 80px;
    top: 50%; left: 50%;
    margin: -40px 0 0 -40px;
    animation: bangRing 1.2s ease-out forwards;
  }
  .jg-divider {
    width: 80px; height: 2px;
    background: #FFB800;
    border-radius: 2px;
    animation: textReveal 0.8s ease 0.4s both;
  }

  @media (max-width: 1024px) {
    .jg-tile { width: 110px; height: 100px; border-radius: 14px; }
    .jg-num { font-size: 52px; letter-spacing: -2px; }
    .jg-num-wrap { height: 56px; }
    .jg-lbl { font-size: 14px; }
    .jg-dots { margin: 0 12px; gap: 10px; }
    .jg-dot { width: 10px; height: 10px; }
    .jg-end-title { font-size: 40px; }
    .jg-end-sub { font-size: 16px; }
  }

  @media (max-width: 768px) {
    .jg-outer { padding: 20px; border-radius: 20px; }
    .jg-tile { width: 72px; height: 72px; border-radius: 10px; gap: 2px; }
    .jg-num { font-size: 32px; letter-spacing: -1px; }
    .jg-num-wrap { height: 36px; }
    .jg-lbl { font-size: 10px; letter-spacing: 0; }
    .jg-dots { margin: 0 8px; gap: 6px; }
    .jg-dot { width: 6px; height: 6px; }
    .jg-end { padding: 30px 20px; }
    .jg-end-title { font-size: 28px; }
    .jg-end-sub { font-size: 14px; }
  }

  @media (max-width: 480px) {
    .jg-outer { padding: 12px; border-radius: 16px; }
    .jg-tile { width: 56px; height: 60px; border-radius: 8px; gap: 2px; }
    .jg-num { font-size: 24px; letter-spacing: -0.5px; }
    .jg-num-wrap { height: 28px; }
    .jg-lbl { font-size: 9px; }
    .jg-dots { margin: 0 4px; gap: 4px; }
    .jg-dot { width: 5px; height: 5px; }
    .jg-end-title { font-size: 22px; }
  }
`;

function FlipDigit({ value }: { value: string }) {
  const [prev, setPrev] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setPrev(value);
        setIsAnimating(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [value, prev]);

  return (
    <div className="jg-digit-wrap">
      <span className="jg-num" style={{ position: "relative", opacity: 0 }}>
        {value}
      </span>
      {isAnimating ? (
        <>
          <span key={`out-${prev}`} className="jg-num jg-slide-out">{prev}</span>
          <span key={`in-${value}`} className="jg-num jg-slide-in">{value}</span>
        </>
      ) : (
        <span className="jg-num">{value}</span>
      )}
    </div>
  );
}

function FlipNumber({ value }: { value: string }) {
  return (
    <div className="jg-num-wrap">
      {value.split("").map((digit, i) => (
        <FlipDigit key={i} value={digit} />
      ))}
    </div>
  );
}

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

function CompletedState() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px 16px" }}>
      <div className="jg-end">
        <div className="jg-ring" />
        <div className="jg-ring" style={{ animationDelay: "0.3s", borderColor: "rgba(168,85,247,0.5)" }} />
        <div className="jg-ring" style={{ animationDelay: "0.6s", borderColor: "rgba(255,255,255,0.3)" }} />
        <div className="jg-end-title">Jigisha is ON !</div>
        <div className="jg-divider" />
        <div className="jg-end-sub">JIGISHA 5.0 — LIVE NOW</div>
      </div>
    </div>
  );
}

export default function EventCountdown({ targetDate }: EventCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const values = [
    String(timeLeft.days).padStart(2, "0"),
    String(timeLeft.hours).padStart(2, "0"),
    String(timeLeft.minutes).padStart(2, "0"),
    String(timeLeft.seconds).padStart(2, "0"),
  ];

  if (!mounted) {
    return (
      <section aria-label="Event countdown loading" style={{ padding: "24px 16px", display: "flex", justifyContent: "center" }}>
        <div className="jg-outer" style={{ animation: "none", opacity: 0.6 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <div className="jg-tile" style={{ animation: "none" }} />
              {i < 3 && (
                <div className="jg-dots" style={{ animation: "none" }}>
                  <div className="jg-dot" />
                  <div className="jg-dot" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section
        aria-label="Countdown until JIGISHA 5.0 begins"
        style={{ padding: "16px", overflowX: "hidden" }}
      >
        {timeLeft.completed ? (
          <CompletedState />
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="jg-outer">
              <div className="jg-shimmer-bar" />
              <div
                role="timer"
                aria-live="polite"
                style={{ display: "inline-flex", alignItems: "center", position: "relative", zIndex: 2 }}
              >
                {UNITS.map((label, i) => (
                  <div key={label} style={{ display: "inline-flex", alignItems: "center" }}>
                    <div className="jg-tile" style={{ animationDelay: `${i * 0.4}s` }}>
                      <div className="jg-tile-shimmer" style={{ animationDelay: `${i * 0.8}s` }} />
                      <FlipNumber value={values[i]} />
                      <span className="jg-lbl" style={{ animationDelay: `${i * 0.3}s` }}>{label}</span>
                    </div>
                    {i < 3 && (
                      <div className="jg-dots" style={{ animationDelay: `${i * 0.5}s` }}>
                        <div className="jg-dot" />
                        <div className="jg-dot" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <span className="sr-only">
          {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes and {timeLeft.seconds} seconds remaining until JIGISHA 5.0 begins.
        </span>
      </section>
    </>
  );
}