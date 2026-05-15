"use client"

import { MapPin, Clock, Shirt, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const details = [
  {
    icon: MapPin,
    title: "Venue",
    content: [
      "The Grand Estate",
      "1234 Garden Lane",
      "Napa Valley, CA 94559",
    ],
  },
  {
    icon: Clock,
    title: "Schedule",
    content: [
      "Ceremony: 3:00 PM",
      "Cocktail Hour: 4:30 PM",
      "Reception: 6:00 PM",
    ],
  },
  {
    icon: Shirt,
    title: "Dress Code",
    content: [
      "Black Tie Optional",
      "Ladies: Floor-length gowns",
      "Gentlemen: Dark suits or tuxedos",
    ],
  },
  {
    icon: Mail,
    title: "Contact",
    content: [
      "For any questions,",
      "please reach out to us at:",
      "wedding@sarahandmichael.com",
    ],
  },
]

export function Details() {
  return (
    <section id="details" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            The Celebration
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Wedding Details
          </h2>
        </div>

        {/* Details Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {details.map((detail) => (
            <Card
              key={detail.title}
              className="bg-card border-none shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <detail.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-4">
                  {detail.title}
                </h3>
                <div className="space-y-1">
                  {detail.content.map((line, index) => (
                    <p
                      key={index}
                      className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-sm overflow-hidden bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764029999999!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80857e9b6b6e2c8d%3A0x7f1cd2d4d6d0e0a0!2sNapa%20Valley%2C%20CA!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding venue location"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4 font-[family-name:var(--font-montserrat)]">
            Click the map for directions to The Grand Estate
          </p>
        </div>
      </div>
    </section>
  )
}
