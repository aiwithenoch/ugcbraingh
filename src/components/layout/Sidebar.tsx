"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  Sparkles, 
  Settings,
  Zap,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { BrainIcon } from "@/components/ui/BrainIcon";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create", href: "/create", icon: PlusCircle },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Library", href: "/templates", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="flex h-24 items-center px-8 border-b border-[#f0f0f0]">
        <Link href="/dashboard" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="w-10 h-10 rounded-xl bg-[#c4ff00] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] group-hover:scale-110 transition-transform">
            <BrainIcon className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-black uppercase">UGCBrain</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-8">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-[#c4ff00] text-black shadow-sm" 
                  : "text-[#666666] hover:bg-[#f4f4f4] hover:text-black"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-black" : "text-[#999999] group-hover:text-black"
                )} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-black" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#f0f0f0] bg-[#fafafa]">
        <div className="p-5 rounded-2xl bg-white border border-[#eeeeee] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#c4ff00]/20">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-[10px] font-bold text-black tracking-[0.1em] uppercase">Pro Trial</span>
          </div>
          <div className="space-y-1">
            <div className="text-xl font-black text-black tracking-tighter">$50<span className="text-xs font-medium text-[#999999]">/mo</span></div>
            <div className="text-[10px] text-[#999999] font-bold uppercase tracking-wider">3 Days Left</div>
          </div>
          <button className="w-full py-3 text-[11px] font-black uppercase tracking-widest text-black bg-[#c4ff00] rounded-xl hover:shadow-lg transition-all active:scale-95">
            Upgrade
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-[100]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#c4ff00] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-full w-64 flex-col bg-white border-r border-[#f0f0f0] shadow-sm">
        <NavContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-[90] lg:hidden flex flex-col shadow-2xl"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
