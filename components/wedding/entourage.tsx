"use client";

import {
  bearers,
  bridesParents,
  bridesSide,
  flowerGirls,
  groomsParents,
  groomsSide,
  primarySponsors,
  secondarySponsors,
  type EntourageMember,
} from "@/data/entourage";

// Component for Bride's Side and Groom's Side
function EntourageSide({ title, lead, members }: { title: string; lead: EntourageMember; members: EntourageMember[] }) {
  return (
    <div className="text-center">
      <h3 className="font-serif text-xl md:text-3xl text-[#8C6A5D] mb-3 font-bold">{title}</h3>

      <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-3"></div>
      {/* Card effect shadow */}
      <div
        className="text-center p-4 md:p-6 bg-background rounded-[28px] 
        border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
        hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      >
        <div className="grid gap-3">
          <div className="mx-auto max-w-xs">
            <p className="font-cursive text-1xl md:text-1xl text-blushpink italic font-bold">{lead.role}</p>

            <p className="font-cursive text-lg md:text-lg text-foreground mt-1">{lead.name}</p>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-px w-10 md:w-12 bg-[#d8cfc7]" />

            <span className="mx-3 text-blushpink text-sm">♥</span>

            <div className="h-px w-10 md:w-12 bg-[#d8cfc7]" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-4">
            {members.map((member, index) => {
              const isLastOddItem = members.length % 2 === 1 && index === members.length - 1;
              return (
                <div key={member.name} className={`text-center ${isLastOddItem ? "col-span-2 justify-self-center max-w-xs" : ""}`}>
                  <p className="text-blushpink text-sm tracking-[0.2em] italic mt-1">{member.role}</p>
                  <p className="font-cursive text-lg md:text-lg text-foreground mt-1">{member.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Entourage() {
  return (
    <section id="entourage" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-blushpink text-xs md:text-sm tracking-[0.3em] uppercase mb-3">The Wedding Party</p>
          <h2 className="text-4xl md:text-5xl font-cursive text-foreground mb-2 md:mb-4">Our Entourage</h2>
          <div className="w-16 md:w-24 h-px bg-[#d8cfc7] mx-auto" />
        </div>

        {/* Groom's Parents */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-cursive text-2xl md:text-4xl text-[#8C6A5D] mb-2 md:mb-4">Groom's Parents</h3>

          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-3"></div>
          {/* Card effect shadow */}
          <div
            className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="text-center">
              {groomsParents.map((parent) => (
                <div key={parent.name}>
                  <p className="text-sm md:text-base italic text-blushpink mt-1">{parent.role}</p>

                  <p className="font-serif text-lg md:text-xl text-foreground">{parent.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bride's Parents */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-cursive text-2xl md:text-4xl text-[#8C6A5D] mb-2 md:mb-4">Bride's Parents</h3>

          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-3"></div>
          {/* Card effect shadow */}
          <div
            className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="text-center">
              {bridesParents.map((parent) => (
                <div key={parent.name}>
                  <p className="text-sm md:text-base italic text-blushpink mt-1">{parent.role}</p>

                  <p className="font-serif text-lg md:text-xl text-foreground">{parent.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Principal Sponsors */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center  font-serif text-xl md:text-2xl text-[#8C6A5D] mb-2 md:mb-4">Principal Sponsors</h3>
          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-3"></div>
          {/* Card effect shadow */}
          <div
            className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
              {primarySponsors.map((sponsor) => {
                const [husband, wife] = sponsor.name.split(" & ");

                return (
                  <div key={sponsor.name} className="text-center">
                    <p className="font-serif text-lg md:text-base text-foreground leading-snug">
                      {husband} <span className="text-blushpink">&</span>
                    </p>

                    <p className="font-serif text-lg md:text-base text-foreground leading-snug">{wife}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bride's Side & Groom's Side */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12  md:mb-16">
          <EntourageSide title="Bride's Side" lead={bridesSide[0]} members={bridesSide.slice(1)} />

          <EntourageSide title="Groom's Side" lead={groomsSide[0]} members={groomsSide.slice(1)} />
        </div>

        {/* Secondary Sponsors */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-serif text-xl md:text-2xl text-[#8C6A5D] mb-2 md:mb-4">Secondary Sponsors</h3>

          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-4"></div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Card effect shadow */}
            <div
              className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Veil */}
              <h4 className="text-blushpink text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">Veil Sponsors</h4>
              {secondarySponsors.veil.map((name) => (
                <p key={name} className="font-serif text-lg md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>

            {/* Card effect shadow */}
            <div
              className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Cord */}
              <h4 className="text-blushpink text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">Cord Sponsors</h4>
              {secondarySponsors.cord.map((name) => (
                <p key={name} className="font-serif text-lg md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>

            {/* Card effect shadow */}
            <div
              className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              {/* Candle */}
              <h4 className="text-blushpink text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">Candle Sponsors</h4>
              {secondarySponsors.candle.map((name) => (
                <p key={name} className="font-serif text-lg md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Flower girls */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-serif text-xl md:text-2xl text-[#8C6A5D] mb-2 md:mb-4">Flower Girls</h3>

          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-4"></div>
          {/* Card effect shadow */}
          <div
            className="text-center p-4 md:p-6 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
              {flowerGirls.map((flower) => (
                <p key={flower.name} className="font-serif text-lg md:text-base text-foreground">
                  {flower.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bearers */}
        <div>
          <h3 className="text-center font-serif text-xl md:text-2xl text-[#8C6A5D] mb-2 md:mb-4">Bearers</h3>

          <div className="w-40 h-px bg-[#d8cfc7] mx-auto mb-4"></div>
          {/* Card effect shadow */}
          <div
            className="text-center p-4 md:p-4 bg-background rounded-[28px] 
            border border-border/40 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-300 
            hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-4 max-w-4xl mx-auto">
              {bearers.map((bearer) => (
                <div key={bearer.name}>
                  <p className="text-sm md:text-base italic text-blushpink mt-1">{bearer.role}</p>

                  <p className="font-serif text-lg md:text-lg text-foreground">{bearer.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
