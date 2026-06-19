"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { services, Service } from "@/lib/services";
import { generateTimeSlots, TimeSlot } from "@/lib/time-slots";
import {
  BookingFormData,
  ValidationErrors,
  validateBookingForm,
  hasErrors,
} from "@/lib/validation";
import ServiceCard from "@/components/ServiceCard";
import DatePicker from "@/components/DatePicker";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingForm from "@/components/BookingForm";
import BookingSummary from "@/components/BookingSummary";
import StepIndicator from "@/components/StepIndicator";

const STEPS = [
  { number: 1, title: "Activity" },
  { number: 2, title: "Date & Time" },
  { number: 3, title: "Details" },
  { number: 4, title: "Payment" },
];

function BookingPageContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service");

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    TimeSlot | undefined
  >(undefined);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Pre-select service from URL param
  useEffect(() => {
    if (preselectedService) {
      const service = services.find((s) => s.id === preselectedService);
      if (service) {
        setSelectedService(service);
        setCurrentStep(2);
      }
    }
  }, [preselectedService]);

  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots(selectedDate);
      setTimeSlots(slots);
      setSelectedTimeSlot(undefined);
    }
  }, [selectedDate]);

  const handleServiceSelect = useCallback((service: Service) => {
    setSelectedService(service);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep === 3) {
      // Validate form before proceeding
      const errors = validateBookingForm(
        formData,
        selectedService?.maxGuests || 1
      );
      setFormErrors(errors);
      if (hasErrors(errors)) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, [currentStep, formData, selectedService?.maxGuests]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setPaymentError(null);
  }, []);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return !!selectedService;
      case 2:
        return !!selectedDate && !!selectedTimeSlot;
      case 3:
        return true; // Validated on click
      case 4:
        return true;
      default:
        return false;
    }
  }, [currentStep, selectedService, selectedDate, selectedTimeSlot]);

  const handleCheckout = useCallback(async () => {
    if (!selectedService || !selectedDate || !selectedTimeSlot) return;

    setIsLoading(true);
    setPaymentError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          serviceName: selectedService.name,
          price: selectedService.price,
          guests: formData.guests,
          date: selectedDate.toISOString(),
          timeSlot: selectedTimeSlot.display,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      setPaymentError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedService, selectedDate, selectedTimeSlot, formData]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Book Your Experience
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Complete the steps below to reserve your adventure
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Choose an Activity
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Select the watersport experience you&apos;d like to book
              </p>

              <div className="space-y-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={selectedService?.id === service.id}
                    onSelect={handleServiceSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Pick a Date & Time
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Select your preferred date and available time slot
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Select Date
                  </h3>
                  <div className="flex justify-center lg:justify-start">
                    <DatePicker
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                    />
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Select Time
                  </h3>
                  {selectedDate ? (
                    <TimeSlotPicker
                      slots={timeSlots}
                      selected={selectedTimeSlot}
                      onSelect={setSelectedTimeSlot}
                    />
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-3 text-slate-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                      <p className="text-sm">
                        Select a date to see available times
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Customer Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">
                Your Details
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Tell us about yourself and your group
              </p>

              <BookingForm
                data={formData}
                errors={formErrors}
                maxGuests={selectedService?.maxGuests || 1}
                onChange={setFormData}
              />
            </div>
          )}

          {/* Step 4: Review & Pay */}
          {currentStep === 4 &&
            selectedService &&
            selectedDate &&
            selectedTimeSlot && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-1">
                  Review & Pay
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Review your booking details and complete payment
                </p>

                <BookingSummary
                  service={selectedService}
                  date={selectedDate}
                  timeSlot={selectedTimeSlot}
                  formData={formData}
                />

                {paymentError && (
                  <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          Payment Error
                        </p>
                        <p className="text-sm text-red-600 mt-0.5">
                          {paymentError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full rounded-xl bg-sky-600 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-sky-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
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
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        Pay Securely with Stripe
                      </>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center mt-3">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout
                    to complete your payment
                  </p>
                </div>
              </div>
            )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                currentStep === 1
                  ? "text-slate-300 cursor-not-allowed"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? "Review Booking" : "Continue"}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex justify-start mt-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="animate-spin w-8 h-8 text-sky-600 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-slate-500">Loading booking...</p>
          </div>
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
