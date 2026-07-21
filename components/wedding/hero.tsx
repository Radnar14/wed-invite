"use client"

import Image from "next/image"
import { ChevronDown, Send } from "lucide-react"

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
          We&apos;re Getting Married
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 animate-fade-in animation-delay-200 font-(family-name:--font-great-vibes)">
          John Mark <span className="text-accent">&</span> Chezza
        </h1>
        <div className="w-24 h-px bg-white/60 mx-auto mb-6 animate-fade-in animation-delay-400" />
        <p className="text-lg md:text-xl tracking-[0.15em] font-(family-name:--font-montserrat) font-light animate-fade-in animation-delay-600">
          October 8, 2026
        </p>
        <a
          href="#rsvp"
          className="group relative mx-auto mt-24 flex h-10 w-60 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/55 bg-white/18 px-6 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white shadow-[0_12px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] md:hidden animate-fade-in animation-delay-800"
        >
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
          <Send size={12} strokeWidth={1.8} className="relative" aria-hidden="true" />
          <span className="relative ">RSVP NOW</span>
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
      `}</style>
    </section>
  )
}
