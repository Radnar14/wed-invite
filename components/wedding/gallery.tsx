"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "John Mark and Chezza laughing together" },
  { src: "/images/gallery-2.jpg", alt: "Wedding rings detail" },
  { src: "/images/gallery-3.jpg", alt: "Beautiful bride portrait" },
  { src: "/images/gallery-4.jpg", alt: "Wedding venue" },
  { src: "/images/gallery-5.jpg", alt: "First dance" },
  { src: "/images/gallery-6.jpg", alt: "Wedding bouquet" },
]

// Videos URLs here

const VIDEO_URLS = {
  prenup:
    "https://www.youtube.com/embed/YMKjUxJa6C4?enablejsapi=1",

  saveTheDate:
    "https://www.youtube.com/embed/ZWb4OYzpySE?enablejsapi=1",
}


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

      {/* Gallery Layout */}
              <div className="max-w-6xl mx-auto">

                {/* MOBILE LAYOUT */}
                <div className="md:hidden space-y-6">

                  {/* Prenup Hero */}
                    <div className="overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <iframe
                        className="w-full aspect-video"
                        src={VIDEO_URLS.prenup}
                        title="Prenup Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                  {/* 6 Pictures */}
                  <div className="grid grid-cols-2 gap-4">
                    {galleryImages.slice(0, 6).map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => openLightbox(index)}
                        className="relative h-45 overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] group"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Save the Date Video */}
                  <div className="overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                    <iframe
                      className="w-full aspect-video"
                      src={VIDEO_URLS.saveTheDate}
                      title="Save The Date Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                  </div>
                </div>

                {/* DESKTOP LAYOUT */}
                <div className="hidden md:grid grid-cols-[1.2fr_1fr] gap-8 items-center">

                  {/* LEFT VIDEOS */}
                  <div className="space-y-6">

                    {/* Prenup Hero */}
                    <div className="overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <iframe
                          className="w-full aspect-video"
                          src={VIDEO_URLS.prenup}
                          title="Prenup Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen />
                    </div>

                    {/* Save the Date */}
                    <div className="overflow-hidden rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                      <iframe
                      className="w-full aspect-video"
                      src={VIDEO_URLS.saveTheDate}
                      title="Save The Date Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                    </div>
                  </div>

                  {/* RIGHT PHOTOS */}
                    <div className="grid grid-cols-2 gap-5 content-center my-auto">

                      {galleryImages.slice(0, 6).map((image, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => openLightbox(index)}
                          className="relative overflow-hidden rounded-[28px] bg-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] group transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="relative w-full h-55 xl:h-65">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 1024px) 50vw, 33vw"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                </div>
              </div>

        {/* View Full Gallery Bubble Button */}
            <div className="mt-16 text-center">
              <Link
                href="/gallery"
                className="
                  group
                  relative
                  inline-flex
                  items-center
                  gap-4
                  rounded-full
                  border border-accent/40
                  bg-transparent
                  px-10 py-5
                  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                  transition-all duration-300
                  hover:-translate-y-1
                  active:scale-95
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.12)]
                  hover:border-accent
                "
              >
                {/* Text */}
                <span
                  className="
                    text-sm
                    uppercase
                    tracking-[0.35em]
                    font-(family-name:--font-montserrat)
                    text-foreground
                    transition-all duration-300
                    group-hover:text-accent
                    group-hover:underline
                  "
                >
                  View Full Gallery
                </span>

                {/* Animated Arrow Bubble */}
                <div
                  className="
                    flex items-center justify-center
                    w-10 h-10 rounded-full
                    bg-accent/10
                    transition-all duration-300
                    group-hover:bg-accent/20
                  "
                >
                  <ArrowRight
                      size={18}
                      className="
                        text-accent
                        animate-arrowTick
                        transition-transform duration-300
                        group-hover:translate-x-1
                      "
                    />
                </div>
              </Link>
            </div>


      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center touch-pan-y"
            onClick={closeLightbox}
            onTouchStart={(e) => {
              const touchStartX = e.changedTouches[0].clientX
              e.currentTarget.dataset.touchStartX = String(touchStartX)
            }}
            onTouchEnd={(e) => {
              const touchStartX = Number(
                e.currentTarget.dataset.touchStartX || 0
              )

              const touchEndX = e.changedTouches[0].clientX
              const difference = touchStartX - touchEndX

              if (difference > 50) {
                nextImage()
              }

              if (difference < -50) {
                prevImage()
              }
            }}
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
