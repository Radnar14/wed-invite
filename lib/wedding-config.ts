export const COUPLE_NAMES = {
  groom: "John Mark",
  bride: "Chezza",
} as const;

export const WEDDING_DISPLAY_DATE = "October 8, 2026";
export const WEDDING_DISPLAY_DATE_LONG = "October 08, 2026";

// 3:00 PM Philippine time. The explicit offset keeps countdown behavior
// consistent for guests outside the wedding timezone.
export const WEDDING_DATE = new Date("2026-10-08T15:00:00+08:00");

export const RSVP_DEADLINE = "September 25, 2026";

// 12:00 AM Philippine time. The explicit offset keeps RSVP closing behavior
// consistent for guests outside the wedding timezone.
export const RSVP_DEADLINE_DATE = new Date("2026-09-30T00:00:00+08:00");

// Edit here: Philippine-time effective date for scheduled Groom's Side text.
export const GROOM_SIDE_TEXT_EFFECTIVE_DATE = "2026-10-01T00:00:00+08:00";
