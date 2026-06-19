import Link from "next/link";
import { services } from "@/lib/services";

const categoryLabels = {
  "jet-ski": "Jet Ski",
  "water-sport": "Water Sport",
  tour: "Tour",
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="waves"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 40 Q20 20 40 40 Q60 60 80 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-sky-100 mb-6">
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
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              Miami, Florida
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Ride the Waves.
              <br />
              <span className="text-sky-200">Make Memories.</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-sky-100 max-w-xl leading-relaxed">
              Premium jet ski rentals, parasailing, and watersport adventures.
              Book your next thrill online in seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-sky-700 shadow-lg hover:bg-sky-50 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Your Adventure
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                View Activities
              </a>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                value: "10K+",
                label: "Happy Riders",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                ),
              },
              {
                value: "4.9",
                label: "Star Rating",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                  </svg>
                ),
              },
              {
                value: "8+",
                label: "Activities",
                icon: (
                  <svg
                    className="w-6 h-6"
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
              },
              {
                value: "100%",
                label: "Safety Record",
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                ),
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-50 text-sky-600 mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Our Activities
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              From heart-pumping jet ski rides to serene sunset cruises, find
              your perfect water adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image placeholder with gradient */}
                <div className="relative h-48 bg-gradient-to-br from-sky-400 to-blue-600 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-sky-700">
                      {categoryLabels[service.category]}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-slate-700">
                      {service.duration} min
                    </span>
                  </div>
                  {/* Wave pattern */}
                  <svg
                    className="absolute bottom-0 w-full opacity-20"
                    viewBox="0 0 400 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 20 Q50 0 100 20 Q150 40 200 20 Q250 0 300 20 Q350 40 400 20 V40 H0Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-slate-900">
                        {service.priceDisplay}
                      </span>
                      <span className="text-sm text-slate-400 ml-1">
                        /person
                      </span>
                    </div>
                    <Link
                      href={`/book?service=${service.id}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3.5 py-2 text-sm font-medium text-sky-700 hover:bg-sky-100 transition-colors"
                    >
                      Book
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / How It Works */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Booking your adventure is quick and easy. Be on the water in no
              time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Choose Your Activity",
                description:
                  "Browse our selection of watersports and pick the adventure that excites you most.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                    />
                  </svg>
                ),
              },
              {
                step: "2",
                title: "Pick a Date & Time",
                description:
                  "Select your preferred date and available time slot from our real-time calendar.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                ),
              },
              {
                step: "3",
                title: "Book & Pay Securely",
                description:
                  "Complete your booking with secure Stripe payment. Instant confirmation guaranteed.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white mb-5 shadow-lg shadow-sky-500/25">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-sky-700 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Booking Now
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-sky-600 to-blue-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready for an Unforgettable Day on the Water?
          </h2>
          <p className="mt-4 text-lg text-sky-100 max-w-xl mx-auto">
            Spots fill up fast during peak season. Secure your booking today and
            get ready for the ride of your life.
          </p>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-sky-700 shadow-lg hover:bg-sky-50 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Book Your Adventure
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
