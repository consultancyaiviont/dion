import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

const DION_ACCOUNT_ID = 'acct_1TluKW3m9o4aR2Ss'

export async function GET(req: NextRequest) {
  const stripe = getStripe()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://miamilifestylewatersports.com'

  if (!stripe) {
    return new NextResponse('Stripe not configured', { status: 503 })
  }

  try {
    const link = await stripe.accountLinks.create({
      account: DION_ACCOUNT_ID,
      refresh_url: `${baseUrl}/api/connect/start`,
      return_url: `${baseUrl}/api/connect/done`,
      type: 'account_onboarding',
    })
    return NextResponse.redirect(link.url)
  } catch (err) {
    console.error('[connect/start]', err)
    return new NextResponse('Failed to generate onboarding link', { status: 500 })
  }
}
