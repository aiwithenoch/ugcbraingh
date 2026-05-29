"use client";

import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ChevronDown,
  Video,
  Image as ImageIcon,
  FileText,
  TrendingUp,
  Zap
} from "lucide-react";
import { BrainIcon } from "@/components/ui/BrainIcon";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-[#c4ff00] selection:text-black">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#c4ff00] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] group-hover:scale-110 transition-transform">
                <BrainIcon className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black tracking-tight uppercase">UGCBrain</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-[#666666] hover:text-black cursor-pointer">Features <ChevronDown className="w-4 h-4" /></div>
              <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-widest text-[#666666] hover:text-black cursor-pointer">Pricing</div>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="px-6 py-2.5 rounded-xl bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-[#222222] transition-all border-2 border-black shadow-[3px_3px_0px_0px_#c4ff00]">Login</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-48 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 -z-10" />
        <div className="max-w-6xl mx-auto px-8 text-center space-y-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] border-2 border-black shadow-[4px_4px_0px_0px_#c4ff00]"
            >
              The #1 AI Creator Workspace
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[90px] leading-[0.85] font-black tracking-tight uppercase"
            >
              Viral Content <br />
              <span className="text-black/20 italic serif-heading font-normal lowercase tracking-normal">without the</span> <br />
              Production Team.
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#444444] max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Turn any vision into a professional UGC content pack instantly. 
            Scripts, prompts, and hooks engineered for the algorithm.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 pt-6"
          >
            <Link href="/checkout?productId=pdt_0NfAZN8XldtxBygifLbGs&email=creator@ugcbrain.ai&fullName=UGC%20Creator" className="dodo-btn-primary text-xl px-12">
              Start Free Trial
            </Link>
            <Link href="/dashboard" className="text-sm font-black uppercase tracking-[0.2em] underline decoration-[#c4ff00] decoration-4 underline-offset-8 hover:text-[#c4ff00] transition-colors">
              See Demo
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Pricing */}
      <section className="py-32 bg-[#fafafa] border-t-2 border-black">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-5xl font-black uppercase tracking-tight">The Content Plan</h2>
            <p className="text-xl text-[#666666] font-medium italic serif-heading">Everything you need to dominate social media.</p>
          </div>
          
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-2 bg-[#c4ff00] rounded-[3rem] border-2 border-black -z-10 transform rotate-1 group-hover:rotate-0 transition-transform" />
            <div className="relative p-16 rounded-[2.5rem] bg-white border-2 border-black shadow-2xl">
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="px-4 py-1 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest">3 Days Free</span>
              </div>
              <div className="flex items-baseline justify-center gap-3 mb-10">
                <span className="text-[100px] font-black tracking-tighter leading-none">$70</span>
                <span className="text-2xl text-[#666666] font-bold uppercase">/mo</span>
              </div>
              <Link href="/checkout?productId=pdt_0NfAZN8XldtxBygifLbGs&email=creator@ugcbrain.ai&fullName=UGC%20Creator" className="w-full dodo-btn-black text-lg py-6 uppercase tracking-[0.2em]">
                Claim My Trial
              </Link>
              <div className="grid grid-cols-2 gap-4 mt-12 text-left">
                {["Unlimited AI Generations", "Viral Script Engine", "Visual Prompt Packs", "Trend Analytics"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black">
                    <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
