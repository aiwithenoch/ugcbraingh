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
import { BrainIcon } from "@/components/ui/BrainIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    <div className="space-y-16 pb-20">
      {/* High-Impact Hero Input */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-black">
            The <span className="italic serif font-normal">Creator</span> Brain
          </h1>
          <p className="text-[#666666] text-lg font-medium">Turn any vision into a content pack in seconds.</p>
        </div>

        <div className="max-w-4xl">
          <div className="relative flex items-center bg-white border-2 border-black rounded-3xl p-2 shadow-[8px_8px_0px_0px_#c4ff00] focus-within:shadow-[4px_4px_0px_0px_#c4ff00] transition-all">
            <div className="flex-1 flex items-center gap-4 px-6">
              <Search className="w-6 h-6 text-black" />
              <input 
                type="text" 
                placeholder="Describe what you want to create..." 
                className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold text-black placeholder:text-[#bbbbbb] py-6"
              />
            </div>
            <div className="pr-2">
              <Link 
                href="/dashboard/create"
                className="px-10 py-5 rounded-2xl bg-[#c4ff00] text-black font-black text-lg flex items-center gap-2 hover:bg-[#b2e600] active:scale-95 transition-all border-2 border-black shadow-sm"
              >
                Generate <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-8">
            <span className="text-[10px] font-black text-[#999999] uppercase tracking-widest mr-2">Quick Start:</span>
            {SUGGESTIONS.map((s) => (
              <button 
                key={s}
                className="px-4 py-2 text-[11px] font-bold rounded-full bg-white border border-[#eeeeee] text-[#666666] hover:border-black hover:text-black transition-all"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((item) => (
            <button 
              key={item.title}
              className="flex flex-col gap-6 p-8 rounded-[2rem] bg-white border border-[#eeeeee] hover:border-black hover:shadow-[4px_4px_0px_0px_#c4ff00] transition-all text-left group"
            >
              <div className={cn("p-4 rounded-2xl w-fit transition-all group-hover:scale-110", item.bg, item.color)}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-black text-black mb-1">{item.title}</div>
                <div className="text-sm text-[#666666] font-medium leading-tight">{item.description}</div>
              </div>
              <div className="pt-4 mt-auto">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#999999] group-hover:text-[#c4ff00]">
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
        <div className="bg-white rounded-[2.5rem] border-2 border-black p-20 flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden shadow-[8px_8px_0px_0px_#f4f4f4]">
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          <div className="relative">
            <div className="p-6 rounded-3xl bg-[#f4f4f4] border-2 border-black text-black">
              <BrainIcon className="w-12 h-12" />
            </div>
          </div>
          <div className="space-y-2 relative">
            <h3 className="text-2xl font-black text-black tracking-tight">Your feed is clean.</h3>
            <p className="text-[#666666] max-w-sm mx-auto font-medium">Start your first generation to see your content packs appear here.</p>
          </div>
          <Link 
            href="/dashboard/create"
            className="px-8 py-4 rounded-xl bg-black text-white font-black text-sm uppercase tracking-widest hover:bg-[#222222] transition-all"
          >
            Create My First Pack
          </Link>
        </div>
      </section>
    </div>
  );
}
