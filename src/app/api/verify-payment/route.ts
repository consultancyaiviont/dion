import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'
import { fulfillBooking } from '@/lib/booking-fulfillment'

export async function GET(req: NextRequest) {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 })

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 402 })
    }

    // Backstop: the Stripe webhook is the primary path that saves the booking to
    // Supabase and sends emails, but if it never fires (endpoint misconfigured,
    // secret mismatch, delivery failure) the booking would otherwise vanish even
    // though the customer paid. This call is idempotent against the webhook.
    await fulfillBooking(session)

    const meta = session.metadata ?? {}
    const amountTotal = session.amount_total ?? 0

    return NextResponse.json({
      booking: {
        id: session.id,
        serviceName: meta.serviceName ?? meta.service ?? 'Rental',
        date: meta.date ?? '',
        timeSlot: meta.time ?? '',
        customerName: meta.fullName ?? '',
        customerEmail: session.customer_email ?? meta.email ?? '',
        guests: parseInt(meta.guests ?? '1'),
        amountPaid: amountTotal / 100,
        deposit: parseFloat(meta.deposit ?? '0'),
        totalPrice: parseFloat(meta.totalPrice ?? '0'),
        notes: meta.notes ?? '',
      },
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
