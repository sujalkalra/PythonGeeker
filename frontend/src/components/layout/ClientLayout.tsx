"use client";

import { SidebarProvider } from "./SidebarContext";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
        <Sidebar />
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
