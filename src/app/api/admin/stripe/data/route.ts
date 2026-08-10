import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

export async function GET() {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ configured: false })

  try {
    const [balance, payouts, invoices] = await Promise.all([
      stripe.balance.retrieve(),
      stripe.payouts.list({ limit: 8 }),
      stripe.invoices.list({ limit: 20, expand: ['data.customer'] }),
    ])
    return NextResponse.json({ configured: true, balance, payouts: payouts.data, invoices: invoices.data })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ configured: true, error: msg }, { status: 500 })
  }
}
