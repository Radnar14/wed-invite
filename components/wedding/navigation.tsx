"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Heart, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#story", label: "Our Story" },
  { href: "/#entourage", label: "Entourage" },
  { href: "/#details", label: "Details" },
  { href: "/#attire", label: "Attire" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#faq", label: "FAQ" },
]

const rsvpLink = { href: "/#rsvp", label: "RSVP" }
const seatFinderLink = { href: "/seat-finder", label: "Find Seat" }

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const isAltPage = pathname !== "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navBgClass = isAltPage || isScrolled
    ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
    : "bg-transparent py-3"
    
  const textClass = isAltPage || isScrolled ? "text-foreground" : "text-white"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        navBgClass
      )}
    >
      <nav className="container mx-auto px-8 flex items-center justify-between">
        <Link
          href="/#home"
          className={cn(
            "flex items-center justify-center transition-colors",
            textClass
          )}
        >
          <Image
            src="/images/logo.svg"
            alt="John Mark and Chezza"
            width={80}
            height={80}
            className="w-12 h-12 rounded-full md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center flex-1 justify-evenly ml-8">
          {[...navLinks, rsvpLink, seatFinderLink].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) transition-colors hover:text-accent",
                  textClass
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "md:hidden p-2 transition-colors",
            textClass
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
          isMobileMenuOpen ? "max-h-screen border-b border-border" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col">
          {/* Mobile Header Row: RSVP and Find Seat */}
          <div className="flex flex-col gap-3 pb-7 mb-6 border-b border-border/50">
            {/* RSVP — filled warm gradient */}
            <Link
              href={rsvpLink.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="group relative flex items-center justify-center gap-2.5 py-4 overflow-hidden transition-all duration-300 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, lab(57% 51.78 -8.6), lab(44% 51.78 -8.6))",
                boxShadow: "0 4px 20px lab(51.93% 51.78 -8.6 / 0.30), inset 0 1px 0 oklch(1 0 0 / 0.10)",
              }}
            >
              {/* shimmer sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{
                  background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.08), transparent)",
                }}
              />
              <Heart size={11} strokeWidth={1.5} className="text-primary-foreground/70 shrink-0" />
              <span className="font-(family-name:--font-montserrat) tracking-[0.3em] uppercase text-[9px] text-primary-foreground">
                {rsvpLink.label}
              </span>
            </Link>

            {/* Find Seat — outlined glassmorphism */}
            <Link
              href={seatFinderLink.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-primary/5 active:scale-[0.98]"
              style={{
                border: "1px solid oklch(0.35 0.05 30 / 0.25)",
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.6)",
              }}
            >
              <MapPin size={11} strokeWidth={1.5} className="text-primary/60 shrink-0" />
              <span className="font-(family-name:--font-montserrat) tracking-[0.3em] uppercase text-[9px] text-primary">
                {seatFinderLink.label}
              </span>
            </Link>
          </div>
          
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) text-foreground hover:text-accent transition-colors py-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
