// HOMEPAGE GALLERY — EDIT HERE:
// Add, remove, or reorder these images to curate the six photos shown on
// the homepage. Copy each image into public/gallery/images first.
// This list does not control the Full Gallery, which loads that folder
// automatically through app/api/gallery/route.ts.
export const homepageGalleryImages = [
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

// FEATURED YOUTUBE VIDEOS — EDIT HERE:
// These videos appear on both the Homepage and Full Gallery.
// Use YouTube embed and thumbnail URLs, following the examples below.
export const galleryVideos = {
  prenup: {
    src: "https://www.youtube.com/embed/YMKjUxJa6C4?enablejsapi=1",
    thumbnail: "https://img.youtube.com/vi/YMKjUxJa6C4/maxresdefault.jpg",
    alt: "Our Pre-Wedding Film",
  },
  saveTheDate: {
    src: "https://www.youtube.com/embed/vJ-oVgDNkmo?enablejsapi=1",
    thumbnail: "https://img.youtube.com/vi/vJ-oVgDNkmo/maxresdefault.jpg",
    alt: "Save the Date",
  },
};

// The Full Gallery API consumes this list automatically.
export const featuredGalleryVideos = Object.values(galleryVideos);
