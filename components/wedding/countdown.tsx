"use client"

import { useState, useEffect } from "react"

const WEDDING_DATE = new Date("2026-10-08T15:00:00")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const calculateTimeLeft = () => {
      const difference = WEDDING_DATE.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12">
            {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
              <div key={label} className="text-center">
                <div className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-2">
                  --
                </div>
                <div className="text-xs md:text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) text-muted-foreground">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-2 tabular-nums">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm tracking-[0.2em] uppercase font-(family-name:--font-montserrat) text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
