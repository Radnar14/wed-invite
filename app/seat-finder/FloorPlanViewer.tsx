"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface FloorPlanViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FloorPlanViewer({ isOpen, onClose }: FloorPlanViewerProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setIsPreviewOpen(false);
      setZoom(1);
    }
  }, [isOpen]);

  const closePreview = () => {
    setIsPreviewOpen(false);
    setZoom(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4 w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#A8BBA3]/10 px-4 py-4 md:px-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium text-[#5B3832] font-(family-name:--font-cormorant)">
                  Floor Plan
                </h2>
                <p className="text-sm md:text-base text-[#7A5B54] font-(family-name:--font-cormorant)">
                  Venue layout
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8BBA3]/15 bg-white/60 transition-all duration-200 hover:scale-105 hover:bg-white md:h-10 md:w-10"
                  aria-label="Close floor plan"
                >
                  <X className="h-4 w-4 text-[#5B3832]" />
                </button>
              </div>
            </div>

            <div className="p-3 md:p-5">
              <div className="overflow-hidden rounded-[1.5rem] border border-[#A8BBA3]/25 bg-[#F8F4F2] p-2 md:p-3">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="relative block aspect-[4/3] w-full overflow-hidden rounded-[1.2rem] border border-[#A8BBA3]/25 bg-white/70 text-left"
                  aria-label="Open larger floor plan"
                >
                  <Image
                    src="/images/floor-plan.png"
                    alt="Wedding floor plan"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence>
            {isPreviewOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-[#241615]/75 p-4 backdrop-blur-sm md:p-8"
                onClick={closePreview}
                role="dialog"
                aria-modal="true"
                aria-label="Large floor plan preview"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/30 bg-[#F8F4F2] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] md:max-h-[calc(100vh-4rem)] md:p-5"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 md:pb-4">
                    <p className="font-(family-name:--font-cormorant) text-2xl text-[#5B3832] md:text-3xl">Floor Plan</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
                        disabled={zoom <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8BBA3]/25 bg-white/80 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Zoom out floor plan"
                      >
                        <ZoomOut className="h-4 w-4 text-[#5B3832]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))}
                        disabled={zoom >= 2.5}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8BBA3]/25 bg-white/80 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Zoom in floor plan"
                      >
                        <ZoomIn className="h-4 w-4 text-[#5B3832]" />
                      </button>
                      <button
                        type="button"
                        onClick={closePreview}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8BBA3]/25 bg-white/80 transition hover:bg-white"
                        aria-label="Close large floor plan"
                      >
                        <X className="h-4 w-4 text-[#5B3832]" />
                      </button>
                    </div>
                  </div>

                  <div className="relative min-h-0 flex-1 overflow-auto rounded-[1rem] border border-[#A8BBA3]/25 bg-white/80">
                    <div className="flex min-h-full min-w-full items-center justify-center p-3 md:p-6">
                      <Image
                        src="/images/floor-plan.png"
                        alt="Wedding floor plan enlarged"
                        width={1800}
                        height={1350}
                        className="h-auto max-h-[calc(100vh-9rem)] w-auto max-w-none origin-center object-contain transition-transform duration-200"
                        style={{ transform: `scale(${zoom})` }}
                        priority
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
