import React from 'react';
import { Brain, Globe } from 'lucide-react';

export const ConclusionSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center p-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Background merging animation */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
         <div className="w-[500px] h-[500px] bg-gradient-to-r from-gemini-blue to-gemini-purple rounded-full blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl w-full z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
          The Final Heuristic
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Deep Research Heuristic */}
          <div className="group relative p-8 rounded-2xl bg-gemini-surface/50 border border-gemini-blue/30 hover:bg-gemini-blue/10 transition-all duration-500">
            <div className="absolute -top-6 left-8 bg-gemini-dark p-2 border border-gemini-blue rounded-full">
              <Globe className="text-gemini-blue" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 mt-2">Need Facts from the World?</h3>
            <p className="text-gray-400 mb-6">Real-time data, checking pricing, reading latest papers.</p>
            <div className="inline-block px-4 py-2 bg-gemini-blue text-black font-bold rounded-full">
              Use Deep Research
            </div>
            <div className="mt-4 text-xs font-mono text-gemini-blue/70">
              Trait: Agentic, Tools, Slow
            </div>
          </div>

          {/* Deep Think Heuristic */}
          <div className="group relative p-8 rounded-2xl bg-gemini-surface/50 border border-gemini-purple/30 hover:bg-gemini-purple/10 transition-all duration-500">
            <div className="absolute -top-6 left-8 bg-gemini-dark p-2 border border-gemini-purple rounded-full">
              <Brain className="text-gemini-purple" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 mt-2">Need Logic from the Weights?</h3>
            <p className="text-gray-400 mb-6">Coding, math optimization, complex reasoning within context.</p>
            <div className="inline-block px-4 py-2 bg-gemini-purple text-black font-bold rounded-full">
              Use Deep Think
            </div>
            <div className="mt-4 text-xs font-mono text-gemini-purple/70">
              Trait: RL, Hidden Tokens, Expensive
            </div>
          </div>

        </div>

        <div className="mt-20 text-center opacity-0 animate-[float_4s_ease-in-out_2s_forwards] fill-mode-forwards" style={{animationFillMode: 'forwards'}}>
          <p className="text-3xl font-light tracking-[0.5em] uppercase text-white">Build Smarter.</p>
        </div>

      </div>
    </section>
  );
};