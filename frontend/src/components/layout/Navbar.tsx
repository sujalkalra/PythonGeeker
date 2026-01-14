"use client";

import { Menu, Search } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import Link from "next/link";

export function Navbar() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 md:px-6">
      <button
        onClick={toggle}
        className="mr-4 p-2 text-slate-400 hover:text-white focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <Menu size={24} />
      </button>

      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          PythonGeeker
        </span>
        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-700">
            v1.0.0
        </span>
      </Link>

      <div className="ml-auto flex items-center space-x-4">
        {/* Add user profile or additional actions here */}
        <div className="hidden md:flex items-center">
            <Link href="/modules" className="text-sm text-slate-400 hover:text-neon-blue transition-colors px-3">Modules</Link>
            <Link href="/search" className="text-slate-400 hover:text-neon-blue transition-colors px-3">
                <Search size={20} />
            </Link>
        </div>
      </div>
    </header>
  );
}
