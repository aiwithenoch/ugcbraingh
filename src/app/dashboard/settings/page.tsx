"use client";

import { User, CreditCard, Bell, Shield, LogOut, Zap, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-12 pb-20">
      <header className="space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tight">System <span className="italic serif-heading font-normal lowercase tracking-normal">Settings</span></h1>
        <p className="text-[#666666] font-medium text-lg">Manage your account and subscription.</p>
      </header>

      {/* Profile Section */}
      <section className="bg-white border-2 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_#f4f4f4]">
        <div className="flex items-center gap-8 mb-10">
          <div className="w-24 h-24 rounded-full bg-[#f4f4f4] border-2 border-black flex items-center justify-center relative group">
             <User className="w-10 h-10 text-black" />
             <div className="absolute inset-0 bg-[#c4ff00]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-[10px] font-black uppercase">Edit</span>
             </div>
          </div>
          <div className="space-y-1">
             <h2 className="text-2xl font-black uppercase tracking-tight">Creator Account</h2>
             <p className="text-[#999999] font-bold text-sm tracking-widest uppercase">creator@ugcbrain.ai</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t-2 border-[#f4f4f4]">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Display Name</label>
              <input type="text" defaultValue="UGC Creator" className="w-full px-6 py-4 rounded-xl border-2 border-black font-bold focus:shadow-[4px_4px_0px_0px_#c4ff00] transition-all outline-none" />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#999999]">Creator Niche</label>
              <input type="text" defaultValue="Skincare & Tech" className="w-full px-6 py-4 rounded-xl border-2 border-black font-bold focus:shadow-[4px_4px_0px_0px_#c4ff00] transition-all outline-none" />
           </div>
        </div>
      </section>

      {/* Subscription Card */}
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
                 You are currently on the professional creator plan. Unlimited AI generations, script packs, and priority support.
              </p>
              <div className="flex items-center gap-6">
                 <div>
                    <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Status</div>
                    <div className="text-sm font-black uppercase text-[#c4ff00]">Active Trial</div>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div>
                    <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-1">Next Bill</div>
                    <div className="text-sm font-black uppercase">May 1, 2026</div>
                 </div>
              </div>
           </div>
           <div className="flex flex-col gap-3 min-w-[200px]">
              <button className="px-6 py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#f4f4f4] transition-all active:scale-95">
                 Manage Billing
              </button>
              <button className="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all active:scale-95">
                 Switch Plan
              </button>
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
