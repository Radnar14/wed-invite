/**
 * Wedding Home Page
 * 
 * SIMPLIFICATION: Envelope state management was moved to layout-client.tsx
 * 
 * This page now focuses solely on rendering the wedding sections.
 * The envelope overlay and music player are handled by the root layout,
 * which ensures:
 * - State persistence across route changes (user navigates between tabs)
 * - Automatic reset on page refresh (natural React behavior)
 * 
 * CONTENT FLOW:
 * 1. User loads page
 * 2. Root layout shows envelope (from layout-client state)
 * 3. User clicks seal to open envelope
 * 4. Music starts after 1-second delay
 * 5. Main content (this page) becomes visible
 * 6. User can navigate between sections (navigation persists at layout level)
 * 
 * If user navigates to /gallery or /seat-finder and comes back,
 * the envelope won't replay because the layout state persists.
 */

"use client"

import { Navigation } from "@/components/wedding/navigation"
import { Hero } from "@/components/wedding/hero"
import { Countdown } from "@/components/wedding/countdown"
import { OurStory } from "@/components/wedding/our-story"
import { Entourage } from "@/components/wedding/entourage"
import { Attire } from "@/components/wedding/attire"
import { Details } from "@/components/wedding/details"
import { Timeline } from "@/components/wedding/timeline"
import { Gallery } from "@/components/wedding/gallery"
import { RSVP } from "@/components/wedding/rsvp"
import { FAQ } from "@/components/wedding/faq"
import { Footer } from "@/components/wedding/footer"

/**
 * Main wedding page component
 * Renders all wedding sections in sequence
 * Content only displays after envelope intro completes (controlled by layout)
 */
export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Countdown />
      <OurStory />
      <Entourage />
      <Details />
      <Attire />
      <Timeline />
      <Gallery />
      <RSVP />
      <FAQ />
      <Footer />
    </main>
  )
}


