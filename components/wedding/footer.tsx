"use client"

import { Heart } from "lucide-react"

// Footer component with enhanced design and optional "Back to Top" button only in homepage
export function Footer({
  showBackToTop = true,
}: {
  showBackToTop?: boolean
}) {
  return (
    <footer className="relative py-20 md:py-32 bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary-foreground/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary-foreground opacity-5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Large Monogram Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-light opacity-5 pointer-events-none select-none whitespace-nowrap">
        J&C
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="relative mb-8">
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full border border-primary-foreground/20 animate-ping opacity-20" />

          {/* Heart Container */}
          <div className="w-12 h-12 border border-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Heart className="w-5 h-5 text-blushpink fill-blushpink animate-heartBeat drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
          John Mark <span className="text-accent">&</span> Chezza
        </h2>
        
        <p className="text-sm md:text-base tracking-[0.3em] uppercase font-(family-name:--font-montserrat) mb-12 text-primary-foreground/80">
          December 28, 2026
        </p>
        
        <div className="flex items-center justify-center w-full max-w-sm mx-auto mb-12">
          <div className="h-px bg-linear-to-r from-transparent via-primary-foreground/30 to-transparent flex-1" />
          <span className="text-xs tracking-widest uppercase font-(family-name:--font-montserrat) text-primary-foreground/60 px-4 whitespace-nowrap">
            Forever <span className="text-accent">&</span> Always
          </span>
          <div className="h-px bg-linear-to-r from-transparent via-primary-foreground/30 to-transparent flex-1" />
        </div>

        {/* Back to Top Button only in homepage */}
        {showBackToTop && (
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="group mb-10 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/5 px-6 py-3 
              text-xs md:text-sm tracking-[0.15em] uppercase font-(family-name:--font-montserrat) text-primary-foreground/80 shadow-[0_8px_30px_rgba(255,255,255,0.08)] 
              backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary-foreground/10 
              hover:shadow-[0_10px_35px_rgba(255,255,255,0.12)] active:scale-95 animate-floatSoft"
            >
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                ↑
              </span>

              Back to Top
            </button>
          )}

        <p className="text-xs md:text-sm text-primary-foreground/50 font-(family-name:--font-montserrat) max-w-md leading-relaxed">
          Made with love for our special day. <br className="md:hidden" />
          Thank you for being part of our story.
        </p>
      </div>
    </footer>
  )
}
