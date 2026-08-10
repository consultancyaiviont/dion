import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email, phone } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: 'Miami Lifestyle Watersports <hello@miamilifestylewatersports.com>',
        to: 'diondixon100@gmail.com',
        subject: 'New Subscriber — Miami Lifestyle Watersports',
        html: `
          <div style="font-family:sans-serif;background:#0A0A0B;color:#fff;padding:32px;border-radius:12px;max-width:480px;margin:0 auto">
            <div style="background:linear-gradient(90deg,#FF1493,#00FFFF,#FF6B35);height:3px;border-radius:2px;margin-bottom:24px"></div>
            <h2 style="color:#00FFFF;margin:0 0 20px;font-size:18px">New Newsletter Subscriber</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="color:#6B6B80;font-size:13px;padding:8px 0;border-bottom:1px solid #1E1E24">Name</td><td style="color:#fff;font-size:13px;font-weight:600;text-align:right">${name || '—'}</td></tr>
              <tr><td style="color:#6B6B80;font-size:13px;padding:8px 0;border-bottom:1px solid #1E1E24">Email</td><td style="color:#00FFFF;font-size:13px;font-weight:600;text-align:right">${email}</td></tr>
              ${phone ? `<tr><td style="color:#6B6B80;font-size:13px;padding:8px 0">Phone (SMS)</td><td style="color:#FF6B35;font-size:13px;font-weight:600;text-align:right">${phone}</td></tr>` : ''}
            </table>
            <p style="color:#4A4A60;font-size:11px;margin-top:24px">Miami Lifestyle Watersports — subscriber notification</p>
          </div>
        `,
      })
    }
    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
