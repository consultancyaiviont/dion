import Stripe from 'stripe'

export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    // Force native fetch — avoids SDK connection errors on Vercel serverless
    httpClient: Stripe.createFetchHttpClient(),
  })
}

export const isStripeConfigured = () => !!process.env.STRIPE_SECRET_KEY
