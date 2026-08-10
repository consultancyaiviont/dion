"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  confirmationNumber: string;
  name: string;
  email: string;
  originalDate: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
}

const TIME_OPTIONS = [
  { value: "", label: "Select a time preference" },
  { value: "Morning (10am–12pm)", label: "Morning (10am–12pm)" },
  { value: "Afternoon (12pm–3pm)", label: "Afternoon (12pm–3pm)" },
  { value: "Late Afternoon (3pm–5pm)", label: "Late Afternoon (3pm–5pm)" },
  { value: "Evening (5pm–6pm)", label: "Evening (5pm–6pm)" },
];

const today = new Date().toISOString().split("T")[0];

export default function ReschedulePage() {
  const [form, setForm] = useState<FormData>({
    confirmationNumber: "",
    name: "",
    email: "",
    originalDate: "",
    preferredDate: "",
    preferredTime: "",
    reason: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.preferredTime) {
      setError("Please select a preferred new time.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/reschedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmationNumber: form.confirmationNumber.trim(),
          name: form.name.trim(),
          email: form.email.trim(),
          originalDate: form.originalDate,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          reason: form.reason.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit reschedule request.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  // ---- INPUT STYLES ----
  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#00E5CC]/60 focus:border-[#00E5CC]/60 transition-all";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2";

  // ---- SUCCESS STATE ----
  if (success) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {/* Check mark circle */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border border-white/10">
            <svg
              className="h-12 w-12 text-cyan-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-pink-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
              Request Submitted!
            </span>
          </h1>
          <p className="text-white/60 text-base mb-2">
            We&apos;ll contact you within 24 hours to confirm your new booking time.
          </p>
          <p className="text-white/40 text-sm mb-10">
            For urgent requests, call us at{" "}
            <a
              href="tel:+17748234024"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              (774) 823-4024
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#00E5CC]/25 hover:shadow-pink-500/40 transition-all"
            >
              Back to Home
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white transition-all"
            >
              Book New Adventure
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- FORM ----
  return (
    <div className="min-h-screen bg-[#0B0B0C] py-16 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-pink-400 via-cyan-300 to-orange-400 bg-clip-text text-transparent">
              RESCHEDULE YOUR BOOKING
            </span>
          </h1>
          <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
            Submit a request and we&apos;ll accommodate your new preferred time, subject to availability.
          </p>
        </div>

        {/* Policy Notice */}
        <div className="mb-8 rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5 shrink-0">⚠️</span>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-3">
                Important: Please Read
              </h2>
              <ul className="space-y-1.5 text-sm text-amber-200/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Deposits are non-refundable
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Rescheduling is subject to availability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Requests must be made at least 24 hours in advance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Weather/safety cancellations are rescheduled at no cost
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Confirmation Number */}
            <div>
              <label htmlFor="confirmationNumber" className={labelClass}>
                Confirmation Number <span className="text-[#00E5CC]">*</span>
              </label>
              <input
                id="confirmationNumber"
                name="confirmationNumber"
                type="text"
                required
                value={form.confirmationNumber}
                onChange={handleChange}
                placeholder="e.g. MLW-2024-XXXX"
                className={inputClass}
              />
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className="text-[#00E5CC]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className={inputClass}
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-[#00E5CC]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Original Booking Date + Preferred New Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="originalDate" className={labelClass}>
                  Original Booking Date <span className="text-[#00E5CC]">*</span>
                </label>
                <input
                  id="originalDate"
                  name="originalDate"
                  type="date"
                  required
                  value={form.originalDate}
                  onChange={handleChange}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
              <div>
                <label htmlFor="preferredDate" className={labelClass}>
                  Preferred New Date <span className="text-[#00E5CC]">*</span>
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  required
                  min={today}
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </div>
            </div>

            {/* Preferred New Time */}
            <div>
              <label htmlFor="preferredTime" className={labelClass}>
                Preferred New Time <span className="text-[#00E5CC]">*</span>
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                required
                value={form.preferredTime}
                onChange={handleChange}
                className={`${inputClass} [color-scheme:dark]`}
              >
                {TIME_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reason for Rescheduling */}
            <div>
              <label htmlFor="reason" className={labelClass}>
                Reason for Rescheduling{" "}
                <span className="text-white/25 normal-case font-normal">(optional)</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                value={form.reason}
                onChange={handleChange}
                placeholder="Let us know why you need to reschedule..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error State */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full rounded-xl bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] px-6 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-[#00E5CC]/25 hover:shadow-pink-500/40 hover:from-pink-400 hover:to-orange-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </>
              ) : (
                "SUBMIT RESCHEDULE REQUEST"
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-white/25">
          For urgent reschedule requests call{" "}
          <a href="tel:+17748234024" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            (774) 823-4024
          </a>
        </p>
      </div>
    </div>
  );
}
