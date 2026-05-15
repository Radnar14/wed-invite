"use client"

const timelineEvents = [
  {
    time: "2:30 PM",
    title: "Guest Arrival",
    description: "Guests arrive and are seated for the ceremony",
  },
  {
    time: "3:00 PM",
    title: "Ceremony",
    description: "Exchange of vows in the garden pavilion",
  },
  {
    time: "3:45 PM",
    title: "Family Photos",
    description: "Family and wedding party photographs",
  },
  {
    time: "4:30 PM",
    title: "Cocktail Hour",
    description: "Enjoy hors d&apos;oeuvres and drinks on the terrace",
  },
  {
    time: "6:00 PM",
    title: "Reception",
    description: "Dinner, toasts, and celebration begin",
  },
  {
    time: "7:30 PM",
    title: "First Dance",
    description: "The couple&apos;s first dance as newlyweds",
  },
  {
    time: "8:00 PM",
    title: "Dancing & Celebration",
    description: "Dance the night away with live music",
  },
  {
    time: "11:00 PM",
    title: "Sparkler Send-Off",
    description: "Bid farewell to the happy couple",
  },
]

export function Timeline() {
  return (
    <section id="timeline" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            The Day
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Wedding Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.title}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-accent rounded-full md:-translate-x-1/2 -translate-x-1" />

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <p className="text-sm tracking-[0.2em] uppercase font-[family-name:var(--font-montserrat)] text-accent mb-2">
                      {event.time}
                    </p>
                    <h3 className="text-xl md:text-2xl font-light text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-montserrat)]">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
