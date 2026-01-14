"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Terminal, Copy, RotateCcw } from "lucide-react";

interface ConsoleProps {
  output: { type: 'stdout' | 'stderr' | 'info'; content: string }[];
  isError?: boolean;
  isLoading?: boolean;
}

export function Console({ output, isError, isLoading }: ConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-800 bg-[#0a0e14] font-mono text-sm shadow-2xl overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-[#111620] px-4 py-2 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
             <Terminal size={12} />
             <span className="text-xs font-medium tracking-wide">TERMINAL</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase text-slate-600 font-bold tracking-wider">Python 3.10</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2 text-slate-500 animate-pulse">
             <span className="text-neon-blue">➜</span>
             <span>Executing script...</span>
          </div>
        ) : output.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-700 space-y-2 opacity-50 select-none">
             <Terminal size={32} />
             <p className="text-xs">Ready to run</p>
          </div>
        ) : (
          <div className="space-y-1">
             {/* Simulating a prompt start */}
             <div className="flex items-center space-x-2 text-slate-500 text-xs mb-2 pb-2 border-b border-slate-800/50">
                 <span className="text-green-500">➜</span>
                 <span>python3 main.py</span>
             </div>
             
             {output.map((line, i) => (
               <div key={i} className={cn(
                   "whitespace-pre-wrap break-words leading-relaxed tracking-wide",
                   line.type === 'stderr' ? "text-red-400" : 
                   line.type === 'info' ? "text-blue-400 italic" : 
                   "text-slate-200"
               )}>
                 {line.content}
               </div>
             ))}

             {/* Cursor blinking at the end */}
             <div className="inline-block w-2 h-4 bg-slate-500 animate-pulse ml-0.5 align-middle opacity-50" />
          </div>
        )}
      </div>
    </div>
  );
}
