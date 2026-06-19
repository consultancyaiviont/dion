"use client";

import { Service } from "@/lib/services";
import { TimeSlot } from "@/lib/time-slots";
import { BookingFormData } from "@/lib/validation";
import { format } from "date-fns";

interface BookingSummaryProps {
  service: Service;
  date: Date;
  timeSlot: TimeSlot;
  formData: BookingFormData;
}

export default function BookingSummary({
  service,
  date,
  timeSlot,
  formData,
}: BookingSummaryProps) {
  const totalPrice = (service.price * formData.guests) / 100;

  return (
    <div className="bg-gradient-to-br from-slate-50 to-sky-50 rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Booking Summary
      </h3>

      <div className="space-y-3">
        {/* Activity */}
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-700">Activity</p>
            <p className="text-sm text-slate-500">{service.name}</p>
          </div>
          <p className="text-sm font-medium text-slate-900">
            {service.priceDisplay}
          </p>
        </div>

        <div className="border-t border-slate-200" />

        {/* Date & Time */}
        <div>
          <p className="text-sm font-medium text-slate-700">Date & Time</p>
          <p className="text-sm text-slate-500">
            {format(date, "EEEE, MMMM d, yyyy")} at {timeSlot.display}
          </p>
        </div>

        <div className="border-t border-slate-200" />

        {/* Duration */}
        <div className="flex justify-between">
          <p className="text-sm font-medium text-slate-700">Duration</p>
          <p className="text-sm text-slate-500">{service.duration} minutes</p>
        </div>

        <div className="border-t border-slate-200" />

        {/* Guest */}
        <div>
          <p className="text-sm font-medium text-slate-700">Guest</p>
          <p className="text-sm text-slate-500">
            {formData.firstName} {formData.lastName}
          </p>
          <p className="text-sm text-slate-500">{formData.email}</p>
          <p className="text-sm text-slate-500">{formData.phone}</p>
        </div>

        <div className="border-t border-slate-200" />

        {/* Guests count */}
        <div className="flex justify-between">
          <p className="text-sm font-medium text-slate-700">Guests</p>
          <p className="text-sm text-slate-500">
            {formData.guests} {formData.guests === 1 ? "person" : "people"}
          </p>
        </div>

        {formData.specialRequests && (
          <>
            <div className="border-t border-slate-200" />
            <div>
              <p className="text-sm font-medium text-slate-700">
                Special Requests
              </p>
              <p className="text-sm text-slate-500">
                {formData.specialRequests}
              </p>
            </div>
          </>
        )}

        {/* Total */}
        <div className="border-t-2 border-slate-300 pt-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base font-semibold text-slate-900">Total</p>
              <p className="text-xs text-slate-400">
                {service.priceDisplay} x {formData.guests}{" "}
                {formData.guests === 1 ? "guest" : "guests"}
              </p>
            </div>
            <p className="text-2xl font-bold text-sky-600">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
