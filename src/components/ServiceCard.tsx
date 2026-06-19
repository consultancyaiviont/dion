"use client";

import { Service } from "@/lib/services";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: (service: Service) => void;
}

const categoryIcons: Record<Service["category"], React.ReactNode> = {
  "jet-ski": (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
      />
    </svg>
  ),
  "water-sport": (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  ),
  tour: (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ),
};

const categoryLabels: Record<Service["category"], string> = {
  "jet-ski": "Jet Ski",
  "water-sport": "Water Sport",
  tour: "Tour",
};

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={`w-full text-left rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-md ${
        selected
          ? "border-sky-500 bg-sky-50 shadow-md ring-1 ring-sky-500"
          : "border-slate-200 bg-white hover:border-sky-300"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                selected
                  ? "bg-sky-100 text-sky-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {categoryIcons[service.category]}
              {categoryLabels[service.category]}
            </span>
            <span className="text-xs text-slate-400">
              {service.duration} min
            </span>
          </div>

          {/* Name */}
          <h3
            className={`text-base font-semibold mb-1.5 ${
              selected ? "text-sky-900" : "text-slate-900"
            }`}
          >
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {service.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              Up to {service.maxGuests} guests
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col items-end shrink-0">
          <span
            className={`text-xl font-bold ${
              selected ? "text-sky-600" : "text-slate-900"
            }`}
          >
            {service.priceDisplay}
          </span>
          <span className="text-xs text-slate-400">per person</span>
          {selected && (
            <div className="mt-3 flex items-center justify-center w-6 h-6 rounded-full bg-sky-500">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
