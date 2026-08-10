import Stripe from 'stripe'
import { Resend } from 'resend'
import { supabaseAdmin, getExperienceType, isSupabaseConfigured } from '@/lib/supabase'

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

function buildCustomerHtml(meta: Record<string, string>, amountPaid: number) {
  const deposit = parseFloat(meta.deposit ?? '0')
  const totalPrice = parseFloat(meta.totalPrice ?? '0')
  const balanceOwed = Math.max(0, totalPrice - deposit)
  const isJet = meta.service === 'jet-ski' || meta.service === 'jet-car'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're Booked! — Miami Lifestyle Watersports</title>
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
          Hey <strong style="color: #FFFFFF;">${meta.fullName}</strong> — your deposit is paid and your spot is locked in. See you on the water!
        </p>

        <p class="section-title">Booking Summary</p>
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${meta.serviceName ?? meta.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${meta.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${meta.time}</span>
        </div>
        ${meta.hours && meta.hours !== '1' ? `<div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">${meta.hours} hours</span>
        </div>` : meta.hours === '1' ? `<div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">1 hour</span>
        </div>` : ''}
        ${meta.quantity && parseInt(meta.quantity) > 1 ? `<div class="detail-row">
          <span class="detail-label">Quantity</span>
          <span class="detail-value">${meta.quantity} × ${meta.serviceName ?? meta.service}</span>
        </div>` : ''}
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${meta.guests}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Deposit Paid</span>
          <span class="detail-value" style="color: #00E5CC;">$${amountPaid.toFixed(2)}</span>
        </div>
        ${balanceOwed > 0 ? `<div class="detail-row">
          <span class="detail-label">Balance Due at Arrival</span>
          <span class="detail-value" style="color: #00BFFF;">$${balanceOwed.toLocaleString()}</span>
        </div>` : ''}
        ${meta.notes ? `<div class="detail-row">
          <span class="detail-label">Notes</span>
          <span class="detail-value" style="color: rgba(255,255,255,0.5);">${meta.notes}</span>
        </div>` : ''}

        <div class="highlight-box">
          <p>Please arrive <strong style="color: #00E5CC;">15 minutes early</strong> and bring a valid photo ID. ${isJet ? 'All riders will sign a waiver on-site — takes less than a minute.' : 'Our crew will be ready for you at the dock.'}</p>
        </div>

        <p class="section-title" style="margin-top: 28px;">Need Help?</p>
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

function buildNotificationHtml(meta: Record<string, string>, amountPaid: number) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deposit Received</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div style="${borderBar}"></div>
      <div class="header">
        <img src="https://miamilifestylewatersports.com/images/logo.png" alt="Miami Lifestyle Watersports" />
        <h1>Deposit Received</h1>
        <p>New Confirmed Booking</p>
      </div>
      <div class="body">
        <p class="section-title">Customer</p>
        <div class="detail-row">
          <span class="detail-label">Name</span>
          <span class="detail-value">${meta.fullName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email</span>
          <span class="detail-value">${meta.email}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone</span>
          <span class="detail-value">${meta.phone || '—'}</span>
        </div>

        <p class="section-title" style="margin-top: 28px;">Booking</p>
        <div class="detail-row">
          <span class="detail-label">Service</span>
          <span class="detail-value">${meta.serviceName ?? meta.service}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Date</span>
          <span class="detail-value">${meta.date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time</span>
          <span class="detail-value">${meta.time}</span>
        </div>
        ${meta.hours ? `<div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">${meta.hours} hour${parseInt(meta.hours) !== 1 ? 's' : ''}</span>
        </div>` : ''}
        ${meta.quantity && parseInt(meta.quantity) > 1 ? `<div class="detail-row">
          <span class="detail-label">Quantity</span>
          <span class="detail-value">${meta.quantity} × ${meta.serviceName ?? meta.service}</span>
        </div>` : ''}
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${meta.guests}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Deposit Collected</span>
          <span class="detail-value" style="color: #00E5CC;">$${amountPaid.toFixed(2)}</span>
        </div>
        ${meta.totalPrice && parseFloat(meta.totalPrice) > parseFloat(meta.deposit ?? '0') ? `<div class="detail-row">
          <span class="detail-label">Balance Due at Arrival</span>
          <span class="detail-value" style="color: #00BFFF;">$${(parseFloat(meta.totalPrice) - parseFloat(meta.deposit ?? '0')).toLocaleString()}</span>
        </div>` : ''}
        ${meta.notes ? `<div class="detail-row">
          <span class="detail-label">Customer Notes</span>
          <span class="detail-value" style="color: rgba(255,255,255,0.5);">${meta.notes}</span>
        </div>` : ''}
      </div>
      <div class="footer">
        <p>Miami Lifestyle Watersports &bull; Admin Notification</p>
      </div>
    </div>
  </div>
</body>
</html>`
}

/**
 * Writes the booking to Supabase and sends both emails. Called from two independent
 * triggers — the Stripe webhook (server-to-server, works even if the customer never
 * returns to the tab) and /api/verify-payment (fired by the browser landing on
 * /confirmation, works even if the webhook is misconfigured/undelivered). Whichever
 * fires first wins; the second is a no-op against the same paid session so a booking
 * is never lost to a single point of failure and never double-inserted/double-emailed.
 */
export async function fulfillBooking(session: Stripe.Checkout.Session): Promise<{ alreadyFulfilled: boolean }> {
  const meta = (session.metadata ?? {}) as Record<string, string>
  const amountPaid = (session.amount_total ?? 0) / 100

  if (!isSupabaseConfigured()) {
    return { alreadyFulfilled: false }
  }

  const { data: existing, error: lookupErr } = await supabaseAdmin
    .from('bookings')
    .select('id')
    .eq('email', meta.email)
    .eq('service_id', meta.service)
    .eq('booking_date', meta.date)
    .eq('start_time', meta.time)
    .limit(1)

  if (lookupErr) {
    console.error('[fulfillBooking] Supabase lookup error:', lookupErr)
  }

  if (existing && existing.length > 0) {
    return { alreadyFulfilled: true }
  }

  const { error: dbErr } = await supabaseAdmin.from('bookings').insert({
    full_name: meta.fullName,
    phone: meta.phone,
    email: meta.email,
    experience_type: getExperienceType(meta.service),
    service_id: meta.service,
    booking_date: meta.date,
    start_time: meta.time,
    hours: parseInt(meta.hours ?? '1'),
    quantity: parseInt(meta.quantity ?? '1'),
    rider_type: meta.riderType || null,
    guests: parseInt(meta.guests ?? '1'),
    notes: meta.notes || null,
    status: 'pending',
    amount_paid: parseFloat(meta.deposit ?? '0') || null,
  })

  if (dbErr) {
    console.error('[fulfillBooking] Supabase insert error:', dbErr)
    return { alreadyFulfilled: false }
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await Promise.allSettled([
      resend.emails.send({
        from: 'Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>',
        to: meta.email,
        subject: "You're Booked! — Miami Lifestyle Watersports",
        html: buildCustomerHtml(meta, amountPaid),
      }),
      resend.emails.send({
        from: 'Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>',
        to: 'diondixon100@gmail.com',
        subject: `Deposit Received — ${meta.serviceName ?? meta.service} on ${meta.date}`,
        html: buildNotificationHtml(meta, amountPaid),
        replyTo: meta.email,
      }),
    ])
  }

  return { alreadyFulfilled: false }
}
