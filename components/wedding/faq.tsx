"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "When is the RSVP deadline?",
    answer: "Kindly RSVP by November 15, 2026, so we can have an accurate headcount for the venue and catering."
  },
  {
    question: "What is the dress code?",
    answer: "We are requesting a Modern Filipiniana dress code. Ladies may wear formal gowns, and gentlemen are encouraged to wear Barong Tagalog or a formal suit. Please refer to our Attire section for our preferred color palette."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Due to venue capacity restrictions, we can only accommodate guests formally named on your invitation."
  },
  {
    question: "Are kids welcome?",
    answer: "While we love your little ones, our wedding will be an adults-only celebration. We hope you can enjoy a parents' night out!"
  },
  {
    question: "Is there parking available?",
    answer: "Yes, both the Chapel of San Pedro Calungsod and Marco Polo Plaza Cebu have ample parking spaces available for our guests."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
      <div className="text-center mb-16 md:mb-20">
  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
    Questions & Answers
  </h2>
  <p className="mt-4 text-sm md:text-base text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto leading-relaxed">
    In case you have any questions, we've gathered all the key details below to help you prepare for our celebration.
  </p>
  <div className="mt-8 w-px h-16 bg-border mx-auto" />
</div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/60">
              <AccordionTrigger className="text-lg md:text-xl font-light text-foreground hover:no-underline hover:text-accent transition-colors py-6 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-(family-name:--font-montserrat) text-sm md:text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
