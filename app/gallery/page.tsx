"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/wedding/navigation"
import { Footer } from "@/components/wedding/footer"

// Media data
const galleryMedia = [
  { type: "video", src: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-in-the-park-40030-large.mp4", thumbnail: "/images/hero-couple.jpg", alt: "Our Pre-Wedding Film" },
  { type: "image", src: "/images/gallery-1.jpg", alt: "Laughing together" },
  { type: "image", src: "/images/gallery-2.jpg", alt: "The Rings" },
  { type: "image", src: "/images/gallery-3.jpg", alt: "Bridal Portrait" },
  { type: "image", src: "/images/gallery-4.jpg", alt: "The Venue" },
  { type: "image", src: "/images/gallery-5.jpg", alt: "First Dance" },
  { type: "image", src: "/images/gallery-6.jpg", alt: "The Bouquet" },
  { type: "image", src: "/images/ceremony.jpg", alt: "The Ceremony" },
  { type: "image", src: "/images/reception.jpg", alt: "The Reception" },
]

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const nextMedia = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryMedia.length : null
    )
    
  const prevMedia = () =>
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryMedia.length) % galleryMedia.length
        : null
    )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") nextMedia()
      if (e.key === "ArrowLeft") prevMedia()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  // Handle background music pause/resume
  useEffect(() => {
    if (selectedIndex !== null && galleryMedia[selectedIndex].type === "video") {
      window.dispatchEvent(new CustomEvent("wedding-pause-music"))
    } else {
      window.dispatchEvent(new CustomEvent("wedding-resume-music"))
    }
    
    // Resume music when component unmounts or lightbox closes
    return () => {
      if (selectedIndex !== null && galleryMedia[selectedIndex].type === "video") {
        window.dispatchEvent(new CustomEvent("wedding-resume-music"))
      }
    }
  }, [selectedIndex])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4"
            >
              Our Love in Motion
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground"
            >
              Gallery
            </motion.h1>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {galleryMedia.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn(
                  "relative overflow-hidden rounded-xl group cursor-pointer aspect-square bg-muted/30",
                  index === 0 && "sm:col-span-2 sm:aspect-video" // Feature the video
                )}
                onClick={() => openLightbox(index)}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.thumbnail || "/images/placeholder.jpg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 rounded-full border border-white/50 backdrop-blur-sm flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                        <Play size={28} fill="white" className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Overlay with info */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-(family-name:--font-montserrat) tracking-widest uppercase">
                      {item.alt}
                    </p>
                    <Maximize2 size={16} className="text-white/70" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-background/98 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-8 right-8 text-foreground/50 hover:text-foreground transition-colors p-2"
              aria-label="Close"
            >
              <X size={32} strokeWidth={1.5} />
            </button>

            {/* Navigation */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevMedia()
              }}
              className="absolute left-4 md:left-8 text-foreground/30 hover:text-foreground transition-colors p-4"
              aria-label="Previous"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextMedia()
              }}
              className="absolute right-4 md:right-8 text-foreground/30 hover:text-foreground transition-colors p-4"
              aria-label="Next"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Content */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[70vh] px-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryMedia[selectedIndex].type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={galleryMedia[selectedIndex].src}
                    alt={galleryMedia[selectedIndex].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <video 
                    src={galleryMedia[selectedIndex].src} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              
              {/* Caption */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-foreground text-sm font-(family-name:--font-montserrat) tracking-[0.3em] uppercase">
                  {galleryMedia[selectedIndex].alt}
                </p>
                <p className="text-muted-foreground text-xs mt-2 font-(family-name:--font-montserrat)">
                  {selectedIndex + 1} / {galleryMedia.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
