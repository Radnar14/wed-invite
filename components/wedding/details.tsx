"use client";

import { MapPin, Clock, Shirt, Mail, Heart, PartyPopper } from "lucide-react";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";

const ImageShimmer = (
  <div
    className="absolute inset-y-0 -left-1/2 w-1/2
    bg-linear-to-r from-transparent via-white/40 to-transparent
    skew-x-[-20deg] opacity-0
    group-hover:opacity-100
    group-hover:translate-x-[300%]
    transition-all duration-1000"
  />
);

const MobileImageShimmer = (
  <div
    className="
      md:hidden
      absolute inset-y-0 -left-1/2 w-1/2
      bg-linear-to-r from-transparent via-white/40 to-transparent
      skew-x-[-20deg]
      animate-[mobileShimmer_4s_linear_infinite]
      pointer-events-none
    "
  />
);

const ContReactEff = `
  relative w-fit transition-colors hover:text-accent after:absolute after:left-0 after:-bottom-0.5 after:h-[1px]
  after:w-0 after:bg-current after:transition-all after:duration-300
  hover:after:w-full
`;


export function Details() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="details" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary opacity-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-blushpink mb-4">The Celebration</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">Wedding Details</h2>
          <div className="mt-8 w-px h-16 bg-border mx-auto" />
        </div>

        {/* Main Events (Ceremony & Reception) */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto mb-10">
          {/* Ceremony Side Card */}
          <div
            className="relative group rounded-[32px] border border-border/40 
              bg-background/70 backdrop-blur-xl shadow-lg transition-all duration-500 
              hover:-translate-y-1 hover:shadow-xl mt-12"
          >
            {/* Floating MapPin */}
            <div className="absolute left-1/2 -top-23 -translate-x-1/2 z-20">
              <div className="w-14 h-14 rounded-full border border-border bg-background shadow-md flex items-center justify-center">
                <MapPin className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
            </div>

            {/* Ceremony Image */}
            <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => setSelectedImage("/images/ceremony.jpg")}>
              <Image
                src="/images/ceremony.jpg"
                alt="Wedding Ceremony Venue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Luxury Glass Shimmer */}
              {ImageShimmer}
              {MobileImageShimmer}

              {/* Optional soft overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
            {/* Content */}
            <div className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-blushpink">
                <Heart className="w-4 h-4" />
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground leading-none">Ceremony</p>
              </div>

              <h3 className="text-3xl font-light mb-4">Archdiocesan Shrine of St. Thérèse</h3>

              <div className="flex justify-center items-center gap-2 text-blushpink mb-2">
                <MapPin className="w-4 h-4" />
                <p>Lahug, Cebu City</p>
              </div>

              <div className="flex justify-center items-center gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <p>Oct 08, 2026 · 2:30 PM</p>
              </div>

              <a
                href="https://maps.google.com/?q=Archdiocesan+Shrine+of+St.+Therese+Cebu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-3 text-sm transition-all hover:bg-accent hover:text-white"
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>
            </div>
          </div>

          {/* Reception Side Card*/}
          <div
            className="relative group rounded-[32px] h-fit border 
                    border-border/40 bg-background/70 backdrop-blur-xl shadow-lg transition-all duration-500 
                    hover:-translate-y-1 hover:shadow-xl mt-28"
          >
            {/* Floating MapPin */}
            <div className="absolute left-1/2 -top-23 -translate-x-1/2 z-20">
              <div
                className="w-14 h-14 rounded-full border border-border bg-background 
                            shadow-md flex items-center justify-center"
              >
                <MapPin className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
            </div>

            {/* Reception Image */}
            <div
              className="relative h-72 overflow-hidden rounded-t-[32px] cursor-pointer"
              onClick={() => setSelectedImage("/images/reception.png")}
            >
              <Image
                src="/images/reception.png"
                alt="Wedding Reception Venue"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Luxury Glass Shimmer */}
              {ImageShimmer}
              {MobileImageShimmer}

              {/* Optional soft overlay */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
            {/* Content */}
            <div className="px-8 pt-8 pb-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-2 text-blushpink">
                <PartyPopper className="w-4 h-4" />
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground leading-none">Reception</p>
              </div>

              <h3 className="text-3xl font-light mb-4">Beverly View Events Pavilion</h3>

              <div className="flex justify-center items-center gap-2 text-blushpink mb-2">
                <MapPin className="w-4 h-4" />
                <p>4th Street, Beverly Hills, Lahug, Cebu City,</p>
              </div>

              <div className="flex justify-center items-center gap-2 text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <p>Oct 08, 2026 · 6:00 PM</p>
              </div>
              <a
                href="https://maps.google.com/?q=Beverly+View+Events+Pavilion"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full 
                            bg-accent/10 px-5 py-3 text-sm transition-all 
                            hover:bg-accent hover:text-white"
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Dress Code */}
          <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <Shirt className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-70" strokeWidth={1.5} />
            <h4 className="text-xl font-medium mb-6">Dress Code</h4>
            <div className="space-y-4 text-sm text-muted-foreground font-(family-name:--font-montserrat)">
              <p className="font-medium text-foreground tracking-wide uppercase text-xs">Modern Suits/Dresses</p>
              <div className="w-8 h-px bg-border mx-auto" />
              <p>Click the Palette below </p>
            </div>
            <a
              href="#attire"
              className="inline-block mt-8 text-xs tracking-wider uppercase underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-all"
            >
              View Palette
            </a>
          </div>

          {/* Contact */}
          <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <Mail className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-70" strokeWidth={1.5} />
            <h4 className="text-xl font-medium mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-muted-foreground font-(family-name:--font-montserrat)">
              <p>Questions? Reach out to us:</p>

              {/* add icons here using react-icons */}
              <div className="flex justify-center gap-2 mt-2">
                <div className="flex self-center">
                  <FaFacebookMessenger size={30} className="text-blushpink" />
                </div>
                <div className="flex text-left flex-col leading-tight text-sm">
                  <a href="https://m.me/chezza214" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={ContReactEff}
                  >
                     Chezza
                  </a>
                  <a
                    href="https://m.me/kingcoal214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ContReactEff}
                  >
                    John Mark
                  </a>
                </div>
                <div className="flex self-center">
                  <FaInstagram size={30} className="mx-auto text-blushpink" />
                  </div>
                  <div className="flex text-left flex-col leading-tight text-sm">
                  <a
                    href="https://instagram.com/chezz.zhang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ContReactEff}
                  >
                    Chezza
                  </a>
                                    <a
                    href="https://instagram.com/jm.abad214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ContReactEff}
                  >
                    John Mark
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-6 right-6 text-white text-3xl leading-none" onClick={() => setSelectedImage(null)}>
            ×
          </button>

          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedImage} alt="Venue Preview" fill className="object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
