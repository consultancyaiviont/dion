import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, getExperienceType } from '@/lib/supabase'

let resend: Resend | null = null
function getResend() {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY)
  return resend
}

interface BookingBody {
  fullName: string
  name?: string // legacy
  phone: string
  email: string
  service: string
  date: string
  time: string
  guests: string | number
  hours?: number
  quantity?: number
  riderType?: 'single' | 'double'
  notes?: string
  boatingAck?: boolean
  boatingLicenseAcknowledged?: boolean
}

const isJetSkiService = (service: string): boolean => {
  const lower = service.toLowerCase()
  return lower.includes('jet ski') || lower.includes('jet car')
}

const borderBar =
  'background: linear-gradient(90deg, #00E5CC, #00BFFF); height: 3px; width: 100%;'

const baseStyles = `
  body { margin: 0; padding: 0; background-color: #080E14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  .wrapper { background-color: #080E14; padding: 40px 16px; }
  .container { max-width: 600px; margin: 0 auto; background-color: #0D1520; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,229,204,0.12); }
  .header { background: linear-gradient(160deg, #0A1929 0%, #050D14 100%); padding: 36px 32px; text-align: center; border-bottom: 1px solid rgba(0,229,204,0.08); }
  .header img { height: 44px; width: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
  .header h1 { margin: 0 0 6px; color: #FFFFFF; font-size: 22px; font-weight: 800; letter-spacing: 0.3px; }
  .header p { margin: 0; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; }
  .body { padding: 32px; }
  .section-title { color: rgba(0,229,204,0.6); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 14px; }
  .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .detail-row:last-child { border-bottom: none; }
  .detail-label { color: rgba(255,255,255,0.4); font-size: 13px; }
  .detail-value { color: #00E5CC; font-size: 13px; font-weight: 600; text-align: right; max-width: 60%; }
  .highlight-box { background: rgba(0,229,204,0.05); border: 1px solid rgba(0,229,204,0.15); border-radius: 10px; padding: 20px; margin-top: 24px; }
  .highlight-box p { margin: 0; color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.7; }
  .warning-box { background: rgba(0,191,255,0.06); border: 1px solid rgba(0,191,255,0.2); border-radius: 10px; padding: 20px; margin-top: 16px; }
  .warning-box p { margin: 0; color: rgba(255,255,255,0.65); font-size: 13px; line-height: 1.7; }
  .warning-box strong { color: #00BFFF; }
  .footer { padding: 24px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; }
  .footer p { margin: 0; color: rgba(255,255,255,0.2); font-size: 12px; line-height: 1.7; }
`

function buildNotificationHtml(data: BookingBody): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Booking</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div style="${borderBar}"></div>
      <div class="header">
        <img src="https://miamilifestylewatersports.com/images/logo.png" alt="Miami Lifestyle Watersports" />
        <h1>New Booking</h1>
        <p>Admin Notification</p>
      </div>
      <div class="body">
        <p class="section-title">Customer</p>
        <div class="detail-row">
          <span class="detail-label">Name</span>
          <span class="detail-value">${data.name}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${data.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone</span>
          <span class="detail-value">${data.phone}</span>
        </div>

        <p class="section-title" style="margin-top: 28px;">Booking</p>
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${data.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${data.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${data.guests}</span>
        </div>
        ${
          data.notes
            ? `<div class="detail-row">
          <span class="detail-label">Notes</span>
          <span class="detail-value">${data.notes}</span>
        </div>`
            : ''
        }
        ${
          isJetSkiService(data.service)
            ? `<div class="detail-row">
          <span class="detail-label">License Acknowledged</span>
          <span class="detail-value" style="color: ${data.boatingLicenseAcknowledged ? '#00E5CC' : '#00BFFF'};">${data.boatingLicenseAcknowledged ? 'Yes' : 'No'}</span>
        </div>`
            : ''
        }

        <div class="highlight-box" style="margin-top: 28px;">
          <p>Contact this customer to collect the deposit and confirm their spot — <strong style="color: #00E5CC;">${data.email}</strong> or <strong style="color: #00E5CC;">${data.phone}</strong>.</p>
        </div>
      </div>
      <div class="footer">
        <p>Miami Lifestyle Watersports &bull; 2400 Collins Ave, Miami Beach, FL 33140<br />(774) 823-4024 &bull; Mon–Sun 10am–6pm</p>
      </div>
    </div>
  </div>
</body>
</html>`
}

function buildConfirmationHtml(data: BookingBody): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed — Miami Lifestyle Watersports</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div style="${borderBar}"></div>
      <div class="header">
        <img src="https://miamilifestylewatersports.com/images/logo.png" alt="Miami Lifestyle Watersports" />
        <h1>You're Booked!</h1>
        <p>Miami Lifestyle Watersports</p>
      </div>
      <div class="body">
        <p style="color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.75; margin: 0 0 28px;">
          Hey <strong style="color: #FFFFFF;">${data.name}</strong> — your spot is locked in. Here's a summary of your booking. We'll reach out shortly to collect your deposit and get everything finalized.
        </p>

        <p class="section-title">Booking Summary</p>
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${data.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${data.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${data.time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${data.guests}</span>
        </div>
        ${
          data.notes
            ? `<div class="detail-row">
          <span class="detail-label">Notes</span>
          <span class="detail-value">${data.notes}</span>
        </div>`
            : ''
        }

        <div class="highlight-box">
          <p>We'll be in touch within <strong style="color: #00E5CC;">24 hours</strong> to collect your deposit and lock in your spot. Keep an eye on your phone and inbox!</p>
        </div>

        ${
          isJetSkiService(data.service)
            ? `<div class="warning-box">
          <p><strong>Heads up — Waiver Required:</strong> All riders must sign a liability waiver on arrival before hitting the water. Our team will walk you through it on-site — takes less than a minute. Questions? Call <strong style="color: #00BFFF;">(774) 823-4024</strong>.</p>
        </div>`
            : ''
        }

        <p class="section-title" style="margin-top: 28px;">Contact &amp; Hours</p>
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; overflow: hidden;">
          <div class="detail-row" style="padding: 13px 16px;">
            <span class="detail-label">Phone</span>
            <span class="detail-value">(774) 823-4024</span>
          </div>
          <div class="detail-row" style="padding: 13px 16px;">
            <span class="detail-label">Hours</span>
            <span class="detail-value">Mon–Sun: 10am–6pm</span>
          </div>
          <div class="detail-row" style="padding: 13px 16px;">
            <span class="detail-label">Location</span>
            <span class="detail-value">2400 Collins Ave<br />Miami Beach, FL 33140</span>
          </div>
        </div>
      </div>
      <div class="footer">
        <p>Miami Lifestyle Watersports &bull; 2400 Collins Ave, Miami Beach, FL 33140<br />You're receiving this because you booked with Miami Lifestyle Watersports.</p>
      </div>
    </div>
  </div>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingBody = await req.json()

    // Support both fullName (new form) and name (legacy)
    const fullName = body.fullName || body.name || ''
    const { phone, email, service, date, time, guests } = body

    if (!fullName || !phone || !email || !service || !date || !time || !guests) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Jet ski rentals are 1 hour only — enforced server-side too, not just
    // the booking form's hour picker, so a direct API call can't request
    // a multi-hour jet ski slot.
    const isJetSki = getExperienceType(service) === 'jet-ski'
    if (isJetSki) body.hours = 1

    // Normalise body so email templates get `name`
    const normBody = { ...body, name: fullName, fullName }

    // Save to Supabase (non-blocking on email failure)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    if (supabaseUrl) {
      const { error: dbErr } = await supabaseAdmin.from('bookings').insert({
        full_name: fullName,
        phone,
        email,
        experience_type: getExperienceType(service),
        service_id: service,
        booking_date: date,
        start_time: time,
        hours: body.hours ?? 1,
        quantity: body.quantity ?? 1,
        rider_type: body.riderType ?? null,
        guests: guests ? Number(guests) : null,
        notes: body.notes ?? null,
        status: 'pending',
      })
      if (dbErr) console.error('[book/route] Supabase insert error:', dbErr)
    }

    const apiKey = process.env.RESEND_API_KEY
    const keyMissing =
      !apiKey || apiKey === '' || apiKey.startsWith('re_placeholder') || apiKey === 'your-api-key'

    if (keyMissing) {
      console.warn('[book/route] RESEND_API_KEY missing — skipping email send')
      return NextResponse.json({ success: true })
    }

    const notificationHtml = buildNotificationHtml(normBody)
    const confirmationHtml = buildConfirmationHtml(normBody)

    const [notificationResult, confirmationResult] = await Promise.all([
      getResend().emails.send({
        from: 'Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>',
        to: 'diondixon100@gmail.com',
        subject: `New Booking — ${service}`,
        html: notificationHtml,
        replyTo: email,
      }),
      getResend().emails.send({
        from: 'Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>',
        to: email,
        subject: 'Your Booking is Confirmed — Miami Lifestyle Watersports',
        html: confirmationHtml,
      }),
    ])

    if (notificationResult.error || confirmationResult.error) {
      const err = notificationResult.error ?? confirmationResult.error
      console.error('[book/route] Resend error:', err)
      return NextResponse.json(
        { success: false, error: err?.message ?? 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('[book/route] Unexpected error:', err)
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
