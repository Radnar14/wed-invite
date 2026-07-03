"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/data/faq";
import { ArrowRight, Heart, Plus } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden bg-secondary py-24 md:py-32">
      {/* Decorative stationery details; FAQ wording remains in data/faq.ts. */}
      <Heart className="absolute -left-8 top-28 h-32 w-32 rotate-[-18deg] text-blushpink/8" strokeWidth={0.7} />
      <Heart className="absolute -right-10 bottom-44 h-40 w-40 rotate-12 text-blushpink/8" strokeWidth={0.7} />

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-blushpink/40" />
            <p className="text-xs uppercase tracking-[0.35em] text-blushpink font-(family-name:--font-montserrat)">Need to Know</p>
            <span className="h-px w-10 bg-blushpink/40" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground">Questions & Answers</h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground font-(family-name:--font-montserrat) md:text-base">
            In case you have any questions, we've gathered all the key details below to help you prepare for our celebration.
          </p>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-blushpink/50">
            <span className="h-px w-14 bg-current" />
            <span className="h-1.5 w-1.5 rotate-45 bg-current" />
            <span className="h-px w-14 bg-current" />
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className={`overflow-hidden rounded-3xl border border-blushpink/15 shadow-[0_10px_35px_rgba(68,45,40,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(68,45,40,0.08)] ${
                index % 2 === 0 ? "bg-background/90" : "bg-blushpink/5"
              }`}
            >
              <AccordionTrigger className="group items-center gap-4 px-5 py-6 text-left hover:no-underline [&>svg]:hidden md:px-8 md:py-7">
                <span className="shrink-0 font-serif text-xl text-blushpink/75 md:text-2xl">{String(index + 1).padStart(2, "0")}</span>
                <span className="h-8 w-px shrink-0 bg-blushpink/25" />
                <span className="flex-1 text-lg font-light text-foreground transition-colors group-hover:text-accent md:text-xl">{faq.question}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blushpink/30 text-blushpink">
                  <Plus className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-45" strokeWidth={1.5} />
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6 pt-0 md:px-8 md:pb-8">
                <div className="ml-0 border-t border-blushpink/15 pt-5 text-sm leading-relaxed text-muted-foreground font-(family-name:--font-montserrat) md:ml-16 md:text-base">
                  {faq.answer.map((paragraph, paragraphIndex) => (
                    <p key={paragraph} className={paragraphIndex > 0 ? "mt-4" : undefined}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact details stay in one place; this button only links to them. */}
        <div className="mt-10 rounded-[32px] border border-blushpink/15 bg-background/75 px-6 py-9 text-center shadow-[0_12px_40px_rgba(68,45,40,0.05)] md:mt-12 md:px-10">
          <Heart className="mx-auto h-5 w-5 text-blushpink/70" fill="currentColor" strokeWidth={1} />
          <h3 className="mt-4 text-2xl font-light text-foreground md:text-3xl">Still have a question?</h3>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground font-(family-name:--font-montserrat) md:text-base">
            For questions or concerns, you can find our contact information in the Details section.
          </p>
          <a
            href="#details"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-blushpink px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg font-(family-name:--font-montserrat)"
          >
            View Contact Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
