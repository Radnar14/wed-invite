"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { timelineEvents } from "@/data/timeline"
import { 
  Users, 
  Heart, 
  Camera, 
  GlassWater, 
  Utensils, 
  Music, 
  Music2, 
  Sparkles 
} from "lucide-react"

const timelineIcons = {
  users: Users,
  heart: Heart,
  camera: Camera,
  drinks: GlassWater,
  dinner: Utensils,
  music: Music,
  dancing: Music2,
  sparkles: Sparkles,
}

function TimelineEventIcon({ name }: { name: keyof typeof timelineIcons }) {
  const Icon = timelineIcons[name]

  return <Icon className="w-5 h-5 text-accent transition-transform duration-500 group-hover:rotate-12" />
}

export function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => {
              const next = new Set(prev)
              next.add(index)
              return next
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll(".timeline-item")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  return (
    <section id="timeline" className="py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-blushpink mb-4">
            The Day
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Wedding Timeline
          </h2>
          <div className="w-24 h-px bg-accent/30 mx-auto mt-8" />
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line - Gradient */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-accent/30 to-transparent md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={event.title}
                data-index={index}
                className={cn(
                  "timeline-item group relative flex flex-col md:flex-row items-center transition-all duration-700",
                  index % 2 === 0 ? "md:flex-row-reverse" : "",
                  visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 " + (index % 2 === 0 ? "translate-x-12" : "-translate-x-12")
                )}
              >
                {/* Connector Line - Desktop only */}
                <div className={cn(
                  "hidden md:block absolute top-1/2 left-1/2 w-1/4 h-px bg-accent/20 -translate-y-1/2",
                  index % 2 === 0 ? "-translate-x-full" : ""
                )} />

                {/* Icon Circle */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-background border border-accent/20 rounded-full flex items-center justify-center z-10 md:-translate-x-1/2 transition-all duration-500 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_20px_rgba(var(--accent),0.2)]">
                  <TimelineEventIcon name={event.icon} />
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    "w-full pl-16 md:pl-0 md:w-[42%] transition-all duration-500 group-hover:translate-y-[-4px]",
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  )}
                >
                  <div className="bg-background/50 backdrop-blur-sm border border-border/50 p-6 md:p-8 rounded-2xl hover:border-accent/30 hover:bg-background/80 transition-all duration-500 shadow-sm hover:shadow-xl group-hover:shadow-accent/5">
                    <p className="text-xs tracking-[0.2em] uppercase font-(family-name:--font-montserrat) text-accent mb-3">
                      {event.time}
                    </p>
                    <h3 className="text-xl md:text-2xl font-light text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-(family-name:--font-montserrat)">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
