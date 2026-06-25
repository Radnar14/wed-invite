// ============================================================
// Wedding Gallery Data
//
// This file serves as the single source of truth for all
// gallery media used throughout the website.
//
// Used by:
// • components/wedding/gallery.tsx
// • app/gallery/page.tsx
//
// NOTE:
// - Gallery-exclusive images are stored in:
//   /public/gallery/images
//
// - Shared assets (Hero, Ceremony, Reception, QR Code, Logos, etc.)
//   remain inside:
//   /public/images
//
// - Videos currently use YouTube embeds.
//
// Future Improvement:
// This file can later be replaced with an automatic gallery loader
// without changing any UI components.
// ============================================================

export const galleryImages = [
  {
    src: "/gallery/images/gallery-1.jpg",
    alt: "John Mark and Chezza laughing together",
  },
  {
    src: "/gallery/images/gallery-2.jpg",
    alt: "Wedding rings detail",
  },
  {
    src: "/gallery/images/gallery-3.jpg",
    alt: "Beautiful bride portrait",
  },
  {
    src: "/gallery/images/gallery-4.jpg",
    alt: "Wedding venue",
  },
  {
    src: "/gallery/images/gallery-5.jpg",
    alt: "First dance",
  },
  {
    src: "/gallery/images/gallery-6.jpg",
    alt: "Wedding bouquet",
  },
];

export const galleryMedia = [
  // =========================
  // Featured Video
  // =========================
  {
    type: "video",
    src: "https://www.youtube.com/embed/YMKjUxJa6C4?enablejsapi=1",
    thumbnail: "https://img.youtube.com/vi/YMKjUxJa6C4/maxresdefault.jpg",
    alt: "Our Pre-Wedding Film",
  },

  // =========================
  // Gallery Images
  // =========================
  ...galleryImages.map((image) => ({
    type: "image",
    ...image,
  })),

  // =========================
  // Shared Images
  // Used by multiple sections
  // =========================
  {
    type: "image",
    src: "/images/ceremony.jpg",
    alt: "The Ceremony",
  },
  {
    type: "image",
    src: "/images/reception.jpg",
    alt: "The Reception",
  },
];