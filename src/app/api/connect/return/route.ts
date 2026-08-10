import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe-server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const account = searchParams.get('account')
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://miamilifestylewatersports.com'

  if (!account) {
    return NextResponse.redirect(`${baseUrl}/admin`)
  }

  const stripe = getStripe()
  if (!stripe) {
    return NextResponse.redirect(`${baseUrl}/admin`)
  }

  try {
    const acct = await stripe.accounts.retrieve(account)
    const done = acct.details_submitted && acct.charges_enabled

    const url = new URL('/admin', baseUrl)
    url.searchParams.set('connect', done ? 'complete' : 'pending')
    url.searchParams.set('account', account)
    return NextResponse.redirect(url.toString())
  } catch {
    return NextResponse.redirect(`${baseUrl}/admin`)
  }
}
