"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import type { Booking } from "@/lib/supabase";

const EXP_COLOR: Record<string, string> = {
  "jet-ski": "#00E5CC",
  "jet-car": "#00BFFF",
  yacht: "#FFD700",
};

const EXP_PRICE: Record<string, number> = {
  "jet-ski": 140,
  "jet-car": 350,
};

const YACHT_PRICES: Record<string, number> = {
  "yacht-uniesse": 2200,
  "yacht-churri": 3700,
  "yacht-rayb50": 1200,
  "yacht-searay": 1500,
  "yacht-flybridge": 1400,
};

const DEPOSIT_PER_UNIT: Record<string, number> = {
  'jet-ski': 40,
  'jet-car': 80,
  'yacht-uniesse': 300,
  'yacht-churri': 500,
  'yacht-rayb50': 200,
  'yacht-searay': 250,
  'yacht-flybridge': 200,
}

const DOUBLE_RIDER_DEPOSIT_PER_UNIT: Record<string, number> = {
  'jet-ski': 70,
  'jet-car': 100,
}

const YACHT_NAMES: Record<string, string> = {
  "yacht-uniesse": "Foolish Pleasure",
  "yacht-churri": "Churri",
  "yacht-rayb50": "Ray B 50",
  "yacht-searay": "Sea Ray",
  "yacht-flybridge": "Fly Bridge Navigator",
};

const STATUS_CLASS: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  confirmed: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  cancelled: "bg-red-500/15 text-red-400 border border-red-500/30",
};

const INVOICE_STATUS_CLASS: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  open: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  draft: "bg-white/8 text-white/40 border border-white/10",
  void: "bg-red-500/15 text-red-400 border border-red-500/30",
  uncollectible: "bg-red-500/15 text-red-400 border border-red-500/30",
};

type Tab = "calendar" | "orders" | "sales" | "payments" | "support";
type SalesPeriod = "week" | "month" | "year" | "all";
type OrderFilter = "all" | "pending" | "confirmed" | "cancelled";

interface StripeBalance {
  available: { amount: number; currency: string }[];
  pending: { amount: number; currency: string }[];
}
interface StripePayout {
  id: string;
  amount: number;
  arrival_date: number;
  status: string;
  description: string | null;
}
interface StripeCustomer {
  name?: string | null;
  email?: string | null;
}
interface StripeInvoice {
  id: string;
  customer: StripeCustomer | string | null;
  customer_name: string | null;
  customer_email: string | null;
  amount_due: number;
  status: string | null;
  created: number;
  due_date: number | null;
  hosted_invoice_url: string | null;
}
interface StripeCharge {
  id: string;
  amount: number;
  status: string;
  created: number;
  disputed: boolean;
  refunded: boolean;
  billing_details?: { name?: string | null; email?: string | null };
  receipt_email?: string | null;
  description?: string | null;
}
interface StripeDispute {
  id: string;
  amount: number;
  status: string;
  reason: string;
  created: number;
  evidence_details?: { due_by: number | null; has_evidence: boolean; past_due: boolean };
  charge: StripeCharge | string | null;
}

function padZ(n: number) { return String(n).padStart(2, "0"); }

function bookingRevenue(b: Booking): number {
  if (b.experience_type === "yacht") return YACHT_PRICES[b.service_id] ?? 0;
  const baseRate = b.experience_type === "jet-ski" && b.rider_type === "double"
    ? 170
    : (EXP_PRICE[b.experience_type] ?? 0);
  return baseRate * (b.quantity ?? 1) * (b.hours ?? 1);
}

function bookingDeposit(b: Booking): number {
  if (b.amount_paid != null) return b.amount_paid
  const isDouble = b.rider_type === 'double'
  const perUnit = (isDouble ? DOUBLE_RIDER_DEPOSIT_PER_UNIT[b.service_id] : undefined) ?? DEPOSIT_PER_UNIT[b.service_id] ?? 40
  if (b.experience_type === 'yacht') return perUnit
  return perUnit * (b.quantity ?? 1)
}

function serviceLabel(b: Booking) {
  if (b.experience_type === "yacht") return `Yacht — ${YACHT_NAMES[b.service_id] ?? b.service_id}`;
  if (b.experience_type === "jet-ski") return `Jet Ski${b.rider_type ? ` (${b.rider_type})` : ""}`;
  if (b.experience_type === "jet-car") return `Jet Car${b.rider_type ? ` (${b.rider_type})` : ""}`;
  return b.experience_type;
}

function fmt(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });
}

function fmtTimestamp(ts: number) {
  return new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function invoiceCustomerName(inv: StripeInvoice): string {
  if (inv.customer_name) return inv.customer_name;
  if (inv.customer && typeof inv.customer === "object") return (inv.customer as StripeCustomer).name ?? "—";
  return "—";
}

function invoiceCustomerEmail(inv: StripeInvoice): string {
  if (inv.customer_email) return inv.customer_email;
  if (inv.customer && typeof inv.customer === "object") return (inv.customer as StripeCustomer).email ?? "—";
  return "—";
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0A1929] border border-white/10 rounded-xl px-3 py-2 text-xs">
      <p className="text-white/50 mb-1">{label}</p>
      <p className="text-[#00E5CC] font-black">${payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const now = new Date();

  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("calendar");
  const [salesPeriod, setSalesPeriod] = useState<SalesPeriod>("month");

  // Orders
  const [ordersFilter, setOrdersFilter] = useState<OrderFilter>("all");
  const [ordersSearch, setOrdersSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);

  // Payments / Stripe
  const [stripeConfigured, setStripeConfigured] = useState<boolean | null>(null);
  const [stripeBalance, setStripeBalance] = useState<StripeBalance | null>(null);
  const [stripePayouts, setStripePayouts] = useState<StripePayout[]>([]);
  const [stripeInvoices, setStripeInvoices] = useState<StripeInvoice[]>([]);
  const [stripeCharges, setStripeCharges] = useState<StripeCharge[]>([]);
  const [stripeDisputes, setStripeDisputes] = useState<StripeDispute[]>([]);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  // Invoice modal
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [invoiceForm, setInvoiceForm] = useState({ name: "", email: "", amount: "", description: "" });
  const [sendingInvoice, setSendingInvoice] = useState(false);
  const [invoiceSuccess, setInvoiceSuccess] = useState(false);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);

  // Payout modal
  const [payoutModal, setPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payingOut, setPayingOut] = useState(false);

  const monthStr = `${year}-${padZ(month + 1)}`;
  const todayStr = `${now.getFullYear()}-${padZ(now.getMonth() + 1)}-${padZ(now.getDate())}`;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/bookings?month=${monthStr}`);
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setLoading(false);
  }, [monthStr]);

  const fetchAll = useCallback(async () => {
    const res = await fetch(`/api/admin/bookings`);
    const data = await res.json();
    setAllBookings(data.bookings ?? []);
  }, []);

  const fetchStripeData = useCallback(async () => {
    setStripeLoading(true);
    setStripeError(null);
    const res = await fetch("/api/admin/stripe/data");
    const data = await res.json();
    setStripeConfigured(data.configured ?? false);
    if (data.error) {
      setStripeError(data.error);
    } else if (data.configured) {
      setStripeBalance(data.balance ?? null);
      setStripePayouts(data.payouts ?? []);
      setStripeInvoices(data.invoices ?? []);
      setStripeCharges(data.charges ?? []);
      setStripeDisputes(data.disputes ?? []);
    }
    setStripeLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);
  useEffect(() => {
    if (tab === "sales" || tab === "support" || tab === "orders") fetchAll();
  }, [tab, fetchAll]);
  useEffect(() => {
    if (tab === "payments") fetchStripeData();
  }, [tab, fetchStripeData]);

  // Poll for new bookings so the dashboard reflects new orders without a manual refresh.
  useEffect(() => {
    const id = setInterval(() => {
      fetchBookings();
      if (tab === "sales" || tab === "support" || tab === "orders") fetchAll();
    }, 20000);
    return () => clearInterval(id);
  }, [fetchBookings, fetchAll, tab]);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchBookings();
    await fetchAll();
    setUpdating(null);
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, status: status as Booking["status"] } : prev);
    }
  }

  function openInvoiceForBooking(b: Booking) {
    setInvoiceForm({
      name: b.full_name,
      email: b.email,
      amount: String(bookingRevenue(b)),
      description: `${serviceLabel(b)} — ${fmt(b.booking_date)}`,
    });
    setInvoiceModal(true);
  }

  function viewOrderDetail(b: Booking) {
    setTab("orders");
    setSelectedOrder(b);
  }

  async function sendInvoice() {
    if (!invoiceForm.name || !invoiceForm.email || !invoiceForm.amount) return;
    setSendingInvoice(true);
    setInvoiceError(null);
    const res = await fetch("/api/admin/stripe/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: invoiceForm.name,
        email: invoiceForm.email,
        amountDollars: invoiceForm.amount,
        description: invoiceForm.description,
      }),
    });
    const data = await res.json();
    setSendingInvoice(false);
    if (res.ok) {
      setInvoiceSuccess(true);
      await fetchStripeData();
      setTimeout(() => {
        setInvoiceModal(false);
        setInvoiceSuccess(false);
        setInvoiceForm({ name: "", email: "", amount: "", description: "" });
      }, 2500);
    } else {
      setInvoiceError(data.error ?? "Failed to send invoice");
    }
  }

  async function createPayout() {
    if (!payoutAmount) return;
    setPayingOut(true);
    await fetch("/api/admin/stripe/payouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amountDollars: payoutAmount }),
    });
    setPayingOut(false);
    setPayoutModal(false);
    setPayoutAmount("");
    await fetchStripeData();
  }

  function logout() {
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  }

  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  }

  // Calendar
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const byDate: Record<string, Booking[]> = {};
  for (const b of bookings) {
    if (!byDate[b.booking_date]) byDate[b.booking_date] = [];
    byDate[b.booking_date].push(b);
  }

  const selectedBookings = selectedDay
    ? [...(byDate[selectedDay] ?? [])].sort((a, b) => a.start_time.localeCompare(b.start_time))
    : [];

  const pending = bookings.filter(b => b.status === "pending");
  const active = bookings.filter(b => b.status !== "cancelled");

  // Sales
  const now2 = new Date();
  const filteredBookings = allBookings.filter(b => {
    if (b.status === "cancelled") return false;
    const d = new Date(b.booking_date + "T12:00:00");
    if (salesPeriod === "week") { const w = new Date(now2); w.setDate(now2.getDate() - 7); return d >= w; }
    if (salesPeriod === "month") return d.getMonth() === now2.getMonth() && d.getFullYear() === now2.getFullYear();
    if (salesPeriod === "year") return d.getFullYear() === now2.getFullYear();
    return true;
  });

  const totalRevenue = filteredBookings.reduce((s, b) => s + bookingRevenue(b), 0);
  const totalBookings = filteredBookings.length;
  const avgValue = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  const revenueByType = ["jet-ski", "jet-car", "yacht"].map(t => ({
    name: t === "jet-ski" ? "Jet Ski" : t === "jet-car" ? "Jet Car" : "Yacht",
    revenue: filteredBookings.filter(b => b.experience_type === t).reduce((s, b) => s + bookingRevenue(b), 0),
    count: filteredBookings.filter(b => b.experience_type === t).length,
    color: EXP_COLOR[t],
  }));

  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now2.getFullYear(), now2.getMonth() - (5 - i), 1);
    const y = d.getFullYear(); const m2 = d.getMonth();
    const label = d.toLocaleDateString("en-US", { month: "short" });
    const rev = allBookings.filter(b => {
      if (b.status === "cancelled") return false;
      const bd = new Date(b.booking_date + "T12:00:00");
      return bd.getFullYear() === y && bd.getMonth() === m2;
    }).reduce((s, b) => s + bookingRevenue(b), 0);
    return { label, revenue: rev };
  });

  // Support
  const yachtQuotes = allBookings.filter(b => b.experience_type === "yacht" && b.status === "pending");
  const jetPending = allBookings.filter(b => b.experience_type !== "yacht" && b.status === "pending");
  const bookingsWithNotes = allBookings.filter(b => b.notes && b.notes.trim() && b.status !== "cancelled");
  const cancelledRecent = allBookings.filter(b => b.status === "cancelled").slice(0, 10);

  // Orders
  const filteredOrders = allBookings
    .filter(b => ordersFilter === "all" || b.status === ordersFilter)
    .filter(b => {
      if (!ordersSearch) return true;
      const q = ordersSearch.toLowerCase();
      return b.full_name.toLowerCase().includes(q) || b.email.toLowerCase().includes(q) || b.phone.includes(q);
    })
    .sort((a, b) => b.booking_date.localeCompare(a.booking_date) || b.start_time.localeCompare(a.start_time));

  // Stripe helpers
  const availableBalance = (stripeBalance?.available ?? []).reduce((s, a) => s + a.amount, 0);
  const pendingBalance = (stripeBalance?.pending ?? []).reduce((s, a) => s + a.amount, 0);

  const fmtCents = (cents: number) =>
    "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="min-h-screen bg-[#050D14] text-white pb-16">

      {/* ── Invoice Modal ───────────────────────────────────────────────── */}
      {invoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0A1929] p-6">
            {invoiceSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-500/10">
                  <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-emerald-400 text-xl font-black mb-1">Invoice Sent!</p>
                <p className="text-white/40 text-sm">Customer will receive an email with a payment link.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Create Invoice</h3>
                  <button onClick={() => { setInvoiceModal(false); setInvoiceError(null); setInvoiceForm({ name: "", email: "", amount: "", description: "" }); }}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-1.5 block">Customer Name</label>
                    <input value={invoiceForm.name} onChange={e => setInvoiceForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="John Doe"
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5CC]/40 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-1.5 block">Customer Email</label>
                    <input value={invoiceForm.email} onChange={e => setInvoiceForm(f => ({ ...f, email: e.target.value }))}
                      type="email" placeholder="john@example.com"
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5CC]/40 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-1.5 block">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">$</span>
                      <input value={invoiceForm.amount} onChange={e => setInvoiceForm(f => ({ ...f, amount: e.target.value }))}
                        type="number" min="1" step="0.01" placeholder="0.00"
                        className="w-full rounded-xl bg-white/[0.06] border border-white/10 pl-8 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5CC]/40 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-1.5 block">Description</label>
                    <input value={invoiceForm.description} onChange={e => setInvoiceForm(f => ({ ...f, description: e.target.value }))}
                      placeholder="Jet Ski rental — June 21"
                      className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5CC]/40 transition-colors" />
                  </div>
                  {invoiceError && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3">
                      <p className="text-red-400 text-xs">{invoiceError}</p>
                    </div>
                  )}
                  <button onClick={sendInvoice}
                    disabled={sendingInvoice || !invoiceForm.name || !invoiceForm.email || !invoiceForm.amount}
                    className="w-full py-3 rounded-xl bg-[#00E5CC] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00BFFF] transition-all disabled:opacity-40 mt-1">
                    {sendingInvoice ? "Sending..." : "Send Invoice"}
                  </button>
                  <p className="text-center text-white/20 text-[10px]">Customer gets an email with a hosted payment link. Due in 7 days.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Payout Modal ────────────────────────────────────────────────── */}
      {payoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#0A1929] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white text-sm uppercase tracking-widest">Pay Out</h3>
              <button onClick={() => { setPayoutModal(false); setPayoutAmount(""); }}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-white/40 text-xs mb-4">
              Available to pay out: <span className="text-[#00E5CC] font-bold">{fmtCents(availableBalance)}</span>
            </p>
            <div className="relative mb-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">$</span>
              <input value={payoutAmount} onChange={e => setPayoutAmount(e.target.value)}
                type="number" min="0.50" step="0.01" placeholder="Amount"
                className="w-full rounded-xl bg-white/[0.06] border border-white/10 pl-8 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#00E5CC]/40 transition-colors" />
            </div>
            <button onClick={() => setPayoutAmount((availableBalance / 100).toFixed(2))}
              className="w-full mb-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/40 text-xs font-bold hover:text-white transition-all">
              Use full balance
            </button>
            <button onClick={createPayout} disabled={payingOut || !payoutAmount}
              className="w-full py-3 rounded-xl bg-[#00E5CC] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00BFFF] transition-all disabled:opacity-40">
              {payingOut ? "Processing..." : "Confirm Payout"}
            </button>
            <p className="text-center text-white/20 text-[10px] mt-3">Funds will arrive in your bank account in 1–2 business days.</p>
          </div>
        </div>
      )}

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-[#030A10] border-b border-white/8 px-4 py-3.5 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto" />
            <div>
              <p className="text-white font-black text-xs uppercase tracking-widest">Admin Dashboard</p>
              <p className="text-white/30 text-[10px]">Miami Lifestyle Watersports</p>
            </div>
          </div>
          <button onClick={logout} className="text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors">Logout</button>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────── */}
      <div className="bg-[#030A10] border-b border-white/8 px-4 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex min-w-max">
          {([
            { key: "calendar", label: "Calendar" },
            { key: "orders", label: "Orders" },
            { key: "sales", label: "Sales" },
            { key: "payments", label: "Payments" },
            { key: "support", label: "Support" },
          ] as { key: Tab; label: string }[]).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-5 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${tab === t.key ? "border-[#00E5CC] text-[#00E5CC]" : "border-transparent text-white/30 hover:text-white/60"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-5">

        {/* ── CALENDAR ──────────────────────────────────────────────────── */}
        {tab === "calendar" && (
          <>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Today", value: (byDate[todayStr] ?? []).filter(b => b.status !== "cancelled").length },
                { label: "This Month", value: active.length },
                { label: "Need Confirm", value: pending.length, hi: pending.length > 0 },
              ].map(s => (
                <div key={s.label} className={`rounded-xl border p-4 text-center ${s.hi ? "border-amber-500/30 bg-amber-500/5" : "border-white/8 bg-white/[0.03]"}`}>
                  <p className={`text-2xl font-black ${s.hi ? "text-amber-400" : "text-white"}`}>{s.value}</p>
                  <p className="text-white/35 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <button onClick={prevMonth} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="font-black text-white text-sm uppercase tracking-widest">{monthLabel}</h2>
                <button onClick={nextMonth} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
                  <div key={d} className="text-center text-white/20 text-[10px] font-bold uppercase tracking-widest py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${padZ(month + 1)}-${padZ(day)}`;
                  const activeBk = (byDate[dateStr] ?? []).filter(b => b.status !== "cancelled");
                  const isToday = dateStr === todayStr;
                  const isSel = dateStr === selectedDay;
                  const types = [...new Set(activeBk.map(b => b.experience_type))];
                  return (
                    <button key={day} onClick={() => setSelectedDay(isSel ? null : dateStr)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-start pt-1.5 transition-all ${isSel ? "bg-[#00E5CC]/15 border-2 border-[#00E5CC]" : isToday ? "bg-white/10 border border-white/25" : activeBk.length > 0 ? "bg-white/[0.04] border border-white/8 hover:bg-white/8" : "hover:bg-white/5"}`}>
                      <span className={`text-xs font-bold leading-none ${isToday || isSel ? "text-[#00E5CC]" : "text-white/60"}`}>{day}</span>
                      {types.length > 0 && (
                        <div className="flex gap-0.5 mt-1.5 flex-wrap justify-center">
                          {types.map(t => <div key={t} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: EXP_COLOR[t] ?? "#fff" }} />)}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-5 justify-center mt-4 pt-4 border-t border-white/8">
                {Object.entries(EXP_COLOR).map(([type, color]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-white/35 text-[10px] capitalize">{type.replace("-", " ")}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedDay && (
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <h3 className="font-black text-white text-sm uppercase tracking-wide mb-4">
                  {fmt(selectedDay)} <span className="text-white/30 font-normal normal-case tracking-normal">— {selectedBookings.length} booking{selectedBookings.length !== 1 ? "s" : ""}</span>
                </h3>
                {selectedBookings.length === 0 ? <p className="text-white/25 text-sm">No bookings this day.</p> : (
                  <div className="space-y-3">
                    {selectedBookings.map(b => (
                      <div key={b.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[#00E5CC] text-xs font-black">{b.start_time}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${EXP_COLOR[b.experience_type]}20`, color: EXP_COLOR[b.experience_type] }}>{serviceLabel(b)}</span>
                            </div>
                            <p className="text-white font-bold text-sm">{b.full_name}</p>
                            <p className="text-white/35 text-xs">{b.phone} · {b.email}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${STATUS_CLASS[b.status]}`}>{b.status}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-[10px] text-white/40 mb-2">
                          {b.experience_type !== "yacht" && <><span>{b.quantity} vehicle{b.quantity > 1 ? "s" : ""}</span><span>·</span><span>{b.hours} hr{b.hours > 1 ? "s" : ""}</span></>}
                          {b.guests && <><span>·</span><span>{b.guests} guests</span></>}
                          {b.rider_type && <><span>·</span><span>{b.rider_type} rider</span></>}
                          <span>·</span><span className="text-[#00E5CC] font-bold">${bookingRevenue(b).toLocaleString()}</span>
                        </div>
                        <div className="flex gap-4 text-xs mt-1">
                          <span className="text-[#00E5CC]">Deposit paid: <strong>${bookingDeposit(b).toLocaleString()}</strong></span>
                          {bookingRevenue(b) - bookingDeposit(b) > 0 && (
                            <span className="text-[#00BFFF]">Balance due: <strong>${(bookingRevenue(b) - bookingDeposit(b)).toLocaleString()}</strong></span>
                          )}
                        </div>
                        {b.notes && <p className="text-white/25 text-xs italic mb-3">&ldquo;{b.notes}&rdquo;</p>}
                        {b.status !== "cancelled" && (
                          <div className="flex gap-2 mt-3 flex-wrap">
                            <button onClick={() => viewOrderDetail(b)}
                              className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white transition-all">
                              Details
                            </button>
                            {b.status !== "confirmed" && (
                              <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                                className="flex-1 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all disabled:opacity-40">
                                {updating === b.id ? "..." : "Confirm"}
                              </button>
                            )}
                            <button onClick={() => openInvoiceForBooking(b)}
                              className="flex-1 py-2 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5CC]/20 transition-all">
                              Invoice
                            </button>
                            <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id}
                              className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-40">
                              {updating === b.id ? "..." : "Cancel"}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {pending.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                <h3 className="font-black text-amber-400 text-sm uppercase tracking-wide mb-4">Needs Confirmation ({pending.length})</h3>
                <div className="space-y-2">
                  {pending.map(b => (
                    <div key={b.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-white/5 last:border-0">
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{b.full_name}</p>
                        <p className="text-white/35 text-xs">{b.booking_date} · {b.start_time} · {serviceLabel(b)}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all disabled:opacity-40">Confirm</button>
                        <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id}
                          className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all disabled:opacity-40">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {loading && <p className="text-white/20 text-xs text-center py-4">Loading...</p>}
          </>
        )}

        {/* ── ORDERS ────────────────────────────────────────────────────── */}
        {tab === "orders" && (
          <>
            {/* Filter + search */}
            <div className="flex gap-2 flex-wrap items-center">
              {(["all","pending","confirmed","cancelled"] as OrderFilter[]).map(f => (
                <button key={f} onClick={() => { setOrdersFilter(f); setSelectedOrder(null); }}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${ordersFilter === f ? "bg-[#00E5CC] text-black" : "bg-white/5 border border-white/10 text-white/40 hover:text-white"}`}>
                  {f === "all" ? `All (${allBookings.length})` : f === "pending" ? `Pending (${allBookings.filter(b => b.status === "pending").length})` : f === "confirmed" ? `Confirmed (${allBookings.filter(b => b.status === "confirmed").length})` : `Cancelled (${allBookings.filter(b => b.status === "cancelled").length})`}
                </button>
              ))}
              <input value={ordersSearch} onChange={e => setOrdersSearch(e.target.value)}
                placeholder="Search name / email / phone…"
                className="ml-auto rounded-xl bg-white/[0.05] border border-white/10 px-4 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-white/20 w-48 transition-colors" />
            </div>

            {/* Selected order detail panel */}
            {selectedOrder && (
              <div className="rounded-2xl border border-[#00E5CC]/20 bg-[#00E5CC]/[0.03] p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#00E5CC] mb-1">Order Detail</p>
                    <p className="text-white font-black text-lg">{selectedOrder.full_name}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Service", value: serviceLabel(selectedOrder) },
                    { label: "Date", value: fmt(selectedOrder.booking_date) },
                    { label: "Time", value: selectedOrder.start_time },
                    { label: "Status", value: selectedOrder.status },
                    ...(selectedOrder.experience_type !== "yacht" ? [
                      { label: "Vehicles", value: `${selectedOrder.quantity}` },
                      { label: "Duration", value: `${selectedOrder.hours} hr${selectedOrder.hours > 1 ? "s" : ""}` },
                    ] : []),
                    ...(selectedOrder.guests ? [{ label: "Guests", value: `${selectedOrder.guests} people` }] : []),
                    ...(selectedOrder.rider_type ? [{ label: "Rider Type", value: selectedOrder.rider_type }] : []),
                    { label: "Deposit Paid", value: `$${bookingDeposit(selectedOrder).toLocaleString()}` },
                    { label: "Balance Due", value: bookingRevenue(selectedOrder) - bookingDeposit(selectedOrder) > 0 ? `$${(bookingRevenue(selectedOrder) - bookingDeposit(selectedOrder)).toLocaleString()}` : "Paid in full" },
                    { label: "Total Value", value: `$${bookingRevenue(selectedOrder).toLocaleString()}` },
                  ].map(row => (
                    <div key={row.label} className="rounded-xl bg-white/[0.03] border border-white/6 px-3 py-2.5">
                      <p className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">{row.label}</p>
                      <p className={`text-sm font-bold ${row.label === "Deposit Paid" ? "text-[#00E5CC]" : row.label === "Balance Due" ? "text-[#00BFFF]" : row.label === "Total Value" ? "text-[#FFD700]" : row.label === "Status" ? (selectedOrder.status === "confirmed" ? "text-emerald-400" : selectedOrder.status === "cancelled" ? "text-red-400" : "text-amber-400") : "text-white"}`}>{row.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-white/40 mb-4">
                  <div className="rounded-xl bg-white/[0.03] border border-white/6 px-3 py-2.5">
                    <p className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">Phone</p>
                    <a href={`tel:${selectedOrder.phone}`} className="text-[#00E5CC] text-sm font-bold hover:underline">{selectedOrder.phone}</a>
                  </div>
                  <div className="rounded-xl bg-white/[0.03] border border-white/6 px-3 py-2.5">
                    <p className="text-white/35 text-[10px] uppercase tracking-widest mb-0.5">Email</p>
                    <a href={`mailto:${selectedOrder.email}`} className="text-[#00E5CC] text-sm font-bold hover:underline truncate block">{selectedOrder.email}</a>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 px-4 py-3 mb-4">
                    <p className="text-white/35 text-[10px] uppercase tracking-widest mb-1">Customer Notes</p>
                    <p className="text-white/70 text-sm italic">&ldquo;{selectedOrder.notes}&rdquo;</p>
                  </div>
                )}
                {selectedOrder.status !== "cancelled" && (
                  <div className="flex gap-2 flex-wrap">
                    <a href={`tel:${selectedOrder.phone}`} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-all">Call</a>
                    <a href={`mailto:${selectedOrder.email}`} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-all">Email</a>
                    <button onClick={() => openInvoiceForBooking(selectedOrder)}
                      className="flex-1 py-2 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5CC]/20 transition-all">
                      Invoice
                    </button>
                    {selectedOrder.status !== "confirmed" && (
                      <button onClick={() => updateStatus(selectedOrder.id, "confirmed")} disabled={updating === selectedOrder.id}
                        className="flex-1 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all disabled:opacity-40">
                        {updating === selectedOrder.id ? "..." : "Confirm"}
                      </button>
                    )}
                    <button onClick={() => updateStatus(selectedOrder.id, "cancelled")} disabled={updating === selectedOrder.id}
                      className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-40">
                      {updating === selectedOrder.id ? "..." : "Cancel"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Orders list */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center">
                <p className="text-white/25 text-sm">No orders found.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredOrders.map(b => (
                  <button key={b.id} onClick={() => setSelectedOrder(selectedOrder?.id === b.id ? null : b)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${selectedOrder?.id === b.id ? "border-[#00E5CC]/30 bg-[#00E5CC]/5" : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="text-white font-bold text-sm">{b.full_name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_CLASS[b.status]}`}>{b.status}</span>
                        </div>
                        <p className="text-white/40 text-xs">{b.booking_date} · {b.start_time} · {serviceLabel(b)}</p>
                        <div className="flex flex-wrap gap-2 text-[10px] text-white/30 mt-1">
                          {b.experience_type !== "yacht" && <span>{b.quantity} vehicle{b.quantity > 1 ? "s" : ""} · {b.hours} hr{b.hours > 1 ? "s" : ""}</span>}
                          {b.guests ? <span>· {b.guests} guests</span> : null}
                          {b.notes ? <span className="text-amber-400/60">· has notes</span> : null}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[#00E5CC] font-black text-sm">${bookingDeposit(b).toLocaleString()} <span className="text-white/30 font-normal text-xs">deposit</span></p>
                        <p className="text-white/30 text-xs">${bookingRevenue(b).toLocaleString()} total</p>
                        <div className="w-1.5 h-1.5 rounded-full ml-auto mt-1.5" style={{ backgroundColor: EXP_COLOR[b.experience_type] ?? "#fff" }} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── SALES ─────────────────────────────────────────────────────── */}
        {tab === "sales" && (
          <>
            <div className="flex gap-2 flex-wrap">
              {(["week","month","year","all"] as SalesPeriod[]).map(p => (
                <button key={p} onClick={() => setSalesPeriod(p)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${salesPeriod === p ? "bg-[#00E5CC] text-black" : "bg-white/5 border border-white/10 text-white/40 hover:text-white"}`}>
                  {p === "week" ? "This Week" : p === "month" ? "This Month" : p === "year" ? "YTD" : "All Time"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "text-[#00E5CC]" },
                { label: "Bookings", value: String(totalBookings), color: "text-white" },
                { label: "Avg Value", value: `$${avgValue.toLocaleString()}`, color: "text-[#FFD700]" },
              ].map(m => (
                <div key={m.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4 text-center">
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-6">Revenue — Last 6 Months</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={28}>
                  <XAxis dataKey="label" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar dataKey="revenue" radius={[6,6,0,0]}>
                    {chartData.map((_, i) => (
                      <Cell key={i} fill={i === chartData.length - 1 ? "#00E5CC" : "rgba(0,229,204,0.25)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-5">Breakdown by Vehicle</p>
              <div className="space-y-4">
                {revenueByType.map(v => {
                  const pct = totalRevenue > 0 ? Math.round((v.revenue / totalRevenue) * 100) : 0;
                  return (
                    <div key={v.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }} />
                          <span className="text-white/60 text-xs font-bold uppercase tracking-wide">{v.name}</span>
                          <span className="text-white/25 text-[10px]">{v.count} booking{v.count !== 1 ? "s" : ""}</span>
                        </div>
                        <span className="text-white font-black text-sm">${v.revenue.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: v.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── PAYMENTS ──────────────────────────────────────────────────── */}
        {tab === "payments" && (
          <>
            {stripeLoading && (
              <div className="text-center py-10">
                <div className="w-8 h-8 rounded-full border-2 border-[#00E5CC] border-t-transparent animate-spin mx-auto mb-3" />
                <p className="text-white/30 text-xs">Connecting to Stripe...</p>
              </div>
            )}

            {!stripeLoading && stripeConfigured === false && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
                <p className="text-amber-400 font-black text-sm uppercase tracking-widest mb-2">Stripe Not Connected</p>
                <p className="text-white/50 text-sm mb-4">Add your Stripe secret key to enable invoices, payouts, and wallet tracking.</p>
                <div className="rounded-xl bg-black/30 border border-white/10 px-4 py-3 font-mono text-xs text-[#00E5CC] mb-4">
                  STRIPE_SECRET_KEY=sk_live_...
                </div>
                <p className="text-white/30 text-xs">Add this to your <span className="text-white/50">.env.local</span> file. Find your key in the <span className="text-white/50">Stripe Dashboard → Developers → API keys</span>.</p>
              </div>
            )}

            {!stripeLoading && stripeConfigured && stripeError && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
                <p className="text-red-400 font-black text-xs uppercase tracking-widest mb-1">Stripe Error</p>
                <p className="text-white/50 text-sm">{stripeError}</p>
              </div>
            )}

            {!stripeLoading && stripeConfigured && !stripeError && (
              <>
                {/* Disputes — shown first, above everything else. A dispute
                    was previously invisible in this dashboard entirely
                    (only Invoices were fetched; a disputed Payment Link
                    charge never showed up here at all). */}
                {stripeDisputes.length > 0 && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
                    <p className="text-red-400 font-black text-xs uppercase tracking-widest mb-3">
                      {stripeDisputes.length} Dispute{stripeDisputes.length > 1 ? "s" : ""}
                    </p>
                    <div className="space-y-3">
                      {stripeDisputes.map(d => {
                        const charge = typeof d.charge === "object" ? d.charge : null;
                        const dueBy = d.evidence_details?.due_by;
                        return (
                          <a key={d.id} href="https://dashboard.stripe.com/disputes" target="_blank" rel="noreferrer"
                            className="block rounded-xl border border-white/10 bg-black/20 p-4 hover:border-red-500/30 transition-all">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-white font-bold text-sm">{fmtCents(d.amount)} — {d.reason.replace(/_/g, " ")}</p>
                                <p className="text-white/40 text-xs mt-0.5 truncate">
                                  {charge?.billing_details?.name || charge?.receipt_email || "Unknown customer"}
                                </p>
                                <p className="text-white/30 text-[11px] mt-1">
                                  {d.evidence_details?.has_evidence
                                    ? `Evidence submitted — ${dueBy ? `decision by ${fmtTimestamp(dueBy)}` : "awaiting review"}`
                                    : dueBy
                                      ? `Respond by ${fmtTimestamp(dueBy)}`
                                      : "Needs response"}
                                </p>
                              </div>
                              <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${d.evidence_details?.has_evidence ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-red-500/15 text-red-300 border border-red-500/30"}`}>
                                {d.status.replace(/_/g, " ")}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Wallet */}
                <div>
                  <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-3">Wallet</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="rounded-xl border border-[#00E5CC]/20 bg-[#00E5CC]/[0.04] p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Available</p>
                      <p className="text-[#00E5CC] font-black text-2xl">{fmtCents(availableBalance)}</p>
                      <p className="text-white/25 text-[10px] mt-1">Ready to pay out</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
                      <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Pending</p>
                      <p className="text-[#FFD700] font-black text-2xl">{fmtCents(pendingBalance)}</p>
                      <p className="text-white/25 text-[10px] mt-1">In transit</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setPayoutAmount((availableBalance / 100).toFixed(2)); setPayoutModal(true); }}
                      disabled={availableBalance === 0}
                      className="flex-1 py-2.5 rounded-xl bg-[#00E5CC] text-black font-black text-xs uppercase tracking-widest hover:bg-[#00BFFF] transition-all disabled:opacity-30">
                      Pay Out Now
                    </button>
                    <a href="https://dashboard.stripe.com/settings/payouts" target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Bank Settings
                    </a>
                  </div>
                </div>

                {/* Recent payouts */}
                {stripePayouts.length > 0 && (
                  <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-4">Recent Payouts</p>
                    <div className="space-y-2">
                      {stripePayouts.map(p => (
                        <div key={p.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                          <div>
                            <p className="text-white text-sm font-bold">{fmtCents(p.amount)}</p>
                            <p className="text-white/30 text-[10px]">Arrives {fmtTimestamp(p.arrival_date)}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${p.status === "paid" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : p.status === "pending" ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-white/8 text-white/40 border border-white/10"}`}>
                            {p.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Payments — every charge, regardless of how it was
                    collected (Payment Link, checkout, invoice, etc). The
                    Invoices section below only ever shows Stripe Invoice
                    objects, which a Payment Link checkout never creates. */}
                {stripeCharges.length > 0 && (
                  <div>
                    <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-3">Recent Payments</p>
                    <div className="space-y-2">
                      {stripeCharges.map(c => (
                        <a key={c.id} href={`https://dashboard.stripe.com/payments/${c.id}`} target="_blank" rel="noreferrer"
                          className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-4 hover:border-white/20 transition-all">
                          <div className="min-w-0">
                            <p className="text-white text-sm font-bold">{fmtCents(c.amount)}</p>
                            <p className="text-white/30 text-[11px] mt-0.5 truncate">
                              {c.billing_details?.name || c.receipt_email || c.description || "Guest"} · {fmtTimestamp(c.created)}
                            </p>
                          </div>
                          {c.disputed ? (
                            <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">Disputed</span>
                          ) : c.refunded ? (
                            <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/8 text-white/40 border border-white/10">Refunded</span>
                          ) : (
                            <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${c.status === "succeeded" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/15 text-amber-300 border border-amber-500/30"}`}>
                              {c.status}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Invoices */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold">Invoices</p>
                    <button onClick={() => { setInvoiceForm({ name: "", email: "", amount: "", description: "" }); setInvoiceModal(true); }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00E5CC]/10 border border-[#00E5CC]/20 text-[#00E5CC] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5CC]/20 transition-all">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      New Invoice
                    </button>
                  </div>
                  {stripeInvoices.length === 0 ? (
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 text-center">
                      <p className="text-white/25 text-sm">No invoices yet. Create one to get paid.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {stripeInvoices.map(inv => (
                        <div key={inv.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-white font-bold text-sm">{invoiceCustomerName(inv)}</p>
                              <p className="text-white/35 text-xs">{invoiceCustomerEmail(inv)}</p>
                              <p className="text-white/25 text-[10px] mt-1">
                                Created {fmtTimestamp(inv.created)}
                                {inv.due_date ? ` · Due ${fmtTimestamp(inv.due_date)}` : ""}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-white font-black text-sm">{fmtCents(inv.amount_due)}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${INVOICE_STATUS_CLASS[inv.status ?? ""] ?? "bg-white/8 text-white/40 border border-white/10"}`}>
                                {inv.status}
                              </span>
                            </div>
                          </div>
                          {inv.hosted_invoice_url && inv.status !== "paid" && (
                            <a href={inv.hosted_invoice_url} target="_blank" rel="noreferrer"
                              className="mt-3 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest hover:text-white hover:border-white/20 transition-all">
                              View Invoice
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </>
            )}
          </>
        )}

        {/* ── SUPPORT ───────────────────────────────────────────────────── */}
        {tab === "support" && (
          <>
            {/* Special Requests & Notes */}
            {bookingsWithNotes.length > 0 && (
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Special Requests & Notes</h3>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00BFFF]/10 text-[#00BFFF] border border-[#00BFFF]/20">{bookingsWithNotes.length}</span>
                </div>
                <div className="space-y-3">
                  {bookingsWithNotes.map(b => (
                    <div key={b.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="text-white font-bold text-sm">{b.full_name}</p>
                          <p className="text-white/35 text-xs">{b.booking_date} · {b.start_time} · {serviceLabel(b)}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${STATUS_CLASS[b.status]}`}>{b.status}</span>
                      </div>
                      <div className="rounded-lg bg-amber-500/5 border border-amber-500/15 px-3 py-2.5 mb-3">
                        <p className="text-white/60 text-xs italic">&ldquo;{b.notes}&rdquo;</p>
                      </div>
                      <div className="flex gap-2">
                        <a href={`tel:${b.phone}`} className="flex-1 py-2 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold uppercase tracking-widest text-center hover:bg-[#00E5CC]/20 transition-all">Call</a>
                        <a href={`mailto:${b.email}`} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-all">Email</a>
                        <button onClick={() => openInvoiceForBooking(b)}
                          className="flex-1 py-2 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold uppercase tracking-widest hover:bg-[#00E5CC]/20 transition-all">
                          Invoice
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellations */}
            {cancelledRecent.length > 0 && (
              <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Cancellations</h3>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{allBookings.filter(b => b.status === "cancelled").length} total</span>
                </div>
                <div className="space-y-2">
                  {cancelledRecent.map(b => (
                    <div key={b.id} className="flex items-center justify-between gap-3 py-2.5 border-b border-white/5 last:border-0">
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{b.full_name}</p>
                        <p className="text-white/35 text-xs">{b.booking_date} · {serviceLabel(b)}</p>
                        {b.notes && <p className="text-white/25 text-[10px] italic mt-0.5 truncate">&ldquo;{b.notes}&rdquo;</p>}
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a href={`tel:${b.phone}`} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-bold hover:text-white transition-all">Call</a>
                        <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all disabled:opacity-40">
                          Restore
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Yacht Quote Requests */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Yacht Quote Requests</h3>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">{yachtQuotes.length} pending</span>
              </div>
              {yachtQuotes.length === 0 ? (
                <p className="text-white/25 text-sm">No pending yacht quote requests.</p>
              ) : (
                <div className="space-y-3">
                  {yachtQuotes.map(b => (
                    <div key={b.id} className="rounded-xl border border-[#FFD700]/15 bg-[#FFD700]/[0.02] p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-white font-bold">{b.full_name}</p>
                          <p className="text-white/35 text-xs mt-0.5">{b.phone} · {b.email}</p>
                        </div>
                        <span className="text-[#FFD700] text-xs font-bold shrink-0">{YACHT_NAMES[b.service_id] ?? b.service_id}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-[10px] text-white/40 mb-3">
                        <span>{b.booking_date}</span><span>·</span><span>{b.start_time}</span>
                        {b.guests && <><span>·</span><span>{b.guests} guests</span></>}
                      </div>
                      {b.notes && <p className="text-white/25 text-xs italic mb-3">&ldquo;{b.notes}&rdquo;</p>}
                      <div className="flex gap-2">
                        <a href={`tel:${b.phone}`} className="flex-1 py-2 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold uppercase tracking-widest text-center hover:bg-[#00E5CC]/20 transition-all">Call</a>
                        <a href={`mailto:${b.email}`} className="flex-1 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest text-center hover:bg-white/10 transition-all">Email</a>
                        <button onClick={() => openInvoiceForBooking(b)}
                          className="flex-1 py-2 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/25 text-[#FFD700] text-xs font-bold uppercase tracking-widest hover:bg-[#FFD700]/20 transition-all">
                          Invoice
                        </button>
                        <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                          className="flex-1 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-widest hover:bg-emerald-500/20 transition-all disabled:opacity-40">
                          {updating === b.id ? "..." : "Confirm"}
                        </button>
                        <button onClick={() => updateStatus(b.id, "cancelled")} disabled={updating === b.id}
                          className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all disabled:opacity-40">
                          {updating === b.id ? "..." : "Decline"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Jet Bookings */}
            <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white text-sm uppercase tracking-widest">Pending Jet Bookings</h3>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">{jetPending.length} unconfirmed</span>
              </div>
              {jetPending.length === 0 ? (
                <p className="text-white/25 text-sm">All jet ski &amp; car bookings are confirmed.</p>
              ) : (
                <div className="space-y-3">
                  {jetPending.map(b => (
                    <div key={b.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-white font-bold text-sm">{b.full_name}</p>
                          <p className="text-white/35 text-xs">{b.phone} · {b.email}</p>
                          <p className="text-white/25 text-[10px] mt-1">{b.booking_date} · {b.start_time} · {serviceLabel(b)}</p>
                          {b.notes && <p className="text-white/25 text-[10px] italic mt-1">&ldquo;{b.notes}&rdquo;</p>}
                        </div>
                        <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                          <a href={`tel:${b.phone}`} className="px-3 py-1.5 rounded-lg bg-[#00E5CC]/10 border border-[#00E5CC]/25 text-[#00E5CC] text-xs font-bold hover:bg-[#00E5CC]/20 transition-all">Call</a>
                          <button onClick={() => openInvoiceForBooking(b)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-bold hover:text-white transition-all">
                            Invoice
                          </button>
                          <button onClick={() => updateStatus(b.id, "confirmed")} disabled={updating === b.id}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all disabled:opacity-40">
                            {updating === b.id ? "..." : "Confirm"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
