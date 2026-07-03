// ============================================================
// Gallery API
//
// Purpose:
// Automatically retrieve gallery images and videos stored
// inside the public/gallery directory.
//
// Gallery Images:
// public/gallery/images
//
// Gallery Videos:
// public/gallery/videos
//
// NOTE:
// Shared assets (Hero, Ceremony, Reception, etc.) are NOT
// included here because they belong to other sections.
//
// ============================================================

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import { featuredGalleryVideos } from "@/data/gallery";

export async function GET() {
  try {
    // =========================
    // Gallery folders
    // =========================
    const imageDirectory = path.join(process.cwd(), "public/gallery/images");
    const videoDirectory = path.join(process.cwd(), "public/gallery/videos");

    // =========================
    // Supported file types
    // =========================
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    const videoExtensions = [".mp4", ".mov", ".webm"];

    // =========================
    // Read gallery images
    // =========================
    const images = fs.existsSync(imageDirectory)
      ? fs
          .readdirSync(imageDirectory)
          .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
          .sort()
          .map((file) => ({
            type: "image",
            src: `/gallery/images/${file}`,
            alt: path.parse(file).name,
          }))
      : [];

    // =========================
    // Read local gallery videos
    // =========================
    const videos = fs.existsSync(videoDirectory)
      ? fs
          .readdirSync(videoDirectory)
          .filter((file) => videoExtensions.includes(path.extname(file).toLowerCase()))
          .sort()
          .map((file) => {
            const name = path.parse(file).name;

            // Supported thumbnail formats
            const thumbnailExtensions = [".jpg", ".jpeg", ".png", ".webp"];

            // Find the first thumbnail that exists
            const thumbnail = thumbnailExtensions.find((ext) => fs.existsSync(path.join(videoDirectory, `${name}${ext}`)));

            return {
              type: "video",
              src: `/gallery/videos/${file}`,
              thumbnail: thumbnail ? `/gallery/videos/${name}${thumbnail}` : "/placeholder.jpg",
              alt: name,
            };
          })
      : [];

    return NextResponse.json([
      ...featuredGalleryVideos.map((video) => ({
        type: "video",
        ...video,
      })),

      ...images,

      ...videos,
    ]);
  } catch (error) {
    console.error("Gallery API Error:", error);

    return NextResponse.json(
      {
        images: [],
        videos: [],
      },
      { status: 500 },
    );
  }
}
