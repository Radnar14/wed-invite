"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import HostGuestViewer from "@/app/seat-finder/HostGuestViewer";

interface Guest {
  fullName: string;
  table: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SeatFinder() {
  const searchParams = useSearchParams();
  const initialGuest = searchParams.get("guest") || "";

  const [query, setQuery] = useState(initialGuest);
  const [results, setResults] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const [isFindingSeat, setIsFindingSeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /**
   * Controls hidden host/admin viewer
   */
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  /**
   * Prevents normal seat-finder states
   * from rendering after admin mode
   */
  const [isAdminMode, setIsAdminMode] = useState(false);
  /**
   * Accepted guests for host/admin view
   */
  const [acceptedGuests, setAcceptedGuests] = useState<
    {
      fullName: string;
      table: string;
    }[]
  >([]);

  /**
   * Host/admin guest loading state
   */
  const [isLoadingGuests, setIsLoadingGuests] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  /**
   * Detect hidden host/admin trigger
   */
  useEffect(() => {
    /**
     * Detect hidden host/admin trigger
     */
    if (query.trim().toLowerCase() === "/allg") {
      setIsAdminMode(true);
      /**
       * Start loading state
       */
      setIsLoadingGuests(true);

      fetch("/api/guests/search?action=allGuests")
        .then((res) => res.json())
        .then((data) => {
          setAcceptedGuests(data.guests || []);
        })
        .catch(() => {
          setAcceptedGuests([]);
        })
        .finally(() => {
          setIsLoadingGuests(false);
        });

      // Clear search-related states
      setResults([]);
      setSelectedGuest(null);
      setHasSearched(false);
      setError(null);

      // Open admin modal
      setIsAdminModalOpen(true);

      // Clear secret code for stealth
      setQuery("");

      // Close mobile keyboard
      (document.activeElement as HTMLElement | null)?.blur();
    }
  }, [query]);

  const searchGuests = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/guests/search?q=${encodeURIComponent(searchQuery)}`);

      if (!response.ok) {
        throw new Error("Failed to search guests");
      }

      const data = await response.json();
      setResults(data.guests || []);
      setHasSearched(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    /**
     * Prevent admin trigger from running
     * through normal guest search
     */
    if (debouncedQuery.trim().toLowerCase() === "/allg") {
      return;
    }

    searchGuests(debouncedQuery);
  }, [debouncedQuery, searchGuests]);

  // Auto-search if guest param is provided
  useEffect(() => {
    if (initialGuest) {
      searchGuests(initialGuest);
    }
  }, [initialGuest, searchGuests]);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative mb-7 max-w-[30rem] mx-auto"
      >
        <div
          className="
              relative overflow-hidden rounded-[2rem]
              border border-[#A8BBA3]/35 bg-white/92 backdrop-blur-xl
              shadow-[0_10px_35px_rgba(0,0,0,0.08)] transition-all duration-300
              focus-within:border-[#A8BBA3]/40
              focus-within:shadow-[0_12px_40px_rgba(168,187,163,0.12)]"
        >
          <Search className="absolute left-5 top-1/2 h-[1.05rem] w-[1.05rem] -translate-y-1/2 text-[#A8BBA3]/90" />
          <Input
            type="text"
            placeholder="Search your name..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedGuest(null);
            }}
            onBlur={(e) => {
              /**
               * Removes focus after selection
               * for a cleaner luxury transition
               */
              e.target.blur();
            }}
            className="
                h-16 border-0 bg-transparent pl-14 pr-12 text-[1.02rem] text-foreground placeholder:text-muted-foreground/70
                focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Guest Suggestions Dropdown */}
        {query.trim().length > 2 && !selectedGuest && !isFindingSeat && (
          <div
            className="
              absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-[1.75rem] border border-[#A8BBA3]/20
              bg-white/90 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
          >
            {isLoading ? null : results.length > 0 ? (
              results.map((guest) => (
                <button
                  key={guest.fullName}
                  onClick={() => {
                    setQuery(guest.fullName);

                    /**
                     * Close mobile keyboard and remove input focus
                     * for a smoother transition
                     */
                    (document.activeElement as HTMLElement | null)?.blur();

                    // Clear previous seat card
                    setSelectedGuest(null);

                    // Instantly hide dropdown
                    setResults([]);

                    // Start luxury loading state
                    setIsFindingSeat(true);

                    setTimeout(() => {
                      setSelectedGuest(guest.fullName);
                      setIsFindingSeat(false);
                    }, 1400);
                  }}
                  className="
                    w-full px-5 py-4 text-left border-b border-[#A8BBA3]/12
                    transition-all duration-200 hover:bg-[#A8BBA3]/8 active:bg-[#A8BBA3]/10 last:border-b-0"
                >
                  <span className="text-[1.03rem] font-normal tracking-[0.01em] text-[#6E4A43]">{guest.fullName}</span>
                </button>
              ))
            ) : (
              <div className="px-6 py-5 text-center">
                <p className="text-[1rem] font-light text-[#6E4A43]">No guest found</p>

                <p className="mt-1 text-sm text-[#6E4A43]/60">Please check the spelling of your name</p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {isFindingSeat ? (
          <motion.div
            key="finding-seat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative overflow-hidden"
          >
            <Card className="overflow-hidden rounded-[2rem] border border-[#F2D6E1]/30 bg-white/80 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
              <CardContent className="relative px-8 py-14 text-center">
                {/* blush shimmer */}
                <div
                  className="
                  absolute inset-0 -translate-x-full
                  animate-[shimmer_2.8s_ease-in-out_infinite]
                  bg-gradient-to-r
                  from-transparent
                  via-[#F8D7E4]/70
                  to-transparent
                  blur-xl
                "
                />

                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="mb-4 text-4xl"
                >
                  ✨
                </motion.div>

                <h3 className="text-2xl font-light text-[#6E4A43] mb-2">Finding your table</h3>

                <p className="text-muted-foreground/80 leading-7">Preparing your seating arrangement...</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="pt-6 text-center">
                <p className="text-destructive">{error}</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : !isAdminMode && hasSearched && results.length === 0 && query.trim().length <= 2 ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="mb-4">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground/50" />
                </div>
                <p className="text-muted-foreground text-lg">We couldn&apos;t find your name.</p>
                <p className="text-muted-foreground mt-2">Please contact the couple for assistance.</p>
              </CardContent>
            </Card>
          </motion.div>
        ) : selectedGuest ? (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            {results
              .filter((guest) => {
                // clicked suggestion
                if (selectedGuest) {
                  return guest.fullName === selectedGuest;
                }
                // exact full-name typed manually
                return guest.fullName.toLowerCase() === query.trim().toLowerCase();
              })
              .map((guest, index) => (
                <motion.div
                  key={`${guest.fullName}-${guest.table}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Card className="overflow-hidden rounded-[2rem] border border-[#A8BBA3]/20 bg-white/75 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                    <CardContent className="relative px-6 pt-10 pb-10 text-center md:px-8 md:pt-12 md:pb-12">
                      {/* Decorative elements */}
                      <div className="absolute top-2 left-2 opacity-20">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <div className="absolute top-2 right-2 opacity-20">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mb-3"
                      >
                        <span className="text-4xl">🎉</span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-light text-foreground mb-0.5"
                      >
                        Welcome,
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-semibold text-foreground mb-5"
                      >
                        {guest.fullName}!
                      </motion.p>
                      {/* Table Assignment card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block"
                      >
                        {guest.table ? (
                          <>
                            <p className="mb-2 text-[0.78rem] tracking-[0.14em] uppercase text-muted-foreground/70">You are assigned to:</p>

                            <div
                              className="
                                  rounded-[2rem] border border-[#A8BBA3]/20 bg-white/55 backdrop-blur-sm px-10 py-5 
                                  shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                            >
                              <span className="text-[2.3rem] font-semibold tracking-[0.04em] text-[#6E4A43]">
                                Table {guest.table.padStart(2, "0")}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="max-w-md mx-auto">
                            <div
                              className="
                                rounded-[1.5rem] border border-[#A8BBA3]/20 bg-white/45 backdrop-blur-sm px-7 py-6 
                                shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                            >
                              <p className="mb-4 text-[1.1rem] font-medium text-foreground">No Table Assignment Yet</p>

                              <p className="text-sm leading-7 text-muted-foreground/80">
                                There is no assigned table at the moment. Kindly wait for further updates.
                              </p>

                              <p className="text-sm leading-7 text-muted-foreground/80 mt-2">
                                If you have not been assigned a table yet, please feel free to reach out to us. Thank you.
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        ) : !hasSearched && !isLoading ? (
          <motion.div key="initial" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
            <p className="text-muted-foreground/70 text-lg">Enter your name to find your table</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <HostGuestViewer
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setIsAdminMode(false);
          setResults([]);
          setSelectedGuest(null);
          setHasSearched(false);
          setError(null);
          setQuery("");
        }}
        guests={acceptedGuests}
        isLoading={isLoadingGuests}
      />
    </div>
  );
}
