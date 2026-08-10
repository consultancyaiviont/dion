import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const { amountDollars } = await req.json()
  if (!amountDollars) return NextResponse.json({ error: 'amount required' }, { status: 400 })

  try {
    const payout = await stripe.payouts.create({
      amount: Math.round(parseFloat(amountDollars) * 100),
      currency: 'usd',
    })
    return NextResponse.json({ ok: true, payout })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
