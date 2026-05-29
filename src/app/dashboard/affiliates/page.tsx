"use client";

import { useState } from "react";
import { Copy, Check, Users, DollarSign, TrendingUp, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Referrals", value: "0", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Active Subscribers", value: "0", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Total Earned", value: "$0.00", icon: DollarSign, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Pending Payout", value: "$0.00", icon: DollarSign, color: "text-orange-500", bg: "bg-orange-50" },
];

export default function AffiliatesPage() {
  const [copied, setCopied] = useState(false);

  const affiliateCode = "YOUR_CODE";
  const referralLink = `https://ugcbrain.ai/?ref=${affiliateCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10 pb-20 pt-16 lg:pt-0">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase">
          Affiliate <span className="italic serif-heading font-normal lowercase tracking-normal">Program</span>
        </h1>
        <p className="text-[#666666] text-base font-medium">
          Earn <span className="font-black text-black">30% recurring commission</span> for every creator you refer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-[#eeeeee] p-6 space-y-4 hover:border-black hover:shadow-[4px_4px_0px_0px_#c4ff00] transition-all">
            <div className={cn("p-3 rounded-xl w-fit", stat.bg, stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-black">{stat.value}</div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#999999] mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-[2rem] border-2 border-black p-8 shadow-[6px_6px_0px_0px_#c4ff00] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#c4ff00] border-2 border-black">
            <LinkIcon className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-black">Your Referral Link</h2>
            <p className="text-xs font-medium text-[#666666]">Share this link to start earning</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 px-5 py-4 bg-[#fafafa] border-2 border-[#eeeeee] rounded-xl font-mono text-sm text-[#444444] truncate">
            {referralLink}
          </div>
          <button
            onClick={copyLink}
            className={cn(
              "flex items-center gap-2 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-black transition-all active:scale-95",
              copied
                ? "bg-emerald-400 text-black"
                : "bg-[#c4ff00] text-black hover:bg-[#b2e600] shadow-[3px_3px_0px_0px_#000]"
            )}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          {[
            { label: "Commission", value: "30%" },
            { label: "Cookie Duration", value: "30 days" },
            { label: "Payout", value: "Monthly" },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 bg-[#fafafa] rounded-xl border border-[#eeeeee]">
              <div className="text-xl font-black text-black">{item.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#999999] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Table */}
      <div className="space-y-4">
        <h2 className="text-xs font-black text-black uppercase tracking-[0.25em]">Referral History</h2>
        <div className="bg-white rounded-[1.5rem] border border-[#eeeeee] overflow-hidden">
          <div className="grid grid-cols-4 px-8 py-4 border-b border-[#eeeeee] bg-[#fafafa]">
            {["Date", "Email", "Status", "Earned"].map((h) => (
              <div key={h} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#999999]">{h}</div>
            ))}
          </div>
          <div className="p-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-5 rounded-2xl bg-[#f4f4f4] border-2 border-black">
              <Users className="w-8 h-8 text-black" />
            </div>
            <div>
              <div className="text-lg font-black text-black">No referrals yet</div>
              <div className="text-sm text-[#666666] font-medium mt-1">Share your link to start earning commissions</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="space-y-6">
        <h2 className="text-xs font-black text-black uppercase tracking-[0.25em]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Share Your Link", desc: "Post your referral link on social media, newsletters, or DMs." },
            { step: "02", title: "They Subscribe", desc: "When someone clicks and starts a paid plan, you earn 30% commission." },
            { step: "03", title: "Get Paid", desc: "Commissions are paid out monthly directly to your account." },
          ].map((item) => (
            <div key={item.step} className="p-8 bg-white rounded-[1.5rem] border border-[#eeeeee] hover:border-black hover:shadow-[4px_4px_0px_0px_#c4ff00] transition-all space-y-4">
              <div className="text-5xl font-black text-[#c4ff00] [text-shadow:2px_2px_0px_#000]">{item.step}</div>
              <div>
                <div className="font-black text-black uppercase tracking-tight">{item.title}</div>
                <div className="text-sm text-[#666666] font-medium mt-1 leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
