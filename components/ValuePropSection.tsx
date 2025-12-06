import React, { useState, useEffect } from 'react';
import { DollarSign, Server, Search, Check, Calculator, Sparkles } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  // Simulation State
  const [simulationStep, setSimulationStep] = useState(0);
  const [diyCost, setDiyCost] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [reportsGenerated, setReportsGenerated] = useState(0);

  // Constants
  const SEARCH_COST_PER_UNIT = 0.035; // $35 per 1000 = $0.035 per search
  const TOKEN_COST_PER_M = 4.00; // Blended input/output thinking cost approx $4/1M for ease
  const SUB_COST = 19.99;

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulationStep((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulation Logic: Every tick represents activity
    // Let's say 1 report = 50 searches + 100k tokens
    
    // Reset if it gets too high to loop the visual
    if (reportsGenerated > 5) {
        setSimulationStep(0);
        setDiyCost(0);
        setSearchCount(0);
        setTokenCount(0);
        setReportsGenerated(0);
        return;
    }

    // Add activity
    setSearchCount(prev => prev + 2); // 2 searches per tick
    setTokenCount(prev => prev + 5000); // 5k tokens per tick

    // Update Cost
    const sCost = searchCount * SEARCH_COST_PER_UNIT;
    const tCost = (tokenCount / 1000000) * TOKEN_COST_PER_M;
    const total = sCost + tCost;
    setDiyCost(total);

    // Increment Report Count roughly every $7 (simulating a heavy task)
    if (Math.floor(total / 7) > reportsGenerated) {
        setReportsGenerated(Math.floor(total / 7));
    }

  }, [simulationStep]);

  const isMoreExpensive = diyCost > SUB_COST;

  return (
    <section className="min-h-screen bg-gemini-dark relative py-20 px-8 border-t border-white/5 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">06. The Value Equation</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Why building it yourself is expensive, and why the subscription is a "steal".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* LEFT: THE DIY BILL */}
            <div className={`
                relative p-8 rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${isMoreExpensive ? 'border-red-500/50 bg-red-900/10' : 'border-white/10 bg-gemini-surface'}
            `}>
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-800 rounded-lg">
                            <Server className="text-gray-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">The DIY Path</h3>
                            <p className="text-xs text-gray-500 font-mono">PAY-PER-TOKEN / API</p>
                        </div>
                    </div>
                    {isMoreExpensive && (
                        <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded animate-pulse">
                            COST EXCEEDED
                        </span>
                    )}
                </div>

                <div className="space-y-4 font-mono text-sm mb-8">
                    {/* Item 1: Search */}
                    <div className="flex justify-between items-center text-gray-300">
                        <div className="flex items-center gap-2">
                            <Search size={14} className="text-blue-400" />
                            <span>Google Search Grounding</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-500 text-xs mr-2">{searchCount} reqs</span>
                            <span>${(searchCount * SEARCH_COST_PER_UNIT).toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-600 pl-6">Rate: $35.00 / 1,000 requests</div>

                    {/* Item 2: Tokens */}
                    <div className="flex justify-between items-center text-gray-300">
                        <div className="flex items-center gap-2">
                            <Calculator size={14} className="text-purple-400" />
                            <span>Gemini 3.0 Pro Reasoning</span>
                        </div>
                        <div className="text-right">
                            <span className="text-gray-500 text-xs mr-2">{(tokenCount / 1000).toFixed(0)}k toks</span>
                            <span>${((tokenCount / 1000000) * TOKEN_COST_PER_M).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Total */}
                <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                    <div className="text-xs text-gray-500">
                        Simulated Workload:<br/>
                        <span className="text-white">{reportsGenerated} Deep Research Reports</span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400">TOTAL COST</span>
                        <div className={`text-4xl font-bold tracking-tighter transition-colors ${isMoreExpensive ? 'text-red-400' : 'text-white'}`}>
                            ${diyCost.toFixed(2)}
                        </div>
                    </div>
                </div>

                {/* Background Graphs */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                     <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${Math.min((diyCost / 30) * 100, 100)}%` }}></div>
                </div>
            </div>


            {/* RIGHT: THE SUBSCRIPTION */}
            <div className={`
                relative p-8 rounded-2xl border-2 transition-all duration-500 bg-gradient-to-br from-gemini-surface to-gemini-purple/20
                ${isMoreExpensive ? 'border-gemini-purple scale-105 shadow-[0_0_50px_rgba(155,135,245,0.3)]' : 'border-white/10 scale-100'}
            `}>
                 <div className="absolute top-0 right-0 p-4">
                    <Sparkles className={`text-gemini-purple ${isMoreExpensive ? 'animate-spin' : ''}`} size={24} />
                 </div>

                 <div className="mb-8">
                    <h3 className="text-xl font-bold text-white">Gemini Advanced</h3>
                    <p className="text-xs text-gemini-purple font-mono">MONTHLY SUBSCRIPTION</p>
                 </div>

                 <div className="space-y-6 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Check size={12} className="text-green-400" /></div>
                        <div>
                            <p className="font-bold text-white">Deep Research Agent</p>
                            <p className="text-xs text-gray-400">Unlimited* access to the iterative loop.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Check size={12} className="text-green-400" /></div>
                        <div>
                            <p className="font-bold text-white">Deep Think (Reasoning)</p>
                            <p className="text-xs text-gray-400">Hidden chain-of-thought tokens included.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-green-500/20 p-1 rounded-full"><Check size={12} className="text-green-400" /></div>
                        <div>
                            <p className="font-bold text-white">No API Integration</p>
                            <p className="text-xs text-gray-400">Zero setup time.</p>
                        </div>
                    </div>
                 </div>

                 <div className="border-t border-white/10 pt-4 flex justify-between items-end">
                    <div className="text-xs text-gray-400">
                        Flat Rate
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-gray-400">TOTAL COST</span>
                        <div className="text-4xl font-bold text-gemini-purple tracking-tighter">
                            $19.99
                            <span className="text-sm text-gray-400 font-normal ml-1">/mo</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        {/* Caption */}
        <div className="mt-12 text-center opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]">
            <p className="text-gray-400 italic">
                "For individual consumers, unlimited access to the Deep Research agent<br/>and Deep Think toggles is actually a steal."
            </p>
        </div>

      </div>
    </section>
  );
};