"use client";

import { useEffect, useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const confettiColors = ["#d99aaa", "#f1dce0", "#ffffff", "#d8c6aa", "#bd7f91"];

const confettiParticles = Array.from({ length: 56 }, (_, index) => ({
  left: `${((index * 37) % 94) + 3}%`,
  top: `${-8 + (index % 5) * 5}%`,
  xOffset: ((index * 29) % 88) - 44,
  rotation: (index * 47) % 180,
  delay: (index % 14) * 0.28 + Math.floor(index / 14) * 0.12,
  duration: 4.8 + (index % 5) * 0.18,
  width: index % 3 === 0 ? 4 : 3,
  height: index % 4 === 0 ? 14 : 10,
  color: confettiColors[index % confettiColors.length],
}));

const heartBubbles = Array.from({ length: 20 }, (_, index) => ({
  left: index % 2 === 0 ? `${3 + (index * 3) % 14}%` : `${83 + (index * 3) % 14}%`,
  top: `${8 + (index * 13) % 68}%`,
  delay: (index % 10) * 0.48,
  size: index % 3 === 0 ? 34 : 29,
}));

const sparklePositions = Array.from({ length: 20 }, (_, index) => ({
  left: `${8 + (index * 43) % 84}%`,
  top: `${9 + (index * 31) % 80}%`,
  delay: (index % 6) * 0.14,
  size: index % 3 === 0 ? 15 : 11,
}));

interface AfterIntroCelebrationProps {
  onComplete: () => void;
}

export function AfterIntroCelebration({ onComplete }: AfterIntroCelebrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const onCompleteRef = useRef(onComplete);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      onCompleteRef.current();
      return;
    }

    const timeoutId = window.setTimeout(() => onCompleteRef.current(), 10200);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  const visibleConfetti = isMobile ? confettiParticles.slice(0, 20) : confettiParticles;
  const visibleHearts = isMobile ? heartBubbles.slice(0, 10) : heartBubbles;
  const visibleSparkles = isMobile ? sparklePositions.slice(0, 9) : sparklePositions;

  return (
    <div className="pointer-events-none fixed inset-0 z-60 overflow-hidden" aria-hidden="true">
      {visibleConfetti.map((particle, index) => (
        <motion.span
          key={`confetti-${index}`}
          className="absolute block rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.width,
            height: particle.height,
            backgroundColor: particle.color,
          }}
          initial={{ opacity: 0, y: "-8vh", x: 0, rotate: particle.rotation }}
          animate={{
            opacity: [0, 0.85, 0.75, 0],
            y: ["-8vh", "28vh", "72vh", "112vh"],
            x: [0, particle.xOffset, particle.xOffset * 0.55, particle.xOffset * 0.35],
            rotate: [particle.rotation, particle.rotation + 85, particle.rotation + 170],
          }}
          transition={{ duration: particle.duration, delay: particle.delay, ease: "easeIn" }}
        />
      ))}

      {visibleHearts.map((bubble, index) => (
        <motion.div
          key={`heart-${index}`}
          className="absolute flex items-center justify-center rounded-full border border-white/80 bg-white/55 text-[#c98296] shadow-[0_2px_12px_rgba(180,120,140,0.12)]"
          style={{ left: bubble.left, top: bubble.top, width: bubble.size, height: bubble.size }}
          initial={{ opacity: 0, y: "-4vh", scale: 0.55 }}
          animate={{
            opacity: [0, 0.88, 0.75, 0],
            y: ["-4vh", "-8vh", "34vh", "82vh"],
            scale: [0.55, 1, 0.92, 1.35],
          }}
          transition={{ duration: 5.4, delay: bubble.delay, times: [0, 0.18, 0.74, 1], ease: "easeOut" }}
        >
          <Heart size={14} strokeWidth={1.5} fill="currentColor" />
        </motion.div>
      ))}

      {visibleSparkles.map((sparkle, index) => (
        <motion.span
          key={`sparkle-${index}`}
          className="absolute text-[#c9a978]"
          style={{ left: sparkle.left, top: sparkle.top }}
          initial={{ opacity: 0, scale: 0.45, rotate: -12 }}
          animate={{ opacity: [0, 0.72, 0.18, 0], scale: [0.45, 1, 0.7, 0.45], rotate: [-12, 12, 0, -12] }}
          transition={{ duration: 1.75, delay: sparkle.delay, ease: "easeInOut" }}
        >
          <Sparkles size={sparkle.size} strokeWidth={1.3} />
        </motion.span>
      ))}
    </div>
  );
}