import { Suspense } from "react"
import { Navigation } from "@/components/wedding/navigation"
import { SeatFinder } from "@/components/wedding/seat-finder"
import { Footer } from "@/components/wedding/footer"

export default function SeatFinderPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      <section className="flex-grow pt-24 pb-20 md:pt-28 md:pb-24 bg-accent/5">
        <div className="container mx-auto px-6 text-center mb-8 md:mb-10">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            Find Your Table
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-foreground">
            Seat Finder
          </h2>
        </div>
        <Suspense fallback={<div className="container mx-auto px-6 text-center text-muted-foreground">Loading seat finder...</div>}>
          <SeatFinder />
        </Suspense>
      </section>

      <Footer showBackToTop={false} />


    </main>
  )
}
