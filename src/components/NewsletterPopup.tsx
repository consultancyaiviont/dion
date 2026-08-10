"use client";

import { useState, useEffect } from "react";

const HERO_IMG =
  "https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-ce92-73d6-9ba3-93d79e097ded.jpeg";

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("mlw_subscribed")) return;
    const dismissed = localStorage.getItem("mlw_popup_dismissed");
    if (dismissed && Date.now() < parseInt(dismissed)) return;
    const t = setTimeout(() => setVisible(true), 4500);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    localStorage.setItem("mlw_popup_dismissed", String(Date.now() + 30 * 24 * 60 * 60 * 1000));
    setVisible(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setDone(true);
    localStorage.setItem("mlw_subscribed", "1");
    setTimeout(() => setVisible(false), 2800);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(3,10,16,0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "#050D14", border: "1px solid rgba(0,229,204,0.15)", boxShadow: "0 0 60px rgba(0,229,204,0.08)" }}
      >
        {/* Image section */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt="Miami Lifestyle Watersports"
            className="w-full h-full object-cover"
          />
          {/* Fade image into card background */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(5,13,20,0.15) 0%, rgba(5,13,20,0.6) 60%, #050D14 100%)" }}
          />
          {/* Teal glow at bottom of image */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(0,229,204,0.12) 0%, transparent 70%)" }}
          />
          {/* Pill label */}
          <div className="absolute top-3.5 left-4">
            <span
              className="text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,229,204,0.15)", color: "#00E5CC", border: "1px solid rgba(0,229,204,0.25)" }}
            >
              Members Only
            </span>
          </div>
          {/* Close */}
          <button
            onClick={dismiss}
            aria-label="Close"
            className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(5,13,20,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <svg className="w-3.5 h-3.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form section */}
        <div className="px-6 pb-6 pt-1">
          {done ? (
            <div className="text-center py-7">
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "rgba(0,229,204,0.1)", border: "1px solid rgba(0,229,204,0.25)" }}
              >
                <svg className="w-6 h-6" style={{ color: "#00E5CC" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="font-black text-lg text-white mb-1">You&apos;re In!</p>
              <p className="text-white/40 text-sm">Watch for exclusive Miami deals in your inbox.</p>
            </div>
          ) : (
            <>
              <h2 className="text-white font-black text-xl leading-tight mb-1.5">
                Get Exclusive Deals First
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-5">
                Sign up for discounts, last-minute openings &amp; seasonal specials — before anyone else.
              </p>

              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <input
                  type="tel"
                  placeholder="Phone — optional, for SMS deals"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest text-[#050D14] transition-all disabled:opacity-50 mt-1"
                  style={{ background: "linear-gradient(135deg, #00E5CC 0%, #00BFFF 100%)" }}
                >
                  {loading ? "Joining..." : "Get Exclusive Deals"}
                </button>
                <p className="text-center text-white/20 text-[10px]">No spam. Unsubscribe anytime.</p>
              </form>
            </>
          )}
        </div>

        {/* Bottom teal line */}
        <div style={{ height: 2, background: "linear-gradient(90deg, #00E5CC, #00BFFF)" }} />
      </div>
    </div>
  );
}
