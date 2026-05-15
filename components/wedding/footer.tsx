"use client"

import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-4">Sarah & Michael</h2>
        <p className="text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] mb-8 opacity-80">
          December 28, 2026
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-sm font-[family-name:var(--font-montserrat)]">
            Forever & Always
          </span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <div className="w-16 h-px bg-primary-foreground/30 mx-auto mb-6" />
        <p className="text-xs opacity-60 font-[family-name:var(--font-montserrat)]">
          Made with love for our special day
        </p>
      </div>
    </footer>
  )
}
