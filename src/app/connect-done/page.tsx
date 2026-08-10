export default function ConnectDone() {
  return (
    <div className="min-h-screen bg-[#050D14] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div
          className="mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(0,229,204,0.15) 0%, rgba(0,229,204,0.03) 70%)",
            border: "2px solid rgba(0,229,204,0.3)",
          }}
        >
          <svg className="w-10 h-10 text-[#00E5CC]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-white mb-3">Setup Complete</h1>
        <p className="text-white/50 text-sm leading-relaxed">
          Your account details have been submitted. Stripe will verify everything and payouts will activate shortly.
        </p>
        <p className="text-white/30 text-xs mt-4">You can close this tab.</p>
      </div>
    </div>
  )
}
