import React from 'react';
import { Brain, Globe, Search, FileText } from 'lucide-react';
import { BenchmarkChart } from './ui/BenchmarkChart';

export const IntroSection: React.FC = () => {
  const hleData = [
    { name: 'GPT-4o', value: 9.8, color: '#475569' },
    { name: 'Claude 3.5', value: 12.2, color: '#475569' },
    { name: 'Gemini 3.0', value: 41.0, color: '#9B87F5', highlight: true },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gemini-dark to-black -z-10" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Split Visual */}
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 flex">
          
          {/* Left: Deep Think (Brain) */}
          <div className="w-1/2 bg-black/80 relative flex items-center justify-center border-r border-white/10 group">
            <div className="absolute inset-0 bg-gemini-purple/10 opacity-50 animate-pulse-slow"></div>
            <div className="relative z-10 flex flex-col items-center">
              <Brain size={64} className="text-gemini-purple drop-shadow-[0_0_15px_rgba(155,135,245,0.6)] animate-float" />
              <span className="mt-4 font-mono text-gemini-purple tracking-widest text-sm uppercase">Deep Think</span>
            </div>
          </div>

          {/* Right: Deep Research (Web) */}
          <div className="w-1/2 bg-black/80 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex flex-wrap opacity-20 rotate-12 scale-150">
               {/* Pattern of docs */}
               {Array.from({length: 20}).map((_, i) => (
                 <div key={i} className="m-4">
                   <FileText size={24} className="text-gemini-blue" />
                 </div>
               ))}
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <Globe size={64} className="text-gemini-blue drop-shadow-[0_0_15px_rgba(77,166,255,0.6)] animate-float" style={{animationDelay: '1s'}} />
               {/* Connection Lines simulation */}
               <div className="absolute w-full h-full border-t border-gemini-blue/30 top-1/2 -translate-y-1/2 rotate-45"></div>
               <div className="absolute w-full h-full border-t border-gemini-blue/30 top-1/2 -translate-y-1/2 -rotate-45"></div>
              <span className="mt-4 font-mono text-gemini-blue tracking-widest text-sm uppercase">Deep Research</span>
            </div>
          </div>

        </div>

        {/* Text Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Brain vs. Browser
            </h1>
            <p className="text-xl text-gray-400 font-light">
              Two distinct architectures for two distinct classes of problems.
              Understanding when to use the Weights vs. the Web.
            </p>
          </div>

          <div className="pt-8">
            <BenchmarkChart data={hleData} title="Humanity’s Last Exam (HLE)" />
            <p className="text-xs text-gray-500 mt-2 font-mono">
              *Gemini 3.0 Deep Think drastically outperforms standard models on hard reasoning tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};