import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation & Rescheduling Policy | Miami Lifestyle Watersports",
  description:
    "Review the cancellation, rescheduling, and no-show policies for Miami Lifestyle Watersports. Understand deposit terms, weather cancellations, and yacht charter rules.",
};

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function IconDeposit() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}

function IconReschedule() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconWeather() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  );
}

function IconAnchor() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}

// ─── Bullet Item ───────────────────────────────────────────────────────────────

interface BulletItemProps {
  children: React.ReactNode;
  dotColor: string;
}

function BulletItem({ children, dotColor }: BulletItemProps) {
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColor}`}
        aria-hidden="true"
      />
      <span className="text-gray-300 text-sm leading-relaxed">{children}</span>
    </li>
  );
}

// ─── Policy Section Card ───────────────────────────────────────────────────────

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  borderColor: string;
  iconColor: string;
  children: React.ReactNode;
}

function PolicySection({ icon, title, borderColor, iconColor, children }: PolicySectionProps) {
  return (
    <div
      className={`glass-dark rounded-2xl p-6 border-l-4 ${borderColor}`}
      style={{ borderTopColor: "transparent", borderRightColor: "transparent", borderBottomColor: "transparent" }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className={`flex-shrink-0 ${iconColor}`}>{icon}</div>
        <h2 className="text-white font-bold text-lg uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <ul className="space-y-3">{children}</ul>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CancellationPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/8 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        {/* ── Page Header ── */}
        <header className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-5 py-2 text-xs font-bold text-cyan-300 uppercase tracking-widest mb-6 glow-cyan">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Miami Lifestyle Watersports
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-[#00FFFF] to-[#00BFFF] text-glow-pink">
              Cancellation
            </span>
            <br />
            <span className="text-white">&amp; Rescheduling Policy</span>
          </h1>

          <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Please read this policy carefully before booking. By reserving with us,
            you agree to all terms outlined below.
          </p>
        </header>

        {/* ── Policy Sections ── */}
        <div className="space-y-6">

          {/* Section 1 — Deposits */}
          <PolicySection
            icon={<IconDeposit />}
            title="Deposits"
            borderColor="border-l-pink-500"
            iconColor="text-[#00E5CC]"
          >
            <BulletItem dotColor="bg-pink-500">
              A deposit is required to secure your reservation
            </BulletItem>
            <BulletItem dotColor="bg-pink-500">
              Deposits are <strong className="text-white font-semibold">non-refundable</strong> under any circumstances
            </BulletItem>
            <BulletItem dotColor="bg-pink-500">
              Jet Ski Rental: <strong className="text-white font-semibold">$40 deposit</strong>
              {" "}|{" "}
              Jet Car Rental: <strong className="text-white font-semibold">$80 deposit</strong>
            </BulletItem>
            <BulletItem dotColor="bg-pink-500">
              Yacht Charters: deposit amount communicated at time of booking
            </BulletItem>
          </PolicySection>

          {/* Section 2 — Rescheduling */}
          <PolicySection
            icon={<IconReschedule />}
            title="Rescheduling"
            borderColor="border-l-cyan-400"
            iconColor="text-cyan-400"
          >
            <BulletItem dotColor="bg-cyan-400">
              You may reschedule your booking to the next available time slot
            </BulletItem>
            <BulletItem dotColor="bg-cyan-400">
              Rescheduling is subject to availability
            </BulletItem>
            <BulletItem dotColor="bg-cyan-400">
              To reschedule: visit{" "}
              <Link href="/reschedule" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors">
                /reschedule
              </Link>{" "}
              or call{" "}
              <a href="tel:7748234024" className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition-colors">
                (774) 823-4024
              </a>
            </BulletItem>
            <BulletItem dotColor="bg-cyan-400">
              Requests must be made <strong className="text-white font-semibold">at least 24 hours in advance</strong>
            </BulletItem>
            <BulletItem dotColor="bg-cyan-400">
              A rescheduled booking does not forfeit your original deposit &mdash; it transfers
            </BulletItem>
          </PolicySection>

          {/* Section 3 — No-Shows & Late Arrivals */}
          <PolicySection
            icon={<IconClock />}
            title="No-Shows &amp; Late Arrivals"
            borderColor="border-l-orange-500"
            iconColor="text-[#00E5CC]"
          >
            <BulletItem dotColor="bg-orange-500">
              If you arrive late, your session may be shortened at the operator&apos;s discretion
            </BulletItem>
            <BulletItem dotColor="bg-orange-500">
              If you miss your reservation entirely without notice, your <strong className="text-white font-semibold">deposit is forfeited</strong>
            </BulletItem>
            <BulletItem dotColor="bg-orange-500">
              You may still reschedule to the next available opening after a forfeiture
            </BulletItem>
            <BulletItem dotColor="bg-orange-500">
              Yacht charters: please arrive on time &mdash; late arrivals result in reduced charter time
            </BulletItem>
          </PolicySection>

          {/* Section 4 — Weather & Safety */}
          <PolicySection
            icon={<IconWeather />}
            title="Weather &amp; Safety Cancellations"
            borderColor="border-l-blue-500"
            iconColor="text-blue-400"
          >
            <BulletItem dotColor="bg-blue-500">
              If weather conditions prevent the activity, your booking will be <strong className="text-white font-semibold">rescheduled at no additional cost</strong>
            </BulletItem>
            <BulletItem dotColor="bg-blue-500">
              If operator safety concerns arise, the same policy applies
            </BulletItem>
            <BulletItem dotColor="bg-blue-500">
              We monitor conditions closely and will notify you in advance
            </BulletItem>
          </PolicySection>

          {/* Section 5 — Yacht Charter Rules */}
          <PolicySection
            icon={<IconAnchor />}
            title="Yacht Charter Terms"
            borderColor="border-l-purple-500"
            iconColor="text-purple-400"
          >
            <BulletItem dotColor="bg-purple-500">
              All charters include a licensed captain &mdash; no captain&apos;s license required
            </BulletItem>
            <BulletItem dotColor="bg-purple-500">
              You are welcome to bring your own food and beverages
            </BulletItem>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
              <span className="text-sm leading-relaxed">
                <strong className="text-red-400 font-bold uppercase tracking-wide">
                  NO RED WINE ONBOARD
                </strong>
                <span className="text-gray-300"> &mdash; can permanently stain upholstery</span>
              </span>
            </li>
            <BulletItem dotColor="bg-purple-500">
              Maximum capacity: <strong className="text-white font-semibold">13 guests</strong>
            </BulletItem>
            <BulletItem dotColor="bg-purple-500">
              By booking, you agree to follow all captain and crew instructions
            </BulletItem>
          </PolicySection>

          {/* Section 6 — Agreement */}
          <div className="glass-dark rounded-2xl p-6 border border-white/10 relative overflow-hidden">
            {/* Subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-cyan-500/5 pointer-events-none" aria-hidden="true" />

            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 text-green-400 mt-0.5">
                <IconCheck />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg uppercase tracking-wider mb-2">
                  Agreement
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  By submitting a booking request, you agree to all terms of this{" "}
                  <span className="text-white font-semibold">Cancellation &amp; Rescheduling Policy</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA Section ── */}
        <section className="mt-14 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
            Ready to get on the water?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] px-10 py-4 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 hover:scale-105 glow-pink glow-hover-pink"
            >
              Book Now
              <IconArrow />
            </Link>
            <Link
              href="/reschedule"
              className="group inline-flex items-center justify-center gap-3 rounded-xl glass-dark px-10 py-4 text-sm font-bold text-white uppercase tracking-widest transition-all duration-300 hover:scale-105 glow-cyan"
            >
              Reschedule
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </Link>
          </div>

          <p className="mt-8 text-gray-600 text-xs">
            Questions? Call us at{" "}
            <a href="tel:7748234024" className="text-gray-400 hover:text-cyan-400 transition-colors underline underline-offset-2">
              (774) 823-4024
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
