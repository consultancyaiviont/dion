# Dion Watersports - Booking Website

A production-ready booking website for a jet ski and watersports business, built with Next.js 16, TypeScript, Tailwind CSS, and Stripe.

## Features

- Multi-step booking flow (Activity > Date/Time > Details > Payment)
- 8 watersport activities with pricing
- Interactive calendar with date picker (react-day-picker)
- Time slot selection with availability
- Customer details form with validation
- Stripe Checkout integration for secure payments
- Booking confirmation page with payment verification
- Fully responsive design (mobile + desktop)
- Clean, modern UI with ocean/watersports theme

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Payments:** Stripe Checkout
- **Calendar:** react-day-picker
- **Date Utilities:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Stripe account (for payment processing)

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

4. Add your Stripe keys to `.env.local`:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
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
| `NEXT_PUBLIC_BASE_URL` | Base URL of the site | Yes |

## Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── create-checkout-session/  # Stripe session creation
│   │   └── verify-payment/           # Payment verification
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
    ├── services.ts                   # Service/activity data
    ├── stripe.ts                     # Stripe server config
    ├── time-slots.ts                 # Time slot generation
    └── validation.ts                 # Form validation
```

## License

Private - All rights reserved.
