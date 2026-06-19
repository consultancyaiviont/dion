export interface TimeSlot {
  id: string;
  time: string;
  display: string;
  available: boolean;
}

export function generateTimeSlots(date: Date): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();

  // Operating hours: 8 AM to 6 PM
  for (let hour = 8; hour < 18; hour++) {
    for (const minute of [0, 30]) {
      // Skip past time slots if the date is today
      if (isToday && (hour < currentHour || (hour === currentHour && minute <= currentMinute))) {
        continue;
      }

      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayMinute = minute.toString().padStart(2, "0");

      // Simulate some slots being unavailable (for demo purposes, use deterministic logic)
      const dayOfWeek = date.getDay();
      const slotSeed = (hour * 60 + minute + dayOfWeek * 100) % 7;
      const available = slotSeed !== 0;

      slots.push({
        id: `${date.toISOString().split("T")[0]}-${timeString}`,
        time: timeString,
        display: `${displayHour}:${displayMinute} ${ampm}`,
        available,
      });
    }
  }

  return slots;
}

export function isDateAvailable(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Cannot book in the past
  if (date < today) return false;

  // Cannot book more than 60 days ahead
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);
  if (date > maxDate) return false;

  return true;
}
