"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { tableAssignments, vipPairs, vipTable } from "@/data/table-assignments";

interface GuestsViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

const tablePageLabel = (page: number) => {
  if (page === 1) return "VIP";

  const startIndex = (page - 2) * 2 + 1;
  const endIndex = Math.min(page === 6 ? 10 : (page - 1) * 2, 10);
  return `Tables ${startIndex}–${endIndex}`;
};

const sortedTableAssignments = [...tableAssignments].sort((left, right) => {
  const leftNumber = left.table.trim() ? Number(left.table) : Number.NaN;
  const rightNumber = right.table.trim() ? Number(right.table) : Number.NaN;

  if (Number.isNaN(leftNumber)) return 1;
  if (Number.isNaN(rightNumber)) return -1;
  return leftNumber - rightNumber;
});

export default function GuestsViewer({ isOpen, onClose }: GuestsViewerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setCurrentPage(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    const query = normalize(searchQuery);

    const vipMatch = vipPairs.findIndex(
      (pair) => normalize(pair.left).includes(query) || normalize(pair.right).includes(query),
    );

    if (vipMatch >= 0) {
      setCurrentPage(1);
      return;
    }

    const tableMatchIndex = sortedTableAssignments.findIndex((table) => {
      if (table.table && normalize(table.table).includes(query)) {
        return true;
      }

      return table.guests.some((guest) => normalize(guest).includes(query));
    });

    if (tableMatchIndex >= 0) {
      const page = Math.min(6, Math.max(2, Math.floor(tableMatchIndex / 2) + 2));
      setCurrentPage(page);
    }
  }, [searchQuery]);

  const filteredVipPairs = useMemo(() => {
    if (!searchQuery.trim()) {
      return vipPairs;
    }

    const query = normalize(searchQuery);
    return vipPairs.filter((pair) => {
      const matchesTable = vipTable && normalize(vipTable).includes(query);
      const matchesLeft = normalize(pair.left).includes(query);
      const matchesRight = normalize(pair.right).includes(query);
      return matchesTable || matchesLeft || matchesRight;
    });
  }, [searchQuery]);

  const filteredTables = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedTableAssignments;
    }

    const query = normalize(searchQuery);

    return sortedTableAssignments.filter((entry) => {
      if (entry.table && normalize(entry.table).includes(query)) {
        return true;
      }

      return entry.guests.some((guest) => normalize(guest).includes(query));
    });
  }, [searchQuery]);

  const regularPages = useMemo(() => {
    return Array.from({ length: Math.ceil(sortedTableAssignments.length / 2) }, (_, index) =>
      sortedTableAssignments.slice(index * 2, index * 2 + 2),
    );
  }, []);

  const visibleRegularPage = useMemo(() => {
    if (currentPage <= 1) {
      return [];
    }

    return regularPages[currentPage - 2] ?? [];
  }, [currentPage, regularPages]);

  const visibleRegularCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return visibleRegularPage;
    }

    const query = normalize(searchQuery);
    return filteredTables.filter((entry) => {
      if (entry.table && normalize(entry.table).includes(query)) {
        return true;
      }

      return entry.guests.some((guest) => normalize(guest).includes(query));
    });
  }, [searchQuery, filteredTables, visibleRegularPage]);

  const totalPages = regularPages.length + 1;

  const pageLabel = currentPage === 1 ? "1 of 6 · VIP" : `${currentPage} of 6 · ${tablePageLabel(currentPage)}`;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const canShowVip = filteredVipPairs.length > 0 && currentPage === 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-4 w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/90 shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#A8BBA3]/10 px-4 py-4 md:px-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium text-[#5B3832] font-(family-name:--font-cormorant)">
                  Guests
                </h2>
                <p className="text-sm md:text-base text-[#7A5B54] font-(family-name:--font-cormorant)">
                  Seating list
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A8BBA3]/15 bg-white/60 transition-all duration-200 hover:scale-105 hover:bg-white md:h-10 md:w-10"
                aria-label="Close guests list"
              >
                <X className="h-4 w-4 text-[#5B3832]" />
              </button>
            </div>

            <div className="px-3 py-4 md:px-5 md:py-5">
              <div className="mb-4 rounded-full border border-[#A8BBA3]/25 bg-[#F8F4F2]/90 p-2 shadow-[0_8px_25px_rgba(91,56,50,0.04)] md:mb-5">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A5B54]/70" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search table number or guest name..."
                    className="h-10 w-full rounded-full border border-transparent bg-white/80 pl-11 pr-4 text-sm text-[#5B3832] placeholder:text-[#7A5B54]/60 outline-none ring-0 transition-all duration-200 focus:border-[#A8BBA3]/60 md:h-11"
                  />
                </div>
              </div>

              {currentPage === 1 && canShowVip ? (
                <div className="mb-5 md:mb-6">
                  <div className="overflow-hidden rounded-[1.5rem] border border-[#D4537E]/40 bg-[linear-gradient(135deg,#F8F4F2_0%,#FFF_100%)] p-2 md:p-3">
                    <div className="rounded-[1.2rem] border-[1.5px] border-[#D4537E] bg-[rgba(255,255,255,0.6)] p-2 md:p-3">
                      <div className="mb-3 text-center">
                        <p className="text-[0.62rem] font-(family-name:--font-montserrat) tracking-[0.24em] text-[#993556] uppercase md:text-[0.7rem]">
                          VIP table
                        </p>
                        <p className="mt-1 text-3xl text-[#993556] font-(family-name:--font-cormorant) md:text-4xl">
                          {vipTable || "TBD"}
                        </p>
                      </div>

                      <div className="overflow-hidden rounded-[1rem] border border-[#EFC8D8]/80 bg-white/60">
                        {filteredVipPairs.map((pair, index) => (
                          <div
                            key={`${pair.left}-${pair.right}-${index}`}
                            className={`grid grid-cols-2 border-b border-[#EFC8D8]/80 text-sm md:text-base ${
                              index % 2 === 1 ? "bg-[rgba(255,255,255,0.55)]" : "bg-[rgba(255,255,255,0.15)]"
                            }`}
                          >
                            <div className="border-r border-[#EFC8D8]/80 px-3 py-3 text-center text-[#5B3832] md:px-4">
                              {pair.left}
                            </div>
                            <div className="px-3 py-3 text-center text-[#5B3832] md:px-4">
                              {pair.right === "Partner" ? (
                                <span className="italic text-[#8B6A62]">Partner</span>
                              ) : (
                                pair.right
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-5 grid gap-3 md:mb-6 md:grid-cols-2 md:gap-4">
                  {visibleRegularCards.map((entry, index) => (
                    <div
                      key={`${entry.table}-${index}`}
                      className="rounded-[1.5rem] border border-[#A8BBA3] bg-[linear-gradient(135deg,#F8F4F2_0%,#fff_100%)] p-4 text-center shadow-[0_10px_30px_rgba(91,56,50,0.04)] md:p-5"
                    >
                      <p className="text-[0.62rem] font-(family-name:--font-montserrat) tracking-[0.24em] text-[#7A5B54] uppercase md:text-[0.7rem]">
                        Table
                      </p>
                      <p className="mt-2 text-3xl text-[#5B3832] font-(family-name:--font-cormorant) md:text-4xl">
                        {entry.table || "TBD"}
                      </p>

                      <div className="my-4 h-px w-full bg-[#A8BBA3]/40" />

                      <div className="space-y-2 text-sm text-[#5B3832] md:text-base">
                        {entry.guests.map((guest, guestIndex) => (
                          <div key={`${guest}-${guestIndex}`} className="leading-relaxed">
                            {guest}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col items-center gap-3 pt-2">
                <div className="flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-200 ${
                        currentPage === index + 1 ? "bg-[#D4537E]" : "bg-[#EFC8D8]"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-4 text-sm font-(family-name:--font-montserrat) text-[#5B3832]">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                    disabled={isFirstPage}
                    className={`inline-flex items-center gap-1 ${isFirstPage ? "cursor-not-allowed opacity-40" : "hover:text-[#D4537E]"}`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>

                  <span className="text-[#7A5B54]">{pageLabel}</span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                    disabled={isLastPage}
                    className={`inline-flex items-center gap-1 ${isLastPage ? "cursor-not-allowed opacity-40" : "hover:text-[#D4537E]"}`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
