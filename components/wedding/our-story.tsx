"use client"

import Image from "next/image"

export function OurStory() {
  return (
    <section id="story" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-montserrat)] text-muted-foreground mb-4">
            How It All Began
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            Our Love Story
          </h2>
        </div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/gallery-1.jpg"
              alt="Sarah and Michael together"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-light text-foreground">
              A Chance Encounter
            </h3>
            <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)] text-sm md:text-base">
              It was a crisp autumn evening in October 2020 when our paths first crossed at a friend&apos;s art gallery opening in downtown Manhattan. Sarah was admiring a painting, and Michael struck up a conversation about the artist. What started as a simple exchange about brushstrokes turned into hours of effortless conversation.
            </p>
            <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)] text-sm md:text-base">
              Over the following months, coffee dates turned into weekend adventures, and before we knew it, we had found in each other a kindred spirit—someone who understood our dreams, embraced our quirks, and made every ordinary moment feel extraordinary.
            </p>
            <p className="text-muted-foreground leading-relaxed font-[family-name:var(--font-montserrat)] text-sm md:text-base">
              On a magical evening in Paris, with the Eiffel Tower sparkling in the background, Michael got down on one knee and asked Sarah to spend forever together. Through tears of joy, she said yes—and now, we can&apos;t wait to celebrate this next chapter with all of you.
            </p>
            <div className="pt-4">
              <p className="text-lg italic text-foreground">
                &ldquo;In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.&rdquo;
              </p>
              <p className="text-sm text-muted-foreground mt-2 font-[family-name:var(--font-montserrat)]">
                — Maya Angelou
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
