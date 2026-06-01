"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Heart, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const navLinks = [
  { id: "home", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "entourage", label: "Entourage" },
  { id: "details", label: "Details" },
  { id: "attire", label: "Attire" },
  { id: "timeline", label: "Timeline" },
  { id: "gallery", label: "Gallery" },
  { id: "faq", label: "FAQ" },
]

const rsvpLink = { id: "rsvp", label: "RSVP" }
const seatFinderLink = { href: "/seat-finder", label: "Find Seat" }

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  const pathname = usePathname()

  const isAltPage = pathname !== "/"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active hash based on scroll position
      if (pathname === "/") {
        const sections = navLinks.map(link => link.id)
        for (const section of sections.reverse()) {
          const el = document.getElementById(section)
          if (el && el.getBoundingClientRect().top <= 100) {
            setActiveHash(`#${section}`)
            break
          }
        }
      }
    }

    const handleHashChange = () => {
      setActiveHash(window.location.hash)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("hashchange", handleHashChange)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [pathname])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) {
        const offset = 80 // Offset for the fixed header
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = el.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
        
        window.history.pushState(null, "", `#${id}`)
        setActiveHash(`#${id}`)
        setIsMobileMenuOpen(false)
      }
    }
  }

  const getHref = (id: string) => {
    return pathname === "/" ? `#${id}` : `/#${id}`
  }

  const isActive = (id: string) => {
    if (pathname !== "/") return false
    return activeHash === `#${id}` || (id === "home" && activeHash === "")
  }

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
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          scroll={true}
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
              window.history.pushState(null, "", "/")
              setActiveHash("")
            }
          }}
          className={cn(
            "flex items-center justify-center transition-colors shrink-0",
            textClass
          )}
        >
          <Image
            src="/images/logo.svg"
            alt="John Mark and Chezza"
            width={80}
            height={80}
            // mobile size , rounded full, Tablet size, desktop size, large desktop size
            className="w-12 h-12 rounded-full md:w-12 md:h-12 lg:w-12 lg:h-12 xl:w-12 xl:h-12 object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center flex-1 justify-evenly ml-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={getHref(link.id)}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={cn(
                  "relative inline-block text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) transition-colors hover:text-accent",
                  "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[1px] after:bg-current after:transition-all after:duration-300",
                  isActive(link.id)
                    ? "after:w-full text-accent"
                    : "after:w-0 hover:after:w-full",
                  textClass
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={getHref(rsvpLink.id)}
              onClick={(e) => handleLinkClick(e, rsvpLink.id)}
              className={cn(
                "relative inline-block text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) transition-colors hover:text-accent",
                "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[1px] after:bg-current after:transition-all after:duration-300",
                isActive(rsvpLink.id)
                  ? "after:w-full text-accent"
                  : "after:w-0 hover:after:w-full",
                textClass
              )}
            >
              {rsvpLink.label}
            </Link>
          </li>
          <li>
            <Link
              href={seatFinderLink.href}
              className={cn(
                "relative inline-block text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) transition-colors hover:text-accent",
                "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[1px] after:bg-current after:transition-all after:duration-300",
                pathname === seatFinderLink.href
                  ? "after:w-full text-accent"
                  : "after:w-0 hover:after:w-full",
                textClass
              )}
            >
              {seatFinderLink.label}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-xl border border-transparent transition-all duration-300",
            "hover:bg-accent/10 hover:border-accent/30 hover:text-accent active:scale-95",
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
          "lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md transition-all duration-300 overflow-hidden",
          isMobileMenuOpen
            ? "max-h-[85vh] overflow-y-auto border-b border-border"
            : "max-h-0"
        )}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col">
          {/* Mobile Header Row: RSVP and Find Seat */}
          <div className="flex flex-col gap-3 pb-7 mb-6 border-b border-border/50">
            {/* RSVP — filled warm gradient */}
            <Link
              href={getHref(rsvpLink.id)}
              onClick={(e) => handleLinkClick(e, rsvpLink.id)}
              className="group relative flex items-center justify-center gap-2.5 py-4 overflow-hidden transition-all duration-300 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, lab(57% 51.78 -8.6), lab(44% 51.78 -8.6))",
                boxShadow: "0 4px 20px lab(51.93% 51.78 -8.6 / 0.30), inset 0 1px 0 oklch(1 0 0 / 0.10)",
              }}
            >
              {/* RSVP and Find Seat Button */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
                style={{
                  background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.08), transparent)",
                }}
              />
              {/* RSVP Button */}
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
              {/* Find Seat button */}
              <MapPin size={11} strokeWidth={1.5} className="text-primary/60 shrink-0" />
              <span className="font-(family-name:--font-montserrat) tracking-[0.3em] uppercase text-[9px] text-primary">
                {seatFinderLink.label}
              </span>
            </Link>
          </div>

          {/* Scroll only the Home and below */}
          <div className="max-h-[45vh] overflow-y-auto pr-2">
            <ul className="flex flex-col gap-4 pb-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={getHref(link.id)}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={cn(
                      "group block w-full rounded-xl px-4 py-3 text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) text-foreground transition-all duration-300 border border-transparent hover:bg-accent/10 hover:border-accent/30 hover:text-accent active:bg-accent/10 active:border-accent/30 active:text-accent active:scale-[0.98]",
                      isActive(link.id) && "bg-accent/10 border-accent/30 text-accent"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
