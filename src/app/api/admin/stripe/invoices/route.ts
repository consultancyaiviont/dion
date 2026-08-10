import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

// Stripe processing (2.9% + $0.30) + Stripe Tax service (0.5%) = 3.4% + $0.30
const STRIPE_RATE = 0.034
const STRIPE_FLAT = 0.30

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const { name, email, amountDollars, description } = await req.json()
  if (!name || !email || !amountDollars) {
    return NextResponse.json({ error: 'name, email, and amount are required' }, { status: 400 })
  }

  try {
    const base = parseFloat(amountDollars)
    // Gross up so Dion nets the full base after Stripe takes its cut
    const processingFee = Math.round((base * STRIPE_RATE + STRIPE_FLAT) * 100)

    const existing = await stripe.customers.list({ email, limit: 1 })
    const customer = existing.data[0] ?? await stripe.customers.create({ name, email })

    // Base service amount
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: Math.round(base * 100),
      currency: 'usd',
      description,
    })

    // Processing fee line item (customer covers Stripe fees)
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: processingFee,
      currency: 'usd',
      description: 'Processing fee',
    })

    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 7,
      automatic_tax: { enabled: true },
    })

    const finalized = await stripe.invoices.finalizeInvoice(invoice.id)
    await stripe.invoices.sendInvoice(finalized.id)

    return NextResponse.json({ ok: true, invoiceUrl: finalized.hosted_invoice_url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
