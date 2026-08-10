import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const ALL_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
]

function toMin(time: string): number {
  const [t, mer] = time.split(' ')
  let [h, m] = t.split(':').map(Number)
  if (mer === 'PM' && h !== 12) h += 12
  if (mer === 'AM' && h === 12) h = 0
  return h * 60 + m
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')
  const type = searchParams.get('type')       // 'jet-ski' | 'jet-car' | 'yacht'
  const yachtId = searchParams.get('yachtId') // only when type === 'yacht'

  if (!date || !type) return NextResponse.json({ unavailable: [] })

  let query = supabaseAdmin
    .from('bookings')
    .select('start_time, hours, experience_type, service_id')
    .eq('booking_date', date)
    .in('status', ['pending', 'confirmed'])

  if (type === 'yacht' && yachtId) {
    // Block only if the exact same yacht is already booked
    query = query.eq('service_id', yachtId)
  } else {
    query = query.eq('experience_type', type)
  }

  const { data: existing } = await query
  if (!existing?.length) return NextResponse.json({ unavailable: [] })

  const unavailable: string[] = []
  for (const slot of ALL_SLOTS) {
    const slotMin = toMin(slot)
    for (const b of existing) {
      // Each booking blocks: [start, start + hours + 1hr buffer)
      const start = toMin(b.start_time)
      const end = start + b.hours * 60 + 60
      if (slotMin >= start && slotMin < end) {
        unavailable.push(slot)
        break
      }
    }
  }

  return NextResponse.json({ unavailable })
}
