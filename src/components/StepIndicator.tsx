"use client";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="mb-8">
      <ol className="flex items-center justify-center gap-2 sm:gap-0">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <li key={step.number} className="flex items-center">
              <div className="flex items-center gap-2">
                {/* Step circle */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? "bg-sky-600 text-white"
                      : isActive
                        ? "bg-sky-600 text-white ring-4 ring-sky-100"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
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
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step title - hidden on mobile */}
                <span
                  className={`hidden sm:inline text-sm font-medium ${
                    isActive
                      ? "text-sky-600"
                      : isCompleted
                        ? "text-slate-700"
                        : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-12 h-0.5 mx-1 sm:mx-3 ${
                    isCompleted ? "bg-sky-600" : "bg-slate-200"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
