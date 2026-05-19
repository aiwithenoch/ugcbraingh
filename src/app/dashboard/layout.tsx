"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import { Zap, ArrowRight } from "lucide-react";

function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("ugcbrain_subscribed") === "true";
    const isReturningFromCheckout = 
      searchParams.get("success") === "true" || 
      searchParams.get("status") === "succeeded" ||
      pathname.includes("/dashboard/settings");

    if (isReturningFromCheckout) {
      localStorage.setItem("ugcbrain_subscribed", "true");
      setIsSubscribed(true);
      // Clean up the URL query params if any
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
      return;
    }

    setIsSubscribed(hasSubscribed);
  }, [searchParams, pathname]);

  const handleSimulateSubscription = () => {
    localStorage.setItem("ugcbrain_subscribed", "true");
    setIsSubscribed(true);
  };

  const handleResetSubscription = () => {
    localStorage.removeItem("ugcbrain_subscribed");
    setIsSubscribed(false);
  };

  if (isSubscribed === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 rounded-full border-4 border-black border-t-[#c4ff00] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden selection:bg-[#c4ff00] selection:text-black w-full relative">
      <Sidebar />
      <main className="flex-1 relative overflow-y-auto bg-[#fafafa]">
        {/* Subtle grid pattern for depth */}
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-10 py-12 relative">
          {children}
        </div>
      </main>

      {/* Premium Paywall Overlay */}
      {!isSubscribed && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative max-w-lg w-full bg-white border-4 border-black rounded-[2.5rem] p-10 shadow-[12px_12px_0px_0px_#c4ff00] space-y-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-3xl bg-[#c4ff00] border-2 border-black text-black">
                <Zap className="w-8 h-8 fill-black text-black" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">
                Unlock Creator Brain
              </h2>
              <p className="text-sm font-semibold text-[#666666] max-w-sm mx-auto">
                Start your 3-day free trial to get unlimited AI script generations, hooks, and strategy packs.
              </p>
            </div>

            {/* Price & Features */}
            <div className="bg-[#fafafa] border-2 border-black rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-[#eeeeee]">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#999999]">Pro Plan</span>
                  <div className="text-sm font-bold text-black">3-Day Free Trial</div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-black">$50</span>
                  <span className="text-xs font-bold text-[#666666]">/mo</span>
                </div>
              </div>
              
              <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-black">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black animate-pulse" />
                  Unlimited AI Generations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black animate-pulse" />
                  Viral Script Engine
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black animate-pulse" />
                  Visual Prompt Packs
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <a 
                href="/checkout?productId=pdt_0NfAZN8XldtxBygifLbGs&email=creator@ugcbrain.ai&fullName=UGC%20Creator"
                className="w-full py-5 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 border-2 border-black hover:bg-[#222222] active:scale-95 transition-all shadow-[4px_4px_0px_0px_#c4ff00]"
              >
                Claim Free Trial <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex gap-4">
                <button 
                  onClick={handleSimulateSubscription}
                  className="flex-1 py-3 rounded-xl bg-[#c4ff00] text-black font-black uppercase tracking-widest text-[10px] border border-black hover:bg-[#b2e600] active:scale-95 transition-all"
                >
                  Simulate Payment (Dev)
                </button>
                <a 
                  href="/"
                  className="flex-1 py-3 rounded-xl bg-white text-black font-black uppercase tracking-widest text-[10px] border border-black hover:bg-[#fafafa] active:scale-95 transition-all text-center flex items-center justify-center"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Reset Helper (Only visible for dev/testing) */}
      {isSubscribed && (
        <button 
          onClick={handleResetSubscription}
          className="fixed bottom-4 right-4 z-40 px-3 py-1.5 bg-red-100 hover:bg-red-200 border border-red-300 text-red-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors"
        >
          Reset Subscription State
        </button>
      )}
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <div className="w-12 h-12 rounded-full border-4 border-black border-t-[#c4ff00] animate-spin" />
      </div>
    }>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}

