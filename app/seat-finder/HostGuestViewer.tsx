"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Guest {
  fullName: string;
  table: string;
}

interface HostGuestViewerProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  isLoading: boolean;
}

/**
 * Hidden host/admin guest viewer modal
 */
export default function HostGuestViewer({ isOpen, onClose, guests, isLoading }: HostGuestViewerProps) {
  /**
   * Admin guest search query
   */
  const [searchQuery, setSearchQuery] = useState("");
  /**
   * Number of visible guests
   */
  const [pageSize, setPageSize] = useState(10);

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

      const tableNumber = String(guest.table).padStart(2, "0").toLowerCase();

      const tableLabel = `table ${tableNumber}`;

      return fullName.includes(query) || tableNumber.includes(query) || tableLabel.includes(query);
    });
  }, [guests, searchQuery]);
  /**
   * Guests displayed in table
   */
  const paginatedGuests = useMemo(() => {
    return filteredGuests.slice(0, pageSize);
  }, [filteredGuests, pageSize]);

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
                <h2 className="text-xl text-[#6E4A43]">Guests</h2>

                <p className="text-sm text-[#6E4A43]/90">Host/Admin View</p>
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
                <p
                  className="
                    mb-3 text-base
                    font-medium text-[#6E4A43]
                  "
                >
                  {filteredGuests.length}  Guest Count
                  {filteredGuests.length !== 1 ? "s" : ""}
                </p>

                <input
                  type="text"
                  placeholder="Search guest or table..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="
                    h-10 w-full max-w-[260px]
                    rounded-xl border border-[#A8BBA3]/20
                    bg-white/70 px-4
                    text-sm text-[#6E4A43]
                    placeholder:text-[#6E4A43]/50
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
                          text-[0.72rem]
                          uppercase tracking-[0.14em]
                          text-[#6E4A43]
                        "
                  >
                    Full Name
                  </p>

                  <p
                    className="
                          text-[0.72rem]
                          uppercase tracking-[0.14em]
                          text-[#6E4A43]
                        "
                  >
                    Table
                  </p>
                </div>

                {/* Desktop Header */}
                <div
                  className="
                        hidden grid-cols-[1fr_90px]
                        border-b border-[#A8BBA3]
                        bg-[#F8F4F2]/70
                        px-5 py-4
                        md:grid
                      "
                >
                  <p
                    className="
                        font-sans
                        text-xs font-medium
                        uppercase tracking-[0.12em]
                        text-[#6E4A43]
                      "
                  >
                    Full Name
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
                        font-sans
                        text-xs font-medium
                        uppercase tracking-[0.12em]
                        text-[#6E4A43]
                      "
                    >
                      Table
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
                            mb-5 text-sm
                            tracking-[0.18em]
                            text-[#6E4A43]/90
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
                  ) : filteredGuests.length === 0 ? (
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
                            text-[#6E4A43]
                          "
                      >
                        No accepted guests yet
                      </h3>

                      <p
                        className="
                            max-w-sm text-sm
                            leading-7 text-[#6E4A43]/70
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
                              text-[#6E4A43]
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
                                text-sm font-medium
                                tracking-[0.03em]
                                text-[#6E4A43]
                              "
                            >
                              Table {String(guest.table).padStart(2, "0")}
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
                              font-sans
                              text-[#6E4A43]
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
                                    font-sans
                                    text-base font-semibold
                                    tracking-normal
                                    text-[#6E4A43]
                                  "
                            >
                              {String(guest.table).padStart(2, "0")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div
                  className="
                    flex justify-end
                    border-t border-[#A8BBA3]/10
                    bg-white/40 px-4 py-3
                  "
                >
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="
                      rounded-lg border
                      border-[#A8BBA3]/20
                      bg-white/80 px-3 py-2
                      text-sm text-[#6E4A43]
                      focus:outline-none
                    "
                  >
                    <option value={10}>Show 10</option>
                    <option value={20}>Show 20</option>
                    <option value={30}>Show 30</option>
                    <option value={50}>Show 50</option>
                    <option value={100}>Show 100</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
