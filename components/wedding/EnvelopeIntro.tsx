"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { COUPLE_NAMES, WEDDING_DISPLAY_DATE } from "@/lib/wedding-config"

const INTRO_OPENED_EVENT = "wedding-intro-opened"

interface EnvelopeIntroProps {
  /** Called once the opening sequence has finished and the site should be revealed. */
  onComplete: () => void
}

/**
 * Full-screen "envelope opening" intro. Shown on every fresh page load
 * before the homepage is revealed.
 */
export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [opened, setOpened] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const completedRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const markComplete = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    window.dispatchEvent(new CustomEvent(INTRO_OPENED_EVENT))

    const openingDuration = prefersReducedMotion ? 500 : 1900
    const revealHold = prefersReducedMotion ? 150 : 450

    const timeoutId = window.setTimeout(() => {
      markComplete()
    }, openingDuration + revealHold)

    timeoutsRef.current.push(timeoutId)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleOpen()
    }
  }

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
  }

  const flapVariants: Variants = {
    closed: { rotateX: 0, opacity: 1 },
    open: {
      rotateX: prefersReducedMotion ? -20 : -130,
      opacity: 0,
      transition: {
        rotateX: { duration: prefersReducedMotion ? 0.4 : 1.1, ease: [0.65, 0, 0.35, 1] },
        opacity: {
          duration: prefersReducedMotion ? 0.3 : 0.5,
          delay: prefersReducedMotion ? 0.1 : 0.6,
        },
      },
    },
  }

  const sealVariants: Variants = {
    idle: { scale: 1, opacity: 1, rotate: 0 },
    open: {
      scale: 0,
      opacity: 0,
      rotate: prefersReducedMotion ? 0 : 12,
      transition: { duration: prefersReducedMotion ? 0.25 : 0.5, ease: "easeInOut" },
    },
  }

  const cardVariants: Variants = {
    hidden: { y: "20%", opacity: 0 },
    open: {
      y: "-38%",
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.4 : 1.1,
        delay: prefersReducedMotion ? 0.1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-6 py-10 envelope-intro-bg"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="region"
      aria-label="Wedding invitation envelope"
    >
      <div className="mb-6 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-primary/60 md:text-sm">We are getting</p>
        <h1 className="mt-2 text-5xl font-(family-name:--font-cormorant) uppercase tracking-[0.18em] text-primary sm:text-6xl">
          Married
        </h1>
      </div>
      <motion.div
        className="relative w-[88vw] max-w-110 aspect-[4/3.1] envelope-perspective cursor-pointer"
        animate={!opened && !prefersReducedMotion ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          !opened && !prefersReducedMotion
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
        onClick={handleOpen}
        role="button"
        tabIndex={opened ? -1 : 0}
        onKeyDown={handleKeyDown}
        aria-label="Open your wedding invitation"
      >
        {/* Envelope back / body */}
        <div className="absolute inset-0 rounded-[28px] shadow-[0_35px_70px_-25px_rgba(120,90,70,0.35)] overflow-hidden envelope-body">
          <div className="absolute inset-0 opacity-70 envelope-body-pattern" />
          <div className="absolute inset-1.75 rounded-[22px] border border-[#C68C99]/70" />
        </div>

        {/* Invitation card sliding up from inside */}
        <motion.div
          className="absolute left-1/2 bottom-[16%] h-[76%] w-[80%] -translate-x-1/2 rounded-md bg-[#FFFDFA] envelope-card"
          variants={cardVariants}
          initial="hidden"
          animate={opened ? "open" : "hidden"}
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="font-(family-name:--font-great-vibes) text-2xl text-primary sm:text-3xl">
              {COUPLE_NAMES.groom} <span className="text-[#F2B8C6]">&amp;</span> {COUPLE_NAMES.bride}
            </p>
            <span className="h-px w-10 bg-[#9CAF88]/60" />
            <p className="font-(family-name:--font-montserrat) text-[10px] uppercase tracking-[0.3em] text-primary/70 sm:text-xs">
              {WEDDING_DISPLAY_DATE}
            </p>
          </div>
        </motion.div>

        {/* Front pocket */}
        <div className="absolute bottom-0 left-0 right-0 h-[62%] rounded-b-[28px] overflow-hidden envelope-pocket">
          <div className="absolute inset-0 opacity-70 envelope-pocket-pattern" />
        </div>

        {/* Flap */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[58%] origin-top envelope-flap"
          variants={flapVariants}
          initial="closed"
          animate={opened ? "open" : "closed"}
        >
          <div className="absolute inset-x-0 top-0 h-full" />
        </motion.div>

        {/* Wax seal — visual element (entire envelope is now clickable) */}
        <motion.div
          className="absolute left-1/2 top-[58%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-20 sm:w-20 seal-button pointer-events-none"
          variants={sealVariants}
          initial="idle"
          animate={opened ? "open" : "idle"}
        >
          <Image
            src="/images/logo.svg"
            alt="Wedding monogram"
            width={40}
            height={40}
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Instruction label */}
      <motion.p
        className="mt-8 font-(family-name:--font-cormorant) text-sm italic uppercase tracking-[0.25em] text-primary/70 sm:text-base"
        animate={{ opacity: opened ? 0 : [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: opened ? 0 : Infinity, ease: "easeInOut" }}
      >
        Tap to Open
      </motion.p>
    </motion.div>
  )
}
