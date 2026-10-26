"use client"

import Image from "next/image"
import { ArrowRight, ChevronDown, Images } from "lucide-react"
import { COUPLE_NAMES, WEDDING_DISPLAY_DATE } from "@/lib/wedding-config"

export function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-175 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-couple.jpg"
          alt="John Mark and Chezza"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <p className="text-sm md:text-base tracking-[0.3em] uppercase font-(family-name:--font-montserrat) mb-4 animate-fade-in">
          Our Wedding Day
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 animate-fade-in animation-delay-200 font-(family-name:--font-great-vibes)">
          {COUPLE_NAMES.groom} <span className="text-accent">&</span> {COUPLE_NAMES.bride}
        </h1>
        <div className="w-24 h-px bg-white/60 mx-auto mb-6 animate-fade-in animation-delay-400" />
        <p className="text-sm md:text-base tracking-[0.15em] font-(family-name:--font-montserrat) font-light animate-fade-in animation-delay-600">
          {WEDDING_DISPLAY_DATE}
        </p>
        <p className="mt-5 font-(family-name:--font-cormorant) text-xl italic text-white/90 md:text-2xl animate-fade-in animation-delay-800">
          Thank you for celebrating with us.
        </p>
        <a
          href="#gallery"
          className="group relative mx-auto mt-8 inline-flex min-h-12 min-w-56 items-center justify-center gap-3 overflow-hidden rounded-full border border-white/65 bg-white/20 px-7 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md transition-all duration-300 hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/20 active:scale-[0.98] animate-fade-in animation-delay-1000"
        >
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
          <Images size={15} strokeWidth={1.7} className="relative" aria-hidden="true" />
          <span className="relative">Relive Our Day</span>
          <ArrowRight size={15} strokeWidth={1.6} className="relative transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#story"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </a>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
