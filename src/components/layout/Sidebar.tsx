"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderKanban, 
  Sparkles, 
  Settings,
  Zap,
  ChevronRight
} from "lucide-react";
import { BrainIcon } from "@/components/ui/BrainIcon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create", href: "/dashboard/create", icon: PlusCircle },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Library", href: "/templates", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-[#f0f0f0] shadow-sm">
      <div className="flex h-24 items-center px-8 border-b border-[#f0f0f0]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
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
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
