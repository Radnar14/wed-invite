"use client"

import Image from "next/image"

interface EntourageMember {
  name: string
  role: string
  image?: string
}

const bridesSide: EntourageMember[] = [
  { name: "Maria Santos", role: "Maid of Honor" },
  { name: "Angela Cruz", role: "Bridesmaid" },
  { name: "Patricia Reyes", role: "Bridesmaid" },
  { name: "Isabella Garcia", role: "Bridesmaid" },
]

const groomsSide: EntourageMember[] = [
  { name: "Carlos Mendoza", role: "Best Man" },
  { name: "Miguel Torres", role: "Groomsman" },
  { name: "Rafael Santos", role: "Groomsman" },
  { name: "Antonio Reyes", role: "Groomsman" },
]

const primarySponsors: EntourageMember[] = [
  { name: "Mr. & Mrs. Eduardo Santos", role: "Principal Sponsor" },
  { name: "Mr. & Mrs. Roberto Cruz", role: "Principal Sponsor" },
  { name: "Mr. & Mrs. Fernando Garcia", role: "Principal Sponsor" },
  { name: "Mr. & Mrs. Alejandro Mendoza", role: "Principal Sponsor" },
]

const secondarySponsors = {
  veil: ["Mrs. Carmen Santos", "Mrs. Elena Cruz"],
  cord: ["Mr. Ricardo Torres", "Mrs. Sofia Reyes"],
  candle: ["Mr. Luis Garcia", "Mrs. Ana Mendoza"],
}

const bearers: EntourageMember[] = [
  { name: "Lucas Santos", role: "Ring Bearer" },
  { name: "Sofia Cruz", role: "Flower Girl" },
  { name: "Emma Garcia", role: "Flower Girl" },
  { name: "Gabriel Mendoza", role: "Bible Bearer" },
]

function MemberCard({ member }: { member: EntourageMember }) {
  return (
    <div className="text-center group">
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-2xl md:text-3xl text-accent/60 font-serif">
            {member.name.charAt(0)}
          </span>
        )}
      </div>
      <h4 className="font-serif text-sm md:text-base text-foreground">{member.name}</h4>
      <p className="text-xs text-muted-foreground tracking-wide uppercase mt-1">
        {member.role}
      </p>
    </div>
  )
}

export function Entourage() {
  return (
    <section id="entourage" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-accent text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
            The Wedding Party
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            Our Entourage
          </h2>
          <div className="w-16 md:w-24 h-px bg-accent mx-auto" />
        </div>

        {/* Principal Sponsors */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-serif text-xl md:text-2xl text-foreground mb-6 md:mb-8">
            Principal Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {primarySponsors.map((sponsor) => (
              <MemberCard key={sponsor.name} member={sponsor} />
            ))}
          </div>
        </div>

        {/* Bride's Side & Groom's Side */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Bride's Side */}
          <div className="text-center">
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-6 md:mb-8">
              Bride&apos;s Side
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {bridesSide.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* Groom's Side */}
          <div className="text-center">
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-6 md:mb-8">
              Groom&apos;s Side
            </h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {groomsSide.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Sponsors */}
        <div className="mb-12 md:mb-16">
          <h3 className="text-center font-serif text-xl md:text-2xl text-foreground mb-6 md:mb-8">
            Secondary Sponsors
          </h3>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Veil */}
            <div className="text-center p-4 md:p-6 bg-background rounded-lg">
              <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
                Veil Sponsors
              </h4>
              {secondarySponsors.veil.map((name) => (
                <p key={name} className="font-serif text-sm md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>

            {/* Cord */}
            <div className="text-center p-4 md:p-6 bg-background rounded-lg">
              <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
                Cord Sponsors
              </h4>
              {secondarySponsors.cord.map((name) => (
                <p key={name} className="font-serif text-sm md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>

            {/* Candle */}
            <div className="text-center p-4 md:p-6 bg-background rounded-lg">
              <h4 className="text-accent text-xs tracking-[0.2em] uppercase mb-3 md:mb-4">
                Candle Sponsors
              </h4>
              {secondarySponsors.candle.map((name) => (
                <p key={name} className="font-serif text-sm md:text-base text-foreground mb-1">
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bearers */}
        <div>
          <h3 className="text-center font-serif text-xl md:text-2xl text-foreground mb-6 md:mb-8">
            Bearers
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {bearers.map((bearer) => (
              <MemberCard key={bearer.name} member={bearer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
