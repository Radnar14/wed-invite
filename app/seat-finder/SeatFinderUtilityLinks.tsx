"use client";

import { useState, type ReactNode } from "react";
import FloorPlanViewer from "@/app/seat-finder/FloorPlanViewer";
import GuestsViewer from "@/app/seat-finder/GuestsViewer";

interface SeatFinderUtilityLinksProps {
  dark?: boolean;
  seatFinderContent?: ReactNode;
}

export default function SeatFinderUtilityLinks({ dark = false, seatFinderContent }: SeatFinderUtilityLinksProps) {
  const [activeView, setActiveView] = useState<"seat" | "guests" | "floor">("seat");

  const textClass = dark ? "text-white/90" : "text-[#7A5B54]";
  const metaClass = dark ? "text-white/70" : "text-[#A8BBA3]";
  const pillClass = dark ? "bg-white/10 border-white/20" : "bg-white/15 border-white/30";

  const renderPanel = () => {
    if (activeView === "guests") {
      return <GuestsViewer isOpen={true} onClose={() => setActiveView("seat")} />;
    }

    if (activeView === "floor") {
      return <FloorPlanViewer isOpen={true} onClose={() => setActiveView("seat")} />;
    }

    return seatFinderContent ?? null;
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl">
      <div className="transition-all duration-300 ease-out animate-[fadeInUp_0.45s_ease-out]">
        {renderPanel()}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[0.68rem] font-(family-name:--font-montserrat) uppercase tracking-[0.22em] sm:text-xs">
        <button
          type="button"
          onClick={() => setActiveView("seat")}
          className={`underline decoration-[#A8BBA3]/60 underline-offset-4 transition-all duration-200 hover:opacity-100 ${textClass} ${activeView === "seat" ? "opacity-100" : "opacity-80"}`}
        >
          Seat Plan
        </button>

        <span className={metaClass}>·</span>

        <button
          type="button"
          onClick={() => setActiveView("guests")}
          className={`underline decoration-[#A8BBA3]/60 underline-offset-4 transition-all duration-200 hover:opacity-100 ${textClass} ${activeView === "guests" ? "opacity-100" : "opacity-80"}`}
        >
          Guests
        </button>

        <span className={metaClass}>·</span>

        <button
          type="button"
          onClick={() => setActiveView("floor")}
          className={`underline decoration-[#A8BBA3]/60 underline-offset-4 transition-all duration-200 hover:opacity-100 ${textClass} ${activeView === "floor" ? "opacity-100" : "opacity-80"}`}
        >
          Floor Plan
        </button>
      </div>
    </div>
  );
}
