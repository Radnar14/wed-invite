"use client";

import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, CircleX, Frown } from "lucide-react";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    {
      fullName: string;
      guestCount: number;
    }[]
  >([]);

  const [selectedGuest, setSelectedGuest] = useState<{
    fullName: string;
    guestCount: number;
  } | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const [showQRPreview, setShowQRPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "Accept",
    guests: "",
    message: "",
  });

  const showRSVPForm = query.trim() === "" || selectedGuest;

  useEffect(() => {
    const fetchGuests = async () => {
      if (query.trim().length < 4 || selectedGuest) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL}?q=${encodeURIComponent(query)}`);

        const data = await response.json();

        setResults(data.guests || []);
        setIsSearching(false);
      } catch (error) {
        console.error("Guest search failed:", error);
        setIsSearching(false);
      }
    };

    setIsSearching(true);

    const timeout = setTimeout(fetchGuests, 120);

    return () => clearTimeout(timeout);
  }, [query, selectedGuest]);

  const selectGuest = (guest: { fullName: string; guestCount: number }) => {
    setSelectedGuest(guest);

    setFormData((prev) => ({
      ...prev,
      name: guest.fullName,
      guests: String(guest.guestCount),
    }));

    setQuery(guest.fullName);
    setResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit RSVP. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("RSVP submission error:", err);
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div
            className="max-w-xl mx-auto text-center
              rounded-[2.5rem]
              bg-white/80
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              px-10 py-12"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground font-(family-name:--font-montserrat) leading-8 max-w-lg mx-auto">
              <span className="text-lg font-medium text-blushpink">Your RSVP has been confirmed.</span>
              <br />
              Please proceed to the <span className="font-semibold text-foreground">Find Seat</span> section to view your assigned table.
              <br />
              If your table is not yet available, kindly allow the hosts some time to finalize the seating arrangements.
            </p>

            {/* Find Seat Button */}
            <a
              href="/seat-finder"
              className="
                      inline-flex items-center justify-center mt-8 px-8 py-4 rounded-full
                      bg-accent text-white font-medium tracking-wide shadow-md
                      transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-accent/90"
            >
              Find Seat
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            We Hope You Can Join Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">RSVP</h2>
          <p className="text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto">
            We would appreciate your prompt response to help us plan for the attendance.
          </p>
        </div>

        {/* RSVP Form */}
        <Card className="max-w-xl mx-auto border-none shadow-lg">
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Name */}
              <div className="space-y-2 relative">
                <Label htmlFor="name">Full Name *</Label>

                <Input
                  id="name"
                  value={selectedGuest ? formData.name : query}
                  onChange={(e) => {
                    const value = e.target.value;

                    setQuery(value);
                    setSelectedGuest(null);

                    if (value.trim() === "") {
                      setResults([]);
                    }

                    setFormData((prev) => ({
                      ...prev,
                      name: "",
                      guests: "",
                    }));
                  }}
                  placeholder="Start typing your name..."
                  autoComplete="off"
                  required
                />

                {/* Dropdown Suggestions */}
                {results.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                    {results.map((guest, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectGuest(guest)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-accent/50"
                      >
                        <span className="text-sm">{guest.fullName}</span>

                        <span className="text-xs text-muted-foreground">
                          {guest.guestCount} guest
                          {guest.guestCount > 1 ? "s" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {query.trim().length >= 4 && !selectedGuest && !isSearching && results.length === 0 && (
                  <div
                    className="
                        mt-4
                        rounded-[2.5rem]
                        bg-white/90
                        backdrop-blur-sm
                        px-6 py-6
                        shadow-[0_12px_35px_rgba(0,0,0,0.10)]
                        border border-border/20
                        animate-in fade-in duration-300"
                  >
                    {/* Message */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground leading-relaxed font-(family-name:--font-montserrat)">
                        We couldn&apos;t find your name on the guest list.
                        <br />
                        Please contact the hosts regarding your invitation or RSVP concerns.
                      </p>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-6 flex justify-center items-start gap-8">
                      {/* Messenger */}
                      <div className="flex items-center gap-2">
                        <FaFacebookMessenger size={24} className="text-blushpink" />

                        <div className="flex flex-col items-start leading-tight">
                          <a
                            href="https://m.me/chezza214"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                font-medium
                                transition-colors
                                duration-300
                                hover:text-pink-600
                                hover:underline "
                          >
                            Chezza
                          </a>

                          <a
                            href="https://m.me/kingcoal214"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                font-medium
                                transition-colors
                                duration-300
                                hover:text-pink-600
                                hover:underline "
                          >
                            John Mark
                          </a>
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="flex items-center gap-2">
                        <FaInstagram size={24} className="text-blushpink" />

                        <div className="flex flex-col items-start leading-tight">
                          <a
                            href="https://instagram.com/YOUR_CHEZZA_USERNAME"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                font-medium
                                transition-colors
                                duration-300
                                hover:text-pink-600
                                hover:underline"
                          >
                            Chezza
                          </a>

                          <a
                            href="https://instagram.com/YOUR_JOHNMARK_USERNAME"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                font-medium
                                transition-colors
                                duration-300
                                hover:text-pink-600
                                hover:underline"
                          >
                            John Mark
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {showRSVPForm && (
                <>
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
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-border/50 focus:border-accent"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Attendance */}
                  <div className="space-y-3">
                    <Label className="text-sm font-(family-name:--font-montserrat) tracking-wide">Will you be attending? *</Label>

                    <div className="flex justify-start gap-3">
                      {/* Accept */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            attendance: "Accept",
                          })
                        }
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-full border px-7 py-2 text-sm
                            transition-all duration-300 font-medium
                            font-(family-name:--font-montserrat)
                            ${
                              formData.attendance === "Accept"
                                ? "scale-105 bg-emerald-100 border-emerald-300 text-emerald-700 shadow-md"
                                : "bg-white border-emerald-200 text-emerald-500 hover:bg-emerald-50"
                            }
                          `}
                      >
                        <Heart size={18} />
                        Accept
                      </button>

                      {/* Decline */}
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            attendance: "Decline",
                          })
                        }
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-full border px-7 py-2 text-sm
                            transition-all duration-300 font-medium
                            font-(family-name:--font-montserrat)
                            ${
                              formData.attendance === "Decline"
                                ? "scale-105 bg-rose-100 border-rose-300 text-rose-600 shadow-md"
                                : "bg-white border-rose-200 text-rose-400 hover:bg-rose-50"
                            }
                          `}
                      >
                        {formData.attendance === "Decline" ? <Frown size={18} /> : <CircleX size={18} />}
                        Decline
                      </button>
                    </div>
                  </div>

                  {/* Allowed Guests */}
                  {formData.attendance === "Accept" && (
                    <div className="space-y-2">
                      <Label className="text-sm font-(family-name:--font-montserrat) tracking-wide">Allowed Guests:</Label>

                      <div
                        className="
                          rounded-[2rem] border border-blushpink/10
                          bg-gradient-to-br from-white to-rose-50/40
                          px-5 py-5 text-center
                          shadow-[0_8px_25px_rgba(0,0,0,0.06)]
                          transition-all duration-300
                          hover:-translate-y-1 hover:shadow-md"
                      >
                        <p
                          className="
                            text-xl font-medium text-foreground
                            tracking-[0.04em]
                            transition-transform duration-300
                            font-(family-name:--font-montserrat)"
                        >
                          ✨ {formData.guests} Guest
                          {Number(formData.guests) > 1 ? "s" : ""}
                        </p>

                        <p
                          className="
                            mt-1 text-xs text-muted-foreground
                            font-(family-name:--font-montserrat)"
                        >
                          Including the invited guest
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.attendance === "Decline" && (
                    <div className="space-y-4">
                      {/* Decline Message */}
                      <div
                        className="
                          rounded-[2rem] border border-rose-100
                          bg-rose-50/40 px-5 py-3 text-center
                        "
                      >
                        <p
                          className="
                            text-sm leading-7 text-rose-600
                            font-(family-name:--font-montserrat)
                          "
                        >
                          We&apos;re sorry you can&apos;t celebrate with us 💔
                          <br />
                          Your presence will surely be missed.
                        </p>
                      </div>

                      {/* Optional Blessing / Offering */}
                      <div
                        className="
                          rounded-[2rem] border border-border/30
                          bg-white/70 px-5 py-5 text-center
                        "
                      >
                        <p
                          className="
                            text-sm text-muted-foreground
                            font-(family-name:--font-montserrat)
                          "
                        >
                          Still want to send your love & blessings? ✨
                        </p>

                        <p
                          className="
                            mt-1 text-xs text-muted-foreground/80
                            font-(family-name:--font-montserrat)
                          "
                        >
                          Your kindness is deeply appreciated.
                        </p>

                        {/* QR CODE */}
                        {/* Replace '/mock-qr.png' with your real QR image later */}
                        <button type="button" onClick={() => setShowQRPreview(true)} className="mx-auto block mt-4">
                          <img
                            src="/images/fulldoor_wedding.png"
                            alt="QR Code"
                            className="
                                h-44 w-44 rounded-2xl
                                border border-border/20 object-cover
                                shadow-sm transition-transform duration-300
                                hover:scale-105
                              "
                          />
                        </button>

                        <p
                          className="
                            mt-3 text-xs text-muted-foreground
                            font-(family-name:--font-montserrat)
                          "
                        >
                          Scan to send your optional gift or blessing 💕
                        </p>
                      </div>
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
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-border/50 focus:border-accent min-h-[100px] resize-none"
                      placeholder="Share your well wishes..."
                    />
                  </div>

                  {error && (
                    <div className="text-destructive text-sm text-center font-(family-name:--font-montserrat) animate-pulse">{error}</div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !selectedGuest}
                    className="
                      w-full rounded-[1.5rem]
                      bg-primary py-6 text-sm uppercase
                      tracking-[0.2em] text-primary-foreground
                      font-(family-name:--font-montserrat)
                      shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                      transition-all duration-300
                      hover:-translate-y-1 hover:bg-primary/90
                      hover:shadow-lg active:scale-[0.98]
                      disabled:opacity-50 disabled:hover:translate-y-0
                      disabled:hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                    {isSubmitting ? "Sending..." : "Send RSVP"}
                  </Button>

                  {submitError && (
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center">
                      <p className="text-sm text-red-500 whitespace-pre-line">{submitError}</p>
                    </div>
                  )}
                </>
              )}
            </form>
          </CardContent>
        </Card>

        {/* QR Preview Modal */}
        {showQRPreview && (
          <div
            onClick={() => setShowQRPreview(false)}
            className="
                fixed inset-0 z-[100]
                flex items-center justify-center
                bg-black/60 backdrop-blur-sm
                px-6
              "
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                  rounded-[2rem] bg-white
                  p-4 shadow-2xl
                "
            >
              <img
                src="/images/fulldoor_wedding.png"
                alt="QR Code Preview"
                className="
                    h-[320px] w-[320px]
                    rounded-[1.5rem]
                    object-cover
                  "
              />

              <p
                className="
                    mt-3 text-center text-sm
                    text-muted-foreground
                    font-(family-name:--font-montserrat)
                  "
              >
                Scan to send your optional gift or blessing 💕
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
