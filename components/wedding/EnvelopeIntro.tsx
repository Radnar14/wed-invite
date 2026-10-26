"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COUPLE_NAMES, WEDDING_DISPLAY_DATE } from "@/lib/wedding-config";

const INTRO_OPENED_EVENT = "wedding-intro-opened";

interface EnvelopeIntroProps {
  /** Called once the opening sequence has finished and the site should be revealed. */
  onComplete: () => void;
}

/**
 * Full-screen wedding memory intro shown before the homepage on fresh loads.
 */
export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const completedRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const markComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  const handleContinue = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.dispatchEvent(new CustomEvent(INTRO_OPENED_EVENT));

    timeoutRef.current = window.setTimeout(() => {
      markComplete();
    }, prefersReducedMotion ? 650 : 1350);
  };

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.25 : 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: prefersReducedMotion ? 0.25 : 0.7, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#fffaf9] px-6 py-10"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="region"
      aria-label="Wedding day memories introduction"
    >
      <Image
        src="/images/hero-couple.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-25"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-[#fffdfc]/95 via-[#fffaf9]/90 to-[#f5e7e9]/95" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-4 border border-[#c68c99]/35 sm:inset-6 md:inset-10" />

      <motion.div
        className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: isTransitioning ? 0 : 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : isTransitioning ? 0.7 : 0.8, ease: "easeOut" }}
      >
        <p className="mb-7 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.3em] text-[#946d77] sm:text-xs sm:tracking-[0.38em]">
          Welcome back to our wedding day
        </p>

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#c68c99]/35 bg-white/70 shadow-[0_8px_24px_rgba(120,75,85,0.08)] sm:h-20 sm:w-20">
          <Image
            src="/images/logo.svg"
            alt="John Mark and Chezza monogram"
            width={52}
            height={52}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            priority
          />
        </div>

        <h1 className="font-(family-name:--font-great-vibes) text-5xl text-[#5f454b] sm:text-6xl md:text-7xl">
          {COUPLE_NAMES.groom} <span className="text-[#c98296]">&amp;</span> {COUPLE_NAMES.bride}
        </h1>

        <div className="my-6 flex w-48 items-center gap-3 text-[#c68c99]/65" aria-hidden="true">
          <span className="h-px flex-1 bg-current" />
          <span className="h-1.5 w-1.5 rotate-45 border border-current" />
          <span className="h-px flex-1 bg-current" />
        </div>

        <p className="font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.3em] text-[#8d777a] sm:text-xs">
          {WEDDING_DISPLAY_DATE}
        </p>
        <p className="mt-6 font-(family-name:--font-cormorant) text-2xl italic text-[#514448] sm:text-3xl">
          Thank you for being part of our day.
        </p>

        <button
          type="button"
          onClick={handleContinue}
          disabled={isTransitioning}
          className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 border border-[#b77b8b]/50 bg-white/65 px-6 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.22em] text-[#76565f] shadow-[0_8px_24px_rgba(120,75,85,0.06)] transition-colors duration-300 hover:border-[#a96b7d] hover:bg-white/90 disabled:cursor-default sm:px-8 sm:text-xs"
        >
          <span>{isTransitioning ? "Returning to our day" : "Revisit our day"}</span>
          {!isTransitioning && <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />}
        </button>

        <div className="mt-6 h-px w-36 overflow-hidden bg-[#c68c99]/20" aria-hidden="true">
          {isTransitioning && (
            <motion.div
              className="h-full origin-left bg-[#b77b8b]/70"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: prefersReducedMotion ? 0.65 : 1.35, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
