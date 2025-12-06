import React from 'react';
import { Search, Globe, FileText, ChevronRight, Database } from 'lucide-react';

export const DeepResearchSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gemini-dark relative py-20 px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gemini-blue mb-2">01. Deep Research: Architecture</h2>
          <p className="text-gray-400">Iterative agentic workflow for gathering external facts.</p>
        </div>

        {/* Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative">
          
          {/* Node 1: Planner */}
          <div className="bg-gemini-surface border border-gemini-blue/20 p-6 rounded-xl relative z-10 flex flex-col items-center text-center hover:border-gemini-blue/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <Database className="text-gemini-blue" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">The Planner</h3>
            <ul className="text-sm text-gray-400 text-left w-full space-y-2 bg-black/20 p-3 rounded">
              <li className="flex items-center"><ChevronRight size={12} className="mr-2 text-gemini-blue"/> 1. Search Competitors</li>
              <li className="flex items-center"><ChevronRight size={12} className="mr-2 text-gemini-blue"/> 2. Scrape Pricing</li>
              <li className="flex items-center"><ChevronRight size={12} className="mr-2 text-gemini-blue"/> 3. Synthesize</li>
            </ul>
          </div>

          {/* Animated Connectors */}
          <div className="hidden md:flex absolute top-1/2 left-0 w-full justify-between px-20 -translate-y-1/2 pointer-events-none z-0">
            <div className="h-[2px] w-full bg-gradient-to-r from-gemini-blue/10 via-gemini-blue/50 to-gemini-blue/10 animate-pulse"></div>
          </div>

          {/* Node 2: Tools */}
          <div className="bg-gemini-surface border border-gemini-blue/20 p-6 rounded-xl relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <Search className="text-green-400" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">Tools</h3>
            <div className="flex gap-2">
               <span className="px-2 py-1 rounded bg-black/40 text-xs font-mono text-gray-300 border border-white/10">Headless Browser</span>
               <span className="px-2 py-1 rounded bg-black/40 text-xs font-mono text-gray-300 border border-white/10">Search API</span>
            </div>
          </div>

           {/* Node 3: Context */}
           <div className="bg-gemini-surface border border-gemini-blue/20 p-6 rounded-xl relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <FileText className="text-purple-400" size={32} />
            </div>
            <h3 className="text-lg font-bold mb-2">Context Window</h3>
            <div className="w-full bg-black/40 h-8 rounded-full overflow-hidden relative border border-white/10">
               <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-[80%]"></div>
               <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold tracking-wider">1,000,000 TOKENS</span>
            </div>
          </div>

        </div>

        {/* Use Case Card */}
        <div className="bg-gradient-to-r from-gemini-surface to-black border-l-4 border-gemini-blue p-8 rounded-r-xl max-w-2xl">
          <h4 className="text-sm font-bold text-gemini-blue tracking-widest uppercase mb-4">When to use Deep Research</h4>
          <p className="text-2xl font-light italic text-white mb-2">"Find the pricing of these 5 competitors."</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Globe size={16} />
            <span>Requires live browsing, reading PDFs, and current data.</span>
          </div>
        </div>

      </div>
    </section>
  );
};