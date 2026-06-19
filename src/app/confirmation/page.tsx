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
  specialRequests: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No booking session found");
      setLoading(false);
      return;
    }

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify payment");
        }

        setBooking(data.booking);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to verify payment"
        );
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="animate-spin w-10 h-10 text-sky-600 mx-auto mb-4"
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
          <p className="text-slate-600 font-medium">
            Verifying your payment...
          </p>
          <p className="text-sm text-slate-400 mt-1">
            This will only take a moment
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
            <svg
              className="w-8 h-8 text-red-600"
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
          </div>
          <h1 className="text-xl font-semibold text-slate-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-500 mb-6">{error}</p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
          >
            Try Booking Again
          </Link>
        </div>
      </div>
    );
  }

  if (!booking) return null;

  const bookingDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-16 px-4">
      <div className="mx-auto max-w-lg">
        {/* Success header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-slate-500">
            Your adventure awaits. A confirmation has been sent to your email.
          </p>
        </div>

        {/* Booking details card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header bar */}
          <div className="bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-4">
            <p className="text-sky-100 text-xs font-medium uppercase tracking-wider">
              Booking Confirmation
            </p>
            <p className="text-white font-mono text-sm mt-1">
              #{booking.id.slice(-8).toUpperCase()}
            </p>
          </div>

          <div className="p-6 space-y-4">
            {/* Activity */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Activity
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {booking.serviceName}
                </p>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Date & Time
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {bookingDate}
                </p>
                <p className="text-sm text-slate-500">{booking.timeSlot}</p>
              </div>
            </div>

            {/* Guest */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  Guest
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {booking.customerName}
                </p>
                <p className="text-sm text-slate-500">
                  {booking.customerEmail}
                </p>
                <p className="text-sm text-slate-500">
                  {booking.guests} {booking.guests === 1 ? "person" : "people"}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-slate-700">
                  Amount Paid
                </p>
                <p className="text-xl font-bold text-green-600">
                  ${booking.amountPaid.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important info */}
        <div className="mt-6 bg-amber-50 rounded-xl border border-amber-200 p-5">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Before You Arrive
              </p>
              <ul className="mt-2 text-sm text-amber-700 space-y-1">
                <li>- Please arrive 15 minutes before your scheduled time</li>
                <li>- Bring a valid photo ID and this confirmation number</li>
                <li>- Wear appropriate swimwear and sunscreen</li>
                <li>
                  - All safety equipment will be provided at the venue
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/book"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Book Another Adventure
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="animate-spin w-10 h-10 text-sky-600 mx-auto mb-4"
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
            <p className="text-slate-600 font-medium">
              Verifying your payment...
            </p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
