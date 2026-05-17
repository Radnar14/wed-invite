"use client"

import Image from "next/image"

interface EntourageMember {
  name: string
  role: string
  /* image?: string */
}
/* NOt yet Added */
/*const GroomsParents: EntourageMember[] = [
  { name: "Glen Abad", role: "Father" },
  { name: "Sarah Abad", role: "Mother" },

]
/* NOt yet Added */
/*const BridesParents: EntourageMember[] = [
  { name: "Tarcisio Dela Cruz", role: "Father" },
  { name: "Amilita Dela Cruz", role: "Mother" },
]
*/

/* 
  JM INSTRUCTIONS FOR IMAGE:
  To add real images for any member, add an 'image' property to their object.
  Example: { name: "Maria Santos", role: "Maid of Honor", image: "/images/maria.jpg" }
  Place the image files in the 'public/images/' folder.
  TO REMOVE PLACEHOLDERS ENTIRELY: Once you have real images for everyone, delete the `getPlaceholderImage`
   function and update `MemberCard` to use: const imageSrc = member.image || "/images/placeholder-user.jpg"
*/

const bridesSide: EntourageMember[] = [
  { name: "Maria Santos", role: "Maid of Honor" },
  { name: "Shinn Everielle Booc", role: "Bridesmaid" },
  { name: "Jemmelyn Pescadero", role: "Bridesmaid" },
  { name: "Jomily Irisawa", role: "Bridesmaid" },
  { name: "Majesca Shane Zamora", role: "Bridesmaid" },
  { name: "Candice Pastor", role: "Bridesmaid" },
  { name: "Sofia Garcia", role: "Bridesmaid" },
]

const groomsSide: EntourageMember[] = [
  { name: "Carlos Mendoza", role: "Best Man" },
  { name: "Niño Anton Liloan", role: "Groomsman" },
  { name: "Eizel Jimenez", role: "Groomsman" },
  { name: "Josh Nicolaus Abad", role: "Groomsman" },
  { name: "Leonardo Berjame", role: "Groomsman" },
  { name: "Axziel Bartolabac", role: "Groomsman" },
  { name: "James Vincent Abad", role: "Groomsman" },
]

const primarySponsors: EntourageMember[] = [
  { name: "Mr. Elson Manlunas & Mrs. Fe Manlunas", role: "" },
  { name: "Mr. Eric Esconde & Mrs. Mary Grace Esconde", role: "" },
  { name: "Mr. Dante Argallon & Mrs. Arlene Argallon", role: "" },
  { name: "Mr. Junrey Bartolabac & Mrs. Rowena Bartolabac", role: "" },
  { name: "Mr. Engr. Paul Bugarin & Mrs. Mira Bugarin", role: "" },
  { name: "Mr. Kap Alley Berdin & Mrs. Victoria Gerra", role: "" },
  { name: "Mr. Allan Caballero & Mrs. Engr. Criselda Caballero", role: "" },
  { name: "Mr. Jeson Agosto & Mrs. Elmarie Agosto", role: "" },
  { name: "Mr. Eduardo Pino & Mrs. Myrna Ybañez", role: "" },

]

const secondarySponsors = {
  veil: ["Mr. Vincy Ceniza", "Mrs. Orje Marey Ceniza"],
  cord: ["Mr. Ricardo Torres", "Mrs. Sofia Reyes"],
  candle: ["Mr. Charles Bott", "Mrs. Charmie Sheen Bott"],
}

const bearers: EntourageMember[] = [
  { name: "Gabriella Eloise Bott", role: "Flower Girl" },
  { name: "Sophia Scarlett Marqueses", role: "Flower Girl" },
  { name: "Sophia Syziel Bartolabac", role: "Flower Girl" },
  { name: "Arianne Argallon", role: "Flower Girl" },
  { name: "Hannah Mae Abad", role: "Flower Girl" },
  { name: "Elias Caden Marquesess", role: "Ring Bearer" },
  { name: "Abiel Jimenez", role: "Bible Bearer" },
  { name: "Zeijan Wryle Ybañez", role: "Coin Bearer" },
]

const getPlaceholderImage = (name: string) => {
  const placeholders = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
  ]
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % placeholders.length
  return placeholders[index]
}

{/*Img circle frame of each member */}
function MemberCard({ member }: { member: EntourageMember }) {
  const imageSrc = member.image || getPlaceholderImage(member.name)

  return (
    <div className="text-center group">
      {/* Img circle frame of each member */}
      <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
        <Image
          src={imageSrc}
          alt={member.name}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      {/* <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-accent/20 group-hover:border-accent transition-colors">
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
      </div> */}
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
          <h2 className="text-3xl md:text-5xl font-cursive text-foreground mb-4">
            The Entourage
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
