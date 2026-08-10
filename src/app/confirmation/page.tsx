"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface BookingDetails {
  id: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  guests: number;
  amountPaid: number;
  deposit: number;
  totalPrice: number;
  notes: string;
}

function Spinner() {
  return (
    <div className="min-h-screen bg-[#050D14] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full border-2 border-[#00E5CC]/20 border-t-[#00E5CC] animate-spin" />
        <p className="text-white/50 font-medium">Verifying your payment…</p>
        <p className="text-white/25 text-sm mt-1">Just a moment</p>
      </div>
    </div>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No booking session found.");
      setLoading(false);
      return;
    }

    fetch(`/api/verify-payment?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setBooking(data.booking);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to verify payment."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#050D14] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-white/40 text-sm mb-8">{error}</p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-xl bg-[#00E5CC] px-6 py-3 text-sm font-bold text-black hover:bg-[#00BFFF] transition-colors"
          >
            Try Booking Again
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const bookingDate = booking.date
    ? new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  const balanceOwed = Math.max(0, booking.totalPrice - booking.deposit);
  const ref = booking.id.slice(-8).toUpperCase();

  return (
    <div className="min-h-screen bg-[#050D14] py-12 px-4">
      <div className="mx-auto max-w-lg">

        {/* Logo */}
        <div className="text-center mb-10">
          {/* Gradient bar */}
          <div className="mx-auto mb-8 w-24 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg, #00E5CC, #00BFFF)" }} />

          {/* Check circle */}
          <div
            className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, rgba(0,229,204,0.15) 0%, rgba(0,229,204,0.03) 70%)",
              border: "2px solid rgba(0,229,204,0.3)",
              boxShadow: "0 0 40px -8px rgba(0,229,204,0.4)",
            }}
          >
            <svg className="w-10 h-10 text-[#00E5CC]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="text-3xl font-black text-white uppercase tracking-wide mb-2">
            You&apos;re Booked!
          </h1>
          <p className="text-white/40 text-sm">
            Confirmation sent to{" "}
            <span className="text-[#00E5CC]">{booking.customerEmail}</span>
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#0D1520",
            border: "1px solid rgba(0,229,204,0.12)",
          }}
        >
          {/* Card header */}
          <div
            className="px-6 py-5"
            style={{
              background: "linear-gradient(160deg, #0A1929 0%, #050D14 100%)",
              borderBottom: "1px solid rgba(0,229,204,0.08)",
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5CC]/60 mb-1">
              Booking Confirmation
            </p>
            <p className="text-white font-mono text-sm font-bold tracking-widest">
              #{ref}
            </p>
          </div>

          {/* Details */}
          <div className="px-6 py-2">
            {[
              { label: "Service", value: booking.serviceName },
              { label: "Date", value: bookingDate },
              { label: "Time", value: booking.timeSlot },
              { label: "Guest", value: booking.customerName },
              {
                label: booking.guests === 1 ? "Party size" : "Party size",
                value: `${booking.guests} ${booking.guests === 1 ? "person" : "people"}`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-white/40 text-sm">{label}</span>
                <span className="text-white text-sm font-semibold text-right max-w-[55%]">{value}</span>
              </div>
            ))}

            {/* Deposit paid */}
            <div className="flex justify-between items-center py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="text-white/40 text-sm">Deposit paid</span>
              <span className="text-[#00E5CC] text-sm font-bold">${booking.amountPaid.toFixed(2)}</span>
            </div>

            {/* Balance due */}
            {balanceOwed > 0 && (
              <div className="flex justify-between items-center py-3.5">
                <span className="text-white/40 text-sm">Balance due at arrival</span>
                <span className="text-[#00BFFF] text-sm font-bold">${balanceOwed.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Bottom info box */}
          <div className="px-6 pb-6">
            <div
              className="rounded-xl p-4 mt-2"
              style={{
                background: "rgba(0,229,204,0.04)",
                border: "1px solid rgba(0,229,204,0.12)",
              }}
            >
              <p className="text-white/60 text-[13px] leading-relaxed">
                Please arrive{" "}
                <strong className="text-white">15 minutes early</strong> and bring a valid photo ID. All safety equipment is provided on-site. Questions?{" "}
                <a href="tel:7748234024" className="text-[#00E5CC] font-semibold">
                  (774) 823-4024
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Location / hours */}
        <div
          className="mt-4 rounded-2xl px-6 py-5"
          style={{
            background: "#0D1520",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">Location &amp; Hours</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">Address</span>
              <span className="text-white/80 text-right">2400 Collins Ave<br />Miami Beach, FL 33140</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Hours</span>
              <span className="text-white/80">Mon–Sun · 10am–6pm</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-all"
            style={{ background: "linear-gradient(90deg, #00E5CC, #00BFFF)" }}
          >
            Back to Home
          </Link>
          <Link
            href="/book"
            className="flex-1 inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-bold text-white/70 hover:text-white transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
          >
            Book Another
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ConfirmationContent />
    </Suspense>
  );
}
