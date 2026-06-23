"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "When is the RSVP deadline?",
    answer: "Kindly RSVP by September 08, 2026, so we can have an accurate headcount for the venue and catering.",
  },
  {
    question: "What is the dress code?",
    answer: (
      <>
        <p>We kindly request Formal or Cocktail Attire for our celebration.</p>

        <p className="mt-4">
          <span className="font-semibold text-blushpink">Ladies:</span> Cocktail dress, midi dress, or other elegant formal attire with
          sleeves <span className="font-semibold">(please avoid sleeveless styles).</span>
        </p>

        <p className="mt-2">
          <span className="font-semibold text-[#8A9A5B]">Gentlemen:</span> Suit, blazer ensemble, or smart casual attire.
        </p>

        <p className="mt-4 italic text-shadow-accent font-semibold">Please refer to our Attire section for our preferred color palette.</p>
      </>
    ),
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity restrictions, we can only accommodate guests formally named on your invitation.",
  },
  {
    question: "Is there parking available?",
    answer: (
       <>
       <p>
       <span className="font-semibold">Yes</span>, both the
       <span className="font-semibold"> Archdiocesan Shrine of St. Thérèse chruch </span>and 
       <span className="font-semibold"> Beverly View Events Pavilion</span> have ample parking spaces available for our guests.
       </p>
       </> 

    )
      
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">Questions & Answers</h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto leading-relaxed">
            In case you have any questions, we've gathered all the key details below to help you prepare for our celebration.
          </p>
          <p className="mt-6 text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-(family-name:--font-montserrat)">
            {faqs.length} Frequently Asked Questions
          </p>
          <div className="mt-8 w-px h-16 bg-border mx-auto" />
        </div>

        <div className="bg-background rounded-[32px] shadow-xl shadow-black/5 border border-border/40 p-4 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/60">
                <AccordionTrigger
                  className="text-lg md:text-xl font-medium text-foreground hover:no-underline hover:text-accent
                            hover:bg-background/60 rounded-xl transition-all duration-300 py-6 px-5 text-left"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground bg-secondary/25 rounded-3xl px-6 py-4 font-(family-name:--font-montserrat) text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-10 text-center">
          <p className="text-base md:text-base font-semibold text-muted-foreground font-(family-name:--font-montserrat)">Still have a question?</p>

          <p className="mt-2 text-base italic text-muted-foreground">
            Feel free to reach out to the bride or groom, and we'd be happy to help.
          </p>
        </div>
      </div>
    </section>
  );
}
