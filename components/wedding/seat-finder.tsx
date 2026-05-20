'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Search, Sparkles, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';

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
  const initialGuest = searchParams.get('guest') || '';
  
  const [query, setQuery] = useState(initialGuest);
  const [results, setResults] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 300);

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
        throw new Error('Failed to search guests');
      }

      const data = await response.json();
      setResults(data.guests || []);
      setHasSearched(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
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
        className="relative mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter your name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary/40 rounded-full shadow-lg"
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Spinner className="h-5 w-5" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {error ? (
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
        ) : hasSearched && results.length === 0 ? (
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
                <p className="text-muted-foreground text-lg">
                  We couldn&apos;t find your name.
                </p>
                <p className="text-muted-foreground mt-2">
                  Please contact the couple for assistance.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {results.map((guest, index) => (
              <motion.div
                key={`${guest.fullName}-${guest.table}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm shadow-xl overflow-hidden">
                  <CardContent className="pt-8 pb-8 text-center relative">
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
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="mb-4"
                    >
                      <span className="text-4xl">🎉</span>
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-light text-foreground mb-1"
                    >
                      Welcome,
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-semibold text-foreground mb-6"
                    >
                      {guest.fullName}!
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-block"
                    >
                      <p className="text-muted-foreground mb-2">
                        You are assigned to
                      </p>
                      <div className="bg-primary/10 rounded-2xl px-8 py-4 border border-primary/20">
                        <span className="text-3xl font-bold tracking-wide text-primary">
                          Table {guest.table.padStart(2, '0')}
                        </span>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : !hasSearched && !isLoading ? (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-muted-foreground/70 text-lg">
              Enter your name to find your table
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
