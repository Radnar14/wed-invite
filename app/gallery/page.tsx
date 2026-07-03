"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import { Navigation } from "@/components/wedding/navigation";
import { Footer } from "@/components/wedding/footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  type GalleryItem = {
    type: "image" | "video";
    src: string;
    alt: string;
    thumbnail?: string;
  };

  const [galleryMedia, setGalleryMedia] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const films = galleryMedia
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => item.type === "video");
  const moments = galleryMedia
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => item.type === "image");

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextMedia = () => setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryMedia.length : null));

  const prevMedia = () => setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryMedia.length) % galleryMedia.length : null));

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) {
      nextMedia();
    } else if (distance < -50) {
      prevMedia();
    }

    setTouchStart(null);
  };

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          throw new Error("Failed to load gallery.");
        }

        const data = await response.json();

        setGalleryMedia(data);

        // Keep the loading screen visible for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "ArrowLeft") prevMedia();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  // Handle background music pause/resume
  useEffect(() => {
    if (selectedIndex !== null && galleryMedia[selectedIndex]?.type === "video") {
      window.dispatchEvent(new CustomEvent("wedding-pause-music"));
    } else {
      window.dispatchEvent(new CustomEvent("wedding-resume-music"));
    }

    // Resume music when component unmounts or lightbox closes
    return () => {
      if (selectedIndex !== null && galleryMedia[selectedIndex]?.type === "video") {
        window.dispatchEvent(new CustomEvent("wedding-resume-music"));
      }
    };
  }, [selectedIndex, galleryMedia]);

  // loading effects

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        {/* Decorative Divider */}
        <div className="w-px h-16 bg-border mb-8 animate-pulse" />

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-light text-foreground">Loading Memories</h1>

        {/* Couple Names */}
        <p className="mt-3 text-xl md:text-2xl text-blushpink font-(family-name:--font-great-vibes)">John Mark &amp; Chezza</p>

        {/* Subtitle */}
        <p className="mt-6 text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground font-(family-name:--font-montserrat)">
          Preparing our gallery...
        </p>

        {/* Animated Line */}
        <div className="mt-10 w-40 h-px bg-border overflow-hidden">
          <motion.div
            className="h-full bg-accent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    );
  }

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
              className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-blushpink mb-4"
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

          <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
            {/* Films Carousel */}
            {films.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                aria-labelledby="films-heading"
              >
                <div className="mb-8 flex items-end gap-5 md:mb-10">
                  <h2 id="films-heading" className="shrink-0 text-3xl font-light text-foreground md:text-4xl">
                    Our Films
                  </h2>
                  <div className="mb-2 h-px flex-1 bg-linear-to-r from-border to-transparent" />
                </div>

                <Carousel opts={{ align: "start", loop: films.length > 3 }} className="px-1 md:px-12">
                  <CarouselContent className="-ml-5">
                    {films.map(({ item, originalIndex }) => (
                      <CarouselItem key={`${item.src}-${originalIndex}`} className="basis-[88%] pl-5 sm:basis-2/3 md:basis-1/2 lg:basis-1/3">
                        <button
                          type="button"
                          className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-muted/30 text-left shadow-sm"
                          onClick={() => openLightbox(originalIndex)}
                          aria-label={`Open video: ${item.alt}`}
                        >
                          {item.src.includes("youtube.com") ? (
                            <Image
                              src={item.thumbnail || "/images/placeholder.jpg"}
                              alt={item.alt}
                              fill
                              loading="eager"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <video
                              src={item.src}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              muted
                              preload="metadata"
                              playsInline
                            />
                          )}

                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                              <Play size={24} fill="white" className="ml-1" />
                            </div>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-5 pt-12">
                            <div className="flex items-center justify-between gap-4">
                              <p className="truncate text-xs uppercase tracking-widest text-white font-(family-name:--font-montserrat)">
                                {item.alt}
                              </p>
                              <Maximize2 size={16} className="shrink-0 text-white/70" />
                            </div>
                          </div>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden border-border/60 bg-background/90 shadow-md backdrop-blur-sm md:inline-flex" />
                  <CarouselNext className="hidden border-border/60 bg-background/90 shadow-md backdrop-blur-sm md:inline-flex" />
                </Carousel>
              </motion.section>
            )}

            {/* Moments Carousel */}
            {moments.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                aria-labelledby="moments-heading"
              >
                <div className="mb-8 flex items-end gap-5 md:mb-10">
                  <h2 id="moments-heading" className="shrink-0 text-3xl font-light text-foreground md:text-4xl">
                    Our Moments
                  </h2>
                  <div className="mb-2 h-px flex-1 bg-linear-to-r from-border to-transparent" />
                </div>

                <div className="moments-auto-scroll">
                  <div className="moments-auto-scroll-track">
                    {[0, 1].map((copyIndex) =>
                      copyIndex === 1 ? (
                        <div key={copyIndex} className="moments-auto-scroll-group" aria-hidden="true">
                          {moments.map(({ item, originalIndex }) => (
                            <div key={`${copyIndex}-${item.src}-${originalIndex}`} className="w-[clamp(17rem,78vw,19rem)] shrink-0">
                              <button
                                type="button"
                                className="group relative block aspect-4/5 w-full cursor-pointer overflow-hidden rounded-2xl bg-muted/30 text-left shadow-sm"
                                onClick={() => openLightbox(originalIndex)}
                                aria-label={`Open photo: ${item.alt}`}
                                tabIndex={-1}
                              >
                                <Image
                                  src={item.src}
                                  alt={item.alt}
                                  fill
                                  loading="eager"
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <div className="flex items-center justify-between gap-4">
                                    <p className="truncate text-xs uppercase tracking-widest text-white font-(family-name:--font-montserrat)">
                                      {item.alt}
                                    </p>
                                    <Maximize2 size={16} className="shrink-0 text-white/70" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div key={copyIndex} className="moments-auto-scroll-group">
                          {moments.map(({ item, originalIndex }) => (
                            <div key={`${copyIndex}-${item.src}-${originalIndex}`} className="w-[clamp(17rem,78vw,19rem)] shrink-0">
                              <button
                                type="button"
                                className="group relative block aspect-4/5 w-full cursor-pointer overflow-hidden rounded-2xl bg-muted/30 text-left shadow-sm"
                                onClick={() => openLightbox(originalIndex)}
                                aria-label={`Open photo: ${item.alt}`}
                                tabIndex={0}
                              >
                                <Image
                                  src={item.src}
                                  alt={item.alt}
                                  fill
                                  loading="eager"
                                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                  <div className="flex items-center justify-between gap-4">
                                    <p className="truncate text-xs uppercase tracking-widest text-white font-(family-name:--font-montserrat)">
                                      {item.alt}
                                    </p>
                                    <Maximize2 size={16} className="shrink-0 text-white/70" />
                                  </div>
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.section>
            )}
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
                e.stopPropagation();
                prevMedia();
              }}
              className="absolute left-4 md:left-8 text-foreground/30 hover:text-foreground transition-colors p-4"
              aria-label="Previous"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
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
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {galleryMedia[selectedIndex]?.type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={galleryMedia[selectedIndex]?.src ?? ""}
                    alt={galleryMedia[selectedIndex]?.alt ?? ""}
                    fill
                    loading="eager"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={galleryMedia[selectedIndex]?.src ?? ""}
                    title={galleryMedia[selectedIndex]?.alt ?? ""}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Caption */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
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
  );
}
