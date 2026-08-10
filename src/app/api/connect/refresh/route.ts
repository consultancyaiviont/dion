import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const account = searchParams.get('account')

  if (!account) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://miamilifestylewatersports.com'

  try {
    const link = await stripe.accountLinks.create({
      account,
      refresh_url: `${baseUrl}/api/connect/refresh?account=${account}`,
      return_url: `${baseUrl}/api/connect/return?account=${account}`,
      type: 'account_onboarding',
    })
    return NextResponse.redirect(link.url)
  } catch {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
}
