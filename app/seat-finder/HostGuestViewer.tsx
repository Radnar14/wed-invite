"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Guest {
  fullName: string;
  table: string;
}

interface GroupSummary {
  representative: string;
  total: number;
  confirmedCount: number;
  declinedCount: number;
  confirmed: string[];
  responded: boolean;
}

interface HostGuestViewerProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  groups?: GroupSummary[];
  isLoading: boolean;
}

/**
 * Formats table number
 */
const formatTableNumber = (table: string) =>
  String(table).padStart(2, "0");

/**
 * Host modal page-size options
 */
const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100];

/**
 * Hidden host/admin guest viewer modal
 */
export default function HostGuestViewer({ isOpen, onClose, guests, groups = [], isLoading }: HostGuestViewerProps) {
  /**
   * Admin guest search query
   */
  const [searchQuery, setSearchQuery] = useState("");
  /**
   * Number of visible guests
   */
  const [pageSize, setPageSize] = useState(10);

  /**
   * Current page number
   */
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Toggle between the flat guest list and the per-representative summary
   */
  const [viewMode, setViewMode] = useState<"guests" | "byRep">("guests");

  /**
   * Filters guests by:
   * - Full name
   * - Table number
   * - "Table 01" format
   */
  const filteredGuests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return guests;

    return guests.filter((guest) => {
      const fullName = guest.fullName.toLowerCase();

      const tableNumber = formatTableNumber(guest.table).toLowerCase();

      const tableLabel = `table ${tableNumber}`;

      return fullName.includes(query) || tableNumber.includes(query) || tableLabel.includes(query);
    });
  }, [guests, searchQuery]);
  /**
   * Guests sorted alphabetically by full name
   */
  const sortedGuests = useMemo(() => {
    return [...filteredGuests].sort((a, b) => a.fullName.localeCompare(b.fullName));
  }, [filteredGuests]);

  /**
   * Filters representatives by rep name or any confirmed guest name.
   */
  const filteredGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return groups;

    return groups.filter((group) => {
      const inRep = group.representative.toLowerCase().includes(query);
      const inConfirmed = group.confirmed.some((name) => name.toLowerCase().includes(query));
      return inRep || inConfirmed;
    });
  }, [groups, searchQuery]);

  /**
   * Representatives sorted alphabetically.
   */
  const sortedGroups = useMemo(() => {
    return [...filteredGroups].sort((a, b) => a.representative.localeCompare(b.representative));
  }, [filteredGroups]);

  /**
   * Active dataset length drives the pagination for the current view.
   */
  const activeLength = viewMode === "guests" ? sortedGuests.length : sortedGroups.length;

  /**
   * Total number of pages
   */
  const totalPages = Math.max(1, Math.ceil(activeLength / pageSize));

  /**
   * Current page start index
   */
  const startIndex = (currentPage - 1) * pageSize;

  /**
   * Current page guests
   */
  const paginatedGuests = useMemo(() => {
    return sortedGuests.slice(startIndex, startIndex + pageSize);
  }, [sortedGuests, currentPage, pageSize, startIndex]);

  /**
   * Current page representatives
   */
  const paginatedGroups = useMemo(() => {
    return sortedGroups.slice(startIndex, startIndex + pageSize);
  }, [sortedGroups, currentPage, pageSize, startIndex]);

  /**
   * Total confirmed guests across all representatives (for the summary header).
   */
  const totalConfirmed = useMemo(() => {
    return groups.reduce((sum, group) => sum + group.confirmedCount, 0);
  }, [groups]);

  /**
   * Ensures current page remains valid
   * after filtering or page-size changes.
   */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /**
   * Reset to the first page whenever the view switches.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed inset-0 z-[100] flex items-center justify-center
            bg-black/20 px-4 backdrop-blur-md
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="
              relative w-full max-w-5xl overflow-hidden rounded-[2rem]
              border border-white/20 bg-white/92 backdrop-blur-xl
              shadow-[0_20px_60px_rgba(0,0,0,0.15)]
            "
          >
            {/* Modal Header */}
            <div
              className="
                flex items-center justify-between
                border-b border-[#A8BBA3]/10
                px-5 py-5 md:px-7
              "
            >
              <div>
                <h2
                  className="
                    text-2xl md:text-3xl
                    font-medium
                    text-[#5B3832]
                    font-(family-name:--font-cormorant)
                  "
                >
                  Guests
                </h2>
                <p
                  className="
                    text-sm md:text-base
                    text-[#7A5B54]
                    font-(family-name:--font-cormorant)
                  "
                >
                  Host/Admin View
                </p>
              </div>

              <button
                onClick={onClose}
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  border border-[#A8BBA3]/15 bg-white/60
                  transition-all duration-200
                  hover:scale-105 hover:bg-white
                "
              >
                ✕
              </button>
            </div>

            {/* Guest List */}
            <div className="px-5 py-5 md:px-7">
              <div className="mb-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <p
                    className="
                      text-xl
                      font-semibold
                      text-[#5B3832]
                      font-(family-name:--font-cormorant)
                    "
                  >
                    {viewMode === "guests"
                      ? `${filteredGuests.length} Guest Count${filteredGuests.length !== 1 ? "s" : ""}`
                      : `${filteredGroups.length} Group${filteredGroups.length !== 1 ? "s" : ""} · ${totalConfirmed} Confirmed`}
                  </p>

                  {/* View toggle: flat guest list vs per-representative summary */}
                  <div className="inline-flex rounded-full border border-[#A8BBA3]/30 bg-white/60 p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("guests")}
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        font-(family-name:--font-montserrat) transition-all duration-200
                        ${viewMode === "guests" ? "bg-[#A8BBA3] text-white shadow-sm" : "text-[#7A5B54] hover:bg-white"}
                      `}
                    >
                      All Guests
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("byRep")}
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        font-(family-name:--font-montserrat) transition-all duration-200
                        ${viewMode === "byRep" ? "bg-[#A8BBA3] text-white shadow-sm" : "text-[#7A5B54] hover:bg-white"}
                      `}
                    >
                      By Representative
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder={viewMode === "guests" ? "Search guest or table..." : "Search representative or guest..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="
                    h-10 w-full max-w-[260px]
                    rounded-xl border border-[#A8BBA3]/20
                    bg-white/70 px-4
                    font-(family-name:--font-montserrat)
                    text-sm font-medium
                    text-[#5B3832]
                    placeholder:text-[#8B6A62]
                    focus:outline-none
                  "
                />
              </div>

              <div
                className="
                    overflow-hidden rounded-[1.5rem]
                    border border-[#A8BBA3]
                  "
              >
                {/* Mobile Header */}
                <div
                  className="
                        flex items-center justify-between
                        border-b border-[#A8BBA3]
                        bg-[#F8F4F2]/70
                        px-5 py-3
                        md:hidden
                      "
                >
                  <p
                    className="
                      font-(family-name:--font-montserrat)
                      text-xs font-semibold
                      uppercase tracking-[0.12em]
                      text-[#7A5B54]
                        "
                  >
                    {viewMode === "guests" ? "Full Name" : "Representative"}
                  </p>

                  <p
                    className="
                      font-(family-name:--font-montserrat)
                      text-xs font-semibold
                      uppercase tracking-[0.12em]
                      text-[#7A5B54]
                        "
                  >
                    {viewMode === "guests" ? "Table" : "Confirmed"}
                  </p>
                </div>

                {/* Desktop Header */}
                <div
                  className={`
                        hidden border-b border-[#A8BBA3]
                        bg-[#F8F4F2]/70
                        px-5 py-4
                        md:grid
                        ${viewMode === "guests" ? "grid-cols-[1fr_90px]" : "grid-cols-[1fr_120px]"}
                      `}
                >
                  <p
                    className="
                      font-(family-name:--font-montserrat)
                      text-xs font-semibold
                      uppercase tracking-[0.18em]
                      text-[#7A5B54]
                    "
                  >
                    {viewMode === "guests" ? "Full Name" : "Representative"}
                  </p>

                  <div
                    className="
                        flex items-center gap-3
                        text-[#6E4A43]
                      "
                  >
                    <span className="h-4 w-px bg-[#A8BBA3]" />

                    <p
                      className="
                          ml-4
                          font-(family-name:--font-montserrat)
                          text-xs font-semibold
                          uppercase tracking-[0.18em]
                          text-[#7A5B54]
                        "
                    >
                      {viewMode === "guests" ? "Table" : "Confirmed"}
                    </p>
                  </div>
                </div>
                {/* Scrollable Content Area */}
                <div
                  className="
                      max-h-[50vh]
                      overflow-y-auto
                      [scrollbar-width:none]
                      [-ms-overflow-style:none]
                      [&::-webkit-scrollbar]:hidden
                    "
                >
                  {/* Luxury Loading State */}
                  {isLoading ? (
                    <div
                      className="
                        flex flex-col items-center
                        justify-center px-8 py-16
                        "
                    >
                      <p
                        className="
                          mb-5
                          font-(family-name:--font-montserrat)
                          text-sm font-medium
                          tracking-[0.18em]
                          text-[#7A5B54]
                        "
                      >
                        Loading Guest List
                      </p>

                      <div
                        className="
                            relative h-[10px]
                            w-full max-w-[320px]
                            overflow-hidden rounded-full
                            bg-[#EFC8D8]/40
                        "
                      >
                        <motion.div
                          animate={{
                            x: ["-100%", "250%"],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2,
                            ease: "linear",
                          }}
                          className="
                            absolute inset-y-0
                            w-[35%] rounded-full
                            bg-[#DFA8BF]
                            blur-[2px]
                            "
                        />
                      </div>
                    </div>
                  ) : viewMode === "guests" ? (
                    filteredGuests.length === 0 ? (
                    <div
                      className="
                          flex flex-col items-center
                          justify-center px-8 py-16
                          text-center
                        "
                    >
                      <div
                        className="
                            mb-4 flex h-14 w-14
                            items-center justify-center
                            rounded-full border
                            border-[#A8BBA3]/20
                            bg-[#F8F4F2]/60
                          "
                      >
                        <span className="text-blushpink text-2xl items-center">♡</span>
                      </div>

                      <h3
                        className="
                            mb-2 text-lg
                            text-[#5B3832]
                            font-semibold
                            font-(family-name:--font-cormorant)
                          "
                      >
                        No accepted guests yet
                      </h3>

                      <p
                        className="
                            max-w-sm
                            font-(family-name:--font-montserrat)
                            text-sm
                            leading-7 text-[#7A5B54]
                          "
                      >
                        Guest confirmations will appear here once RSVPs have been submitted.
                      </p>
                    </div>
                  ) : (
                    paginatedGuests.map((guest) => (
                      <div
                        key={`${guest.fullName}-${guest.table}`}
                        className="
                        border-b border-[#A8BBA3]/10
                        bg-white/30 px-5 py-4
                        last:border-b-0 "
                      >
                        {/* Mobile */}
                        <div
                          className="
                            flex items-center justify-between
                            gap-4 md:hidden
                          "
                        >
                          <p
                            className="
                              min-w-0 flex-1 truncate
                              font-(family-name:--font-montserrat)
                              text-base font-medium
                              text-[#5B3832]
                            "
                          >
                            {guest.fullName}
                          </p>

                          <div
                            className="
                              flex items-center gap-3
                              text-sm text-[#6E4A43]/80
                              whitespace-nowrap
                            "
                          >
                            <span className="h-4 w-px bg-[#A8BBA3]" />

                            <span
                              className="
                                font-(family-name:--font-montserrat)
                                text-base font-semibold
                                tracking-normal
                                text-[#5B3832]
                              "
                            >
                              {formatTableNumber(guest.table)}
                            </span>
                          </div>
                        </div>

                        {/* Desktop */}
                        <div
                          className="
                            hidden grid-cols-[1fr_90px]
                            items-center md:grid
                          "
                        >
                          <p
                            className="
                              font-(family-name:--font-montserrat)
                              font-medium
                              text-[#5B3832]
                            "
                          >
                            {guest.fullName}
                          </p>

                          <div
                            className="
                              flex items-center gap-3
                              text-[#6E4A43]
                            "
                          >
                            <span className="h-4 w-px bg-[#A8BBA3]" />
                            <p
                              className="
                                    ml-4 w-8
                                    text-center
                                    font-(family-name:--font-montserrat)
                                    text-base font-semibold
                                    tracking-normal
                                    text-[#5B3832]
                                  "
                            >
                              {formatTableNumber(guest.table)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                    )
                  ) : filteredGroups.length === 0 ? (
                    <div
                      className="
                          flex flex-col items-center
                          justify-center px-8 py-16
                          text-center
                        "
                    >
                      <div
                        className="
                            mb-4 flex h-14 w-14
                            items-center justify-center
                            rounded-full border
                            border-[#A8BBA3]/20
                            bg-[#F8F4F2]/60
                          "
                      >
                        <span className="text-blushpink text-2xl items-center">♡</span>
                      </div>

                      <h3
                        className="
                            mb-2 text-lg
                            text-[#5B3832]
                            font-semibold
                            font-(family-name:--font-cormorant)
                          "
                      >
                        No representatives found
                      </h3>

                      <p
                        className="
                            max-w-sm
                            font-(family-name:--font-montserrat)
                            text-sm
                            leading-7 text-[#7A5B54]
                          "
                      >
                        Group confirmations will appear here once representatives submit their RSVPs.
                      </p>
                    </div>
                  ) : (
                    paginatedGroups.map((group) => {
                      const ratio = `${group.confirmedCount}/${group.total}`;
                      const allIn = group.responded && group.confirmedCount === group.total;
                      const none = group.confirmedCount === 0;
                      const ratioClass = !group.responded
                        ? "bg-[#F0EBE8] text-[#8B6A62]"
                        : allIn
                          ? "bg-emerald-100 text-emerald-700"
                          : none
                            ? "bg-rose-100 text-rose-600"
                            : "bg-amber-100 text-amber-700";
                      const names =
                        group.confirmedCount > 0
                          ? group.confirmed.join(", ")
                          : group.responded
                            ? "No one attending"
                            : "No response yet";

                      return (
                        <div
                          key={group.representative}
                          className="
                            border-b border-[#A8BBA3]/10
                            bg-white/30 px-5 py-4
                            last:border-b-0 "
                        >
                          {/* Mobile */}
                          <div className="md:hidden">
                            <div className="flex items-center justify-between gap-4">
                              <p
                                className="
                                  min-w-0 flex-1 truncate
                                  font-(family-name:--font-montserrat)
                                  text-base font-medium
                                  text-[#5B3832]
                                "
                              >
                                {group.representative}
                              </p>

                              <span
                                className={`
                                  shrink-0 rounded-full px-3 py-1
                                  text-sm font-semibold
                                  font-(family-name:--font-montserrat)
                                  ${ratioClass}
                                `}
                              >
                                {ratio}
                              </span>
                            </div>

                            <p className="mt-1.5 text-xs leading-6 text-[#7A5B54] font-(family-name:--font-montserrat)">
                              {names}
                            </p>
                          </div>

                          {/* Desktop */}
                          <div className="hidden grid-cols-[1fr_120px] items-start md:grid">
                            <div className="min-w-0 pr-4">
                              <p className="font-(family-name:--font-montserrat) font-medium text-[#5B3832]">
                                {group.representative}
                              </p>
                              <p className="mt-1 text-xs leading-6 text-[#7A5B54] font-(family-name:--font-montserrat)">
                                {names}
                              </p>
                            </div>

                            <div className="flex items-center justify-end">
                              <span
                                className={`
                                  rounded-full px-3 py-1
                                  text-sm font-semibold
                                  font-(family-name:--font-montserrat)
                                  ${ratioClass}
                                `}
                              >
                                {ratio}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div
                  className="
                      flex flex-wrap items-center justify-between gap-4
                      border-t border-[#A8BBA3]
                      bg-white/40 px-4 py-0.5
                    "
                >
                  {/* Pagination */}
                  <div
                    className="
                      flex items-center gap-2
                      font-(family-name:--font-montserrat)
                      text-sm font-semibold
                      text-[#5B3832]
                    "
                  >
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className="
                          rounded-lg px-1.5
                          transition-all duration-200
                          hover:bg-white hover:shadow-md
                          disabled:pointer-events-none
                          disabled:opacity-30
                        "
                    >
                      &lt;&lt;
                    </button>

                    <span className="text-center">
                      {currentPage} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className="
                          rounded-lg px-1.5
                          transition-all duration-200
                          hover:bg-white hover:shadow-md
                          disabled:pointer-events-none
                          disabled:opacity-30
                        "
                    >
                      &gt;&gt;
                    </button>
                  </div>

                  {/* Page Size */}
                  <div
                    className="
                      flex items-center gap-2
                      font-(family-name:--font-montserrat)
                      text-sm font-medium
                      text-[#5B3832]
                    ">
                    <span>Show</span>

                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="
                          rounded-lg border
                          border-[#A8BBA3]/20
                          bg-white/80 py-1
                          text-sm text-[#6E4A43]
                          transition-all duration-200
                          hover:bg-white hover:shadow-md
                          focus:outline-none
                        "
                    >
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <span>
                      {viewMode === "guests"
                        ? `of ${paginatedGuests.length} guest${paginatedGuests.length !== 1 ? "s" : ""}`
                        : `of ${paginatedGroups.length} group${paginatedGroups.length !== 1 ? "s" : ""}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
