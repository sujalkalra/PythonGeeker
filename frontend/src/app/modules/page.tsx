"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ChevronRight, BookOpen, Terminal, Code2, Braces, Layers, Database, Cpu } from "lucide-react";

interface Topic {
  id: string;
  title: string;
}

interface Module {
  id: string;
  title: string;
  topics: Topic[];
}

const getModuleIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("basics")) return <Terminal size={20} />;
  if (lower.includes("control")) return <Braces size={20} />;
  if (lower.includes("structure")) return <Layers size={20} />;
  if (lower.includes("function")) return <Code2 size={20} />;
  if (lower.includes("data")) return <Database size={20} />;
  return <Cpu size={20} />; // Default
};

export default function ModulesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roadmap`);
        if (res.ok) {
          const data = await res.json();
          setModules(data);
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchModules();
  }, []);

  const filteredModules = modules.map((module) => ({
    ...module,
    topics: module.topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((module) => module.topics.length > 0 || module.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
        <div className="container mx-auto max-w-5xl p-6 flex items-center justify-center min-h-[50vh]">
            <div className="text-slate-400 animate-pulse">Loading course modules from database...</div>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-white">Course Modules</h1>
          <p className="text-slate-400">Master Python step by step.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 py-2 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2"
      >
        {filteredModules.map((module, index) => (
          <motion.div
            key={module.id}
            variants={item}
            className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur transition-all hover:border-slate-700 hover:shadow-xl"
          >
            <div className="absolute top-4 right-4 text-6xl font-black text-slate-800/30 select-none pointer-events-none group-hover:text-slate-800/50 transition-colors">
               {String(index + 1).padStart(2, '0')}
            </div>

            <div className="mb-4 flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                {getModuleIcon(module.title)}
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors z-10">
                {module.title}
              </h2>
            </div>

            <div className="space-y-2">
              {module.topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topic/${topic.id}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <span>{topic.title}</span>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />
          </motion.div>
        ))}
      </motion.div>
      
      {filteredModules.length === 0 && (
        <div className="text-center text-slate-500 py-12">
          No modules or topics found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
