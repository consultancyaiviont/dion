import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Miami Lifestyle Watersports</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Premium watersports experiences on the water. From jet skis to
              sunset tours, we deliver unforgettable adventures for all skill
              levels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#services"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>123 Marina Boulevard</li>
              <li>Miami, FL 33139</li>
              <li className="pt-2">
                <a
                  href="tel:+13055551234"
                  className="hover:text-white transition-colors"
                >
                  (305) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@miamilifestylewatersports.com"
                  className="hover:text-white transition-colors"
                >
                  info@miamilifestylewatersports.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Miami Lifestyle Watersports. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Cancellation Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
