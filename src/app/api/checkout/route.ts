import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

const DEPOSITS: Record<string, number> = {
  'jet-ski': 40,
  'jet-car': 100,
  'yacht-uniesse': 300,
  'yacht-churri': 500,
  'yacht-rayb50': 200,
  'yacht-searay': 250,
  'yacht-flybridge': 200,
}

// Double-rider bookings cost more even at quantity 1 (jet ski) — deposit
// needs to reflect that, not just the flat per-unit rate. Jet car is a flat
// $100/hr regardless of rider count, so it's intentionally absent here.
const DOUBLE_RIDER_DEPOSITS: Record<string, number> = {
  'jet-ski': 70,
}

const SERVICE_LABELS: Record<string, string> = {
  'jet-ski': 'Jet Ski Rental',
  'jet-car': 'Jet Car Rental',
  'yacht-uniesse': "Foolish Pleasure — 80' Uniesse",
  'yacht-churri': 'Churri — Luxury Yacht',
  'yacht-rayb50': "Ray B 50 — 50' Charter",
  'yacht-searay': 'Sea Ray — Classic Charter',
  'yacht-flybridge': "Fly Bridge Navigator — 55' Charter",
}

// Service fee covers Stripe's processing cost (2.9% + $0.30)
// Pass-through so the full deposit amount lands net
function serviceFee(depositAmount: number): number {
  return Math.round((depositAmount * 0.029 + 0.30) / (1 - 0.029) * 100)
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const body = await req.json()
  const { fullName, phone, email, service, date, time, guests, hours, quantity, riderType, notes, totalPrice } = body

  if (!fullName || !email || !service || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const isJetRental = service === 'jet-ski' || service === 'jet-car'
  const isDoubleRider = String(riderType) === 'double' && isJetRental
  const baseDepositPerUnit = isDoubleRider
    ? (DOUBLE_RIDER_DEPOSITS[service] ?? DEPOSITS[service] ?? 50)
    : (DEPOSITS[service] ?? 50)
  const qty = isJetRental ? Math.max(1, Number(quantity) || 1) : 1
  // Jet ski/car deposits are hourly — a 2-hour rental holds the spot for twice
  // as long, so it charges 2x the deposit. Yacht deposits are a flat rate for
  // the whole (fixed-length) charter, not hourly, so they're left out of this.
  // Jet ski itself is a 1-hour-only rental (jet car still supports multiple
  // hours), so it's clamped to exactly 1 regardless of what's sent.
  const hrs = service === 'jet-ski' ? 1 : isJetRental ? Math.max(1, Number(hours) || 1) : 1
  const depositAmount = baseDepositPerUnit * qty * hrs
  const serviceName = SERVICE_LABELS[service] ?? service
  const fullTotal = Number(totalPrice) || depositAmount
  const balanceOwed = Math.max(0, fullTotal - depositAmount)

  const depositCents = Math.round(depositAmount * 100)
  const feeCents = serviceFee(depositAmount)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  try {
    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${serviceName} — Deposit`,
              description: balanceOwed > 0
                ? `${date} at ${time} · Balance of $${balanceOwed.toLocaleString()} due at arrival`
                : `${date} at ${time}`,
            },
            unit_amount: depositCents,
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Service fee' },
            unit_amount: feeCents,
            tax_behavior: 'exclusive' as const,
          },
          quantity: 1,
        },
      ],
      automatic_tax: { enabled: true },
      metadata: {
        fullName,
        phone: String(phone ?? ''),
        email,
        service,
        serviceName,
        date,
        time,
        guests: String(guests ?? 1),
        hours: String(hours ?? 1),
        quantity: String(quantity ?? 1),
        riderType: String(riderType ?? ''),
        notes: notes ? String(notes).slice(0, 490) : '',
        deposit: String(depositAmount),
        totalPrice: String(fullTotal),
      },
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book`,
    }

    const session = await stripe.checkout.sessions.create(sessionParams)
    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
