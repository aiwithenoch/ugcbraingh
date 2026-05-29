"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { BrainIcon } from "@/components/ui/BrainIcon";
import { Loader2, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type Mode = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push("/dashboard");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setMagicSent(true);
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) { setError("Enter your email first"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); } else { setMagicSent(true); }
    setLoading(false);
  };

  if (magicSent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 p-12 rounded-[2.5rem] border-2 border-black shadow-[8px_8px_0px_0px_#c4ff00]"
        >
          <div className="p-5 rounded-3xl bg-[#c4ff00] border-2 border-black w-fit mx-auto">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tight">Check Your Email</h2>
          <p className="text-[#666666] font-medium">We sent a magic link to <span className="font-black text-black">{email}</span>. Click it to sign in.</p>
          <button onClick={() => setMagicSent(false)} className="text-xs font-black uppercase tracking-widest underline text-[#999999] hover:text-black">
            Use a different email
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex selection:bg-[#c4ff00] selection:text-black">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-black flex-col justify-between p-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c4ff00] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#444]">
            <BrainIcon className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-black tracking-tight uppercase text-white">UGCBrain</span>
        </Link>

        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#c4ff00]" />
            <span className="text-[11px] font-black uppercase tracking-widest text-white">AI Creator Workspace</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight uppercase text-white leading-[0.9]">
            Your content.<br />
            <span className="text-[#c4ff00]">Engineered.</span>
          </h1>
          <p className="text-white/50 font-medium text-lg max-w-sm">
            Join thousands of creators generating viral scripts, hooks, and content packs in seconds.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[["10K+", "Creators"], ["500K+", "Scripts Made"], ["$70", "/mo"]].map(([val, label]) => (
            <div key={label} className="space-y-1">
              <div className="text-2xl font-black text-[#c4ff00]">{val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#c4ff00] border-2 border-black flex items-center justify-center">
              <BrainIcon className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-black tracking-tight uppercase">UGCBrain</span>
          </Link>

          <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tight">
              {mode === "login" ? "Welcome Back" : "Get Started"}
            </h2>
            <p className="text-[#666666] font-medium">
              {mode === "login" ? "Sign in to your creator workspace." : "Create your account — 3 days free."}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 p-1 rounded-xl border-2 border-black bg-[#fafafa]">
            {(["login", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-3 rounded-lg font-black uppercase tracking-widest text-xs transition-all ${mode === m ? "bg-black text-white shadow-sm" : "text-[#999999] hover:text-black"}`}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-black focus:shadow-[4px_4px_0px_0px_#c4ff00] outline-none font-bold transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-black focus:shadow-[4px_4px_0px_0px_#c4ff00] outline-none font-bold transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 rounded-xl bg-black text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-[#222] active:scale-95 transition-all shadow-[4px_4px_0px_0px_#c4ff00] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>
                {mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" />
              </>}
            </button>
          </form>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[#eeeeee]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#999999]">or</span>
            <div className="flex-1 h-px bg-[#eeeeee]" />
          </div>

          <button
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#fafafa] border-2 border-black text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#f4f4f4] active:scale-95 transition-all disabled:opacity-60"
          >
            <Mail className="w-4 h-4" /> Send Magic Link
          </button>

          {mode === "signup" && (
            <p className="text-center text-xs text-[#999999] font-medium">
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
