"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

const SESSION_STORAGE_KEY = "introPlayed"

interface EnvelopeIntroProps {
  /** Called once the opening sequence has finished and the site should be revealed. */
  onComplete: () => void
}

/**
 * Full-screen "envelope opening" intro. Shown once per browser session
 * (gated by sessionStorage) before the homepage is revealed.
 */
export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const [shouldRender, setShouldRender] = useState(true)
  const [opened, setOpened] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const completedRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])

  useEffect(() => {
    let alreadyPlayed = false
    try {
      alreadyPlayed = window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "true"
    } catch {
      alreadyPlayed = false
    }

    if (alreadyPlayed) {
      setShouldRender(false)
      markComplete()
    }

    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const markComplete = () => {
    if (completedRef.current) return
    completedRef.current = true
    try {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true")
    } catch {
      // sessionStorage unavailable (private mode, disabled storage) — safe to ignore
    }
    onComplete()
  }

  const handleOpen = () => {
    if (opened) return
    setOpened(true)

    const openingDuration = prefersReducedMotion ? 500 : 1900
    const revealHold = prefersReducedMotion ? 150 : 450

    const timeoutId = window.setTimeout(() => {
      markComplete()
    }, openingDuration + revealHold)

    timeoutsRef.current.push(timeoutId)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleOpen()
    }
  }

  if (!shouldRender) return null

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6 py-10"
      style={{
        background: "radial-gradient(ellipse at center, #FDF8F3 0%, #F7EBE1 55%, #F1E1D2 100%)",
      }}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="region"
      aria-label="Wedding invitation envelope"
    >
      <motion.div
        className="relative w-[88vw] max-w-[440px] aspect-[4/3.1]"
        style={{ perspective: 1400 }}
        animate={!opened && !prefersReducedMotion ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          !opened && !prefersReducedMotion
            ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        {/* Envelope back / body */}
        <div
          className="absolute inset-0 rounded-[28px] shadow-[0_35px_70px_-25px_rgba(120,90,70,0.35)]"
          style={{ background: "linear-gradient(160deg, #FDF9F4 0%, #F8EFE6 45%, #F2E3D5 100%)" }}
        >
          <div className="absolute inset-[7px] rounded-[22px] border border-[#E7D7BE]/60" />
        </div>

        {/* Invitation card sliding up from inside */}
        <motion.div
          className="absolute left-1/2 bottom-[8%] h-[76%] w-[80%] -translate-x-1/2 rounded-md bg-[#FFFDFA]"
          style={{
            border: "1px solid rgba(243,217,214,0.6)",
            boxShadow: "0 18px 40px -18px rgba(120,90,70,0.4)",
          }}
          variants={cardVariants}
          initial="hidden"
          animate={opened ? "open" : "hidden"}
        >
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <p className="font-(family-name:--font-great-vibes) text-2xl text-primary sm:text-3xl">
              John Mark &amp; Chezza
            </p>
            <span className="h-px w-10 bg-[#9CAF88]/60" />
            <p className="font-(family-name:--font-montserrat) text-[10px] uppercase tracking-[0.3em] text-primary/70 sm:text-xs">
              October 8, 2026
            </p>
          </div>
        </motion.div>

        {/* Front pocket */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[62%] rounded-b-[28px]"
          style={{
            background: "linear-gradient(180deg, #F6EBE0 0%, #F1E1D2 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        />

        {/* Flap */}
        <motion.div
          className="absolute left-0 right-0 top-0 h-[58%] origin-top"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(180deg, #FDF9F4 0%, #F5E9DC 100%)",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
          variants={flapVariants}
          initial="closed"
          animate={opened ? "open" : "closed"}
        >
          <div className="flex justify-center pt-[10%]">
            <Image
              src="/images/logo.svg"
              alt="John Mark and Chezza monogram"
              width={56}
              height={56}
              className="h-10 w-10 rounded-full object-contain opacity-90 sm:h-12 sm:w-12"
              priority
            />
          </div>
        </motion.div>

        {/* Wax seal — click / tap / Enter / Space to open */}
        <motion.button
          type="button"
          onClick={handleOpen}
          onKeyDown={handleKeyDown}
          disabled={opened}
          autoFocus
          aria-label="Open your wedding invitation"
          tabIndex={opened ? -1 : 0}
          className="absolute left-1/2 top-[58%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9CAF88] sm:h-16 sm:w-16"
          style={{
            background: "radial-gradient(circle at 35% 30%, #B3C3A0 0%, #9CAF88 45%, #7E9670 100%)",
            boxShadow: "0 8px 20px rgba(124,140,100,0.4), inset 0 1px 1px rgba(255,255,255,0.4)",
          }}
          variants={sealVariants}
          initial="idle"
          animate={opened ? "open" : "idle"}
        >
          <Heart className="h-5 w-5 text-[#FDF9F4]/90" strokeWidth={1.25} fill="currentColor" />
        </motion.button>
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
