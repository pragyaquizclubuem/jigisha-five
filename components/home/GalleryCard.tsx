"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { type GalleryImage } from "@/constants/GalleryData";

interface GalleryCardProps {
  image: GalleryImage;
  priority?: boolean;
}

export default function GalleryCard({ image, priority = false }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [shadowOffset, setShadowOffset] = useState("6px 6px 0px 0px #2F0F56");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    // Check if the device supports hover
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top;  // y position within the element

    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates (-0.5 to 0.5)
    const xc = x / width - 0.5;
    const yc = y / height - 0.5;

    // Max rotation angles (degrees)
    const maxTilt = 6;
    const rotateX = -yc * maxTilt;
    const rotateY = xc * maxTilt;

    // Dynamic scale slightly up on hover
    setTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );

    // Shift the retro shadow in the opposite direction of the tilt for 3D realism
    const shadowX = 6 - xc * 4;
    const shadowY = 6 - yc * 4;
    setShadowOffset(`${shadowX}px ${shadowY}px 0px 0px #2F0F56`);
  };

  const handleMouseEnter = () => {
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smooth reset
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadowOffset("6px 6px 0px 0px #2F0F56");
  };

  // Speaker 2 is portrait, others are landscape
  const isPortrait = image.id === "speaker_2";


  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 rounded-[24px] border-2 border-[#2F0F56] bg-[#F5E4D8] overflow-hidden select-none transition-all duration-300 ease-out will-change-transform ${
        isPortrait
          ? "h-[280px] w-[200px] md:h-[350px] md:w-[260px]"
          : "h-[280px] w-[350px] md:h-[350px] md:w-[450px]"
      }`}
      style={{
        transform,
        boxShadow: shadowOffset,
        transition: isHovered ? "none" : "transform 0.4s ease-out, box-shadow 0.4s ease-out",
        cursor: "pointer",
      }}
      role="img"
      aria-label={image.alt}
    >
      <div className="relative w-full h-full p-2">
        <div className="relative w-full h-full overflow-hidden rounded-[18px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={
              isPortrait
                ? "(max-width: 768px) 200px, 260px"
                : "(max-width: 768px) 350px, 450px"
            }
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
