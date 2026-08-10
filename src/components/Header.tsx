"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function WaveLightningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Lightning bolt */}
      <path
        d="M11.5 2L6 11h5l-2.5 7L17 8h-5l2.5-6.5z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
      {/* Wave underline */}
      <path
        d="M2 16.5 Q4 15 6 16.5 Q8 18 10 16.5 Q12 15 14 16.5 Q16 18 18 16.5"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <line x1="3" y1="6.75" x2="21" y2="6.75" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17.25" x2="21" y2="17.25" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Activities", href: "/#services" },
  { label: "Fleet", href: "/#fleet" },
  { label: "Gallery", href: "/gallery" },
  { label: "Policies", href: "/cancellation-policy" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={[
          "bg-[#030A10] sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "shadow-[0_4px_30px_rgba(0,229,204,0.12)] border-b border-white/10"
            : "border-b border-white/[0.06]",
        ].join(" ")}
      >
        {/* Top gradient accent line */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5CC]/50 to-transparent"
        />

        <nav className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex h-14 md:h-20 items-center justify-between gap-4">

            {/* ── LOGO ── */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050D14] rounded-lg"
              aria-label="Miami Lifestyle Watersports — Home"
            >
              <img
                src="/images/logo.png"
                alt="Miami Lifestyle Watersports"
                className="h-10 md:h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,229,204,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.9)] transition-all duration-300"
              />
            </Link>

            {/* ── DESKTOP NAV (center) ── */}
            <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-white text-xs uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] rounded"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── DESKTOP ACTION BUTTONS (right) ── */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {/* Call Now */}
              <a
                href="tel:7748234024"
                className="glass-dark border border-white/10 px-4 py-2 text-xs text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] touch-manipulation"
                aria-label="Call us at (774) 823-4024"
              >
                Call Now
              </a>

              {/* Text Now */}
              <a
                href="sms:7748234024"
                className="glass-dark border border-white/10 px-4 py-2 text-xs text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] touch-manipulation"
                aria-label="Text us at (774) 823-4024"
              >
                Text Now
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/miamilifestylewatersports/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark border border-white/10 p-2.5 rounded-lg transition-all duration-200 hover:border-[#00E5CC]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] touch-manipulation"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4 stroke-[url(#ig-grad)]" />
                <svg width="0" height="0" className="absolute">
                  <defs>
                    <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF1493" />
                      <stop offset="50%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                  </defs>
                </svg>
              </a>

              {/* Book Now */}
              <Link
                href="/book"
                className="relative bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] px-6 py-2.5 rounded-xl text-xs font-bold text-white uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-200 glow-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050D14] touch-manipulation"
              >
                Book Now
              </Link>
            </div>

            {/* ── MOBILE RIGHT CLUSTER ── */}
            <div className="flex md:hidden items-center gap-2">
              {/* Book Now (always visible on mobile) */}
              <Link
                href="/book"
                className="bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] px-4 py-2 rounded-lg text-xs font-bold text-white uppercase tracking-widest active:scale-95 transition-all duration-200 glow-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] touch-manipulation"
                onClick={closeMobileMenu}
              >
                Book
              </Link>

              {/* Hamburger */}
              <button
                type="button"
                className="glass-dark border border-white/10 inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[#050D14] touch-manipulation"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU DRAWER ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed inset-0 z-40 md:hidden flex flex-col",
          "bg-[#030A10]",
          "transition-all duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Top padding to clear the sticky header */}
        <div className="pt-14 px-5 pb-6 flex flex-col h-full overflow-y-auto">

          {/* Nav links */}
          <nav className="flex flex-col gap-1 mt-4">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={[
                  "text-2xl font-black uppercase tracking-[0.2em] text-white/80 hover:text-white",
                  "py-4 border-b border-white/[0.06]",
                  "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded",
                  "motion-reduce:transition-none",
                  mobileMenuOpen ? "animate-fade-in-up" : "opacity-0",
                ].join(" ")}
                style={{
                  animationDelay: mobileMenuOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1 min-h-8" />

          {/* Bottom action cluster */}
          <div
            className={[
              "flex flex-col gap-3 pb-4",
              mobileMenuOpen ? "animate-fade-in" : "opacity-0",
            ].join(" ")}
            style={{ animationDelay: mobileMenuOpen ? "300ms" : "0ms" }}
          >
            {/* Call / Text / Instagram row */}
            <div className="flex gap-3">
              <a
                href="tel:7748234024"
                className="glass-dark border border-white/10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-widest text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Call (774) 823-4024"
                onClick={closeMobileMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call
              </a>
              <a
                href="sms:7748234024"
                className="glass-dark border border-white/10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-widest text-white/70 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Text (774) 823-4024"
                onClick={closeMobileMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Text
              </a>
              <a
                href="https://www.instagram.com/miamilifestylewatersports/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-dark border border-white/10 flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs uppercase tracking-widest text-[#00E5CC] hover:text-pink-300 hover:border-[#00E5CC]/50 transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Follow on Instagram"
                onClick={closeMobileMenu}
              >
                <InstagramIcon className="w-4 h-4" />
                IG
              </a>
            </div>

            {/* Book Now CTA */}
            <Link
              href="/book"
              className="bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] w-full flex items-center justify-center py-4 rounded-xl text-sm font-black text-white uppercase tracking-widest glow-pink hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050D14]"
              onClick={closeMobileMenu}
            >
              Book Now
            </Link>

            {/* Trust line */}
            <p className="text-center text-white/30 text-xs tracking-widest uppercase">
              (774) 823-4024 · Miami, FL
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
