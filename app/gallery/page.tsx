"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, Maximize2, Play, X } from "lucide-react";
import { Navigation } from "@/components/wedding/navigation";
import { Footer } from "@/components/wedding/footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { COUPLE_NAMES, WEDDING_DISPLAY_DATE } from "@/lib/wedding-config";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  thumbnail?: string;
};

export default function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeMediaItems, setActiveMediaItems] = useState<GalleryItem[]>([]);
  const [activeMediaType, setActiveMediaType] = useState<GalleryItem["type"] | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [galleryMedia, setGalleryMedia] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const films = galleryMedia
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => item.type === "video");
  const moments = galleryMedia
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => item.type === "image");

  const openLightbox = (galleryIndex: number, type: GalleryItem["type"]) => {
    const filteredItems = galleryMedia.filter((item) => item.type === type);
    const itemIndex = filteredItems.findIndex((item) => item === galleryMedia[galleryIndex]);

    if (itemIndex === -1) {
      return;
    }

    setActiveMediaItems(filteredItems);
    setActiveMediaType(type);
    setSelectedIndex(itemIndex);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setActiveMediaItems([]);
    setActiveMediaType(null);
  };

  const nextMedia = () => {
    setSelectedIndex((prev) => {
      if (prev === null || activeMediaItems.length === 0) {
        return null;
      }

      return (prev + 1) % activeMediaItems.length;
    });
  };

  const prevMedia = () => {
    setSelectedIndex((prev) => {
      if (prev === null || activeMediaItems.length === 0) {
        return null;
      }

      return (prev - 1 + activeMediaItems.length) % activeMediaItems.length;
    });
  };

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
    const controller = new AbortController();

    const loadGallery = async () => {
      try {
        const response = await fetch("/api/gallery", { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to load gallery.");
        }

        const data: GalleryItem[] = await response.json();
        setGalleryMedia(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadGallery();
    return () => controller.abort();
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
  }, [selectedIndex, activeMediaItems]);

  // Handle background music pause/resume only for video lightbox mode
  useEffect(() => {
    if (activeMediaType === "video") {
      window.dispatchEvent(new CustomEvent("wedding-pause-music"));
      return () => {
        window.dispatchEvent(new CustomEvent("wedding-resume-music"));
      };
    }

    return;
  }, [activeMediaType]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="px-0 pb-24 pt-28 md:pb-32 md:pt-36">
        <div className="container mx-auto px-5 sm:px-6">
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="mb-4 font-(family-name:--font-montserrat) text-xs uppercase tracking-[0.3em] text-blushpink">
              {COUPLE_NAMES.groom} &amp; {COUPLE_NAMES.bride} · {WEDDING_DISPLAY_DATE}
            </p>
            <h1 className="font-(family-name:--font-cormorant) text-5xl font-light text-foreground sm:text-6xl md:text-7xl">
              Our day, in frames
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-(family-name:--font-montserrat) text-sm leading-7 text-muted-foreground md:text-base">
              A few moments from a day we will always carry with us.
            </p>
          </header>

          {loading ? (
            <div role="status" className="mx-auto max-w-7xl space-y-14" aria-label="Loading wedding memories">
              <span className="sr-only">Loading wedding memories</span>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)] lg:items-end">
                <div className="aspect-16/10 bg-secondary/70" />
                <div className="space-y-4 pb-3">
                  <div className="h-3 w-32 bg-secondary/70" />
                  <div className="h-10 w-full bg-secondary/70" />
                  <div className="h-4 w-5/6 bg-secondary/70" />
                  <div className="h-4 w-2/3 bg-secondary/70" />
                </div>
              </div>
              <div className="h-64 bg-secondary/70 md:h-80" />
            </div>
          ) : (
            <div className="mx-auto max-w-7xl space-y-16 md:space-y-24">
              {moments[0] && (
                <motion.section
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" }}
                  className="grid gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(16rem,0.7fr)] lg:items-end lg:gap-12"
                  aria-label="Featured wedding photograph"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(moments[0].originalIndex, "image")}
                    aria-label={`Open featured photo: ${moments[0].item.alt}`}
                    className="group relative block aspect-16/10 w-full overflow-hidden rounded-sm bg-secondary text-left"
                  >
                    <Image
                      src={moments[0].item.src}
                      alt={moments[0].item.alt}
                      fill
                      priority
                      sizes="(max-width: 1023px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.22em] text-white/90 sm:bottom-7 sm:left-7">
                      October 8, 2026 · Cebu City
                    </span>
                  </button>

                  <div className="pb-2 lg:pb-8">
                    <p className="mb-4 font-(family-name:--font-montserrat) text-xs uppercase tracking-[0.28em] text-blushpink">
                      A day full of love
                    </p>
                    <h2 className="font-(family-name:--font-cormorant) text-4xl font-light leading-tight text-foreground md:text-5xl">
                      The little moments became our favorite memories.
                    </h2>
                    <p className="mt-5 max-w-md font-(family-name:--font-montserrat) text-sm leading-7 text-muted-foreground">
                      Thank you for being part of the beginning of our forever.
                    </p>
                    <a
                      href="#moments"
                      className="mt-7 inline-flex items-center gap-3 font-(family-name:--font-montserrat) text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
                    >
                      Explore the photographs <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </motion.section>
              )}

              {moments.length > 0 && (
                <motion.section
                  id="moments"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
                  aria-labelledby="moments-heading"
                >
                  <div className="mb-7 flex items-end gap-5 md:mb-9">
                    <div>
                      <p className="mb-2 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.25em] text-blushpink">
                        The wedding day
                      </p>
                      <h2 id="moments-heading" className="font-(family-name:--font-cormorant) text-3xl font-light text-foreground md:text-4xl">
                        Moments in frames
                      </h2>
                    </div>
                    <div className="mb-2 h-px flex-1 bg-linear-to-r from-border to-transparent" />
                  </div>

                  <Carousel opts={{ align: "start", loop: false }} className="px-1 md:px-12">
                    <CarouselContent className="-ml-4">
                      {moments.map(({ item, originalIndex }, index) => (
                        <CarouselItem key={`${item.src}-${originalIndex}`} className="basis-[82%] pl-4 sm:basis-[54%] lg:basis-1/3">
                          <button
                            type="button"
                            onClick={() => openLightbox(originalIndex, "image")}
                            aria-label={`Open photo ${index + 1}: ${item.alt}`}
                            className="group block w-full text-left"
                          >
                            <span className="relative block aspect-4/3 overflow-hidden rounded-sm bg-secondary">
                              <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                loading="lazy"
                                sizes="(max-width: 639px) 82vw, (max-width: 1023px) 54vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                              />
                              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 motion-reduce:transition-none" />
                            </span>
                            <span className="mt-3 flex items-center justify-between gap-4 border-b border-border/70 pb-3">
                              <span className="truncate font-(family-name:--font-montserrat) text-xs text-muted-foreground">{item.alt}</span>
                              <span className="shrink-0 font-(family-name:--font-montserrat) text-[0.65rem] tracking-[0.12em] text-blushpink">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </span>
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden border-border/60 bg-background/90 shadow-sm md:inline-flex" />
                    <CarouselNext className="hidden border-border/60 bg-background/90 shadow-sm md:inline-flex" />
                  </Carousel>
                  <p className="mt-4 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground/75 md:hidden">
                    Swipe to see more moments
                  </p>
                </motion.section>
              )}

              {films.length > 0 && (
                <motion.section
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
                  aria-labelledby="films-heading"
                >
                  <div className="mb-7 flex items-end gap-5 md:mb-9">
                    <div>
                      <p className="mb-2 font-(family-name:--font-montserrat) text-[0.65rem] uppercase tracking-[0.25em] text-blushpink">
                        Before the celebration
                      </p>
                      <h2 id="films-heading" className="font-(family-name:--font-cormorant) text-3xl font-light text-foreground md:text-4xl">
                        Films from our story
                      </h2>
                    </div>
                    <div className="mb-2 h-px flex-1 bg-linear-to-r from-border to-transparent" />
                  </div>

                  <Carousel opts={{ align: "start", loop: films.length > 2 }} className="px-1 md:px-12">
                    <CarouselContent className="-ml-4">
                      {films.map(({ item, originalIndex }) => (
                        <CarouselItem key={`${item.src}-${originalIndex}`} className="basis-[88%] pl-4 sm:basis-2/3 lg:basis-1/2">
                          <button
                            type="button"
                            className="group relative block aspect-video w-full overflow-hidden rounded-sm bg-secondary text-left"
                            onClick={() => openLightbox(originalIndex, "video")}
                            aria-label={`Play film: ${item.alt}`}
                          >
                            {item.src.includes("youtube.com") ? (
                              <Image
                                src={item.thumbnail || "/images/placeholder.jpg"}
                                alt=""
                                fill
                                loading="lazy"
                                sizes="(max-width: 639px) 88vw, 66vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                              />
                            ) : (
                              <video
                                src={item.src}
                                poster={item.thumbnail}
                                className="absolute inset-0 h-full w-full object-cover"
                                muted
                                preload="none"
                                playsInline
                              />
                            )}
                            <span className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover:bg-black/25">
                              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/75 bg-white/10 text-white backdrop-blur-sm">
                                <Play size={21} fill="currentColor" className="ml-0.5" aria-hidden="true" />
                              </span>
                            </span>
                            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-5 pb-4 pt-12 font-(family-name:--font-montserrat) text-xs uppercase tracking-[0.16em] text-white">
                              {item.alt}
                            </span>
                          </button>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden border-border/60 bg-background/90 shadow-sm md:inline-flex" />
                    <CarouselNext className="hidden border-border/60 bg-background/90 shadow-sm md:inline-flex" />
                  </Carousel>
                </motion.section>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-100 bg-background/98 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Wedding photo viewer"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 p-3 text-foreground/60 transition-colors hover:text-foreground md:right-8 md:top-8"
              aria-label="Close photo viewer"
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
              className="absolute left-0 p-3 text-foreground/50 transition-colors hover:text-foreground md:left-8 md:p-4"
              aria-label="Previous photo"
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextMedia();
              }}
              className="absolute right-0 p-3 text-foreground/50 transition-colors hover:text-foreground md:right-8 md:p-4"
              aria-label="Next photo"
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            {/* Content */}
            <motion.div
              key={selectedIndex}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
              className="relative flex h-[68vh] w-full max-w-6xl items-center justify-center px-12 md:h-[76vh] md:px-20"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {activeMediaItems[selectedIndex]?.type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={activeMediaItems[selectedIndex]?.src ?? ""}
                    alt={activeMediaItems[selectedIndex]?.alt ?? ""}
                    fill
                    loading="eager"
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={activeMediaItems[selectedIndex]?.src ?? ""}
                    title={activeMediaItems[selectedIndex]?.alt ?? ""}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}

              {/* Caption */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-muted-foreground text-xs mt-2 font-(family-name:--font-montserrat)">
                  {selectedIndex + 1} / {activeMediaItems.length}
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
