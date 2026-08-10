"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

type MediaItem = {
  src: string;
  alt: string;
  cat: string;
  yacht?: string;
  type?: "video";
};

const ARYEO =
  "https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large";

const images: MediaItem[] = [
  { src: ARYEO + "/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg", alt: "Aerial view — cruising Miami waters", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c1f2-7265-8eb4-e4488fa5fae1.jpeg", alt: "Stern shot with downtown Miami skyline backdrop", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-cce1-7336-983e-aa78dd7dd56d.jpeg", alt: "Cruising Biscayne Bay", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c2a0-7238-a7c9-4ee9db8a2e81.jpeg", alt: "Full profile on Miami waters", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c390-73e5-8df4-3f89eef92fe1.jpeg", alt: "Gliding across open water", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c5fd-73fe-9417-3ad8a8d3719f.jpeg", alt: "Crystal clear Miami waters", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c469-715c-8bc2-73f2e9550edd.jpeg", alt: "Stern with downtown Miami skyline", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c59a-7226-8d15-ffa0dd0eeecc.jpeg", alt: "Charter experience on Biscayne Bay", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-ce92-73d6-9ba3-93d79e097ded.jpeg", alt: "Open deck with panoramic ocean views", cat: "Deck & Views", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-cf00-7262-8c04-8a86a11ce0b7.jpeg", alt: "Cockpit overlooking downtown Miami skyline", cat: "Deck & Views", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-cf69-72aa-8a10-1fde3fd0a343.jpeg", alt: "Open deck — unobstructed ocean views", cat: "Deck & Views", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-cfd2-706c-92d7-ddc566404c44.jpeg", alt: "Bridge deck heading out to open sea", cat: "Deck & Views", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-d03b-706e-af55-1c25755dc50e.jpeg", alt: "Luxury interior cabin", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-d0b2-715a-b1e4-794d11bb8e2d.jpeg", alt: "Premium cabin finishes", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-d116-70f0-b23f-b57d38c7df83.jpeg", alt: "Luxury amenities and appointments", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-d17d-73ba-a390-8921bc9d32fb.jpeg", alt: "Lounge area and seating", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c7a8-71c6-b747-1e618333e7d1.jpeg", alt: "Interior detail and craftsmanship", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c8ce-72df-9c94-fa01e652a52b.jpeg", alt: "Master suite", cat: "Interior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-c945-73e2-9f52-1f7018198e28.jpeg", alt: "Side profile on Miami waters", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: ARYEO + "/large-019c697c-ca79-7355-af8f-63cf1296f119.jpeg", alt: "Docked at Miami Pier A", cat: "Yacht Exterior", yacht: "Foolish Pleasure — 80' Uniesse" },
  { src: "/images/jetski-action.png", alt: "Cruising Miami waters on a jet ski", cat: "Watersports" },
  { src: "/images/jetski-ride.png", alt: "Riding the waves on a premium jet ski", cat: "Watersports" },
  { src: "/images/jetski-solo.png", alt: "Solo jet ski rental on Biscayne Bay", cat: "Watersports" },
  { src: "/images/jetcar-white.png", alt: "The iconic white Ferrari jet car on Miami waters", cat: "Watersports" },
  { src: "/images/jetcar-color.png", alt: "The vibrant jet car — a true Miami experience", cat: "Watersports" },
  { src: "/images/jetcar-red.png", alt: "Jet car rental with Miami skyline backdrop", cat: "Watersports" },
  { src: "/videos/jetski-1.mp4", alt: "Jet ski action on Miami waters", cat: "Videos", type: "video" },
  { src: "/videos/jetcar-1.mp4", alt: "Jet car experience on Biscayne Bay", cat: "Videos", type: "video" },
  { src: "/videos/jetcar-2.mp4", alt: "Jet car cruising Miami waters", cat: "Videos", type: "video" },
  { src: "/videos/jetcar-3.mp4", alt: "Jet car riding the waves", cat: "Videos", type: "video" },
];

const CATEGORIES = ["All", "Videos", "Watersports", "Yacht Exterior", "Deck & Views", "Interior"];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.cat === activeFilter);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % filtered.length));
  }, [selectedIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + filtered.length) % filtered.length
    );
  }, [selectedIndex, filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, goNext, goPrev]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const currentItem = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Header */}
      <section className="relative pt-20 pb-10 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/15 rounded-full blur-[120px]" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4"
            style={{
              background: "linear-gradient(135deg, #00E5CC 0%, #00BFFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GALLERY
          </h1>
          <p className="text-base sm:text-xl text-white/70 font-light mb-10 tracking-wide">
            Experience Miami&apos;s Finest on the Water
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg shadow-cyan-500/30 scale-105"
                      : "text-white/60 hover:text-white/90 hover:scale-105"
                  }`}
                  style={
                    isActive
                      ? { background: "linear-gradient(135deg, #00E5CC 0%, #00BFFF 100%)" }
                      : { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }
                  }
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map((item, index) => (
            <div
              key={item.src}
              className="break-inside-avoid mb-4 rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => openLightbox(index)}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              )}
              {/* Play button for videos */}
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200" style={{ background: "rgba(0,229,204,0.2)", border: "2px solid rgba(0,229,204,0.6)", backdropFilter: "blur(8px)" }}>
                    <svg className="w-6 h-6 text-[#00E5CC] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                <span
                  className="inline-block text-xs font-semibold uppercase tracking-widest mb-1.5 px-2 py-0.5 rounded-full w-fit"
                  style={{ background: "linear-gradient(135deg, #00E5CC, #00BFFF)" }}
                >
                  {item.cat}
                </span>
                {item.yacht && (
                  <p className="text-[#00E5CC] text-xs font-bold tracking-wide mb-0.5">{item.yacht}</p>
                )}
                <p className="text-white/90 text-sm font-medium leading-snug">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-white/40 py-20 text-lg">
            No images in this category yet.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ready to experience this?
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Your Miami adventure is waiting — step aboard and make it yours.
          </p>
          <Link
            href="/book"
            className="inline-block px-10 py-4 rounded-full text-white font-bold text-lg tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40"
            style={{
              background: "linear-gradient(135deg, #00E5CC 0%, #00BFFF 100%)",
            }}
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-colors text-2xl"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-label="Previous image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Main media */}
          <div
            className="flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" ? (
              <video
                key={currentItem.src}
                src={currentItem.src}
                controls
                autoPlay
                playsInline
                className="rounded-xl"
                style={{ maxHeight: "85vh", maxWidth: "90vw" }}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="rounded-xl object-contain"
                style={{ maxHeight: "85vh", maxWidth: "90vw" }}
              />
            )}
            {/* Caption */}
            <div className="mt-4 text-center max-w-lg px-4">
              {currentItem.yacht && (
                <p className="text-[#00E5CC] text-xs font-bold tracking-widest uppercase mb-1">{currentItem.yacht}</p>
              )}
              <p className="text-white/80 text-sm">{currentItem.alt}</p>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            aria-label="Next image"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tabular-nums">
            {selectedIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </main>
  );
}
