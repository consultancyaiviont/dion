"use client";

import { useState, useEffect } from "react";

const ARYEO =
  "https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large";

const YACHTS = [
  { id: "yacht-uniesse", name: "Foolish Pleasure", sub: "80' Uniesse", price: 2200, deposit: 300, img: `${ARYEO}/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg` },
  { id: "yacht-churri", name: "Churri", sub: "Luxury Yacht", price: 3700, deposit: 500, img: `${ARYEO}/large-019c697c-c5fd-73fe-9417-3ad8a8d3719f.jpeg` },
  { id: "yacht-rayb50", name: "Ray B 50", sub: "50' Charter", price: 1200, deposit: 200, img: `${ARYEO}/large-019c697c-c1f2-7265-8eb4-e4488fa5fae1.jpeg` },
  { id: "yacht-searay", name: "Sea Ray", sub: "Classic Charter", price: 1500, deposit: 250, img: `${ARYEO}/large-019c697c-cce1-7336-983e-aa78dd7dd56d.jpeg` },
  { id: "yacht-flybridge", name: "Fly Bridge Navigator", sub: "55' Charter", price: 1400, deposit: 200, img: `${ARYEO}/large-019c697c-c469-715c-8bc2-73f2e9550edd.jpeg` },
];

const TIME_SLOTS = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM",
];

const YACHT_TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const STEP_LABELS = ["Experience", "Details", "Your Info", "Review"];

function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

function CalendarPicker({
  value, onChange, min,
}: {
  value: string;
  onChange: (date: string) => void;
  min: string;
}) {
  const today = min;
  const initDate = value ? new Date(value + "T12:00:00") : new Date();
  const [navYear, setNavYear] = useState(initDate.getFullYear());
  const [navMonth, setNavMonth] = useState(initDate.getMonth());

  const daysInMonth = new Date(navYear, navMonth + 1, 0).getDate();
  const firstDow = new Date(navYear, navMonth, 1).getDay();
  const monthLabel = new Date(navYear, navMonth, 1).toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  });

  function prevMonth() {
    if (navMonth === 0) { setNavYear((y) => y - 1); setNavMonth(11); }
    else setNavMonth((m) => m - 1);
  }
  function nextMonth() {
    if (navMonth === 11) { setNavYear((y) => y + 1); setNavMonth(0); }
    else setNavMonth((m) => m + 1);
  }

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-white font-black text-sm uppercase tracking-widest">{monthLabel}</span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} className="text-center text-white/20 text-[10px] font-bold uppercase py-1.5">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${navYear}-${pad(navMonth + 1)}-${pad(day)}`;
          const isPast = dateStr < today;
          const isSelected = dateStr === value;
          const isToday = dateStr === today;

          return (
            <button
              key={day}
              type="button"
              disabled={isPast}
              onClick={() => onChange(dateStr)}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-150 ${
                isPast
                  ? "text-white/10 cursor-not-allowed"
                  : isSelected
                  ? "bg-[#00E5CC] text-black shadow-[0_0_16px_-4px_#00E5CC]"
                  : isToday
                  ? "bg-white/10 text-white border border-white/20 hover:bg-[#00E5CC]/20 hover:border-[#00E5CC]/50"
                  : "text-white/60 hover:bg-white/8 hover:text-white"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected display */}
      {value && (
        <div className="mt-4 pt-3 border-t border-white/8 text-center">
          <span className="text-[#00E5CC] text-xs font-bold">
            {new Date(value + "T12:00:00").toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric", year: "numeric",
            })}
          </span>
        </div>
      )}
    </div>
  );
}

type ExpType = "jet-ski" | "jet-car" | "yacht";
type RiderType = "single" | "double";

interface BookState {
  experience: ExpType | null;
  yachtId: string;
  riderType: RiderType;
  quantity: number;
  hours: number;
  guests: number;
  date: string;
  time: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
  waiverAck: boolean;
  policyAck: boolean;
}

const INIT: BookState = {
  experience: null,
  yachtId: "",
  riderType: "double",
  quantity: 1,
  hours: 1,
  guests: 2,
  date: "",
  time: "10:00 AM",
  fullName: "",
  phone: "",
  email: "",
  notes: "",
  waiverAck: false,
  policyAck: false,
};

function calcTotal(s: BookState): number {
  if (s.experience === "jet-ski") return (s.riderType === "double" ? 170 : 140) * s.quantity * s.hours;
  if (s.experience === "jet-car") return 350 * s.quantity * s.hours;
  if (s.experience === "yacht") {
    const y = YACHTS.find((y) => y.id === s.yachtId);
    return y ? y.price : 0;
  }
  return 0;
}

function calcDeposit(s: BookState): number {
  if (s.experience === "jet-ski") return 40;
  if (s.experience === "jet-car") return 80;
  if (s.experience === "yacht") {
    const y = YACHTS.find((y) => y.id === s.yachtId);
    return y ? y.deposit : 0;
  }
  return 0;
}

function maxQuantity(exp: ExpType | null, riderType: RiderType): number {
  if (exp === "jet-ski") return riderType === "single" ? 5 : 3;
  if (exp === "jet-car") return 4;
  return 1;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<BookState>(INIT);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState<string[]>([]);
  const [availLoading, setAvailLoading] = useState(false);

  const today = getTodayString();
  const total = calcTotal(state);
  const deposit = calcDeposit(state);
  const balanceAtArrival = Math.max(0, total - deposit);
  const isJet = state.experience === "jet-ski" || state.experience === "jet-car";
  const isYacht = state.experience === "yacht";
  const selectedYacht = YACHTS.find((y) => y.id === state.yachtId);
  const qtyMax = maxQuantity(state.experience, state.riderType);

  function upd<K extends keyof BookState>(key: K, value: BookState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  // Fetch availability when date / experience / yachtId changes (on step 2)
  useEffect(() => {
    if (!state.date || !state.experience) {
      setUnavailable([]);
      return;
    }
    const type = state.experience;
    const params = new URLSearchParams({ date: state.date, type });
    if (type === "yacht" && state.yachtId) params.set("yachtId", state.yachtId);

    let cancelled = false;
    setAvailLoading(true);
    fetch(`/api/availability?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUnavailable(data.unavailable ?? []);
      })
      .catch(() => { if (!cancelled) setUnavailable([]); })
      .finally(() => { if (!cancelled) setAvailLoading(false); });

    return () => { cancelled = true; };
  }, [state.date, state.experience, state.yachtId]);

  // Clamp quantity when riderType changes
  useEffect(() => {
    const max = maxQuantity(state.experience, state.riderType);
    if (state.quantity > max) upd("quantity", max);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.riderType, state.experience]);

  function goNext() {
    if (step === 1) {
      if (!state.experience) { setError("Please select an experience."); return; }
      if (isYacht && !state.yachtId) { setError("Please select a yacht."); return; }
    }
    if (step === 2) {
      if (!state.date) { setError("Please select a date."); return; }
      if (unavailable.includes(state.time)) { setError("That time slot is unavailable — please choose another."); return; }
    }
    if (step === 3) {
      if (!state.fullName.trim()) { setError("Please enter your full name."); return; }
      if (!state.phone.trim()) { setError("Please enter your phone number."); return; }
      if (!state.email.trim() || !state.email.includes("@")) { setError("Please enter a valid email."); return; }
    }
    setError(null);
    setStep((s) => Math.min(s + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    if (isJet && !state.waiverAck) {
      setError("Please acknowledge the waiver requirement.");
      return;
    }
    if (!state.policyAck) {
      setError("Please agree to our policies before submitting.");
      return;
    }
    setLoading(true);
    setError(null);

    const noteParts = [
      isJet
        ? `${state.quantity} ${state.experience === "jet-ski" ? "jet ski(s)" : "jet car(s)"} (${state.riderType} rider), ${state.hours} hour(s) — Est. $${total.toLocaleString()}`
        : `${selectedYacht?.name ?? state.yachtId}, ${state.guests} guest(s) — Est. $${total.toLocaleString()}`,
      state.notes,
    ].filter(Boolean).join("\n\n");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: state.fullName,
          phone: state.phone,
          email: state.email,
          service: state.experience === "yacht" ? state.yachtId : state.experience,
          date: state.date,
          time: state.time,
          guests: isYacht ? state.guests : state.quantity * (state.riderType === "double" ? 2 : 1),
          hours: state.hours,
          quantity: state.quantity,
          riderType: isJet ? state.riderType : undefined,
          notes: noteParts,
          totalPrice: total,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Could not create checkout session.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-[#050D14] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#00E5CC]/10 border-2 border-[#00E5CC]/30 flex items-center justify-center">
            <CheckIcon className="w-10 h-10 text-[#00E5CC]" />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-wide mb-3">
            You&apos;re All Set!
          </h2>
          <p className="text-white/50 mb-2">
            We&apos;ll reach out within 24 hours to confirm your booking.
          </p>
          <p className="text-white/30 text-sm mb-10">
            Questions? Call or text{" "}
            <a href="tel:7748234024" className="text-[#00E5CC]">
              (774) 823-4024
            </a>
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href="tel:7748234024"
              className="flex-1 inline-flex items-center justify-center rounded-full py-3.5 text-sm font-black text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] uppercase tracking-widest"
            >
              Call Us
            </a>
            <button
              onClick={() => { setState(INIT); setSuccess(false); setStep(1); }}
              className="flex-1 inline-flex items-center justify-center rounded-full py-3.5 text-sm font-black text-white border border-white/15 bg-white/5 uppercase tracking-widest"
            >
              Book Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050D14]">
      {/* Page header */}
      <div className="pt-8 pb-4 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mb-1">
          Book Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#00BFFF]">
            Experience
          </span>
        </h1>
        <p className="text-white/30 text-xs tracking-widest uppercase">
          Miami Lifestyle Watersports · (774) 823-4024
        </p>
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-4 pb-8">
        <div className="max-w-lg mx-auto flex items-start">
          {STEP_LABELS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={label} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all duration-300 ${
                      done
                        ? "bg-[#00E5CC] text-black"
                        : active
                        ? "bg-[#00E5CC]/15 border-2 border-[#00E5CC] text-[#00E5CC]"
                        : "bg-white/5 border border-white/15 text-white/25"
                    }`}
                  >
                    {done ? <CheckIcon className="w-4 h-4" /> : n}
                  </div>
                  <span
                    className={`text-[9px] mt-1.5 font-bold uppercase tracking-widest ${
                      active ? "text-[#00E5CC]" : done ? "text-[#00E5CC]/50" : "text-white/20"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`flex-1 h-px mt-4 mx-2 transition-colors duration-300 ${
                      done ? "bg-[#00E5CC]/40" : "bg-white/8"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-lg mx-auto px-4 pb-40">

        {/* ── STEP 1: EXPERIENCE ─────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-3">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">
              What are you booking?
            </p>

            {/* Jet Ski card */}
            <button
              onClick={() => { upd("experience", "jet-ski"); upd("yachtId", ""); }}
              className={`w-full text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                state.experience === "jet-ski"
                  ? "border-[#00E5CC] shadow-[0_0_30px_-8px_#00E5CC]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="relative h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/jetski-action.png" alt="Jet Ski" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {state.experience === "jet-ski" && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#00E5CC] flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-black" />
                  </div>
                )}
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-black text-lg uppercase tracking-wide leading-tight">Jet Ski Rental</p>
                  <p className="text-[#00E5CC] text-xs font-semibold mt-0.5">$140 / hr (single) · $170 / hr (double) &nbsp;·&nbsp; Up to 2 riders per ski</p>
                </div>
              </div>
            </button>

            {/* Jet Car card */}
            <button
              onClick={() => { upd("experience", "jet-car"); upd("yachtId", ""); }}
              className={`w-full text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                state.experience === "jet-car"
                  ? "border-[#00E5CC] shadow-[0_0_30px_-8px_#00E5CC]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="relative h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/jetcar-white.png" alt="Jet Car" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {state.experience === "jet-car" && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#00E5CC] flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-black" />
                  </div>
                )}
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-black text-lg uppercase tracking-wide leading-tight">Jet Car Rental</p>
                  <p className="text-[#00E5CC] text-xs font-semibold mt-0.5">$350 / hr &nbsp;·&nbsp; Up to 2 riders</p>
                </div>
              </div>
            </button>

            {/* Yacht Charter card */}
            <button
              onClick={() => upd("experience", "yacht")}
              className={`w-full text-left rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                isYacht
                  ? "border-[#00E5CC] shadow-[0_0_30px_-8px_#00E5CC]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="relative h-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${ARYEO}/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg`}
                  alt="Yacht Charter"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {isYacht && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#00E5CC] flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-black" />
                  </div>
                )}
                <div className="absolute bottom-3 left-4">
                  <p className="text-white font-black text-lg uppercase tracking-wide leading-tight">Yacht Charter</p>
                  <p className="text-[#00E5CC] text-xs font-semibold mt-0.5">From $1,200 / 4 hrs &nbsp;·&nbsp; Up to 13 guests</p>
                </div>
              </div>
            </button>

            {/* Single / Double rider toggle for jet-ski and jet-car */}
            {isJet && (
              <div className="pt-2">
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">
                  Rider type
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(["single", "double"] as RiderType[]).map((rt) => (
                    <button
                      key={rt}
                      onClick={() => upd("riderType", rt)}
                      className={`py-4 rounded-xl border-2 text-sm font-black uppercase tracking-widest transition-all duration-200 ${
                        state.riderType === rt
                          ? "border-[#00E5CC] bg-[#00E5CC]/10 text-[#00E5CC] shadow-[0_0_20px_-8px_#00E5CC]"
                          : "border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20"
                      }`}
                    >
                      {rt === "single" ? "1 Rider" : "2 Riders"}
                      <p className="text-[10px] font-normal normal-case tracking-normal mt-1 opacity-60">
                        {rt === "single"
                          ? `Up to ${state.experience === "jet-car" ? "4" : "5"} at once`
                          : `Up to ${state.experience === "jet-car" ? "4" : "3"} at once`}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Yacht sub-selection */}
            {isYacht && (
              <div className="pt-2 space-y-2">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold pt-2">
                  Select your yacht
                </p>
                {YACHTS.map((y) => (
                  <button
                    key={y.id}
                    onClick={() => upd("yachtId", y.id)}
                    className={`w-full flex items-center gap-3 rounded-xl p-3 border-2 transition-all duration-200 ${
                      state.yachtId === y.id
                        ? "border-[#00E5CC] bg-[#00E5CC]/5"
                        : "border-white/8 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={y.img} alt={y.name} className="w-16 h-12 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-white font-bold text-sm truncate">{y.name}</p>
                      <p className="text-white/40 text-xs">{y.sub}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[#00E5CC] font-black text-sm">${y.price.toLocaleString()}</p>
                      <p className="text-white/25 text-[10px]">${y.deposit} deposit</p>
                    </div>
                    {state.yachtId === y.id && (
                      <div className="w-5 h-5 rounded-full bg-[#00E5CC] flex items-center justify-center flex-shrink-0 ml-1">
                        <CheckIcon className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: DATE & DETAILS ─────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-8">

            {/* Jet ski/car quantity */}
            {isJet && (
              <>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-1">
                    How many {state.experience === "jet-ski" ? "jet skis" : "jet cars"}?
                  </p>
                  <p className="text-white/25 text-[11px] mb-4">
                    Max {qtyMax} {state.riderType} rider{qtyMax > 1 ? "s" : ""} at one time
                  </p>
                  <div className="flex gap-2">
                    {Array.from({ length: qtyMax }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => upd("quantity", n)}
                        className={`flex-1 py-4 rounded-xl font-black text-xl transition-all duration-200 ${
                          state.quantity === n
                            ? "bg-[#00E5CC] text-black shadow-[0_0_20px_-6px_#00E5CC]"
                            : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                    How many hours?
                  </p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((h) => (
                      <button
                        key={h}
                        onClick={() => upd("hours", h)}
                        className={`flex-1 py-4 rounded-xl font-black text-sm transition-all duration-200 ${
                          state.hours === h
                            ? "bg-[#00E5CC] text-black shadow-[0_0_20px_-6px_#00E5CC]"
                            : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        {h} hr{h > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl bg-white/[0.03] border border-white/8 px-4 py-3 flex items-center justify-between">
                    <span className="text-white/40 text-xs">
                      {state.quantity} {state.experience === "jet-ski" ? "ski" : "car"}{state.quantity > 1 ? "s" : ""} × {state.hours} hr{state.hours > 1 ? "s" : ""} × ${state.experience === "jet-ski" ? (state.riderType === "double" ? "170" : "140") : "350"}/hr
                    </span>
                    <span className="text-[#00E5CC] font-black text-xl">${total.toLocaleString()}</span>
                  </div>
                </div>
              </>
            )}

            {/* Yacht guests */}
            {isYacht && (
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                  Number of guests
                </p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => upd("guests", Math.max(1, state.guests - 1))}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white text-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="text-5xl font-black text-white w-16 text-center tabular-nums">
                    {state.guests}
                  </span>
                  <button
                    onClick={() => upd("guests", Math.min(13, state.guests + 1))}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white text-2xl font-black hover:bg-white/10 transition-all flex items-center justify-center"
                  >
                    +
                  </button>
                  <span className="text-white/25 text-sm">/ 13 max</span>
                </div>
              </div>
            )}

            {/* Date */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                Pick a date
              </p>
              <CalendarPicker
                value={state.date}
                min={today}
                onChange={(d) => { upd("date", d); upd("time", "10:00 AM"); }}
              />
            </div>

            {/* Time slots */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">
                  Preferred start time
                </p>
                {availLoading && (
                  <span className="text-white/25 text-[10px]">Checking availability…</span>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(isYacht ? YACHT_TIME_SLOTS : TIME_SLOTS).map((t) => {
                  const blocked = unavailable.includes(t);
                  const selected = state.time === t;
                  return (
                    <button
                      key={t}
                      onClick={() => { if (!blocked) upd("time", t); }}
                      disabled={blocked}
                      className={`py-3 rounded-xl text-xs font-bold transition-all duration-200 relative ${
                        blocked
                          ? "bg-white/[0.02] border border-white/5 text-white/15 cursor-not-allowed"
                          : selected
                          ? "bg-[#00E5CC] text-black shadow-[0_0_15px_-4px_#00E5CC]"
                          : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                      }`}
                    >
                      {t}
                      {blocked && (
                        <span className="block text-[9px] font-normal mt-0.5 text-white/20">Booked</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {!state.date && (
                <p className="text-white/20 text-[11px] mt-3">Select a date to see real-time availability.</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">
                Any special requests?{" "}
                <span className="text-white/25 normal-case tracking-normal font-normal">(optional)</span>
              </p>
              <textarea
                rows={3}
                value={state.notes}
                onChange={(e) => upd("notes", e.target.value)}
                placeholder="Birthday celebration, group size, questions..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#00E5CC] transition-all resize-none text-sm"
              />
            </div>
          </div>
        )}

        {/* ── STEP 3: CONTACT ────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-5">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">
              Your contact info
            </p>

            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest font-semibold block mb-2">
                Full Name
              </label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                value={state.fullName}
                onChange={(e) => upd("fullName", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-[#00E5CC] focus:ring-1 focus:ring-[#00E5CC]/30 transition-all text-base"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest font-semibold block mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="(305) 555-0100"
                value={state.phone}
                onChange={(e) => upd("phone", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-[#00E5CC] focus:ring-1 focus:ring-[#00E5CC]/30 transition-all text-base"
              />
            </div>

            <div>
              <label className="text-white/50 text-xs uppercase tracking-widest font-semibold block mb-2">
                Email Address
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="jane@email.com"
                value={state.email}
                onChange={(e) => upd("email", e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-4 focus:outline-none focus:border-[#00E5CC] focus:ring-1 focus:ring-[#00E5CC]/30 transition-all text-base"
              />
            </div>

            <p className="text-white/25 text-xs leading-relaxed pt-2">
              We&apos;ll use this to confirm your booking and send you a receipt. We never share your info.
            </p>
          </div>
        )}

        {/* ── STEP 4: REVIEW ─────────────────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-5">
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">
              Review &amp; confirm
            </p>

            {/* Summary card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/[0.06]">
              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-white/40 text-sm">Experience</span>
                <span className="text-white font-bold text-sm">
                  {state.experience === "jet-ski"
                    ? "Jet Ski Rental"
                    : state.experience === "jet-car"
                    ? "Jet Car Rental"
                    : selectedYacht?.name ?? "Yacht Charter"}
                </span>
              </div>

              {isJet && (
                <>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-white/40 text-sm">Rider Type</span>
                    <span className="text-white font-bold text-sm capitalize">{state.riderType} rider</span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-white/40 text-sm">Quantity</span>
                    <span className="text-white font-bold text-sm">
                      {state.quantity} {state.experience === "jet-ski" ? "jet ski" : "jet car"}{state.quantity > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-5 py-4">
                    <span className="text-white/40 text-sm">Duration</span>
                    <span className="text-white font-bold text-sm">{state.hours} hour{state.hours > 1 ? "s" : ""}</span>
                  </div>
                </>
              )}

              {isYacht && (
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-white/40 text-sm">Guests</span>
                  <span className="text-white font-bold text-sm">{state.guests} guests</span>
                </div>
              )}

              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-white/40 text-sm">Date</span>
                <span className="text-white font-bold text-sm">
                  {state.date
                    ? new Date(state.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>

              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-white/40 text-sm">Time</span>
                <span className="text-white font-bold text-sm">{state.time}</span>
              </div>

              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-white/40 text-sm">Name</span>
                <span className="text-white font-bold text-sm">{state.fullName}</span>
              </div>

              <div className="flex justify-between items-center px-5 py-4">
                <span className="text-white/40 text-sm">Phone</span>
                <span className="text-white font-bold text-sm">{state.phone}</span>
              </div>

              {state.notes && (
                <div className="flex justify-between items-start gap-4 px-5 py-4">
                  <span className="text-white/40 text-sm shrink-0">Notes</span>
                  <span className="text-white font-bold text-sm text-right">{state.notes}</span>
                </div>
              )}

              {deposit > 0 && (
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-white/40 text-sm">Deposit due now</span>
                  <span className="text-[#00E5CC] font-black text-xl">${deposit}</span>
                </div>
              )}

              {balanceAtArrival > 0 && (
                <div className="flex justify-between items-center px-5 py-4">
                  <span className="text-white/40 text-sm">Balance due at arrival</span>
                  <span className="text-[#00BFFF] font-bold text-sm">${balanceAtArrival.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between items-center px-5 py-4 border-t border-white/[0.06]">
                <span className="text-white/25 text-xs">Full price</span>
                <span className="text-white/25 font-semibold text-xs">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Deposit note */}
            <div className="rounded-xl bg-[#00E5CC]/5 border border-[#00E5CC]/20 px-4 py-4 space-y-3">
              <p className="text-white/70 text-xs leading-relaxed">
                <span className="font-bold text-white">${deposit} due today.</span>{" "}
                {balanceAtArrival > 0 && (
                  <>The remaining <span className="font-bold text-white">${balanceAtArrival.toLocaleString()}</span> is collected at arrival — cash or card accepted.</>
                )}
                {" "}This deposit is non-refundable.
              </p>
              <p className="text-white/40 text-xs leading-relaxed">
                For any questions or clarifications, feel free to reach out —{" "}
                <a href="tel:7748234024" className="text-[#00E5CC] font-semibold hover:underline">(774) 823-4024</a>
                {" "}or{" "}
                <a href="https://www.instagram.com/miamilifestylewatersports" target="_blank" rel="noopener noreferrer" className="text-[#00E5CC] font-semibold hover:underline">@miamilifestylewatersports</a>.
              </p>
            </div>

            {/* Waiver */}
            {isJet && (
              <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-amber-500/25 bg-amber-500/[0.04] p-4">
                <input
                  type="checkbox"
                  checked={state.waiverAck}
                  onChange={(e) => upd("waiverAck", e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-amber-500 cursor-pointer shrink-0"
                />
                <span className="text-amber-200/60 text-sm leading-relaxed">
                  I understand that a waiver will be signed at arrival before operating any watercraft.
                </span>
              </label>
            )}

            {/* Policy agreement */}
            <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <input
                type="checkbox"
                checked={state.policyAck}
                onChange={(e) => upd("policyAck", e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#00E5CC] cursor-pointer shrink-0"
              />
              <span className="text-white/40 text-sm leading-relaxed">
                I have read and agree to the{" "}
                <a
                  href="/cancellation-policy"
                  target="_blank"
                  className="text-[#00E5CC] hover:text-white underline underline-offset-2 transition-colors"
                >
                  cancellation policy
                </a>
                ,{" "}
                <a
                  href="/cancellation-policy"
                  target="_blank"
                  className="text-[#00E5CC] hover:text-white underline underline-offset-2 transition-colors"
                >
                  terms of service
                </a>
                , and all rules and regulations of Miami Lifestyle Watersports.
              </span>
            </label>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* ── FIXED BOTTOM NAV ─────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#050D14]/95 backdrop-blur-xl border-t border-white/8 px-4 pt-3 pb-6">
        <div className="max-w-lg mx-auto">
          {/* Price preview */}
          {total > 0 && (
            <div className="flex justify-between items-center mb-3 px-1">
              {step === 4 && deposit > 0 ? (
                <>
                  <span className="text-white/30 text-xs uppercase tracking-widest">
                    Deposit today · ${balanceAtArrival.toLocaleString()} at arrival
                  </span>
                  <span className="text-[#00E5CC] font-black text-lg">${deposit}</span>
                </>
              ) : (
                <>
                  <span className="text-white/30 text-xs uppercase tracking-widest">Est. Total</span>
                  <span className="text-[#00E5CC] font-black text-lg">${total.toLocaleString()}</span>
                </>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={goBack}
                className="px-6 py-4 rounded-full border border-white/15 text-white/50 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Back
              </button>
            )}

            {step < 4 ? (
              <button
                onClick={goNext}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] text-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_30px_-8px_#00E5CC]"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] text-black font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_30px_-8px_#00E5CC]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirecting...
                  </>
                ) : (
                  `Pay $${deposit} Deposit →`
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
