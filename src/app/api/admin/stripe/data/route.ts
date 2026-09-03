import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

export async function GET() {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ configured: false })

  try {
    const [balance, payouts, invoices, charges, disputes] = await Promise.all([
      stripe.balance.retrieve(),
      stripe.payouts.list({ limit: 8 }),
      stripe.invoices.list({ limit: 20, expand: ['data.customer'] }),
      // Invoices alone miss any payment that didn't go through Stripe
      // Invoicing — a Payment Link checkout (the normal booking-payment
      // path) creates a Charge/PaymentIntent, never an Invoice, so it was
      // completely invisible in this dashboard. Found 2026-09-03: a real
      // $144.49 disputed payment never showed up here for exactly this
      // reason, even though it was clearly visible in Stripe's own app.
      stripe.charges.list({ limit: 25 }),
      // Disputes surfaced explicitly and separately — a charge only carries
      // a `disputed` boolean, not the actual status/evidence deadline, and
      // this needs to be the first thing anyone here notices.
      stripe.disputes.list({ limit: 10, expand: ['data.charge'] }),
    ])
    return NextResponse.json({
      configured: true,
      balance,
      payouts: payouts.data,
      invoices: invoices.data,
      charges: charges.data,
      disputes: disputes.data,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ configured: true, error: msg }, { status: 500 })
  }
}
