// EDIT HERE: This is the only file to update for dress-code wording,
// garment labels, and palette colors. Colors use standard hex codes.
// IMPORTANT: The third guest shade is selected when the page first loads.

export interface AttireShade {
  name: string;
  hex: string;
}

export const greenShades: AttireShade[] = [
  { name: "Celadon", hex: "#B7C8A6" },
  { name: "Eucalyptus", hex: "#A8B89A" },
  { name: "Sage Green", hex: "#9CAF88" },
  { name: "Dusty Green", hex: "#8FA37D" },
  { name: "Olive", hex: "#7F8F6E" },
];

export const attireRoles = [
  { id: "guests", label: "Guests" },
  { id: "principal", label: "Principal" },
  { id: "secondary", label: "Secondary" },
] as const;

export const sponsorAttire = {
  principal: {
    role: "Principal Sponsors",
    note: "Cream and white",
    women: {
      label: "Cream Gown",
      color: "#F3E7D4",
    },
    men: {
      label: "White Barong",
      color: "#F8F5EE",
    },
  },
  secondary: {
    role: "Secondary Sponsors",
    note: "Champagne and beige",
    women: {
      label: "Champagne Gown",
      color: "#E5D1AE",
    },
    men: {
      label: "Beige Barong",
      color: "#D7C3A3",
    },
  },
};

export const assignedColorLabels = [{ name: "Men" }, { name: "Women" }];

export const attireText = {
  description: "We kindly request our guests to wear shades of green to match our wedding theme.",
  guestRecommendation: "Sage Green Recommended",
  gentlemenLabel: "Gentlemen",
  ladiesLabel: "Ladies",
  shadeHeading: "Select A Shade",
  assignedPaletteHeading: "Assigned Palette",
  footerNote: "Cocktail or semi-formal attire is encouraged.",
};
