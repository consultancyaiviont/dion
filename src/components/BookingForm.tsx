"use client";

import { BookingFormData, ValidationErrors } from "@/lib/validation";

interface BookingFormProps {
  data: BookingFormData;
  errors: ValidationErrors;
  maxGuests: number;
  onChange: (data: BookingFormData) => void;
}

export default function BookingForm({
  data,
  errors,
  maxGuests,
  onChange,
}: BookingFormProps) {
  const updateField = (field: keyof BookingFormData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            value={data.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow ${
              errors.firstName ? "border-red-300 bg-red-50" : "border-slate-300"
            }`}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            value={data.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow ${
              errors.lastName ? "border-red-300 bg-red-50" : "border-slate-300"
            }`}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow ${
            errors.email ? "border-red-300 bg-red-50" : "border-slate-300"
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={data.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow ${
            errors.phone ? "border-red-300 bg-red-50" : "border-slate-300"
          }`}
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        )}
      </div>

      {/* Guests */}
      <div>
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Number of Guests <span className="text-red-500">*</span>
        </label>
        <select
          id="guests"
          value={data.guests}
          onChange={(e) => updateField("guests", parseInt(e.target.value))}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow bg-white ${
            errors.guests ? "border-red-300 bg-red-50" : "border-slate-300"
          }`}
        >
          {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {errors.guests && (
          <p className="mt-1 text-xs text-red-600">{errors.guests}</p>
        )}
      </div>

      {/* Special Requests */}
      <div>
        <label
          htmlFor="specialRequests"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Special Requests{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="specialRequests"
          value={data.specialRequests}
          onChange={(e) => updateField("specialRequests", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-shadow resize-none"
          placeholder="Any special requirements, celebrations, or accessibility needs..."
        />
      </div>
    </div>
  );
}
