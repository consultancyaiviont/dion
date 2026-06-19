"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { isDateAvailable } from "@/lib/time-slots";

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  return (
    <div className="rdp-wrapper">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={(date) => !isDateAvailable(date)}
        startMonth={today}
        endMonth={maxDate}
        classNames={{
          root: "rdp-custom",
          day: "rdp-day-custom",
        }}
      />
      <style jsx global>{`
        .rdp-custom {
          --rdp-accent-color: #0284c7;
          --rdp-accent-background-color: #e0f2fe;
          margin: 0;
        }
        .rdp-custom .rdp-months {
          justify-content: center;
        }
        .rdp-custom .rdp-month_caption {
          font-weight: 600;
          color: #1e293b;
        }
        .rdp-custom .rdp-weekday {
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .rdp-custom .rdp-day button {
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        .rdp-custom .rdp-selected .rdp-day_button {
          background-color: #0284c7;
          color: white;
          font-weight: 600;
        }
        .rdp-custom .rdp-today:not(.rdp-selected) .rdp-day_button {
          color: #0284c7;
          font-weight: 700;
        }
        .rdp-custom .rdp-disabled .rdp-day_button {
          color: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
