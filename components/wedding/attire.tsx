"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const greenShades = [
  { name: "Sage", hex: "#9CAF88" },
  { name: "Olive", hex: "#708238" },
  { name: "Forest", hex: "#228B22" },
  { name: "Emerald", hex: "#50C878" },
  { name: "Moss", hex: "#8A9A5B" },
];

const brownShades = [
  { name: "Tan", hex: "#D2B48C" },
  { name: "Caramel", hex: "#FFD59A" },
  { name: "Chestnut", hex: "#954535" },
  { name: "Mocha", hex: "#967969" },
  { name: "Chocolate", hex: "#7B3F00" },
];

type Shade = {
  name: string;
  hex: string;
};

/** Gentleman figure: shirt + trousers */
function GentlemanFigure({ color }: { color: string }) {
  const darkColor = `color-mix(in srgb, ${color} 75%, #000)`;
  return (
    <svg viewBox="0 0 80 160" className="w-full h-full" aria-label="Gentleman outfit illustration">
      {/* Head */}
      <ellipse cx="40" cy="18" rx="12" ry="14" fill="#E8BEAC" />
      {/* Hair */}
      <ellipse cx="40" cy="8" rx="12" ry="7" fill="#4A3728" />

      {/* Neck */}
      <rect x="36" y="30" width="8" height="6" fill="#E8BEAC" />

      {/* Shirt body */}
      <path d="M18 40 L24 34 L36 38 L40 36 L44 38 L56 34 L62 40 L62 88 L18 88 Z" fill={color} />

      {/* Lapels / collar */}
      <path d="M36 38 L40 50 L44 38 L40 36 Z" fill="white" opacity="0.85" />
      <path d="M24 34 L36 38 L34 48" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <path d="M56 34 L44 38 L46 48" fill="none" stroke="white" strokeWidth="0.8" opacity="0.4" />

      {/* Shirt buttons */}
      <circle cx="40" cy="60" r="1.8" fill="white" opacity="0.6" />
      <circle cx="40" cy="72" r="1.8" fill="white" opacity="0.6" />
      <circle cx="40" cy="84" r="1.8" fill="white" opacity="0.6" />

      {/* Left sleeve */}
      <path d="M18 40 L10 42 L8 68 L18 66 Z" fill={color} />
      <rect x="7" y="66" width="11" height="5" rx="2" fill="#E8BEAC" />

      {/* Right sleeve */}
      <path d="M62 40 L70 42 L72 68 L62 66 Z" fill={color} />
      <rect x="62" y="66" width="11" height="5" rx="2" fill="#E8BEAC" />

      {/* Belt */}
      <rect x="18" y="86" width="44" height="6" rx="1" fill="#3A2A1A" />
      <rect x="36" y="87" width="8" height="4" rx="1" fill="#6B5540" />

      {/* Trousers — waistband */}
      <rect x="18" y="91" width="44" height="5" fill={darkColor} />

      {/* Left trouser leg */}
      <path d="M18 96 L37 96 L36 145 L19 148 Z" fill={darkColor} />
      {/* Right trouser leg */}
      <path d="M43 96 L62 96 L61 148 L41 145 Z" fill={darkColor} />

      {/* Crotch crease */}
      <path d="M37 96 Q40 108 43 96" fill="none" stroke="#00000030" strokeWidth="1" />

      {/* Trouser crease lines */}
      <line x1="27" y1="96" x2="26" y2="148" stroke="white" strokeWidth="0.6" opacity="0.15" />
      <line x1="53" y1="96" x2="54" y2="148" stroke="white" strokeWidth="0.6" opacity="0.15" />

      {/* Left shoe */}
      <ellipse cx="27" cy="152" rx="9" ry="4" fill="#2C1A0E" />
      {/* Right shoe */}
      <ellipse cx="53" cy="152" rx="9" ry="4" fill="#2C1A0E" />
    </svg>
  );
}

/** Lady figure: dress */
function LadyFigure({ color }: { color: string }) {
  const darkColor = `color-mix(in srgb, ${color} 80%, #000)`;
  return (
    <svg viewBox="0 0 80 160" className="w-full h-full" aria-label="Lady outfit illustration">
      {/* Head */}
      <ellipse cx="40" cy="16" rx="11" ry="13" fill="#E8BEAC" />
      {/* Hair — long, dark bun */}
      <ellipse cx="40" cy="7" rx="11" ry="6.5" fill="#3D2314" />
      <ellipse cx="40" cy="5" rx="5" ry="4" fill="#3D2314" />
      {/* Hair sides */}
      <path d="M29 10 Q26 22 28 30" stroke="#3D2314" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M51 10 Q54 22 52 30" stroke="#3D2314" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="36.5" y="28" width="7" height="6" fill="#E8BEAC" />

      {/* Bodice */}
      <path d="M26 34 Q40 30 54 34 L56 58 L24 58 Z" fill={color} />

      {/* Neckline detail */}
      <path d="M32 34 Q40 42 48 34" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />

      {/* Waist cinch */}
      <rect x="27" y="56" width="26" height="5" rx="2" fill={darkColor} />

      {/* Skirt — A-line, flares at hem */}
      <path d="M27 61 L22 58 L10 155 L70 155 L58 58 L53 61 Z" fill={color} />

      {/* Skirt flow lines */}
      <path d="M32 65 L22 155" stroke="white" strokeWidth="0.8" opacity="0.12" />
      <path d="M40 63 L40 155" stroke="white" strokeWidth="0.8" opacity="0.12" />
      <path d="M48 65 L58 155" stroke="white" strokeWidth="0.8" opacity="0.12" />

      {/* Left arm */}
      <path d="M26 34 L18 36 L14 62 L22 60 Z" fill={color} />
      <rect x="13" y="60" width="9" height="5" rx="2" fill="#E8BEAC" />

      {/* Right arm */}
      <path d="M54 34 L62 36 L66 62 L58 60 Z" fill={color} />
      <rect x="58" y="60" width="9" height="5" rx="2" fill="#E8BEAC" />

      {/* Shoes peeking below hem */}
      <ellipse cx="28" cy="156" rx="7" ry="3.5" fill="#2C1A0E" />
      <ellipse cx="52" cy="156" rx="7" ry="3.5" fill="#2C1A0E" />
    </svg>
  );
}

export function Attire() {
  const [selectedGreen, setSelectedGreen] = useState<Shade>(greenShades[0]);
  const [selectedBrown, setSelectedBrown] = useState<Shade>(brownShades[0]);
  const [activePalette, setActivePalette] = useState<"green" | "brown">("green");

  const activeShades = activePalette === "green" ? greenShades : brownShades;
  const activeSelection = activePalette === "green" ? selectedGreen : selectedBrown;

  const handleColorSelect = (color: Shade) => {
    if (activePalette === "green") {
      setSelectedGreen(color);
      return;
    }
    setSelectedBrown(color);
  };

  return (
    <section id="attire" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            What to Wear
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Dress Code
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            We kindly request our guests to wear shades of green or brown to
            match our wedding theme
          </p>
        </div>

        {/* Outfit cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 gap-3 md:gap-8 mb-8">
            {/* Gentleman card */}
            <div className="bg-secondary/30 rounded-2xl p-4 md:p-8 flex flex-col items-center">
              <h4 className="text-sm md:text-lg font-medium text-foreground text-center mb-4 md:mb-6">
                Gentlemen
              </h4>
              <div className="flex flex-col items-center gap-4">
                {/* Figure container — fixed aspect ratio so it never clips */}
                <div className="w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-40">
                  <GentlemanFigure color={activeSelection.hex} />
                </div>
                <p className="text-[10px] md:text-sm font-medium text-foreground capitalize text-center">
                  {activeSelection.name} Suit
                </p>
              </div>
            </div>

            {/* Lady card */}
            <div className="bg-secondary/30 rounded-2xl p-4 md:p-8 flex flex-col items-center">
              <h4 className="text-sm md:text-lg font-medium text-foreground text-center mb-4 md:mb-6">
                Ladies
              </h4>
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-28 sm:w-20 sm:h-36 md:w-24 md:h-40">
                  <LadyFigure color={activeSelection.hex} />
                </div>
                <p className="text-[10px] md:text-sm font-medium text-foreground capitalize text-center">
                  {activeSelection.name} Dress
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Color selector */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-secondary/30 p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-light text-foreground text-center mb-6">
            Select A Shade
          </h3>

          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full bg-background/80 p-1 border border-border">
              <button
                onClick={() => setActivePalette("green")}
                className={`px-5 py-2 text-sm rounded-full transition-colors ${
                  activePalette === "green"
                    ? "bg-[#5E7D57] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Green Shades
              </button>
              <button
                onClick={() => setActivePalette("brown")}
                className={`px-5 py-2 text-sm rounded-full transition-colors ${
                  activePalette === "brown"
                    ? "bg-[#6B4A3A] text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Brown Shades
              </button>
            </div>
          </div>

          <div className="flex flex-nowrap items-start justify-center gap-3 pb-3">
            {activeShades.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color)}
                className="group flex flex-col items-center shrink-0"
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 transition-all duration-300 flex items-center justify-center shadow-sm ${
                    activeSelection.name === color.name
                      ? "scale-110"
                      : "border-background hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.hex,
                    borderColor:
                      activeSelection.name === color.name
                        ? activePalette === "green"
                          ? "#5E7D57"
                          : "#6B4A3A"
                        : undefined,
                  }}
                >
                  {activeSelection.name === color.name && (
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-md" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic max-w-lg mx-auto">
            Feel free to choose either green or brown for your outfit. Cocktail
            or semi-formal attire is encouraged.
          </p>
        </div>
      </div>
    </section>
  );
}
