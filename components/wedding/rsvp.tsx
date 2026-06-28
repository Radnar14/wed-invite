"use client";

import { useEffect, useState } from "react";
import { FaFacebookMessenger, FaInstagram } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Heart, CircleX, Frown, Search, ChevronLeft, Loader2 } from "lucide-react";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [submissionType, setSubmissionType] = useState("");
  const [isLockedRSVP, setIsLockedRSVP] = useState(false);

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

  const [isLoadingGuest, setIsLoadingGuest] = useState(false);

  const [showQRPreview, setShowQRPreview] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attendance: "Accept",
    guests: "",
    message: "",
  });

  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      attendance: "Accept",
      guests: "",
      message: "",
    });
  };

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Return to the "Find Your Name" step
  const resetToSearch = () => {
    setSelectedGuest(null);
    setQuery("");
    setResults([]);
    setIsSearching(false);
    setIsLoadingGuest(false);
    setIsLockedRSVP(false);
    setSubmitError("");
    setError(null);
    resetForm();
  };

  useEffect(() => {
    const fetchGuests = async () => {
      if (query.trim().length < 4 || selectedGuest) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);

      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?q=${encodeURIComponent(query)}`);

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

  const selectGuest = async (guest: { fullName: string; guestCount: number }) => {
    setSelectedGuest(guest);
    setIsLoadingGuest(true);

    // reset lock state
    setIsLockedRSVP(false);

    // default form values
    setFormData((prev) => ({
      ...prev,
      name: guest.fullName,
      guests: String(guest.guestCount),
    }));

    setQuery(guest.fullName);
    setResults([]);
    setIsSearching(false);

    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=checkGuest&q=${encodeURIComponent(guest.fullName)}`);
      const data = await response.json();

      // finalized RSVP
      if (data.hasRSVP) {
        // finalized RSVP
        if (data.locked) {
          setIsLockedRSVP(true);
        }

        // auto-fill previous RSVP data
        setFormData({
          name: data.guest.name || "",
          email: data.guest.email || "",
          attendance: data.guest.attendance || "Accept",
          guests: String(data.guest.guestCount || ""),
          message: data.guest.message || "",
        });
      }
    } catch (error) {
      console.error("Locked RSVP check failed:", error);
    } finally {
      // always stop loading
      setIsLoadingGuest(false);
    }
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

      // SUCCESS
      if (data.result === "success") {
        setSubmissionType(data.submissionType);
        setSubmitted(true);
        return;
      }

      // LOCKED RSVP
      if (data.result === "locked") {
        setIsLockedRSVP(true);

        setFormData({
          name: data.guest.name || "",
          email: data.guest.email || "",
          attendance: data.guest.attendance || "Accept",
          guests: String(data.guest.guestCount || ""),
          message: data.guest.message || "",
        });

        setSelectedGuest({
          fullName: data.guest.name,
          guestCount: data.guest.guestCount,
        });

        setQuery(data.guest.name);

        return;
      }

      setSubmitError(data.error || "Failed to submit RSVP.");
    } catch (err: any) {
      console.error("RSVP submission error:", err);

      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    const isAccepted = formData.attendance === "Accept";

    return (
      <section id="rsvp" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* Keep RSVP Header */}
          <div className="text-center mb-14">
            <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
              We Hope You Can Join Us
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">RSVP</h2>

            <p className="text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto">
              Thank you for responding to our invitation.
            </p>
          </div>

          {/* Success Card */}
          <div
            className="
          relative overflow-hidden
          max-w-xl mx-auto text-center
          rounded-[2.8rem]
          bg-white/90 backdrop-blur-sm
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          border border-white/40
          px-10 py-12

          animate-in fade-in zoom-in-95 slide-in-from-bottom-4
          duration-700
          ease-out"
          >
            {/* Elegant top line */}
            <div
              className="
            absolute top-0 left-0 w-full h-1
            bg-gradient-to-r
            from-[#E7C8D6]
            via-[#D98EB2]
            to-[#E7C8D6]
          "
            />

            {/* Floating icon */}
            <div
              className={`
            w-20 h-20 mx-auto mb-7 rounded-full
            flex items-center justify-center
            shadow-sm
            ${isAccepted ? "bg-accent/10" : "bg-rose-100"}
          `}
            >
              {isAccepted ? <Check className="w-10 h-10 text-accent" /> : <Frown className="w-10 h-10 text-rose-500" />}
            </div>

            {/* Small tag */}
            <div
              className="
            inline-flex items-center
            rounded-full
            bg-[#F8F2ED]
            px-4 py-2
            text-xs tracking-[0.12em]
            text-[#9A7E6F]
            uppercase font-medium
            mb-5
          "
            >
              {isAccepted ? "RSVP Confirmed ✨" : "RSVP Declined 💔"}
            </div>

            {/* Title */}
            <h2 className="text-4xl font-light text-foreground mb-4">{isAccepted ? "Thank You!" : "We'll Miss You 💔"}</h2>

            {/* ACCEPT CONTENT */}
            {isAccepted ? (
              <>
                <p className="text-muted-foreground font-(family-name:--font-montserrat) leading-8 max-w-lg mx-auto">
                  <span className="text-lg font-medium text-blushpink">
                    {submissionType === "Updated RSVP" ? "Your RSVP has been updated." : "Your RSVP has been confirmed."}
                  </span>
                  <br />
                  Please proceed to the <span className="font-semibold text-foreground">Find Seat</span> section to view your assigned
                  table.
                  <br />
                  If your table is not yet available, kindly allow the hosts some time to finalize the seating arrangements.
                </p>

                <a
                  href="/seat-finder"
                  className="
                inline-flex items-center justify-center
                mt-8 px-8 py-4 rounded-full
                bg-accent text-white font-medium
                tracking-wide shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
              "
                >
                  Find Seat ✨
                </a>
              </>
            ) : (
              <>
                {/* DECLINE CONTENT */}
                <p className="text-muted-foreground font-(family-name:--font-montserrat) leading-8 max-w-lg mx-auto">
                  Thank you for letting us know.
                  <br />
                  Although we’re sad you can’t celebrate with us, we truly appreciate your response and will be thinking of you on our
                  special day.
                </p>

                <a
                  href="/"
                  className="
                inline-flex items-center justify-center
                mt-8 px-8 py-4 rounded-full
                bg-primary text-white font-medium
                tracking-wide shadow-md
                transition-all duration-300
                hover:scale-105 hover:shadow-lg
              "
                >
                  Back Home
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase font-(family-name:--font-montserrat) text-muted-foreground mb-4">
            We Hope You Can Join Us
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">RSVP</h2>
          <p className="text-muted-foreground font-(family-name:--font-montserrat) max-w-md mx-auto">
            We would appreciate your prompt response to help us plan for the attendance.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mx-auto mb-8 flex max-w-xl items-center justify-center gap-3">
          {/* Step 1 — Find Your Name */}
          <div className="flex items-center gap-2">
            <span
              className={`
                flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium
                transition-all duration-500
                ${selectedGuest ? "bg-[#E4EEE0] text-[#6F806B]" : "bg-accent text-white shadow-sm"}
              `}
            >
              {selectedGuest ? <Check className="h-4 w-4" /> : "1"}
            </span>
            <span
              className={`
                text-xs tracking-[0.12em] uppercase font-(family-name:--font-montserrat) transition-colors duration-500
                ${selectedGuest ? "text-muted-foreground" : "text-foreground"}
              `}
            >
              Find Name
            </span>
          </div>

          {/* Connector */}
          <div className="h-px w-8 sm:w-12 bg-border/70" />

          {/* Step 2 — RSVP Details */}
          <div className="flex items-center gap-2">
            <span
              className={`
                flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium
                transition-all duration-500
                ${selectedGuest ? "bg-accent text-white shadow-sm" : "bg-secondary text-muted-foreground"}
              `}
            >
              2
            </span>
            <span
              className={`
                text-xs tracking-[0.12em] uppercase font-(family-name:--font-montserrat) transition-colors duration-500
                ${selectedGuest ? "text-foreground" : "text-muted-foreground"}
              `}
            >
              RSVP Details
            </span>
          </div>
        </div>

        {/* ============================================================= */}
        {/* STEP 1 — FIND YOUR NAME                                       */}
        {/* ============================================================= */}
        {!selectedGuest && (
          <Card className="max-w-xl mx-auto border-none shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardContent className="p-6 sm:p-8 md:p-10">
              {/* Step Heading */}
              <div className="text-center mb-7">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-foreground">Find Your Name</h3>
                <p className="mt-2 text-sm text-muted-foreground font-(family-name:--font-montserrat) max-w-sm mx-auto">
                  Enter your full name as it appears on your invitation to begin your RSVP.
                </p>
              </div>

              {/* Search Field */}
              <div className="space-y-2 relative">
                <Label htmlFor="name" className="sr-only">
                  Full Name
                </Label>

                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />

                  <Input
                    id="name"
                    value={query}
                    onChange={(e) => {
                      const value = e.target.value;

                      setQuery(value);
                      setSelectedGuest(null);

                      if (value.trim() === "") {
                        setResults([]);
                      }

                      setIsLockedRSVP(false);

                      resetForm();
                    }}
                    placeholder="Start typing your name..."
                    autoComplete="off"
                    required
                    className="h-12 rounded-2xl pl-11 pr-11 text-base"
                  />

                  {/* Inline searching spinner */}
                  {isSearching && query.trim().length >= 4 && (
                    <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-accent" />
                  )}
                </div>

                {/* Helper hint */}
                {query.trim().length > 0 && query.trim().length < 4 && (
                  <p className="pl-1 text-xs text-muted-foreground/80 font-(family-name:--font-montserrat)">
                    Keep typing — at least 4 characters to search.
                  </p>
                )}

                {/* Dropdown Suggestions */}
                {results.length > 0 && !selectedGuest && query.trim().length >= 4 && (
                  <div
                    className="absolute top-[calc(100%+0.35rem)] z-50 w-full overflow-hidden rounded-[2rem]
                                  border border-border/40 bg-white/95 backdrop-blur-sm shadow-xl
                                  animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    {/* Dropdown Title */}
                    <div
                      className=" h-3 w-full bg-gradient-to-r
                        from-[#A8BBA3]
                        via-[#C7D7C0]
                        to-[#A8BBA3]
                      "
                    />
                    <div className="pt-1 text-center">
                      <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-border/90" />

                        <p className="text-sm font-medium text-foreground whitespace-nowrap">Our Guest ✨</p>

                        <div className="h-px flex-1 bg-border/90" />
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">Select your full name</p>
                      <div className="mt-2 flex items-center justify-center gap-3 px-1"></div>
                      <div
                        className=" h-1 w-full bg-gradient-to-r
                        from-[#A8BBA3]
                        via-[#C7D7C0]
                        to-[#A8BBA3]
                      "
                      />
                    </div>

                    {/* Guest List */}
                    <div className="pb-0">
                      {results.map((guest, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectGuest(guest)}
                          className="
                                flex w-full items-center
                                border-b border-border/50
                                px-4 py-2 text-left
                                transition duration-200
                                hover:bg-accent/10
                                active:scale-[0.98]
                                active:bg-accent/15"
                        >
                          {/* Guest Name */}
                          <span className="text-sm font-medium">{guest.fullName}</span>

                          {/* Divider */}
                          <div className="ml-auto w-px h-8 bg-border/50" />

                          {/* Guest Count Bubble */}
                          <span
                            className="
                                ml-3 sm:ml-4
                                min-w-[92px] sm:min-w-[105px]
                                rounded-full
                                border border-[#D3E0CF]
                                bg-[#E4EEE0]
                                px-4 py-2
                                text-center text-sm
                                text-[#6F806B]
                              "
                          >
                            {guest.guestCount} Guest
                            {guest.guestCount > 1 ? "s" : ""}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div
                      className="
                        h-3 w-full
                        bg-gradient-to-r
                        from-[#A8BBA3]
                        via-[#C7D7C0]
                        to-[#A8BBA3]
                      "
                    />
                  </div>
                )}

                {/* Not Found Message */}
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
            </CardContent>
          </Card>
        )}

        {/* ============================================================= */}
        {/* STEP 2 — RSVP DETAILS                                         */}
        {/* ============================================================= */}
        {selectedGuest && (
          <Card className="max-w-xl mx-auto border-none shadow-lg animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
            <CardContent className="p-6 sm:p-8 md:p-10">
              {/* Found-You Banner */}
              <div
                className="
                  relative overflow-hidden
                  rounded-[2rem]
                  border border-[#E4EEE0]
                  bg-gradient-to-br from-[#F4F9F1] to-white
                  px-5 py-4 sm:px-6
                  shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                  animate-in fade-in zoom-in-95 duration-500"
              >
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#A8BBA3] via-[#C7D7C0] to-[#A8BBA3]" />

                <div className="flex items-center gap-4">
                  {/* Check avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E4EEE0] text-[#6F806B]">
                    <Check className="h-6 w-6" />
                  </div>

                  {/* Name */}
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-[#9A7E6F] font-medium font-(family-name:--font-montserrat)">
                      We found you ✨
                    </p>
                    <p className="truncate text-lg font-medium text-foreground">{selectedGuest.fullName}</p>
                  </div>

                  {/* Change Name */}
                  <button
                    type="button"
                    onClick={resetToSearch}
                    className="
                      inline-flex shrink-0 items-center gap-1
                      rounded-full border border-border/50 bg-white
                      px-3 py-1.5 text-xs text-muted-foreground
                      transition-all duration-300
                      hover:bg-accent/10 hover:text-foreground active:scale-95
                      font-(family-name:--font-montserrat)"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Change
                  </button>
                </div>
              </div>

              {/* Loading guest details */}
              {isLoadingGuest ? (
                <div
                  className="
                      relative mt-6 overflow-hidden rounded-[2.5rem]
                      border border-[#EADFD8]
                      bg-gradient-to-br from-white via-[#FFFDFC] to-[#FAF6F2]
                      px-8 py-10 text-center
                      shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                      animate-in fade-in duration-500 "
                >
                  {/* Luxury Shimmer Glow */}
                  <div
                    className="
                      absolute inset-0 -translate-x-full
                      animate-[shimmer_2.8s_ease-in-out_infinite]
                      bg-gradient-to-r from-transparent via-blushpink/25 to-transparent
                      blur-2xl
                    "
                  />
                  {/* Top Accent */}
                  <div
                    className="
                        absolute top-0 left-0 h-1 w-full
                        bg-gradient-to-r
                        from-[#A8BBA3] via-[#C7D7C0] to-[#A8BBA3]
                      "
                  />

                  <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin text-accent" />

                  {/* Loading Message */}
                  <p className="text-sm leading-7 text-muted-foreground font-(family-name:--font-montserrat)">
                    Preparing your RSVP details ✨
                  </p>

                  {/* Soft Subtext */}
                  <p className="mt-1 text-xs text-muted-foreground/70 font-(family-name:--font-montserrat)">
                    Please wait while we prepare your invitation details
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {/* RSVP Details divider */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border/70" />
                    <p className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-(family-name:--font-montserrat)">
                      RSVP Details
                    </p>
                    <div className="h-px flex-1 bg-border/70" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                      Email Address:
                    </Label>
                    <Input
                      id="email"
                      disabled={isLockedRSVP || isLoadingGuest}
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormField("email", e.target.value)}
                      className={`
                            border-border/50
                            focus:border-accent
                            transition-all duration-300
                            ${
                              isLockedRSVP
                                ? "bg-[#FAF7F4] border-[#E8DDD4] text-foreground cursor-not-allowed shadow-inner opacity-100 disabled:opacity-100 placeholder:text-muted-foreground/60"
                                : "bg-white"
                            }
                          `}
                      placeholder="Optional — for wedding photo sharing"
                    />
                  </div>

                  {/* Attendance */}
                  <div className="space-y-2.5 sm:space-y-3">
                    <Label className="text-sm font-(family-name:--font-montserrat) tracking-wide">Will you be attending? *</Label>

                    {/* Attendance Options */}
                    <div className="flex flex-wrap gap-3">
                      {/* Accept */}
                      <button
                        type="button"
                        disabled={isLockedRSVP || isLoadingGuest}
                        onClick={() => updateFormField("attendance", "Accept")}
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-full border px-5 py-2 text-sm sm:px-7
                            transition-all duration-300 font-medium
                            font-(family-name:--font-montserrat)
                            ${
                              formData.attendance === "Accept"
                                ? `
                                scale-105
                                bg-emerald-100
                                border-emerald-300
                                text-emerald-700
                                shadow-md
                                ${isLockedRSVP ? "opacity-90 cursor-not-allowed" : ""}
                              `
                                : `
                                bg-white
                                border-emerald-200
                                text-emerald-500
                                ${isLockedRSVP ? "opacity-70 cursor-not-allowed" : "hover:bg-emerald-50"}
                              `
                            }
                          `}
                      >
                        <Heart size={18} />
                        Accept
                      </button>

                      {/* Decline */}
                      <button
                        type="button"
                        disabled={isLockedRSVP || isLoadingGuest}
                        onClick={() => updateFormField("attendance", "Decline")}
                        className={`
                            flex items-center justify-center gap-1.5
                            rounded-full border px-5 py-2 text-sm sm:px-7
                            transition-all duration-300 font-medium
                            font-(family-name:--font-montserrat)
                            ${
                              formData.attendance === "Decline"
                                ? `
                                scale-105
                                bg-rose-100
                                border-rose-300
                                text-rose-600
                                shadow-md
                                ${isLockedRSVP ? "opacity-90 cursor-not-allowed" : ""}
                              `
                                : `
                                bg-white
                                border-rose-200
                                text-rose-400
                                ${isLockedRSVP ? "opacity-70 cursor-not-allowed" : "hover:bg-rose-50"}
                              `
                            }
                          `}
                      >
                        {formData.attendance === "Decline" ? <Frown size={18} /> : <CircleX size={18} />}
                        Decline
                      </button>
                    </div>
                  </div>

                  {/* Finalize card  */}
                  {isLockedRSVP && (
                    <div
                      className="
                        relative overflow-hidden
                        rounded-[2.5rem]
                        border border-[#EADFD8]
                        bg-white/90
                        px-8 py-8 text-center
                        shadow-[0_15px_40px_rgba(0,0,0,0.08)]
                        backdrop-blur-sm
                        animate-in fade-in duration-500"
                    >
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A8BBA3] via-[#C7D7C0] to-[#A8BBA3]" />
                      <h3 className="text-[1.2rem] font-light text-foreground tracking-[0.02em] sm:text-[1.35rem]">
                        Your RSVP has been finalized 💍
                      </h3>
                      <div
                        className="
                          inline-flex items-center
                          mt-3 rounded-full
                          bg-[#F8F2ED]
                          px-4 py-2
                          text-xs tracking-[0.08em]
                          text-[#9A7E6F]
                          font-medium uppercase"
                      >
                        RSVP Finalized ✨
                      </div>
                      <p
                        className="
                          mt-4 text-sm text-muted-foreground
                          leading-7 sm:leading-8 max-w-[290px] mx-auto
                          font-(family-name:--font-montserrat)"
                      >
                        Your RSVP has been finalized and can no longer be modified.
                        <br />
                        Kindly contact the couple for further changes.
                      </p>

                      {formData.attendance === "Accept" ? (
                        <a
                          href="/seat-finder"
                          className="
                            inline-flex items-center justify-center
                            mt-5 rounded-full
                            bg-accent px-7 sm:px-6 py-3
                            text-white shadow-sm
                            transition-all duration-300
                            hover:scale-105 hover:shadow-md"
                        >
                          Find My Seat ✨
                        </a>
                      ) : (
                        <div className="mt-5">
                          <p
                            className="
                            text-rose-500
                            font-(family-name:--font-montserrat)
                              "
                          >
                            We’re sorry you can’t celebrate with us 💔
                          </p>

                          <button type="button" onClick={() => setShowQRPreview(true)} className="mx-auto block mt-4">
                            <img
                              src="/images/BPI_Qrcode.png"
                              alt="QR Code"
                              className="
                                  h-28 w-28 rounded-2xl
                                  border border-border/20
                                  object-cover
                                  shadow-sm transition-transform duration-300
                                  hover:scale-105
                                "
                            />
                          </button>

                          <p className="mt-2 text-xs text-muted-foreground">Optional blessing 💕</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Allowed Guests */}
                  {formData.attendance === "Accept" && !isLockedRSVP && (
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm font-(family-name:--font-montserrat) tracking-wide">Allowed Guests:</Label>

                      <div
                        className={`
                            rounded-[2rem]
                            border border-blushpink/10
                            bg-gradient-to-br from-white to-rose-50/40
                            px-5 py-4 sm:py-5 text-center
                            shadow-[0_8px_25px_rgba(0,0,0,0.06)]
                            transition-all duration-300
                            ${isLockedRSVP ? "opacity-90 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-md"}
                          `}
                      >
                        <p
                          className="
                            text-lg sm:text-xl font-medium text-foreground
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

                  {formData.attendance === "Decline" && !isLockedRSVP && (
                    <div className="space-y-4">
                      {/* Decline Message */}
                      {!isLockedRSVP && (
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
                      )}

                      {/* Optional Blessing / Offering */}
                      <div
                        className="
                          rounded-[2rem] border border-border/30
                          bg-white/70 px-5 py-6 sm:py-5 text-center
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
                            src="/images/BPI_Qrcode.png"
                            alt="QR Code"
                            className="
                                h-40 w-40 sm:h-44 sm:w-44 rounded-2xl
                                border border-border/20 object-cover -translate-x-[8px]
                                shadow-sm transition-transform duration-300
                                hover:scale-105
                              "
                          />
                        </button>
                        <p
                          className="
                            mt-4 text-xs text-muted-foreground
                            font-(family-name:--font-montserrat)
                          "
                        >
                          Scan to send your optional gift or blessing 💕
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  {!isLockedRSVP && (
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-(family-name:--font-montserrat) tracking-wide">
                        Message for the Couple
                      </Label>

                      <Textarea
                        disabled={isLockedRSVP || isLoadingGuest}
                        id="message"
                        value={formData.message}
                        onChange={(e) => updateFormField("message", e.target.value)}
                        className={`
                            min-h-[90px] sm:min-h-[100px]
                            resize-none
                            border-border/50
                            focus:border-accent
                            transition-all duration-300
                            ${
                              isLockedRSVP
                                ? `
                                  bg-[#FAF7F4]
                                  border-[#E8DDD4]
                                  text-foreground
                                  shadow-inner
                                  cursor-not-allowed
                                  opacity-100
                                  disabled:opacity-100
                                  placeholder:text-muted-foreground/60
                                `
                                : "bg-white"
                            }
                          `}
                        placeholder="Share your well wishes..."
                      />
                    </div>
                  )}

                  {error && (
                    <div className="text-destructive text-sm text-center font-(family-name:--font-montserrat) animate-pulse">{error}</div>
                  )}

                  {!isLockedRSVP && (
                    <>
                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isSubmitting || !selectedGuest}
                        className="
                      w-full rounded-[1.5rem]
                      bg-primary py-5 text-sm uppercase sm:py-6
                      tracking-[0.2em] text-primary-foreground
                      font-(family-name:--font-montserrat)
                      shadow-[0_8px_20px_rgba(0,0,0,0.12)]
                      transition-all duration-300
                      hover:-translate-y-1 hover:bg-primary/90
                      hover:shadow-lg active:scale-[0.98]
                      disabled:opacity-50 disabled:hover:translate-y-0
                      disabled:hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                      >
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
              )}
            </CardContent>
          </Card>
        )}

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
                  p-5 sm:p-4 shadow-2xl
                "
            >
              <img
                src="/images/BPI_Qrcode.png"
                alt="QR Code Preview"
                className="
                    h-[320px] w-[320px]
                    sm:h-[320px] sm:w-[320px]
                    rounded-[1.5rem]
                    object-contain object-center translate-x-[-4px]
                  "
              />

              <p
                className="
                    mt-4 text-center text-sm
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
