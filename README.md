# Miami Lifestyle Watersports - Booking Website

A production-ready booking website for Miami Lifestyle Watersports, built with Next.js 16, TypeScript, Tailwind CSS, Stripe, and Resend.

## Features

- Multi-step booking flow (Activity > Date/Time > Details > Payment)
- 8 watersport activities with pricing
- Interactive calendar with date picker (react-day-picker)
- Time slot selection with availability
- Customer details form with validation
- Stripe Checkout integration for secure payments
- Automated email confirmations to customers
- Real-time booking notifications to business owner
- Booking confirmation page with payment verification
- Fully responsive design (mobile + desktop)
- Clean, modern UI with ocean/watersports theme

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Payments:** Stripe Checkout
- **Email:** Resend
- **Calendar:** react-day-picker
- **Date Utilities:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Stripe account (for payment processing)
- A Resend account (for email notifications)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jadenyoung/dion.git
cd dion
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
RESEND_API_KEY=re_YOUR_RESEND_KEY
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Setting Up Stripe

1. Create an account at [stripe.com](https://stripe.com)
2. Go to **Developers > API Keys** in the Stripe Dashboard
3. Copy your **Publishable key** and **Secret key**
4. For testing, use the test mode keys (prefixed with `pk_test_` and `sk_test_`)
5. Add them to your `.env.local` file

### Test Card Numbers

Use these test card numbers in Stripe's checkout:

| Card Number | Description |
|---|---|
| `4242 4242 4242 4242` | Succeeds |
| `4000 0000 0000 3220` | Requires 3D Secure |
| `4000 0000 0000 9995` | Declined |

Use any future expiry date, any 3-digit CVC, and any billing ZIP.

## Setting Up Resend (Email Notifications)

1. Create a free account at [resend.com](https://resend.com)
2. Go to **API Keys** in the Resend dashboard
3. Click **Create API Key** and copy it
4. Add it to your `.env.local` file as `RESEND_API_KEY`
5. In Resend, go to **Domains** and add your domain (or use their onboarding domain for testing)
6. Update the `from` email in `src/lib/emails.ts` to match your verified domain

**Free Tier:** 3,000 emails/month, 100 emails/day - perfect for getting started!

### Email Types Sent

- **Customer Confirmation:** Sent to customer with booking details, location, and what to bring
- **Business Notification:** Sent to diondixon100@gmail.com with customer info and booking details

## Setting Up Stripe Webhooks

Webhooks enable automatic email sending when payments complete.

### For Local Development:

1. Install Stripe CLI: [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Run: `stripe login`
3. Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
4. Copy the webhook signing secret (starts with `whsec_`) to `.env.local`

### For Production (Vercel):

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your webhook URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy the signing secret and add to Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

## Booking Flow

1. **Select Activity** - Choose from 8 watersport experiences (jet ski, parasailing, tubing, kayak, banana boat, sunset tour, snorkel tour)
2. **Pick Date & Time** - Interactive calendar with real-time slot availability
3. **Enter Details** - Customer name, email, phone, number of guests, special requests
4. **Review & Pay** - Summary of booking with total, then secure Stripe Checkout

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable API key | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret API key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `RESEND_API_KEY` | Resend email API key | Yes |
| `NEXT_PUBLIC_BASE_URL` | Base URL of the site | Yes |

## Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (get this after setting up webhook endpoint)
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)
4. Deploy
5. Set up Stripe webhook pointing to `https://your-domain.vercel.app/api/webhooks/stripe`

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/  # Stripe session creation
│   │   ├── verify-payment/           # Payment verification
│   │   └── webhooks/
│   │       └── stripe/               # Stripe webhook handler
│   ├── book/                         # Multi-step booking page
│   ├── confirmation/                 # Post-payment confirmation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                      # Landing page
├── components/
│   ├── BookingForm.tsx               # Customer details form
│   ├── BookingSummary.tsx            # Booking review card
│   ├── DatePicker.tsx                # Calendar component
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ServiceCard.tsx               # Activity selection card
│   ├── StepIndicator.tsx             # Progress steps
│   └── TimeSlotPicker.tsx            # Time slot grid
└── lib/
    ├── emails.ts                     # Email templates and sending
    ├── services.ts                   # Service/activity data
    ├── stripe.ts                     # Stripe server config
    ├── time-slots.ts                 # Time slot generation
    └── validation.ts                 # Form validation
```

## License

Private - All rights reserved.
