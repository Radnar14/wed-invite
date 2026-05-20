"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
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
  { href: "/#rsvp", label: "RSVP" },
  { href: "/#faq", label: "FAQ" },
  { href: "/seat-finder", label: "Find Seat" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  
  // If we're not on the main page, we might want the nav to always have a solid background
  // Or at least have the text be dark so it's visible.
  const isAltPage = pathname !== "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navBgClass = isAltPage || isScrolled
    ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
    : "bg-transparent py-6"
    
  const textClass = isAltPage || isScrolled ? "text-foreground" : "text-white"

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        navBgClass
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
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
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
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

        {/* Mobile Menu Button */}
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
          isMobileMenuOpen ? "max-h-150 border-b border-border" : "max-h-0"
        )}
      >
        <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
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
    </header>
  )
}
