export interface Service {
  id: string
  name: string
  description: string
  priceDisplay: string
  depositDisplay: string
  deposit: number // cents
  image: string
  maxGuests: number
  category: 'jet-ski' | 'jet-car' | 'yacht'
  hourly?: boolean
  durationNote?: string
  requiresBoatingLicense?: boolean
}

export const services: Service[] = [
  {
    id: 'jet-ski',
    name: 'Jet Ski Rental',
    description: 'Feel the rush of Miami waters on a premium jet ski. Our high-powered personal watercraft put the thrill of Biscayne Bay right at your fingertips. Perfect for first-timers and seasoned riders alike.',
    priceDisplay: '$140 / hr',
    depositDisplay: '$40 deposit',
    deposit: 4000,
    image: '/images/jetski-action.png',
    maxGuests: 2,
    category: 'jet-ski',
    hourly: true,
    durationNote: 'Hourly rental',
    requiresBoatingLicense: true,
  },
  {
    id: 'jet-car',
    name: 'Jet Car Rental',
    description: 'Experience the ultimate fusion of speed and luxury — the jet car is a one-of-a-kind water vehicle that turns heads and delivers an unforgettable Miami experience you can\'t find anywhere else.',
    priceDisplay: '$350 / hr',
    depositDisplay: '$100 deposit',
    deposit: 10000,
    image: '/images/jetcar-white.png',
    maxGuests: 2,
    category: 'jet-car',
    hourly: true,
    durationNote: 'Hourly rental',
    requiresBoatingLicense: true,
  },
  {
    id: 'yacht-uniesse',
    name: '80\' Uniesse — Foolish Pleasure',
    description: 'The iconic Foolish Pleasure is the crown jewel of Miami luxury. This stunning 80-foot Uniesse offers an unmatched private charter experience on Biscayne Bay with breathtaking skyline views and premium amenities.',
    priceDisplay: '$2,200 / 4 hrs',
    depositDisplay: 'Deposit required',
    deposit: 0,
    image: 'https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg',
    maxGuests: 13,
    category: 'yacht',
    durationNote: '4-hour charter',
  },
  {
    id: 'yacht-churri',
    name: 'Luxury Yacht — Churri',
    description: 'The Churri is the pinnacle of Miami yacht experience. A spectacular vessel designed to impress — ideal for private parties, corporate events, or a lavish day on the water with the people who matter most.',
    priceDisplay: '$3,700 / 4 hrs',
    depositDisplay: 'Deposit required',
    deposit: 0,
    image: 'https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-c5fd-73fe-9417-3ad8a8d3719f.jpeg',
    maxGuests: 13,
    category: 'yacht',
    durationNote: '4-hour charter',
  },
  {
    id: 'yacht-rayb50',
    name: 'Ray B 50',
    description: 'The Ray B 50 delivers a premium charter experience for those who want the luxury yacht lifestyle without compromise. Sleek lines, open deck, and Miami\'s stunning waters as your backdrop.',
    priceDisplay: '$1,200 / 4 hrs',
    depositDisplay: 'Deposit required',
    deposit: 0,
    image: 'https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-c1f2-7265-8eb4-e4488fa5fae1.jpeg',
    maxGuests: 13,
    category: 'yacht',
    durationNote: '4-hour charter',
  },
  {
    id: 'yacht-searay',
    name: 'Sea Ray',
    description: 'Classic American luxury on the water. The Sea Ray offers a refined charter experience perfect for intimate groups looking to explore Miami\'s coastline in style and comfort.',
    priceDisplay: '$1,500 / 4 hrs',
    depositDisplay: 'Deposit required',
    deposit: 0,
    image: 'https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-cce1-7336-983e-aa78dd7dd56d.jpeg',
    maxGuests: 13,
    category: 'yacht',
    durationNote: '4-hour charter',
  },
  {
    id: 'yacht-flybridge',
    name: 'Fly Bridge Navigator',
    description: 'The Fly Bridge Navigator is a stunning 55-foot charter vessel with an elevated fly bridge offering 360° panoramic views of Miami. Perfect for those who want a premium experience with an unforgettable vantage point.',
    priceDisplay: '$1,400 / 4 hrs',
    depositDisplay: 'Deposit required',
    deposit: 0,
    image: 'https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large/large-019c697c-c469-715c-8bc2-73f2e9550edd.jpeg',
    maxGuests: 13,
    category: 'yacht',
    durationNote: '4-hour charter',
  },
]

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return services.filter((s) => s.category === category)
}
