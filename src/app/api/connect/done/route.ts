import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://miamilifestylewatersports.com'
  return NextResponse.redirect(`${baseUrl}/connect-done`)
}
