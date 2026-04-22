"use client";

import { FolderKanban, Search, Filter, Plus, ChevronRight, Video, ImageIcon, FileText } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  { id: 1, title: "Skincare Viral Hook", type: "UGC Ad", date: "2 mins ago", icon: Video },
  { id: 2, title: "Summer Vlog Prompts", type: "Vlog", date: "1 hour ago", icon: ImageIcon },
  { id: 3, title: "Fitness Hook Pack", type: "Hooks", date: "Yesterday", icon: FileText },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black uppercase tracking-tight">Your <span className="italic serif-heading font-normal lowercase tracking-normal">Projects</span></h1>
          <p className="text-[#666666] font-medium">Manage and export your AI content packs.</p>
        </div>
        <Link href="/dashboard/create" className="dodo-btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Project
        </Link>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 py-6 border-y-2 border-black">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-black focus:shadow-[4px_4px_0px_0px_#c4ff00] transition-all outline-none"
          />
        </div>
        <button className="px-6 py-3 rounded-xl border-2 border-black flex items-center gap-2 font-bold text-sm bg-white hover:bg-[#f4f4f4]">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group flex items-center justify-between p-6 bg-white border-2 border-black rounded-2xl hover:shadow-[6px_6px_0px_0px_#c4ff00] transition-all cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-xl bg-[#f4f4f4] border-2 border-black group-hover:bg-[#c4ff00] transition-colors">
                <project.icon className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">{project.title}</h3>
                <div className="flex items-center gap-3 text-xs font-bold text-[#999999] uppercase tracking-widest mt-1">
                  <span>{project.type}</span>
                  <div className="w-1 h-1 rounded-full bg-[#dddddd]" />
                  <span>{project.date}</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#dddddd] group-hover:text-black transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
