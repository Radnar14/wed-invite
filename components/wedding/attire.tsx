"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const greenShades = [
  { name: "Sage", hex: "#9CAF88" },
  { name: "Olive", hex: "#708238" },
  { name: "Forest", hex: "#228B22" },
  { name: "Emerald", hex: "#50C878" },
  { name: "Hunter", hex: "#355E3B" },
  { name: "Moss", hex: "#8A9A5B" },
];

const brownShades = [
  { name: "Tan", hex: "#D2B48C" },
  { name: "Caramel", hex: "#FFD59A" },
  { name: "Chestnut", hex: "#954535" },
  { name: "Mocha", hex: "#967969" },
  { name: "Chocolate", hex: "#7B3F00" },
  { name: "Taupe", hex: "#483C32" },
];

type Shade = {
  name: string;
  hex: string;
};

export function Attire() {
  const [selectedGreen, setSelectedGreen] = useState<Shade>(greenShades[0]);
  const [selectedBrown, setSelectedBrown] = useState<Shade>(brownShades[0]);
  const [activePalette, setActivePalette] = useState<"green" | "brown">(
    "green",
  );

  const activeShades = activePalette === "green" ? greenShades : brownShades;
  const activeSelection =
    activePalette === "green" ? selectedGreen : selectedBrown;

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

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-light text-foreground mb-8 text-center">
            Preview Your Look
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-secondary/30 rounded-2xl p-8">
              <h4 className="text-lg font-medium text-foreground text-center mb-6">
                Gentlemen
              </h4>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-36 shrink-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full bg-[#E8BEAC]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 rounded-t-full bg-[#4A3728]" />
                  <svg
                    viewBox="0 0 60 70"
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-24"
                  >
                    <path
                      d="M5 10 L15 0 L30 5 L45 0 L55 10 L55 70 L30 65 L5 70 Z"
                      fill={selectedGreen.hex}
                    />
                    <path
                      d="M15 0 L22 20 L30 5 L38 20 L45 0"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    <path
                      d="M22 20 L30 5 L38 20 L32 65 L28 65 Z"
                      fill="#FFFFFF"
                    />
                    <circle cx="24" cy="35" r="1.5" fill="#fff" opacity="0.5" />
                    <circle cx="24" cy="45" r="1.5" fill="#fff" opacity="0.5" />
                  </svg>
                  <svg
                    viewBox="0 0 40 30"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-10"
                  >
                    <path
                      d="M5 0 L35 0 L38 30 L22 30 L20 8 L18 30 L2 30 Z"
                      fill={selectedGreen.hex}
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Green Option
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full suit in {selectedGreen.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-36 shrink-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full bg-[#E8BEAC]" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 rounded-t-full bg-[#4A3728]" />
                  <svg
                    viewBox="0 0 60 70"
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-24"
                  >
                    <path
                      d="M5 10 L15 0 L30 5 L45 0 L55 10 L55 70 L30 65 L5 70 Z"
                      fill={selectedBrown.hex}
                    />
                    <path
                      d="M15 0 L22 20 L30 5 L38 20 L45 0"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                    <path
                      d="M22 20 L30 5 L38 20 L32 65 L28 65 Z"
                      fill="#FFFFFF"
                    />
                    <circle cx="24" cy="35" r="1.5" fill="#fff" opacity="0.5" />
                    <circle cx="24" cy="45" r="1.5" fill="#fff" opacity="0.5" />
                  </svg>
                  <svg
                    viewBox="0 0 40 30"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-10"
                  >
                    <path
                      d="M5 0 L35 0 L38 30 L22 30 L20 8 L18 30 L2 30 Z"
                      fill={selectedBrown.hex}
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Brown Option
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Full suit in {selectedBrown.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-2xl p-8">
              <h4 className="text-lg font-medium text-foreground text-center mb-6">
                Ladies
              </h4>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative w-24 h-36 shrink-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full bg-[#E8BEAC]" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-8 rounded-t-full bg-[#3D2314]" />
                  <div className="absolute top-4 left-[calc(50%-16px)] w-3 h-8 rounded-bl-full bg-[#3D2314]" />
                  <div className="absolute top-4 right-[calc(50%-16px)] w-3 h-8 rounded-br-full bg-[#3D2314]" />
                  <svg
                    viewBox="0 0 70 90"
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-22 h-28"
                  >
                    <path
                      d="M20 0 C20 0 25 3 35 3 C45 3 50 0 50 0 L52 10 L48 12 L50 15 L60 90 L10 90 L20 15 L22 12 L18 10 Z"
                      fill={selectedGreen.hex}
                    />
                    <path
                      d="M25 35 L22 90"
                      stroke={selectedGreen.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                    <path
                      d="M35 32 L35 90"
                      stroke={selectedGreen.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                    <path
                      d="M45 35 L48 90"
                      stroke={selectedGreen.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Green Option
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dress in {selectedGreen.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-36 shrink-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full bg-[#E8BEAC]" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-8 rounded-t-full bg-[#3D2314]" />
                  <div className="absolute top-4 left-[calc(50%-16px)] w-3 h-8 rounded-bl-full bg-[#3D2314]" />
                  <div className="absolute top-4 right-[calc(50%-16px)] w-3 h-8 rounded-br-full bg-[#3D2314]" />
                  <svg
                    viewBox="0 0 70 90"
                    className="absolute top-8 left-1/2 -translate-x-1/2 w-22 h-28"
                  >
                    <path
                      d="M20 0 C20 0 25 3 35 3 C45 3 50 0 50 0 L52 10 L48 12 L50 15 L60 90 L10 90 L20 15 L22 12 L18 10 Z"
                      fill={selectedBrown.hex}
                    />
                    <path
                      d="M25 35 L22 90"
                      stroke={selectedBrown.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                    <path
                      d="M35 32 L35 90"
                      stroke={selectedBrown.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                    <path
                      d="M45 35 L48 90"
                      stroke={selectedBrown.hex}
                      strokeWidth="1"
                      style={{ filter: "brightness(0.85)" }}
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Brown Option
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dress in {selectedBrown.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-4 rounded-3xl bg-secondary/30 p-8 md:p-10">
          <h3 className="text-2xl font-light text-foreground text-center mb-6">
            Select A Shade To Preview Attire
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

          <p className="mt-2 text-center text-lg text-foreground">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
              style={{ backgroundColor: activeSelection.hex }}
            />
            <span className="align-middle">{activeSelection.name}</span>
          </p>
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
