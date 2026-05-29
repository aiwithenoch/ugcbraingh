"use client";

import { useState, useEffect } from "react";
import { User, CreditCard, Zap, Trash2, Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function SettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [niche, setNiche] = useState("");
  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setDisplayName(profile.display_name ?? "");
        setNiche(profile.niche ?? "");
        setCustomerId(profile.customer_id ?? "");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      email,
      display_name: displayName,
      niche,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tight">System <span className="italic serif-heading font-normal lowercase tracking-normal">Settings</span></h1>
        <p className="text-[#666666] font-medium text-lg">Manage your account and subscription.</p>
      </header>

      {/* Profile */}
      <section className="bg-white border-2 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_#f4f4f4]">
        <div className="flex items-center gap-8 mb-10">
          <div className="w-24 h-24 rounded-full bg-[#c4ff00] border-2 border-black flex items-center justify-center">
            <span className="text-3xl font-black text-black uppercase">
              {(displayName || email).charAt(0)}
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tight">{displayName || "Creator"}</h2>
            <p className="text-[#999999] font-bold text-sm tracking-widest uppercase">{email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t-2 border-[#f4f4f4]">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-6 py-4 rounded-xl border-2 border-black font-bold focus:shadow-[4px_4px_0px_0px_#c4ff00] transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Creator Niche</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Skincare & Tech"
              className="w-full px-6 py-4 rounded-xl border-2 border-black font-bold focus:shadow-[4px_4px_0px_0px_#c4ff00] transition-all outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-4 rounded-xl bg-black text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 border-2 border-black hover:bg-[#222] active:scale-95 transition-all shadow-[3px_3px_0px_0px_#c4ff00] disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-black border-2 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_#c4ff00] text-white">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#c4ff00]">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Unlimited Plan</h2>
            </div>
            <p className="text-white/60 font-medium max-w-sm">
              Professional creator plan with unlimited AI generations, script packs, and priority support.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Status</div>
                <div className="text-sm font-black uppercase text-[#c4ff00]">Active Trial</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Plan</div>
                <div className="text-sm font-black uppercase">$70 / mo</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 min-w-[200px]">
            {customerId ? (
              <a
                href={`/customer-portal?customer_id=${customerId}`}
                className="px-6 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#f4f4f4] transition-all active:scale-95 text-center"
              >
                Manage Billing
              </a>
            ) : (
              <a
                href="/checkout?productId=pdt_0NfAZN8XldtxBygifLbGs"
                className="px-6 py-4 rounded-xl bg-[#c4ff00] text-black font-black uppercase tracking-widest text-xs hover:bg-[#b2e600] transition-all active:scale-95 text-center"
              >
                Upgrade Now
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4">
        <h2 className="text-xs font-black text-[#999999] uppercase tracking-[0.25em] px-2">Account Safety</h2>
        <div className="bg-white border-2 border-black rounded-[2.5rem] p-10 flex items-center justify-between shadow-[8px_8px_0px_0px_#fee2e2]">
          <div className="space-y-1">
            <h3 className="text-xl font-black uppercase">Delete Account</h3>
            <p className="text-sm text-[#999999] font-medium">Permanently remove all your content packs and history.</p>
          </div>
          <button className="p-4 rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95">
            <Trash2 className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
}
