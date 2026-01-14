"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SAMPLE_MODULES } from "@/lib/types";
import { Search as SearchIcon, ArrowRight, FileCode, Book } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ type: 'module' | 'topic', title: string, id: string, subtext: string }[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const newResults: typeof results = [];

    SAMPLE_MODULES.forEach((module) => {
      if (module.title.toLowerCase().includes(lowerQuery)) {
        newResults.push({
          type: 'module',
          title: module.title,
          id: module.id,
          subtext: `${module.topics.length} topics`
        });
      }

      module.topics.forEach((topic) => {
        if (topic.title.toLowerCase().includes(lowerQuery) || topic.description.toLowerCase().includes(lowerQuery)) {
          newResults.push({
            type: 'topic',
            title: topic.title,
            id: topic.id,
            subtext: `In ${module.title}`
          });
        }
      });
    });

    setResults(newResults);
  }, [query]);

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-white">Search</h1>
      
      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search for modules, topics, or concepts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full rounded-xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-lg text-white placeholder-slate-500 shadow-lg focus:border-neon-blue focus:outline-none focus:ring-1 focus:ring-neon-blue"
        />
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <Link
            key={`${result.type}-${result.id}-${index}`}
            href={result.type === 'module' ? '/modules' : `/topic/${result.id}`}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 p-4 transition-colors hover:border-slate-700 hover:bg-slate-800"
          >
            <div className="flex items-center">
              <div className={`mr-4 flex h-10 w-10 items-center justify-center rounded-lg ${result.type === 'module' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                {result.type === 'module' ? <Book size={20} /> : <FileCode size={20} />}
              </div>
              <div>
                <h3 className="font-semibold text-white">{result.title}</h3>
                <p className="text-sm text-slate-400">{result.subtext}</p>
              </div>
            </div>
            <ArrowRight size={18} className="text-slate-500" />
          </Link>
        ))}

        {query && results.length === 0 && (
            <div className="text-center text-slate-500 py-8">
                No results found for "{query}"
            </div>
        )}
        
        {!query && (
            <div className="text-center text-slate-600 py-8">
                Type to start searching...
            </div>
        )}
      </div>
    </div>
  );
}
