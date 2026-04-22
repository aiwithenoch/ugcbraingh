"use client";

import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Image as ImageIcon, 
  Video, 
  FileText,
  TrendingUp,
  Search,
  PlusCircle,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrainIcon } from "@/components/ui/BrainIcon";

const SUGGESTIONS = [
  "Skincare UGC script...",
  "Viral GRWM hooks...",
  "Product showcase...",
];

const QUICK_ACTIONS = [
  { title: "UGC Ad Script", icon: Video, description: "Structured video flow", color: "text-emerald-500", bg: "bg-emerald-50" },
  { title: "Visual Prompts", icon: ImageIcon, description: "Midjourney/DALL-E", color: "text-blue-500", bg: "bg-blue-50" },
  { title: "Hooks & Captions", icon: FileText, description: "Social copy engine", color: "text-purple-500", bg: "bg-purple-50" },
  { title: "Strategy Brain", icon: Sparkles, description: "Content planning", color: "text-pink-500", bg: "bg-pink-50" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-12 md:space-y-16 pb-20 pt-16 lg:pt-0">
      {/* High-Impact Hero Input */}
      <section className="space-y-6 md:space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black">
            The <span className="italic serif-heading font-normal lowercase tracking-normal">Creator</span> Brain
          </h1>
          <p className="text-[#666666] text-base md:text-lg font-medium">Turn any vision into a content pack in seconds.</p>
        </div>

        <div className="max-w-4xl">
          <div className="relative flex flex-col md:flex-row items-stretch md:items-center bg-white border-2 border-black rounded-2xl md:rounded-3xl p-2 shadow-[6px_6px_0px_0px_#c4ff00] md:shadow-[8px_8px_0px_0px_#c4ff00] focus-within:shadow-[4px_4px_0px_0px_#c4ff00] transition-all">
            <div className="flex-1 flex items-center gap-4 px-4 md:px-6">
              <Search className="w-5 h-5 md:w-6 md:h-6 text-black shrink-0" />
              <input 
                type="text" 
                placeholder="Describe your vision..." 
                className="w-full bg-transparent border-none focus:ring-0 text-lg font-bold text-black placeholder:text-[#bbbbbb] py-4 md:py-6"
              />
            </div>
            <div className="p-2 md:pr-2">
              <Link 
                href="/create"
                className="w-full md:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl bg-[#c4ff00] text-black font-black text-base md:text-lg flex items-center justify-center gap-2 hover:bg-[#b2e600] active:scale-95 transition-all border-2 border-black shadow-sm"
              >
                Generate <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-8">
            <span className="text-[10px] font-black text-[#999999] uppercase tracking-widest mr-2">Quick Start:</span>
            {SUGGESTIONS.map((s) => (
              <button 
                key={s}
                className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-[11px] font-bold rounded-full bg-white border border-[#eeeeee] text-[#666666] hover:border-black hover:text-black transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Action Grid */}
      <section className="space-y-6">
        <h2 className="text-xs font-black text-black uppercase tracking-[0.25em]">Workflow Engines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {QUICK_ACTIONS.map((item) => (
            <button 
              key={item.title}
              className="flex flex-col gap-4 md:gap-6 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-white border border-[#eeeeee] hover:border-black hover:shadow-[4px_4px_0px_0px_#c4ff00] transition-all text-left group"
            >
              <div className={cn("p-3 md:p-4 rounded-xl md:rounded-2xl w-fit transition-all group-hover:scale-110", item.bg, item.color)}>
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <div className="text-base md:text-lg font-black text-black mb-1">{item.title}</div>
                <div className="text-xs md:text-sm text-[#666666] font-medium leading-tight">{item.description}</div>
              </div>
              <div className="pt-2 md:pt-4 mt-auto">
                 <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#999999] group-hover:text-[#c4ff00]">
                    Launch <ChevronRight className="w-3 h-3" />
                 </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* History Area */}
      <section className="space-y-6">
        <h2 className="text-xs font-black text-black uppercase tracking-[0.25em]">Recent Creation Feed</h2>
        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-[#eeeeee] p-10 md:p-20 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          <div className="relative">
            <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-[#f4f4f4] border-2 border-black text-black">
              <BrainIcon className="w-8 h-8 md:w-12 md:h-12" />
            </div>
          </div>
          <div className="space-y-2 relative">
            <h3 className="text-xl md:text-2xl font-black text-black tracking-tight">Your feed is clean.</h3>
            <p className="text-sm md:text-base text-[#666666] max-w-sm mx-auto font-medium">Start your first generation to see your content packs appear here.</p>
          </div>
          <Link 
            href="/create"
            className="w-full md:w-auto px-8 py-4 rounded-xl bg-black text-white font-black text-xs md:text-sm uppercase tracking-widest hover:bg-[#222222] transition-all"
          >
            Create My First Pack
          </Link>
        </div>
      </section>
    </div>
  );
}
