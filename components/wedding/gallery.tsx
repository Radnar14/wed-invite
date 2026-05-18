"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "John Mark and Chezza laughing together" },
  { src: "/images/gallery-2.jpg", alt: "Wedding rings detail" },
  { src: "/images/gallery-3.jpg", alt: "Beautiful bride portrait" },
  { src: "/images/gallery-4.jpg", alt: "Wedding venue" },
  { src: "/images/gallery-5.jpg", alt: "First dance" },
  { src: "/images/gallery-6.jpg", alt: "Wedding bouquet" },
]

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const nextImage = () =>
    setSelectedImage((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null
    )
  const prevImage = () =>
    setSelectedImage((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null
    )

  return (
    <section id="gallery" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            Captured Moments
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Our Gallery
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={index}
              onClick={() => openLightbox(index)}
              aria-label={`Open lightbox for ${image.alt}`}
              className={cn(
                "relative overflow-hidden rounded-sm group cursor-pointer",
                index === 0 || index === 5 ? "row-span-2 aspect-3/4" : "aspect-square"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            aria-label="Close gallery"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Navigation */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors p-2"
            aria-label="Previous image"
          >
            <ChevronLeft size={40} strokeWidth={1} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors p-2"
            aria-label="Next image"
          >
            <ChevronRight size={40} strokeWidth={1} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-4xl h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              fill
              className="object-contain"
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-(family-name:--font-montserrat) tracking-widest">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
