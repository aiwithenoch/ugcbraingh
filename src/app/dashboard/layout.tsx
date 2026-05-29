"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { Zap, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      setUser(user);

      // Check subscription in profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_status")
        .eq("id", user.id)
        .single();

      const isReturningFromCheckout =
        searchParams.get("success") === "true" ||
        searchParams.get("status") === "succeeded" ||
        pathname.includes("/dashboard/settings");

      const isActive = profile?.subscription_status === "active" || profile?.subscription_status === "trialing";
      setSubscribed(isActive || isReturningFromCheckout);

      if (isReturningFromCheckout) {
        window.history.replaceState({}, "", window.location.pathname);
      }

      setLoading(false);
    };

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) { router.replace("/login"); }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden selection:bg-[#c4ff00] selection:text-black w-full relative">
      <Sidebar user={user} />
      <main className="flex-1 relative overflow-y-auto bg-[#fafafa]">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10 py-12 relative">
          {children}
        </div>
      </main>

      {/* Premium Paywall Overlay */}
      {!subscribed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-white border-4 border-black rounded-[2.5rem] p-10 shadow-[12px_12px_0px_0px_#c4ff00] space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-3xl bg-[#c4ff00] border-2 border-black text-black">
                <Zap className="w-8 h-8 fill-black text-black" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">Unlock Creator Brain</h2>
              <p className="text-sm font-semibold text-[#666666] max-w-sm mx-auto">
                Start your 3-day free trial to get unlimited AI generations, scripts, and strategy packs.
              </p>
            </div>

            <div className="bg-[#fafafa] border-2 border-black rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#eeeeee]">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#999999]">Pro Plan</span>
                  <div className="text-sm font-bold text-black">3-Day Free Trial</div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-black">$70</span>
                  <span className="text-xs font-bold text-[#666666]">/mo</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-black">
                {["Unlimited AI Generations", "Viral Script Engine", "Visual Prompt Packs"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black animate-pulse" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <a
                href={`/checkout?productId=pdt_0NfAZN8XldtxBygifLbGs&email=${encodeURIComponent(user?.email ?? "")}&fullName=UGC%20Creator`}
                className="w-full py-5 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-[#222222] active:scale-95 transition-all shadow-[4px_4px_0px_0px_#c4ff00]"
              >
                Claim Free Trial <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/" className="block text-center text-xs font-black uppercase tracking-widest text-[#999999] hover:text-black py-2">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    }>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}
