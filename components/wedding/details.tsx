"use client"

import { MapPin, Clock, Shirt, Mail } from "lucide-react"

export function Details() {
  return (
    <section id="details" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary opacity-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            The Celebration
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Wedding Details
          </h2>
          <div className="mt-8 w-px h-16 bg-border mx-auto" />
        </div>

        {/* Main Events (Ceremony & Reception) */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto mb-24">
          {/* Ceremony */}
          <div className="group flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-8 bg-background/50 shadow-sm group-hover:scale-105 transition-transform duration-500">
              <MapPin className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-light mb-6">Ceremony</h3>
            <div className="space-y-2 mb-10 text-muted-foreground font-(family-name:--font-montserrat) text-sm md:text-base leading-relaxed">
              <p>Chapel of San Pedro Calungsod</p>
              <p>SM Seaside Complex</p>
              <p>Cebu City, Philippines</p>
            </div>
            <div className="w-full aspect-4/3 md:aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-border/50 bg-background relative group-hover:shadow-lg transition-shadow duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.864778107954!2d123.87834787502446!3d10.27851608985141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a99b4566d87e07%3A0x633d98031e13b860!2sChapel%20of%20San%20Pedro%20Calungsod!5e0!3m2!1sen!2sph!4v1715785200000!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ceremony Location: Chapel of San Pedro Calungsod"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Reception */}
          <div className="group flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-32">
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-8 bg-background/50 shadow-sm group-hover:scale-105 transition-transform duration-500">
              <MapPin className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-light mb-6">Reception</h3>
            <div className="space-y-2 mb-10 text-muted-foreground font-(family-name:--font-montserrat) text-sm md:text-base leading-relaxed">
              <p>Marco Polo Plaza Cebu</p>
              <p>Nivel Hills, Cebu City</p>
              <p>6000 Cebu, Philippines</p>
            </div>
            <div className="w-full aspect-4/3 md:aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-border/50 bg-background relative group-hover:shadow-lg transition-shadow duration-500">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3674681605335!2d123.89679657478652!3d10.334645289766952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999741e57147b%3A0x6e788c03973c7340!2sMarco%20Polo%20Plaza%20Cebu!5e0!3m2!1sen!2sph!4v1715777777777!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reception Location: Marco Polo Plaza Cebu"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Additional Info Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Schedule */}
          <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <Clock className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-70" strokeWidth={1.5} />
            <h4 className="text-xl font-medium mb-6">Schedule</h4>
            <ul className="space-y-4 text-sm text-muted-foreground font-(family-name:--font-montserrat)">
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">3:00 PM</span>
                <span>Ceremony</span>
              </li>
              <li className="w-8 h-px bg-border mx-auto" />
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">4:30 PM</span>
                <span>Cocktail Hour</span>
              </li>
              <li className="w-8 h-px bg-border mx-auto" />
              <li className="flex flex-col gap-1">
                <span className="font-semibold text-foreground">6:00 PM</span>
                <span>Reception</span>
              </li>
            </ul>
          </div>

          {/* Dress Code */}
          <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <Shirt className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-70" strokeWidth={1.5} />
            <h4 className="text-xl font-medium mb-6">Dress Code</h4>
            <div className="space-y-4 text-sm text-muted-foreground font-(family-name:--font-montserrat)">
              <p className="font-medium text-foreground tracking-wide uppercase text-xs">Modern Filipiniana</p>
              <div className="w-8 h-px bg-border mx-auto" />
              <p>Ladies: Formal Gowns</p>
              <p>Gentlemen: Barong Tagalog / Suits</p>
            </div>
            <a href="#attire" className="inline-block mt-8 text-xs tracking-wider uppercase underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground transition-all">
              View Palette
            </a>
          </div>

          {/* Contact */}
          <div className="bg-background/60 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/50 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <Mail className="w-6 h-6 mx-auto mb-6 text-muted-foreground opacity-70" strokeWidth={1.5} />
            <h4 className="text-xl font-medium mb-6">Contact</h4>
            <div className="space-y-4 text-sm text-muted-foreground font-(family-name:--font-montserrat)">
              <p>Questions? Reach out to us:</p>
              <a 
                href="mailto:wedding@johnmarkandchezza.com" 
                className="block break-all hover:text-foreground transition-colors mt-4 text-foreground/80 font-medium"
              >
                wedding@johnmarkandchezza.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
