'use client'

/**
 * RootLayoutClient - Client Component
 * 
 * Manages all client-side state and interactivity at the layout level:
 * - Envelope intro animation and completion state
 * - Music player (always mounted and ready)
 * - Main content visibility
 * - Analytics
 * 
 * STATE PERSISTENCE:
 * - introFinished state persists across route/tab changes within the same session
 * - State RESETS on page refresh (natural React behavior - no manual handling needed)
 * - This achieves the exact desired UX:
 *   ✓ Fresh load/refresh → Envelope plays
 *   ✓ Navigate to other tabs → Envelope doesn't replay (state persists)
 *   ✓ Refresh page → Back to envelope
 * 
 * MUSIC PLAYER PLACEMENT:
 * - MusicPlayer is rendered OUTSIDE the introFinished conditional
 * - Ensures it's always mounted and ready to listen for the envelope's custom event
 * - EnvelopeIntro dispatches a custom event when opened
 * - MusicPlayer catches this event and plays music with 1-second delay
 */

import { useState, ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/next'
import { MusicPlayer } from "@/components/wedding/music-player"
import { EnvelopeIntro } from "@/components/wedding/EnvelopeIntro"

export function RootLayoutClient({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  /**
   * Envelope completion state
   * - false: Show envelope overlay, hide main content
   * - true: Hide envelope overlay, show main content
   * 
   * Held at layout level (not page level) to persist across route changes
   * in the same browser session
   */
  const [introFinished, setIntroFinished] = useState(false)

  return (
    <>
      {/* Envelope Animation Overlay */}
      {/* Only shows when introFinished is false (fresh load or page refresh) */}
      <AnimatePresence>
        {!introFinished && <EnvelopeIntro onComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>
      
      {/* Music Player */}
      {/* ALWAYS MOUNTED (not conditional) so it can listen for the envelope event */}
      {/* EnvelopeIntro dispatches a custom event when the seal is clicked and opened */}
      {/* MusicPlayer listens for this event and starts music with 1s delay */}
      <MusicPlayer />
      
      {/* Main Content */}
      {/* Only renders after envelope animation completes (introFinished === true) */}
      {introFinished && (
        <>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </>
      )}
    </>
  )
}

