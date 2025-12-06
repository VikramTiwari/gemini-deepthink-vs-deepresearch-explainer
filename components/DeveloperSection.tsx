import React from 'react';
import { AlertTriangle, Code, DollarSign, Smartphone } from 'lucide-react';

export const DeveloperSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#050505] relative py-20 px-8 border-t border-white/5 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
             <AlertTriangle className="text-yellow-500" />
             05. The Developer’s Dilemma
          </h2>
          <p className="text-gray-400">Balancing capability with cost.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pricing Card */}
            <div className="bg-gemini-surface p-6 rounded-xl border border-white/10 hover:border-yellow-500/50 transition-colors">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Thinking Cost</h3>
                    <DollarSign className="text-green-400" />
                </div>
                <div className="space-y-4 font-mono text-sm">
                    <div className="p-3 bg-black/40 rounded">
                        <p className="text-gray-400 text-xs mb-1">INPUT</p>
                        <p className="text-white">~$0.10 - $0.30 / 1M</p>
                    </div>
                    <div className="p-3 bg-black/40 rounded border border-red-500/20">
                        <p className="text-gray-400 text-xs mb-1">OUTPUT (Thinking Tokens)</p>
                        <p className="text-red-400 font-bold">$0.40 - $3.50+ / 1M</p>
                    </div>
                </div>
            </div>

            {/* The DIY Agent Code */}
            <div className="bg-[#1e1e1e] p-0 rounded-xl border border-white/10 overflow-hidden font-mono text-xs md:col-span-2 shadow-2xl">
                <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <Code size={14} className="text-blue-400" />
                    <span className="text-gray-300">agent_workflow.py</span>
                </div>
                <div className="p-4 text-gray-300 overflow-x-auto">
<pre>{`# The "DIY" Alternative
def deep_research_workflow(query):
    # 1. Plan
    plan = gemini_3_pro.generate(f"Plan search for: {query}")
    
    # 2. Tool Use (Expensive!)
    results = []
    for step in plan.steps:
        # Grounding Tool: $35 / 1k requests
        search_data = google_search_tool.search(step.query)
        results.append(search_data)
        
    # 3. Synthesis
    final_answer = gemini_3_pro.generate(results)
    return final_answer`}</pre>
                </div>
            </div>

            {/* The Solution */}
            <div className="md:col-span-3 mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="p-4 bg-white/5 rounded-full">
                    <Smartphone size={48} className="text-white" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">The Convergence</h3>
                    <p className="text-gray-300 max-w-2xl">
                        Instead of building expensive loops yourself, the Gemini App and API are starting to merge these steps. 
                        Deep Research is becoming a native capability, optimized for latency and cost by Google.
                    </p>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};