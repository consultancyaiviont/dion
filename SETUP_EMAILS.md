# Email Setup Guide

This guide will help you set up automated email notifications for bookings using Resend.

## What Gets Sent

When a customer completes a booking, two emails are automatically sent:

1. **Customer Confirmation Email** → Sent to the customer
   - Booking confirmation with details
   - Activity name, date, time
   - Number of guests and total paid
   - Location and directions
   - What to bring and arrival instructions
   - Contact information

2. **Business Notification Email** → Sent to diondixon100@gmail.com
   - New booking alert
   - Customer contact information
   - Booking details
   - Special requests (if any)

## Step-by-Step Setup

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click **Sign Up** (it's free!)
3. Verify your email address

### 2. Get Your API Key

1. In the Resend dashboard, click **API Keys** in the left sidebar
2. Click **Create API Key**
3. Give it a name like "Miami Lifestyle Watersports"
4. Copy the API key (starts with `re_`)

### 3. Add API Key to Vercel

1. Go to your Vercel project: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select the "dion" project
3. Click **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste your Resend API key (re_...)
   - **Environment:** Check all three (Production, Preview, Development)
5. Click **Save**

### 4. Set Up Email Domain (Optional but Recommended)

By default, emails will be sent from Resend's shared domain. To use your own domain:

1. In Resend dashboard, click **Domains**
2. Click **Add Domain**
3. Enter your domain name (e.g., `miamilifestylewatersports.com`)
4. Follow the DNS setup instructions (add the provided DNS records to your domain)
5. Wait for verification (usually takes a few minutes)
6. Once verified, update the `from` email in `/src/lib/emails.ts`:
   ```typescript
   from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>"
   ```

**For now:** You can use Resend's default domain - emails will work fine!

### 5. Set Up Stripe Webhook

For emails to be sent automatically when bookings are paid, you need to set up a Stripe webhook:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your webhook URL:
   ```
   https://dion-phi.vercel.app/api/webhooks/stripe
   ```
4. Click **Select events**
5. Search for and select: `checkout.session.completed`
6. Click **Add events** then **Add endpoint**
7. On the webhook details page, click **Reveal** under "Signing secret"
8. Copy the webhook secret (starts with `whsec_`)

### 6. Add Webhook Secret to Vercel

1. Go back to Vercel → Settings → Environment Variables
2. Add another variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Paste the webhook secret (whsec_...)
   - **Environment:** Check all three
3. Click **Save**

### 7. Redeploy the Site

1. In Vercel, go to **Deployments**
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

## Testing

### Test the Email Flow:

1. Go to your live site: https://dion-phi.vercel.app
2. Click **Book Now**
3. Select an activity
4. Choose a date and time
5. Fill in your details (use your own email for testing)
6. Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
7. Complete the booking

**You should receive:**
- Customer confirmation email (to the email you entered)
- Business notification email (to diondixon100@gmail.com)

**If emails don't arrive:**
- Check your spam/junk folder
- Check Resend dashboard → Logs to see if emails were sent
- Check Vercel deployment logs for any errors
- Make sure webhook is receiving events (check Stripe Dashboard → Webhooks → Event logs)

## Free Tier Limits

Resend free tier includes:
- **3,000 emails per month**
- **100 emails per day**
- Perfect for a growing business!

With 2 emails per booking (customer + business), you can handle:
- **50 bookings per day** or
- **1,500 bookings per month**

If you grow beyond this, Resend has affordable paid plans.

## Troubleshooting

### Emails not sending?

1. **Check Resend API Key:** Make sure it's correct in Vercel environment variables
2. **Check Webhook Secret:** Verify the Stripe webhook secret is correct
3. **Check Logs:**
   - Vercel: Go to Deployments → Functions → /api/webhooks/stripe
   - Resend: Dashboard → Logs
   - Stripe: Dashboard → Webhooks → [Your endpoint] → Events
4. **Verify Webhook URL:** Should be `https://dion-phi.vercel.app/api/webhooks/stripe`

### Emails going to spam?

- This can happen with shared domains
- Setting up your own domain (Step 4) helps significantly
- Add SPF and DKIM records as shown in Resend dashboard

### Want to customize emails?

Edit the email templates in `/src/lib/emails.ts`:
- `getCustomerEmailHTML()` - Customer confirmation template
- `getBusinessEmailHTML()` - Business notification template

## Need Help?

- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Stripe Webhooks: [stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
- Contact: diondixon100@gmail.com

---

**Once setup is complete, bookings will automatically trigger emails - no manual work needed!** 🎉
