import { Suspense } from "react"
import { SeatFinder } from "@/components/wedding/seat-finder"

/**
 * Public QR destination: standalone guest lookup with no site navigation,
 * envelope intro, music, or host/admin viewer. It still uses the shared
 * SeatFinder component and /api/guests/search database connection.
 */
export default function QrSeatFinderPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center bg-accent/5 py-12 md:py-20">
      <section aria-labelledby="qr-seat-finder-title" className="w-full">
        <div className="container mx-auto px-6 text-center mb-8 md:mb-10">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            Find Your Table
          </p>
          <h1 id="qr-seat-finder-title" className="text-4xl md:text-5xl font-light text-foreground">
            Seat Finder
          </h1>
        </div>

        <Suspense fallback={<div className="container mx-auto px-6 text-center text-muted-foreground">Loading seat finder...</div>}>
          <SeatFinder enableAdminViewer={false} />
        </Suspense>
      </section>
    </main>
  )
}