import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  // Admin-only
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  if (!authCookie || authCookie.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 })

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

  try {
    const body = await req.json().catch(() => ({}))
    let accountId: string = body.accountId ?? process.env.STRIPE_DION_ACCOUNT_ID ?? ''

    // Create a new Express account if no ID provided
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'US',
        email: 'diondixon100@gmail.com',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          name: 'Miami Lifestyle Watersports',
          url: 'https://www.miamilifestylewatersports.com',
          mcc: '7999', // recreation services
        },
      })
      accountId = account.id
    }

    // Generate onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${baseUrl}/admin`,
      return_url: `${baseUrl}/admin`,
      type: 'account_onboarding',
    })

    return NextResponse.json({
      accountId,
      onboardingUrl: accountLink.url,
      message: `Save accountId as STRIPE_DION_ACCOUNT_ID env var, then send Dion the onboardingUrl.`,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Stripe Connect error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
