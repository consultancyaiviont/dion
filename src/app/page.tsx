import Link from "next/link";
import NewsletterPopup from "@/components/NewsletterPopup";
import HeroVideo from "@/components/HeroVideo";

const ARYEO_BASE =
  "https://cdn.aryeo.com/listings/2215-nw-14th-st-pier-a-miami-fl-33125-22234114/resized/large";

export default function HomePage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 1 — HERO
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video — desktop only; mobile shows static poster */}
        <HeroVideo
          src="/videos/hero.mp4"
          poster={`${ARYEO_BASE}/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg`}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050D14] via-transparent to-transparent" />

        {/* Teal glow center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00E5CC18_0%,_transparent_65%)]" />

        {/* Content — centered */}
        <div className="relative z-10 w-full max-w-2xl mx-auto px-6 text-center py-20">
          {/* Location badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-6 text-[10px] font-semibold text-cyan-300 uppercase tracking-[0.2em] border border-white/10 bg-white/5 backdrop-blur-xl">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Miami Beach, FL
          </div>

          {/* H1 */}
          <h1 className="font-black uppercase leading-[0.9] tracking-[0.04em] mb-4">
            <span className="block text-4xl sm:text-6xl md:text-7xl text-white drop-shadow-lg">
              RIDE THE WAVES.
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] via-[#00FFFF] to-[#00BFFF] drop-shadow-lg">
              LIVE THE LIFESTYLE.
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/50 tracking-widest text-[11px] uppercase mb-8">
            Jet Ski&nbsp;•&nbsp;Jet Car&nbsp;•&nbsp;Yacht Charters&nbsp;•&nbsp;Miami
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-bold uppercase tracking-[0.12em] text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_40px_-8px_#00E5CC] hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 text-sm"
            >
              BOOK NOW
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <div className="flex gap-3 w-full sm:w-auto">
              <a
                href="tel:7748234024"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold uppercase tracking-[0.1em] text-white border border-white/15 bg-white/8 backdrop-blur-xl hover:bg-white/12 hover:border-white/25 transition-all duration-200 text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                CALL
              </a>
              <a
                href="sms:7748234024"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold uppercase tracking-[0.1em] text-white border border-white/15 bg-white/8 backdrop-blur-xl hover:bg-white/12 hover:border-white/25 transition-all duration-200 text-xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                </svg>
                TEXT
              </a>
            </div>
          </div>

          {/* Trust strip */}
          <a
            href="https://www.google.com/search?q=miami+lifestyle+watersports#lrd=0x9c5d85536c8e6b3:0x1483b0b6bd16fd7b,1,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 group"
          >
            <span className="text-[#00E5CC] text-base tracking-wider">★★★★★</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#00E5CC]/80 font-semibold group-hover:text-[#00E5CC] transition-colors">
              4.9 · Google Reviews
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────────
          MARQUEE STRIP
      ───────────────────────────────────────────────────────────────────── */}
      <div className="bg-[#071624] border-y border-white/8 py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#071624] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#071624] to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-0 shrink-0">
              {[
                "Premium Equipment",
                "Fast Booking",
                "Miami Lifestyle Experience",
                "Concierge-Level Service",
              ].map((item) => (
                <div key={item} className="flex items-center gap-6 px-8">
                  <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
                    {item}
                  </span>
                  <span className="text-[#00E5CC] text-lg leading-none">✦</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION — VIDEO REEL
      ───────────────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#050D14] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00E5CC08_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00E5CC]/30" />
            <p className="text-[#00E5CC] text-[10px] font-bold uppercase tracking-[0.4em] shrink-0">See It In Action</p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00E5CC]/30" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: "/videos/jetski-1.mp4", label: "Jet Ski" },
              { src: "/videos/jetcar-1.mp4", label: "Jet Car" },
              { src: "/videos/jetcar-2.mp4", label: "Jet Car" },
              { src: "/videos/jetcar-3.mp4", label: "Jet Car" },
            ].map((v, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-black group" style={{ aspectRatio: "9/16" }}>
                <video
                  src={v.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E5CC]">{v.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-[#00E5CC] transition-colors duration-200"
            >
              View Full Gallery
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION — THE LIFESTYLE
      ───────────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#050D14] relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_at_center,_#00E5CC0A_0%,_transparent_65%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#00E5CC]/10 to-transparent" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#00E5CC]/10 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 relative z-10">

          {/* Top label row */}
          <div className="flex items-center gap-4 mb-16 md:mb-24">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#00E5CC]/30" />
            <p className="text-[#00E5CC] text-[10px] font-bold uppercase tracking-[0.4em] shrink-0">
              The Lifestyle
            </p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#00E5CC]/30" />
          </div>

          {/* Main headline — editorial large */}
          <div className="mb-12 md:mb-20">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.88] tracking-tighter text-white">
              Experience
            </h2>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.88] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] mt-2">
              Miami
            </h2>
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.88] tracking-tighter text-white/15 mt-2">
              Differently
            </h2>
          </div>

          {/* Copy + features row */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-end">
            <p className="text-white/40 text-base md:text-lg leading-relaxed">
              From open water rides to skyline views, Miami Lifestyle Watersports delivers
              memorable experiences designed around the city&apos;s vibrant waterfront lifestyle.
            </p>

            {/* Three features as clean horizontal list */}
            <div className="flex flex-col gap-0 divide-y divide-white/8">
              {[
                { num: "01", label: "Open Water", sub: "Biscayne Bay & beyond" },
                { num: "02", label: "Skyline Views", sub: "Miami's iconic backdrop" },
                { num: "03", label: "Pure Thrill", sub: "Unforgettable on the water" },
              ].map((f) => (
                <div key={f.num} className="flex items-center justify-between py-4 group">
                  <div className="flex items-center gap-5">
                    <span className="text-[#00E5CC]/30 text-xs font-black tabular-nums">{f.num}</span>
                    <span className="text-white font-black text-sm uppercase tracking-widest group-hover:text-[#00E5CC] transition-colors duration-200">{f.label}</span>
                  </div>
                  <span className="text-white/25 text-xs">{f.sub}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 3 — SERVICES
      ───────────────────────────────────────────────────────────────────── */}
      <section id="services" className="py-14 md:py-28 bg-[#050D14] relative overflow-hidden">
        {/* Background accent glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,_#00E5CC18_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_left,_#00FFFF12_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-4">
              WHAT WE OFFER
            </p>
            <h2 className="font-black uppercase tracking-[0.05em] leading-[0.95] text-3xl md:text-5xl text-white">
              OUR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#00FFFF]">
                EXPERIENCES
              </span>
            </h2>
          </div>

          {/* 3-card grid */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Jet Ski */}
            <div className="group rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_40px_-12px_#00FFFF] transition-all duration-300">
              {/* Top hairline accent */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent opacity-60" />

              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/jetski-action.png"
                  alt="Jet Ski Rental Miami"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-300 border border-cyan-400/30 bg-black/50 backdrop-blur-sm">
                    Jet Ski
                  </span>
                </div>
                {/* Deposit badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#00E5CC] border border-[#F0A022]/400/30 bg-black/50 backdrop-blur-sm">
                    $40 deposit
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-black uppercase tracking-[0.12em] text-white text-2xl mb-1">
                  JET SKI RENTAL
                </h3>
                <p className="text-3xl font-black text-[#00FFFF] mb-1">
                  $140<span className="text-lg font-semibold text-gray-400">/hr</span>
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-2 flex-1">
                  {["Up to 2 riders", "Hourly rental", "Safety briefing included"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* License required badge */}
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#F0A022]/400/20 bg-orange-400/5 px-4 py-2.5">
                  <svg className="w-4 h-4 text-[#00E5CC] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="text-xs text-[#00E5CC] font-semibold">Waiver signed at arrival</span>
                </div>

                <Link
                  href="/book?service=jet-ski"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold uppercase tracking-[0.12em] text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_30px_-8px_#00E5CC] hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 text-sm"
                >
                  Book Jet Ski
                </Link>
              </div>
            </div>

            {/* Jet Car */}
            <div className="group rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-[#F0A022]/400/30 hover:shadow-[0_0_40px_-12px_#00BFFF] transition-all duration-300">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00BFFF] to-transparent opacity-60" />

              <div className="relative h-44 overflow-hidden">
                <img
                  src="/images/jetcar-white.png"
                  alt="Jet Car Rental Miami"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#00E5CC] border border-[#F0A022]/400/30 bg-black/50 backdrop-blur-sm">
                    Jet Car
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-[#00E5CC] border border-[#F0A022]/400/30 bg-black/50 backdrop-blur-sm">
                    $80 deposit
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-black uppercase tracking-[0.12em] text-white text-2xl mb-1">
                  JET CAR RENTAL
                </h3>
                <p className="text-3xl font-black text-[#00BFFF] mb-1">
                  $350<span className="text-lg font-semibold text-gray-400">/hr</span>
                </p>

                <ul className="mt-4 space-y-2 flex-1">
                  {["Unique water vehicle", "Turns heads on Biscayne Bay", "Ultimate Miami flex"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00BFFF] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#F0A022]/400/20 bg-orange-400/5 px-4 py-2.5">
                  <svg className="w-4 h-4 text-[#00E5CC] flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <span className="text-xs text-[#00E5CC] font-semibold">Waiver signed at arrival</span>
                </div>

                <Link
                  href="/book?service=jet-car"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold uppercase tracking-[0.12em] text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_30px_-8px_#00E5CC] hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 text-sm"
                >
                  Book Jet Car
                </Link>
              </div>
            </div>

            {/* Yacht Charter */}
            <div className="group rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-[#00E5CC]/30 hover:shadow-[0_0_40px_-12px_#00E5CC] transition-all duration-300">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00E5CC] to-transparent opacity-60" />

              <div className="relative h-44 overflow-hidden">
                <img
                  src={`${ARYEO_BASE}/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg`}
                  alt="Yacht Charter Miami"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#00E5CC] border border-[#00E5CC]/30 bg-black/50 backdrop-blur-sm">
                    Yacht Charter
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-black uppercase tracking-[0.12em] text-white text-2xl mb-1">
                  YACHT CHARTER
                </h3>
                <p className="text-3xl font-black text-[#00E5CC] mb-1">
                  From $1,200<span className="text-lg font-semibold text-gray-400"> / 4hrs</span>
                </p>

                <ul className="mt-4 space-y-2 flex-1">
                  {["4 yachts available", "Captain included", "Up to 13 guests", "4-hour minimum"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5CC] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Spacer to align CTA */}
                <div className="mt-4 h-[42px]" />

                <Link
                  href="/book?service=yacht"
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-bold uppercase tracking-[0.12em] text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_30px_-8px_#00E5CC] hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 text-sm"
                >
                  Inquire for Charter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 4 — YACHT FLEET
      ───────────────────────────────────────────────────────────────────── */}
      <section id="fleet" className="py-14 md:py-28 bg-[#071624] relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,_#00FFFF0F_0%,_transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-4">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-4">
              LUXURY FLEET
            </p>
            <h2 className="font-black uppercase tracking-[0.05em] leading-[0.95] text-3xl md:text-5xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00E5CC]">
                THE FLEET
              </span>
            </h2>
          </div>
          <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto">
            4 luxury yachts for every occasion — all with captain included
          </p>

          {/* All-charters badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00FFFF]" />
              <span className="text-sm text-gray-300 tracking-[0.1em]">Captain Included</span>
              <span className="text-white/20 mx-1">•</span>
              <span className="text-sm text-gray-300 tracking-[0.1em]">BYOB</span>
              <span className="text-white/20 mx-1">•</span>
              <span className="text-sm text-gray-300 tracking-[0.1em]">Max 13 Guests</span>
            </div>
          </div>

          {/* Fleet grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              {
                name: "Foolish Pleasure",
                sub: "80' Uniesse",
                price: "$2,200 / 4hrs",
                img: `${ARYEO_BASE}/large-019c697c-cb38-7257-8039-cdd5a2ccbf45.jpeg`,
                id: "yacht-uniesse",
              },
              {
                name: "Churri",
                sub: "Luxury Yacht",
                price: "$3,700 / 4hrs",
                img: `${ARYEO_BASE}/large-019c697c-c5fd-73fe-9417-3ad8a8d3719f.jpeg`,
                id: "yacht-churri",
              },
              {
                name: "Ray B 50",
                sub: "50' Charter",
                price: "$1,200 / 4hrs",
                img: `${ARYEO_BASE}/large-019c697c-c1f2-7265-8eb4-e4488fa5fae1.jpeg`,
                id: "yacht-rayb50",
              },
              {
                name: "Sea Ray",
                sub: "Classic Luxury",
                price: "$1,500 / 4hrs",
                img: `${ARYEO_BASE}/large-019c697c-cce1-7336-983e-aa78dd7dd56d.jpeg`,
                id: "yacht-searay",
              },
              {
                name: "Fly Bridge Navigator",
                sub: "55' Charter",
                price: "$1,400 / 4hrs",
                img: `${ARYEO_BASE}/large-019c697c-c469-715c-8bc2-73f2e9550edd.jpeg`,
                id: "yacht-flybridge",
              },
            ].map((yacht) => (
              <div
                key={yacht.id}
                className="group rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-[#00E5CC]/30 hover:shadow-[0_0_30px_-10px_#00E5CC] transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={yacht.img}
                    alt={yacht.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#00FFFF] mb-1">{yacht.sub}</p>
                  <h3 className="font-black uppercase tracking-[0.08em] text-white text-lg mb-2">{yacht.name}</h3>
                  <p className="text-xl font-black text-[#00E5CC] mb-4 flex-1 tabular-nums">{yacht.price}</p>
                  <Link
                    href={`/book?service=${yacht.id}`}
                    className="w-full inline-flex items-center justify-center rounded-full px-4 py-3 font-bold uppercase tracking-[0.12em] text-white text-xs border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all duration-200"
                  >
                    Inquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 5 — HOURS & LOCATION
      ───────────────────────────────────────────────────────────────────── */}
      <section id="hours" className="py-14 md:py-28 bg-[#050D14] relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_bottom_right,_#00E5CC10_0%,_transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-4">FIND US</p>
            <h2 className="font-black uppercase tracking-[0.05em] leading-[0.95] text-3xl md:text-4xl text-white">
              HOURS &amp; LOCATION
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Hours table */}
            <div className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl p-5">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-6">
                Operating Hours
              </h3>
              <table className="w-full">
                <tbody className="divide-y divide-white/6">
                  {[
                    { day: "Monday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Tuesday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Wednesday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Thursday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Friday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Saturday", hours: "10:00 AM – 6:00 PM", open: true },
                    { day: "Sunday", hours: "10:00 AM – 6:00 PM", open: true },
                  ].map(({ day, hours, open }) => (
                    <tr key={day} className="py-3">
                      <td className="py-3 text-sm font-semibold text-white/80 uppercase tracking-[0.1em]">{day}</td>
                      <td className={`py-3 text-sm font-bold tabular-nums text-right ${open ? "text-white" : "text-gray-500"}`}>
                        {hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contact info */}
            <div className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-xl p-8 flex flex-col gap-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-6">
                  Contact &amp; Location
                </h3>

                {/* Address */}
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-5 h-5 text-[#00E5CC]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-1">Address</p>
                    <a
                      href="https://maps.google.com/?q=2400+Collins+Ave+Miami+Beach+FL+33140"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold hover:text-[#00FFFF] transition-colors"
                    >
                      2400 Collins Ave<br />
                      Miami Beach, FL 33140
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#00FFFF]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-1">Phone</p>
                    <a href="tel:7748234024" className="text-white font-semibold hover:text-[#00FFFF] transition-colors tabular-nums">
                      (774) 823-4024
                    </a>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href="tel:7748234024"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 font-bold uppercase tracking-[0.12em] text-black bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_30px_-8px_#00E5CC] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  CALL NOW — (774) 823-4024
                </a>
                <a
                  href="sms:7748234024"
                  className="w-full inline-flex items-center justify-center gap-3 rounded-full px-6 py-4 font-bold uppercase tracking-[0.12em] text-[#00FFFF] text-sm border border-[#00FFFF]/40 bg-[#00FFFF]/5 hover:bg-[#00FFFF]/10 hover:border-[#00FFFF]/60 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 11.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  TEXT NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 6 — GALLERY TEASER
      ───────────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-28 bg-[#071624] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-4">THE VIBE</p>
            <h2 className="font-black uppercase tracking-[0.05em] leading-[0.95] text-3xl md:text-4xl text-white mb-6">
              THE FLEET IN ACTION
            </h2>
          </div>

          {/* 3-photo preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { img: `${ARYEO_BASE}/large-019c697c-c390-73e5-8df4-3f89eef92fe1.jpeg`, alt: "Yacht side view" },
              { img: `${ARYEO_BASE}/large-019c697c-cf00-7262-8c04-8a86a11ce0b7.jpeg`, alt: "Yacht cockpit" },
              { img: `${ARYEO_BASE}/large-019c697c-cfd2-706c-92d7-ddc566404c44.jpeg`, alt: "Yacht deck" },
            ].map(({ img, alt }) => (
              <div key={alt} className="group relative rounded-xl overflow-hidden h-44 cursor-pointer">
                <img
                  src={img}
                  alt={alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-[#00FFFF]/40 transition-all duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold uppercase tracking-[0.12em] text-white border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              VIEW FULL GALLERY
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 7 — TESTIMONIALS
      ───────────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-28 bg-[#050D14] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00E5CC]/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-10 relative">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#00E5CC] font-semibold mb-4">Real Reviews</p>
            <h2 className="font-black uppercase tracking-[0.05em] leading-[0.95] text-3xl md:text-4xl text-white mb-4">
              What People Are Saying
            </h2>
            {/* Stars row */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#00E5CC] text-xl">★</span>
              ))}
              <span className="text-white/40 text-sm ml-2">4.9 · 75 reviews</span>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                quote: "Absolutely amazing experience with Miami Lifestyle Watersports! The staff was super professional, friendly, and made the whole process easy from start to finish. The jet skis and jet cars were clean, fast, and so much fun. The views were breathtaking — 100% recommend to anyone visiting Miami.",
                name: "Angel Nye",
                location: "5 reviews · 11 photos",
                platform: "Google",
              },
              {
                quote: "10/10 experience.",
                name: "Ryian Archie",
                location: "3 reviews · 2 photos",
                platform: "Google",
              },
            ].map(({ quote, name, location, platform }) => (
              <div
                key={name}
                className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                style={{
                  background: "#0D1520",
                  border: "1px solid rgba(0,229,204,0.10)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#00E5CC] text-sm">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/65 text-sm leading-relaxed flex-1">
                  &ldquo;{quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <div>
                    <p className="text-white font-bold text-sm">{name}</p>
                    <p className="text-white/30 text-xs">{location}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(0,229,204,0.08)", color: "rgba(0,229,204,0.6)" }}
                  >
                    {platform}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://www.google.com/search?q=miami+lifestyle+watersports#lrd=0x9c5d85536c8e6b3:0x1483b0b6bd16fd7b,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white border border-white/12 bg-white/[0.04] hover:bg-white/8 hover:border-white/20 transition-all duration-200"
            >
              See All Reviews on Google
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 8 — BOATING LICENSE INFO
      ───────────────────────────────────────────────────────────────────── */}
      <section className="py-10 md:py-20 bg-[#050D14] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="rounded-2xl border border-[#F0A022]/400/25 bg-orange-400/5 backdrop-blur-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl border border-[#F0A022]/400/30 bg-orange-400/10 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-[#00E5CC]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-black uppercase tracking-[0.1em] text-[#00E5CC] text-xl mb-3">
                  WAIVER SIGNED AT ARRIVAL
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-2xl">
                  All riders must sign a liability waiver upon arrival before operating a jet ski or jet car. Our staff will walk you through it on-site — it only takes a minute and you'll be on the water in no time. Please arrive at least 15 minutes before your scheduled time to complete the waiver.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────
          SECTION 8 — FINAL CTA
      ───────────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-36 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E2A] via-[#050D14] to-black" />

        {/* Ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_#00E5CC20_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,_#00FFFF10_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_bottom_left,_#00BFFF10_0%,_transparent_70%)] pointer-events-none" />

        {/* Hairline glow border */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E5CC]/40 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-10 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#00FFFF] font-semibold mb-6">
            MIAMI AWAITS
          </p>

          <h2 className="font-black uppercase leading-[0.9] tracking-[0.05em] mb-8">
            <span className="block text-3xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#00E5CC] to-[#00BFFF]">
              READY TO EXPERIENCE
            </span>
            <span className="block text-3xl md:text-6xl text-white">
              MIAMI?
            </span>
          </h2>

          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Spots fill up fast. Secure your booking today and make memories on Biscayne Bay.
          </p>

          {/* Button cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-10 py-5 font-bold uppercase tracking-[0.12em] text-black text-base bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] shadow-[0_0_50px_-10px_#00E5CC] hover:scale-[1.04] active:scale-[0.97] transition-transform duration-200"
            >
              BOOK NOW
            </Link>
            <a
              href="tel:7748234024"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-8 py-5 font-bold uppercase tracking-[0.12em] text-white text-base border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/25 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              CALL (774) 823-4024
            </a>
          </div>
        </div>
      </section>
      <div className="hidden md:block"><NewsletterPopup /></div>
    </>
  );
}
