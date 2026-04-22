"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Image as ImageIcon, 
  Video, 
  FileText,
  Loader2,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Clipboard,
  RotateCcw,
  Zap,
  Camera,
  MessageSquare,
  ExternalLink,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Step = "idea" | "image" | "details" | "generating" | "results";

const TABS = [
  { id: "script", label: "Script", icon: Video },
  { id: "prompts", label: "Visual Prompts", icon: ImageIcon },
  { id: "shots", label: "Shot List", icon: Camera },
  { id: "captions", label: "Captions & Hooks", icon: MessageSquare },
];

export default function CreateFlow() {
  const [step, setStep] = useState<Step>("idea");
  const [activeTab, setActiveTab] = useState("script");
  const [idea, setIdea] = useState("");

  const nextStep = () => {
    if (step === "idea") setStep("image");
    else if (step === "image") setStep("details");
    else if (step === "details") {
      setStep("generating");
      setTimeout(() => setStep("results"), 3500);
    }
  };

  const prevStep = () => {
    if (step === "image") setStep("idea");
    if (step === "details") setStep("image");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {/* Brutalist Progress Stepper */}
      {step !== "results" && (
        <div className="flex items-center justify-center gap-4 mb-16">
          {["Idea", "Visuals", "Details", "Build"].map((s, i) => {
            const steps: Step[] = ["idea", "image", "details", "generating"];
            const isActive = steps.indexOf(step) >= i;
            const isCurrent = steps.indexOf(step) === i;
            return (
              <div key={s} className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center text-sm font-black transition-all",
                  isActive ? "bg-[#c4ff00] shadow-[3px_3px_0px_0px_#000000]" : "bg-white text-black/20 border-black/10",
                  isCurrent && "animate-bounce"
                )}>
                  {i + 1}
                </div>
                {i < 3 && <div className={cn("w-12 h-0.5 bg-black/10", isActive && "bg-black")} />}
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === "idea" && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              <h1 className="text-6xl font-black uppercase tracking-tight">The <span className="italic serif-heading font-normal lowercase tracking-normal">Content</span> Brain</h1>
              <p className="text-[#666666] text-xl font-medium">Describe your vision. We'll engineer the viral pack.</p>
            </div>
            
            <div className="input-container">
              <textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. A skincare UGC ad for a hydration serum targeting busy moms..."
                className="w-full h-64 bg-transparent border-none focus:ring-0 text-2xl font-black text-black placeholder:text-black/10 resize-none p-6"
              />
              <div className="flex justify-between items-center mt-4 p-4 border-t-2 border-black bg-[#fafafa] rounded-b-[1.4rem]">
                <div className="flex gap-4">
                  <div className="px-3 py-1 rounded-lg bg-black text-white text-[9px] font-black uppercase tracking-widest">GPT-4o Engine</div>
                  <div className="px-3 py-1 rounded-lg bg-[#c4ff00] border border-black text-[9px] font-black uppercase tracking-widest">Viral Optimized</div>
                </div>
                <button 
                  onClick={nextStep}
                  disabled={!idea.trim()}
                  className="dodo-btn-primary py-3 px-10 flex items-center gap-2 disabled:opacity-20 disabled:shadow-none"
                >
                  Next Step <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "image" && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
             <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tight">Visual <span className="italic serif-heading font-normal lowercase tracking-normal">Reference</span></h2>
              <p className="text-[#666666] text-xl font-medium">Upload an image to guide the AI's aesthetic or specific style.</p>
            </div>

            <div className="bg-white border-2 border-black rounded-[2.5rem] p-20 border-dashed flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_0px_#f4f4f4] hover:shadow-[8px_8px_0px_0px_#c4ff00] transition-all cursor-pointer group">
              <div className="p-6 rounded-full bg-[#f4f4f4] border-2 border-black group-hover:bg-[#c4ff00] transition-colors">
                <ImageIcon className="w-12 h-12 text-black" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black uppercase">Drop image here</p>
                <p className="text-sm font-medium text-[#999999] mt-1 tracking-widest uppercase">PNG, JPG or WebP (Max 10MB)</p>
              </div>
              <button className="text-black font-black uppercase tracking-widest text-xs underline decoration-[#c4ff00] decoration-4 underline-offset-4">Browse Files</button>
            </div>

            <div className="flex items-center justify-between pt-10">
              <button onClick={prevStep} className="flex items-center gap-2 font-black uppercase tracking-widest text-xs hover:text-[#c4ff00] transition-colors">
                <ChevronLeft className="w-4 h-4" /> Go Back
              </button>
              <div className="flex gap-4">
                <button onClick={nextStep} className="px-8 py-4 rounded-xl border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-[#f4f4f4] transition-all">Skip</button>
                <button onClick={nextStep} className="dodo-btn-primary">Continue</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === "generating" && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center space-y-12"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#c4ff00] blur-3xl opacity-20 animate-pulse" />
              <div className="w-24 h-24 rounded-3xl bg-black border-4 border-[#c4ff00] flex items-center justify-center relative z-10 shadow-[8px_8px_0px_0px_#000000]">
                <Loader2 className="w-12 h-12 text-[#c4ff00] animate-spin" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tight italic serif-heading">UGCBrain is <br />Analyzing...</h2>
              <p className="text-[#666666] font-medium text-lg max-w-sm mx-auto">We're engineering your content pack for maximum virality.</p>
            </div>
            <div className="flex flex-col gap-3">
               {["Orchestrating Intent...", "Drafting Visual Prompts...", "Building Content Strategy..."].map((text, i) => (
                 <div key={i} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#999999]">
                    <div className="w-2 h-2 rounded-full bg-[#c4ff00] border border-black animate-pulse" />
                    {text}
                 </div>
               ))}
            </div>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b-2 border-black">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#c4ff00] border-2 border-black text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#000000]">
                  Pack Generated Successfully
                </div>
                <h1 className="text-6xl font-black uppercase tracking-tight">Your <span className="italic serif-heading font-normal lowercase tracking-normal">Content</span> Pack</h1>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-4 rounded-xl border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-[#f4f4f4] transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-none">
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button className="dodo-btn-primary py-4 px-8 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clipboard className="w-4 h-4" /> Copy All
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Vertical Sidebar Tabs */}
              <div className="lg:col-span-1 space-y-3">
                {TABS.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-6 py-5 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-xs",
                      activeTab === tab.id 
                        ? "bg-[#c4ff00] border-black text-black shadow-[4px_4px_0px_0px_#000000]" 
                        : "bg-white border-transparent text-[#999999] hover:bg-[#f4f4f4] hover:text-black"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-black" : "text-[#999999]")} />
                      {tab.label}
                    </div>
                    {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {/* Content Panel */}
              <div className="lg:col-span-3">
                <div className="bg-white border-2 border-black rounded-[2.5rem] p-12 shadow-[10px_10px_0px_0px_#f4f4f4] min-h-[600px] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles className="w-48 h-48 text-black" />
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="relative z-10 space-y-12"
                    >
                      {activeTab === "script" && (
                        <div className="space-y-12">
                          <div className="space-y-4">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#999999]">Viral Hook</div>
                            <p className="text-3xl font-black leading-tight italic serif-heading text-black">"I stopped using expensive serums for 30 days, and here's what happened."</p>
                          </div>
                          <div className="space-y-4">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#999999]">The Script Flow</div>
                            <div className="space-y-6 text-lg font-medium text-[#444444] leading-relaxed">
                               <p><span className="text-black font-black">[0:00-0:03]</span> Close up of the product texture on skin.</p>
                               <p><span className="text-black font-black">[0:03-0:10]</span> Reaction shot: "My skin has literally never felt this hydrated."</p>
                               <p><span className="text-black font-black">[0:10-0:20]</span> Quick cut montage of the ingredients list.</p>
                            </div>
                          </div>
                          <div className="pt-6">
                            <button className="px-6 py-3 rounded-xl border-2 border-black bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#222222] transition-all shadow-[4px_4px_0px_0px_#c4ff00]">
                              Copy Script
                            </button>
                          </div>
                        </div>
                      )}
                      {activeTab === "prompts" && (
                        <div className="space-y-10">
                          <div className="space-y-4">
                            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#999999]">Master Image Prompt</div>
                            <div className="p-8 rounded-3xl bg-[#f9f9f9] border-2 border-black shadow-[6px_6px_0px_0px_#000000]">
                               <p className="text-lg font-bold font-mono leading-relaxed text-black">
                                 /imagine prompt: cinematic 4k macro shot of luxury skincare product, minimal white glass bottle, morning natural light, water droplets, soft shadows, professional lighting --ar 9:16 --v 6.0
                               </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-6 rounded-2xl border-2 border-black bg-white hover:bg-[#c4ff00]/5 transition-colors">
                                <div className="text-[9px] font-black uppercase mb-2">Lighting Style</div>
                                <div className="font-bold text-sm text-black">High-Key Editorial</div>
                             </div>
                             <div className="p-6 rounded-2xl border-2 border-black bg-white hover:bg-[#c4ff00]/5 transition-colors">
                                <div className="text-[9px] font-black uppercase mb-2">Color Palette</div>
                                <div className="font-bold text-sm text-black">Clinical White & Sage</div>
                             </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
