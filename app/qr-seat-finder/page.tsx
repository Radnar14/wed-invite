import { Suspense } from "react"
import { SeatFinder } from "@/components/wedding/seat-finder"
import { Footer } from "@/components/wedding/footer"

/**
 * Public QR destination: standalone guest lookup with no site navigation,
 * envelope intro, music, or host/admin viewer. It still uses the shared
 * SeatFinder component and /api/guests/search database connection.
 */
export default function QrSeatFinderPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* The QR destination gets its own visual treatment while sharing the live finder data. */}
      <section
        aria-labelledby="qr-seat-finder-title"
        className="relative flex min-h-[min(760px,calc(100vh-1px))] grow items-center overflow-hidden py-16 md:py-24"
        style={{ backgroundImage: "url('/images/hero-couple.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[#3d2926]/45 backdrop-blur-[2px]" />

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl rounded-4xl border border-white/35 bg-white/20 px-4 py-10 shadow-[0_24px_80px_rgba(43,25,20,0.28)] backdrop-blur-xl sm:px-8 md:py-14">
            <div className="mb-8 text-center md:mb-10">
              <p className="mb-4 text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-white/80">
                Find Your Table
              </p>
              <h1 id="qr-seat-finder-title" className="text-4xl font-light text-white md:text-5xl">
                Seat Finder
              </h1>
            </div>

            <Suspense fallback={<div className="text-center text-white/80">Loading seat finder...</div>}>
              <SeatFinder enableAdminViewer={false} helperTextClassName="text-white/90 drop-shadow-[0_1px_3px_rgba(43,25,20,0.75)]" />
            </Suspense>
          </div>
        </div>
      </section>

      <Footer showBackToTop={false} />
    </main>
  )
}