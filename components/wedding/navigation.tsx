"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#story", label: "Our Story" },
  { href: "#entourage", label: "Entourage" },
  { href: "#details", label: "Details" },
  { href: "#timeline", label: "Timeline" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rsvp", label: "RSVP" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          className={cn(
            "text-2xl font-semibold tracking-wide transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}
        >
          S & M
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] transition-colors hover:text-accent",
                  isScrolled ? "text-foreground" : "text-white"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "md:hidden p-2 transition-colors",
            isScrolled ? "text-foreground" : "text-white"
          )}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 border-b border-border" : "max-h-0"
        )}
      >
        <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] text-foreground hover:text-accent transition-colors py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
