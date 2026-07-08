"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  assignedColorLabels,
  attireRoles,
  attireText,
  greenShades,
  sponsorAttire,
  type AttireShade,
} from "@/data/attire";

type AttireRole = (typeof attireRoles)[number]["id"];

const attireColorClasses: Record<string, string> = {
  "#B7C8A6": "bg-[#B7C8A6]",
  "#A8B89A": "bg-[#A8B89A]",
  "#9CAF88": "bg-[#9CAF88]",
  "#8FA37D": "bg-[#8FA37D]",
  "#7F8F6E": "bg-[#7F8F6E]",
  "#F3E7D4": "bg-[#F3E7D4]",
  "#F8F5EE": "bg-[#F8F5EE]",
  "#E5D1AE": "bg-[#E5D1AE]",
  "#D7C3A3": "bg-[#D7C3A3]",
};

function getAttireColorClass(color: string) {
  return attireColorClasses[color] ?? "bg-transparent";
}

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

/** Barong figure: embroidered untucked formal shirt + trousers */
function BarongFigure({ color }: { color: string }) {
  const trimColor = `color-mix(in srgb, ${color} 72%, #8B735C)`;
  const pantsColor = `color-mix(in srgb, ${color} 48%, #3B352D)`;

  return (
    <svg viewBox="0 0 80 160" className="w-full h-full" aria-label="Barong outfit illustration">
      {/* Head */}
      <ellipse cx="40" cy="18" rx="12" ry="14" fill="#E8BEAC" />
      {/* Hair */}
      <ellipse cx="40" cy="8" rx="12" ry="7" fill="#4A3728" />

      {/* Neck */}
      <rect x="36" y="30" width="8" height="6" fill="#E8BEAC" />

      {/* Trousers behind the barong */}
      <path d="M21 92 L37 92 L36 146 L22 148 Z" fill={pantsColor} />
      <path d="M43 92 L59 92 L58 148 L44 146 Z" fill={pantsColor} />
      <line x1="29" y1="95" x2="28" y2="147" stroke="white" strokeWidth="0.6" opacity="0.15" />
      <line x1="51" y1="95" x2="52" y2="147" stroke="white" strokeWidth="0.6" opacity="0.15" />

      {/* Barong body: loose and untucked */}
      <path d="M18 40 L25 34 L34 37 L40 35 L46 37 L55 34 L62 40 L64 96 Q52 101 40 98 Q28 101 16 96 Z" fill={color} />
      <path d="M18 40 L10 43 L8 69 L18 67 Z" fill={color} />
      <path d="M62 40 L70 43 L72 69 L62 67 Z" fill={color} />
      <rect x="7" y="67" width="11" height="5" rx="2" fill="#E8BEAC" />
      <rect x="62" y="67" width="11" height="5" rx="2" fill="#E8BEAC" />

      {/* Collar and placket */}
      <path d="M34 37 L40 48 L46 37 L40 35 Z" fill="#FFFFFF" opacity="0.65" />
      <path d="M40 45 L40 91" stroke={trimColor} strokeWidth="2" opacity="0.75" />
      <circle cx="40" cy="57" r="1.5" fill={trimColor} opacity="0.8" />
      <circle cx="40" cy="69" r="1.5" fill={trimColor} opacity="0.8" />
      <circle cx="40" cy="81" r="1.5" fill={trimColor} opacity="0.8" />

      {/* Embroidery panels */}
      <path d="M30 48 C27 58 27 75 30 88" fill="none" stroke={trimColor} strokeWidth="1.3" opacity="0.65" />
      <path d="M50 48 C53 58 53 75 50 88" fill="none" stroke={trimColor} strokeWidth="1.3" opacity="0.65" />
      <path d="M30 54 L34 57 L30 60 L26 57 Z" fill={trimColor} opacity="0.45" />
      <path d="M50 54 L54 57 L50 60 L46 57 Z" fill={trimColor} opacity="0.45" />
      <path d="M30 70 L34 73 L30 76 L26 73 Z" fill={trimColor} opacity="0.45" />
      <path d="M50 70 L54 73 L50 76 L46 73 Z" fill={trimColor} opacity="0.45" />

      {/* Side slits and hem */}
      <path d="M20 82 L16 96" stroke="#00000025" strokeWidth="1" />
      <path d="M60 82 L64 96" stroke="#00000025" strokeWidth="1" />
      <path d="M18 94 Q40 101 62 94" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" />

      {/* Shoes */}
      <ellipse cx="28" cy="152" rx="9" ry="4" fill="#2C1A0E" />
      <ellipse cx="52" cy="152" rx="9" ry="4" fill="#2C1A0E" />
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
  const [selectedGreen, setSelectedGreen] = useState<AttireShade>(greenShades[2]);
  const [selectedRole, setSelectedRole] = useState<AttireRole>("guests");

  const activeAttire =
    selectedRole === "guests"
      ? {
          role: "Guests",
          note: "Shades of green",
          women: {
            label: `${selectedGreen.name} Dress`,
            color: selectedGreen.hex,
          },
          men: {
            label: `${selectedGreen.name} Suit`,
            color: selectedGreen.hex,
          },
        }
      : sponsorAttire[selectedRole];

  const isGuestRole = selectedRole === "guests";

  return (
    <section id="attire" className="bg-linear-to-b from-secondary via-secondary/70 to-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="mb-14 text-center md:mb-18">
          <p className="mb-4 text-sm tracking-[0.3em] uppercase text-blushpink font-(family-name:--font-montserrat)">What to Wear</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">Dress Code</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground font-(family-name:--font-montserrat) md:text-base">
            {attireText.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-4xl border border-blushpink/10 bg-linear-to-br from-background/95 via-background/80 to-blushpink/5 p-5 shadow-[0_24px_70px_rgba(68,45,40,0.07)] backdrop-blur-sm md:p-10">
            <div className="mb-8 flex min-h-32 flex-col items-center justify-center text-center md:mb-10">
              <h3 className="text-2xl md:text-3xl font-light text-foreground">{activeAttire.role}</h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">{activeAttire.note}</p>

              {isGuestRole && (
                <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#8A9A5B] font-(family-name:--font-montserrat) md:text-xs">
                  {attireText.guestRecommendation}
                </p>
              )}
              <div className="mt-4 h-px w-12 bg-blushpink/50" />
            </div>

            <div className="transition-all duration-300">
              <div className="grid grid-cols-2">
                <div className="flex min-h-60 flex-col items-center gap-4 border-r border-border/50 px-2 md:min-h-64 md:px-8">
                  {/* Figure container - fixed aspect ratio so it never clips */}
                  <div className="flex h-38 w-28 items-center justify-center rounded-[50%] bg-secondary/45 sm:h-44 sm:w-36 md:h-48 md:w-40">
                    <div className="h-32 w-18 sm:h-38 sm:w-20 md:h-42 md:w-24">
                      {isGuestRole ? <GentlemanFigure color={activeAttire.men.color} /> : <BarongFigure color={activeAttire.men.color} />}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-medium text-foreground md:text-lg">{attireText.gentlemenLabel}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground font-(family-name:--font-montserrat) md:text-xs">
                      {activeAttire.men.label}
                    </p>
                  </div>
                </div>

                <div className="flex min-h-60 flex-col items-center gap-4 px-2 md:min-h-64 md:px-8">
                  <div className="flex h-38 w-28 items-center justify-center rounded-[50%] bg-secondary/45 sm:h-44 sm:w-36 md:h-48 md:w-40">
                    <div className="h-32 w-18 sm:h-38 sm:w-20 md:h-42 md:w-24">
                      <LadyFigure color={activeAttire.women.color} />
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-medium text-foreground md:text-lg">{attireText.ladiesLabel}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground font-(family-name:--font-montserrat) md:text-xs">
                      {activeAttire.women.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <div className="relative grid w-full max-w-lg grid-cols-3 rounded-full border border-border/40 bg-secondary/60 p-1.5">
                <div
                  className={`absolute top-1.5 bottom-1.5 rounded-full bg-blushpink/20 shadow-sm ring-1 ring-blushpink/15 transition-all duration-500 ease-out
    ${
      selectedRole === "guests"
        ? "left-1.5 w-[calc(33.333%-4px)]"
        : selectedRole === "principal"
          ? "left-[33.333%] w-[calc(33.333%-2px)]"
          : "left-[66.666%] w-[calc(33.333%-4px)]"
    }`}
                />
                {attireRoles.map((role) => {
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`relative z-10 rounded-full px-3 py-2.5 text-xs font-medium tracking-wide transition-colors duration-300 font-(family-name:--font-montserrat) md:text-sm ${
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {role.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 min-h-36 border-t border-border/50 pt-6">
              {isGuestRole ? (
                <>
                  <h4 className="mb-5 text-center text-sm font-light uppercase tracking-[0.15em] text-foreground font-(family-name:--font-montserrat)">
                    {attireText.shadeHeading}
                  </h4>

                  <div className="flex flex-nowrap items-start justify-center gap-3 md:gap-4">
                    {greenShades.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedGreen(color)}
                        className="group flex flex-col items-center shrink-0"
                        aria-label={`Select ${color.name}`}
                      >
                        <div
                          className={`rounded-full border-4 transition-all duration-300 flex items-center justify-center shadow-sm ${getAttireColorClass(color.hex)} ${
                            selectedGreen.name === color.name
                              ? "w-14 h-14 md:w-16 md:h-16 scale-105 border-[#5E7D57]"
                              : "w-11 h-11 md:w-12 md:h-12 border-background hover:scale-105"
                          }`}
                        >
                          {selectedGreen.name === color.name && <Check className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow-md" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h4 className="mb-5 text-center text-sm font-light uppercase tracking-[0.15em] text-foreground font-(family-name:--font-montserrat)">
                    {attireText.assignedPaletteHeading}
                  </h4>

                  <div className="flex justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                        {assignedColorLabels.map((label) => {
                          const attire = label.name === "Women" ? activeAttire.women : activeAttire.men;
                          return (
                            <div key={label.name} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                              <span
                                className={`h-11 w-11 rounded-full border-4 border-background shadow-sm ring-1 ring-border/40 md:h-12 md:w-12 ${getAttireColorClass(attire.color)}`}
                              />
                              <span>
                                {label.name}: {attire.label.replace(" Gown", "").replace(" Barong", "")}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-border/40 pt-5 text-center">
              <p className="text-xs italic text-muted-foreground md:text-sm">{attireText.footerNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
