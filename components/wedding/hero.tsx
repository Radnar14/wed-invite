"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
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
      `}</style>
    </section>
  )
}
