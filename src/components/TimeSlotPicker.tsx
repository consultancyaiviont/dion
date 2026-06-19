"use client";

import { TimeSlot } from "@/lib/time-slots";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selected: TimeSlot | undefined;
  onSelect: (slot: TimeSlot) => void;
}

export default function TimeSlotPicker({
  slots,
  selected,
  onSelect,
}: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        <p>No available time slots for this date.</p>
        <p className="text-sm mt-1">Please select a different date.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
      {slots.map((slot) => (
        <button
          key={slot.id}
          type="button"
          disabled={!slot.available}
          onClick={() => slot.available && onSelect(slot)}
          className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            selected?.id === slot.id
              ? "bg-sky-600 text-white shadow-sm ring-2 ring-sky-600 ring-offset-1"
              : slot.available
                ? "bg-white border border-slate-200 text-slate-700 hover:border-sky-400 hover:text-sky-600"
                : "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {slot.display}
        </button>
      ))}
    </div>
  );
}
