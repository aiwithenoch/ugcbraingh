"use client";

import { Sparkles, Zap, Video, ImageIcon, FileText, Search, Play, ArrowRight } from "lucide-react";
import Link from "next/link";

const TEMPLATES = [
  { title: "Viral TikTok Ad", type: "Script", color: "bg-emerald-50 text-emerald-600", icon: Video },
  { title: "Product Flatlay", type: "Prompts", color: "bg-blue-50 text-blue-600", icon: ImageIcon },
  { title: "GRWM Hook Pack", type: "Hooks", color: "bg-pink-50 text-pink-600", icon: Zap },
  { title: "Faceless YouTube", type: "Strategy", color: "bg-purple-50 text-purple-600", icon: FileText },
];

export default function TemplatesPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tight">The <span className="italic serif-heading font-normal lowercase tracking-normal">Library</span></h1>
        <p className="text-[#666666] font-medium text-lg">Choose a blueprint to accelerate your creation process.</p>
      </header>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {["All Templates", "UGC Ads", "Image Prompts", "Hooks", "YouTube", "TikTok"].map((cat, i) => (
          <button 
            key={cat}
            className={`px-6 py-3 rounded-xl border-2 border-black font-black uppercase tracking-widest text-xs transition-all whitespace-nowrap
              ${i === 0 ? "bg-[#c4ff00] text-black shadow-[4px_4px_0px_0px_#000000]" : "bg-white text-[#999999] hover:text-black hover:bg-[#f4f4f4]"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.title} className="group bg-white border-2 border-black rounded-[2rem] overflow-hidden hover:shadow-[8px_8px_0px_0px_#c4ff00] transition-all cursor-pointer">
            <div className="p-10 space-y-6">
              <div className={`w-14 h-14 rounded-2xl border-2 border-black flex items-center justify-center ${tpl.color}`}>
                <tpl.icon className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#999999]">{tpl.type}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight">{tpl.title}</h3>
              </div>
              <p className="text-sm font-medium text-[#666666]">
                Engineered for the current 2026 algorithm. Optimized for high engagement.
              </p>
            </div>
            <div className="p-6 bg-[#fafafa] border-t-2 border-black flex items-center justify-between group-hover:bg-[#c4ff00] transition-colors">
              <span className="text-xs font-black uppercase tracking-widest">Launch Blueprint</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
