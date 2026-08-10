import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

const PLACEHOLDER = 'https://placeholder.supabase.co'

export const supabase = createClient(url || PLACEHOLDER, anon || 'placeholder')

export const supabaseAdmin = createClient(url || PLACEHOLDER, service || 'placeholder', {
  auth: { autoRefreshToken: false, persistSession: false },
})

export function isSupabaseConfigured() {
  return !!url && !!service
}

export type Booking = {
  id: string
  created_at: string
  full_name: string
  phone: string
  email: string
  experience_type: 'jet-ski' | 'jet-car' | 'yacht'
  service_id: string
  booking_date: string
  start_time: string
  hours: number
  quantity: number
  rider_type: 'single' | 'double' | null
  guests: number | null
  notes: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  amount_paid: number | null
}

export function getExperienceType(serviceId: string): 'jet-ski' | 'jet-car' | 'yacht' {
  if (serviceId === 'jet-ski') return 'jet-ski'
  if (serviceId === 'jet-car') return 'jet-car'
  return 'yacht'
}
