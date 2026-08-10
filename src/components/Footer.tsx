import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#030A10] relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00E5CC]/40 to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,_#00E5CC08_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-16 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14">

          {/* Brand col */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Miami Lifestyle Watersports"
                className="h-14 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,229,204,0.5)]"
              />
            </Link>

            <p className="text-white/25 text-sm leading-relaxed max-w-xs">
              Premium watersport rentals and luxury yacht charters on the waters of Miami, FL.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/miamilifestylewatersports/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 hover:border-[#00E5CC]/40 hover:bg-[#00E5CC]/5 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-white/40 group-hover:text-[#00E5CC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>
          </div>

          {/* Nav col */}
          <div className="md:col-span-2 md:col-start-6 flex flex-col gap-4">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.25em] font-bold">Explore</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Rentals", href: "/#services" },
                { label: "Fleet", href: "/#fleet" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
                { label: "Policies", href: "/cancellation-policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/40 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.25em] font-bold">Hours</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { day: "Mon – Sun", hours: "10am – 6pm" },
              ].map((h) => (
                <li key={h.day} className="flex flex-col gap-0.5">
                  <span className="text-white/20 text-[10px] uppercase tracking-wide">{h.day}</span>
                  <span className="text-sm font-semibold text-white/60">
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-white/15 text-[10px] italic">Weather permitting</p>
          </div>

          {/* Contact col */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.25em] font-bold">Contact</p>
            <div className="flex flex-col gap-4">
              <a href="tel:+17748234024" className="flex flex-col gap-0.5 group">
                <span className="text-white/20 text-[10px] uppercase tracking-wide">Phone</span>
                <span className="text-[#00E5CC] text-sm font-semibold group-hover:text-white transition-colors">(774) 823-4024</span>
              </a>
              <a
                href="https://maps.google.com/maps/place//data=!4m2!3m1!1s0x9c5d85536c8e6b3:0x1483b0b6bd16fd7b?entry=s&sa=X&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 group"
              >
                <span className="text-white/20 text-[10px] uppercase tracking-wide">Location</span>
                <span className="text-white/50 text-sm leading-snug group-hover:text-white transition-colors">
                  2400 Collins Ave<br />Miami Beach, FL 33140
                </span>
              </a>
              <div className="flex gap-2 pt-1">
                <a
                  href="tel:+17748234024"
                  className="flex-1 py-2.5 rounded-xl bg-[#00E5CC]/10 border border-[#00E5CC]/20 text-[#00E5CC] text-xs font-bold uppercase tracking-widest text-center hover:bg-[#00E5CC]/15 transition-all"
                >
                  Call
                </a>
                <a
                  href="sms:+17748234024"
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-widest text-center hover:bg-white/8 transition-all"
                >
                  Text
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">
            © 2025 Miami Lifestyle Watersports. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/cancellation-policy" className="text-white/15 hover:text-white/40 text-xs transition-colors">
              Cancellation Policy
            </Link>
            <Link href="/cancellation-policy" className="text-white/15 hover:text-white/40 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cancellation-policy" className="text-white/15 hover:text-white/40 text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
