"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "yes",
    guests: "1",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit RSVP. Please try again.")
      }

      setSubmitted(true)
    } catch (err: any) {
      console.error("RSVP submission error:", err)
      setError(err.message || "Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Thank You!
            </h2>
            <p className="text-muted-foreground font-(family-name:--font-montserrat)">
              Your RSVP has been received. We can&apos;t wait to celebrate with you!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            We Hope You Can Join Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            RSVP
          </h2>
          <p className="text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto">
            We would appreciate your prompt response to help us plan for the attendance.
          </p>
        </div>

        {/* RSVP Form */}
        <Card className="max-w-xl mx-auto border-none shadow-lg">
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border-border/50 focus:border-accent"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="border-border/50 focus:border-accent"
                  placeholder="Enter your email"
                />
              </div>

              {/* Attendance */}
              <div className="space-y-3">
                <Label className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                  Will you be attending? *
                </Label>
                <RadioGroup
                  value={formData.attendance}
                  onValueChange={(value) =>
                    setFormData({ ...formData, attendance: value })
                  }
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-(family-name:--font-montserrat) text-sm cursor-pointer">
                    Accept
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-(family-name:--font-montserrat) text-sm cursor-pointer">
                    Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Number of Guests */}
              {formData.attendance === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="guests" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                    Number of Guests
                  </Label>
                  <select
                    id="guests"
                    aria-label="Number of Guests"
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData({ ...formData, guests: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-md border border-border/50 bg-background text-foreground focus:border-accent focus:outline-none font-(family-name:--font-montserrat) text-sm"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              )}
              
              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                  Message for the Couple
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="border-border/50 focus:border-accent min-h-[100px] resize-none"
                  placeholder="Share your well wishes..."
                />
              </div>

              {error && (
                <div className="text-destructive text-sm text-center font-(family-name:--font-montserrat) animate-pulse">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-(family-name:--font-montserrat) tracking-[0.15em] uppercase text-sm py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send RSVP"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
