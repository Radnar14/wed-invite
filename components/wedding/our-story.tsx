"use client";

import Image from "next/image";

export function OurStory() {
  return (
    <section id="story" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-blushpink mb-4">How It All Began</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">Our Love Story</h2>
        </div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative aspect-4/5 rounded-sm overflow-hidden">
            <Image src="/gallery/images/gallery-1.jpg" alt="John Mark and Chezza together" fill className="object-cover" />
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-light text-foreground">THE LOVE THAT STAYED</h3>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              Back in first year high school, John Mark had just transferred to a new school. At the time, he and Chezza were simply
              classmates, living ordinary school days without knowing that life was already quietly writing their story.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              For John Mark, it was love at first sight.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              While Chezza went about her days completely unaware, John Mark quietly admired her from afar. The only problem was—he was
              torpe.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              So instead of confessing, he kept his feelings to himself for almost three years. Then, in July 2013, he finally gathered the
              courage to tell Chezza how he felt.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              Chezza said no.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              Not because the story was ending, but because she had no idea he had been carrying those feelings all that time. Perhaps, it
              simply wasn't the right timing yet. But some love stories have a way of finding their moment.Through patience, sincerity, and
              quiet persistence, John Mark slowly found his way into Chezza's heart.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              So when February 14, 2014 arrived and he asked her one more time—
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              she finally said yes.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              What began as a quiet high school crush soon grew into a love that would accompany them through every season of life. Twelve
              years later, after growing up side by side and choosing each other every step of the way, John Mark found himself asking
              Chezza a familiar question once again—this time, with forever in mind.
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              And just like she did years ago—
            </p>
            <p className="text-muted-foreground leading-relaxed font-(family-name:--font-montserrat) text-sm md:text-base">
              Chezza said yes. ❤️
            </p>
            <div className="pt-4">
              <p className="text-lg italic text-foreground">
                What began as a simple high school love story has led us here—to a lifetime of choosing each other, every single day.
              </p>
              <p className="text-lg italic text-foreground">
                As we turn the page to our next chapter, we are grateful to have our family and friends beside us. Thank you for being part
                of our journey and for celebrating this moment with us.
              </p>
   
              <p className="text-sm font-semibold text-muted-foreground mt-2 font-(family-name:--font-montserrat)">
                Our story continues, and we can't wait to write the rest of it together. ❤️
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
