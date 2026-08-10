"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect username or password.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050D14] flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="Logo" className="h-16 mx-auto mb-5 drop-shadow-[0_0_16px_rgba(0,229,204,0.5)]" />
          <h1 className="text-2xl font-black text-white uppercase tracking-widest mb-1">Admin</h1>
          <p className="text-white/30 text-sm">Miami Lifestyle Watersports</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4"
        >
          <div>
            <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#00E5CC] focus:ring-1 focus:ring-[#00E5CC]/30 transition-all"
              placeholder="Enter username"
              autoFocus
              autoComplete="username"
            />
          </div>

          <div>
            <label className="text-white/40 text-xs uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#00E5CC] focus:ring-1 focus:ring-[#00E5CC]/30 transition-all"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5CC] to-[#00BFFF] text-black font-black uppercase tracking-widest disabled:opacity-50 hover:scale-[1.02] transition-transform"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
