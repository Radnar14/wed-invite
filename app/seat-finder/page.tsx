import { Suspense } from "react"
import { Navigation } from "@/components/wedding/navigation"
import { SeatFinder } from "@/components/wedding/seat-finder"
import { Footer } from "@/components/wedding/footer"
import SeatFinderUtilityLinks from "@/app/seat-finder/SeatFinderUtilityLinks"

export default function SeatFinderPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      
      <section
        className="relative grow pt-24 pb-20 md:pt-28 md:pb-24"
        style={{ backgroundImage: "url('/images/hero-couple.jpg')", backgroundPosition: "center", backgroundSize: "cover" }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-[#3d2926]/45 backdrop-blur-[2px]" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 text-center mb-8 md:mb-10">
            <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-white/80 mb-4">
              Find Your Table
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white">
              Seat Finder
            </h2>
          </div>

          <Suspense fallback={<div className="container mx-auto px-6 text-center text-white/80">Loading seat finder...</div>}>
            <div className="mx-auto w-full max-w-2xl px-4 md:px-6">
              <div className="rounded-[2rem] border border-white/30 bg-white/20 p-3 shadow-[0_24px_80px_rgba(43,25,20,0.28)] backdrop-blur-xl transition-all duration-300 ease-out animate-[fadeInUp_0.45s_ease-out] md:p-5">
                <SeatFinderUtilityLinks seatFinderContent={<SeatFinder />} dark />
              </div>
            </div>
          </Suspense>
        </div>
      </section>

      <Footer showBackToTop={false} />


    </main>
  )
}
