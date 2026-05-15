import { Navigation } from "@/components/wedding/navigation"
import { Hero } from "@/components/wedding/hero"
import { Countdown } from "@/components/wedding/countdown"
import { OurStory } from "@/components/wedding/our-story"
import { Details } from "@/components/wedding/details"
import { Timeline } from "@/components/wedding/timeline"
import { Gallery } from "@/components/wedding/gallery"
import { RSVP } from "@/components/wedding/rsvp"
import { Footer } from "@/components/wedding/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Countdown />
      <OurStory />
      <Details />
      <Timeline />
      <Gallery />
      <RSVP />
      <Footer />
    </main>
  )
}
