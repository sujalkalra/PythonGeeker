"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "./SidebarContext";
import { Home, BookOpen, Search, Info, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { SAMPLE_MODULES } from "@/lib/types"; // Deprecated
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap`);
        if (res.ok) {
          const data = await res.json();
          setModules(data);
          // Expand first module by default
          if (data.length > 0) {
            setExpandedModules([data[0].id]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchModules();
  }, []);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-800 bg-slate-950 p-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                PythonGeeker
              </h2>
              <button onClick={close} className="p-1 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-2">
              <NavItem href="/" icon={<Home size={20} />} label="Home" onClick={close} />
              
              <div className="pt-2">
                <div className="flex items-center px-4 py-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">
                  <BookOpen size={16} className="mr-2" />
                  Modules
                </div>
                
                {isLoading ? (
                    <div className="px-4 py-2 text-xs text-slate-500 animate-pulse">Loading course structure...</div>
                ) : (
                    <div className="space-y-1 mt-1">
                      {modules.map((module) => (
                        <div key={module.id} className="px-2">
                          <button
                            onClick={() => toggleModule(module.id)}
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
                          >
                            <span>{module.title}</span>
                            {expandedModules.includes(module.id) ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </button>
                          
                          <AnimatePresence>
                            {expandedModules.includes(module.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden pl-4"
                              >
                                {module.topics.map((topic) => (
                                  <Link
                                    key={topic.id}
                                    href={`/topic/${topic.id}`}
                                    onClick={close}
                                    className="block rounded-md px-3 py-2 text-sm text-slate-400 hover:text-neon-blue hover:bg-slate-900/50"
                                  >
                                    {topic.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                )}
              </div>

              <NavItem href="/search" icon={<Search size={20} />} label="Search" onClick={close} />
              <NavItem href="/about" icon={<Info size={20} />} label="About" onClick={close} />
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function NavItem({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center rounded-md px-4 py-3 text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
    >
      <span className="mr-3">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
