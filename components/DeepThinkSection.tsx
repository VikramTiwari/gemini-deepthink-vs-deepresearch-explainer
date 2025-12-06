import React from 'react';
import { Brain } from 'lucide-react';
import { NeuralNetwork } from './ui/NeuralNetwork';
import { BenchmarkChart } from './ui/BenchmarkChart';

export const DeepThinkSection: React.FC = () => {
    
  const gpqaData = [
    { name: 'O1 Preview', value: 82, color: '#475569' },
    { name: 'Gemini 3.0', value: 94, color: '#9B87F5', highlight: true },
  ];

  const arcData = [
    { name: 'Claude 3.5', value: 24, color: '#475569' },
    { name: 'Gemini 3.0', value: 45.1, color: '#9B87F5', highlight: true },
  ];

  return (
    <section className="min-h-screen bg-black relative py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gemini-purple mb-2">03. Architecture of Deep Think</h2>
          <p className="text-gray-400">Parallel reasoning trails within the model weights.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            
            {/* Visual: Parallel Thinking */}
            <div className="bg-gemini-surface/30 rounded-2xl border border-white/5 p-4 overflow-hidden">
                <div className="flex justify-between items-center mb-4 px-4">
                    <h3 className="font-mono text-sm text-gray-400">VISUALIZATION: PARALLEL REASONING</h3>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-1 text-xs text-red-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> Linear (Old)</div>
                        <div className="flex items-center gap-1 text-xs text-gemini-purple"><div className="w-2 h-2 rounded-full bg-gemini-purple"></div> Parallel (New)</div>
                    </div>
                </div>
                {/* D3 Component showing complex tree */}
                <NeuralNetwork mode="complex" />
            </div>

            {/* Benchmarks */}
            <div className="space-y-6">
                <BenchmarkChart data={gpqaData} title="GPQA Diamond (PhD Level Q&A)" />
                <BenchmarkChart data={arcData} title="ARC-AGI-2 (Abstract Reasoning)" />
            </div>
        </div>

        {/* Use Case Card */}
        <div className="bg-gradient-to-r from-gemini-surface to-black border-l-4 border-gemini-purple p-8 rounded-r-xl max-w-2xl ml-auto">
          <h4 className="text-sm font-bold text-gemini-purple tracking-widest uppercase mb-4">When to use Deep Think</h4>
          <p className="text-2xl font-light italic text-white mb-2">"Write a Python script to optimize this supply chain algorithm."</p>
          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Brain size={16} />
            <span>Requires internal logic, math, and coding. No external data needed.</span>
          </div>
        </div>

      </div>
    </section>
  );
};