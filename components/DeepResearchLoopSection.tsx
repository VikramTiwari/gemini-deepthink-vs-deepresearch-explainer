import React, { useState, useEffect } from 'react';
import { Target, Search, BookOpen, RefreshCw, FileText, User, CheckCircle } from 'lucide-react';

export const DeepResearchLoopSection: React.FC = () => {
  // Sequence of steps to animate through
  // Nodes: 'start', 'plan', 'search', 'read', 'refine', 'write'
  const sequence = [
    'start',
    'plan', 
    'search', 'read', 'refine', // Loop 1
    'plan', 'search', 'read', 'refine', // Loop 2
    'write'
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const activeStepId = sequence[stepIndex];
  
  // Timings per step type
  useEffect(() => {
    let timeout = 1500;
    if (activeStepId === 'start') timeout = 1000;
    if (activeStepId === 'write') timeout = 4000; // Stay longer on end

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % sequence.length);
    }, timeout);

    return () => clearTimeout(timer);
  }, [activeStepId, sequence.length]);

  // Determine loop count for display logic
  const loopCount = stepIndex > 4 && stepIndex < 9 ? 2 : 1;

  // Node Definitions
  const nodes = [
    { id: 'start', label: 'USER QUERY', icon: User, x: 60, y: 200, color: 'text-white' },
    { id: 'plan', label: 'PLAN', icon: Target, x: 240, y: 200, color: 'text-blue-400' },     // West
    { id: 'search', label: 'SEARCH', icon: Search, x: 350, y: 90, color: 'text-green-400' },   // North
    { id: 'read', label: 'READ', icon: BookOpen, x: 460, y: 200, color: 'text-yellow-400' },   // East
    { id: 'refine', label: 'REFINE', icon: RefreshCw, x: 350, y: 310, color: 'text-purple-400' }, // South
    { id: 'write', label: 'REPORT', icon: FileText, x: 700, y: 200, color: 'text-white' },
  ];

  // Helper to get node by ID
  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  // Connection Paths
  const renderPath = (fromId: string, toId: string, isActive: boolean, isCurvedExit = false) => {
    const from = getNode(fromId);
    const to = getNode(toId);
    
    let d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    
    // Custom curves for better aesthetics
    if (fromId === 'search' && toId === 'read') {
        // Top to Right - curve
        d = `M ${from.x} ${from.y} Q ${to.x} ${from.y} ${to.x} ${to.y}`;
    } else if (fromId === 'read' && toId === 'refine') {
        // Right to Bottom - curve
        d = `M ${from.x} ${from.y} Q ${from.x} ${to.y} ${to.x} ${to.y}`;
    } else if (fromId === 'refine' && toId === 'plan') {
        // Bottom to West (Loop close) - curve
        d = `M ${from.x} ${from.y} Q ${to.x} ${from.y} ${to.x} ${to.y}`;
    } else if (fromId === 'plan' && toId === 'search') {
        // West to Top - curve
        d = `M ${from.x} ${from.y} Q ${from.x} ${to.y} ${to.x} ${to.y}`;
    } else if (isCurvedExit) {
        // Refine to Write (Exit) - S curve
        d = `M ${from.x} ${from.y} C ${from.x + 100} ${from.y}, ${to.x - 100} ${to.y}, ${to.x} ${to.y}`;
    }

    return (
      <path
        d={d}
        fill="none"
        stroke={isActive ? (fromId === 'refine' && toId === 'write' ? '#ffffff' : '#60A5FA') : '#334155'}
        strokeWidth={isActive ? 3 : 1}
        className="transition-all duration-300"
        strokeDasharray={isActive ? "0" : "4 4"}
      />
    );
  };

  // Log Logic
  const getLogContent = () => {
    if (activeStepId === 'start') return '> Receiving user query...';
    if (activeStepId === 'write') return '> Synthesis complete.\n> Generating final report.';
    
    if (loopCount === 1) {
       if (activeStepId === 'plan') return '> Phase 1: Initial Plan.\n> Goal: Broad market scan.';
       if (activeStepId === 'search') return '> Executing Search queries...\n> "Competitor pricing models 2025"';
       if (activeStepId === 'read') return '> Reading 12 sources...\n> Parsing HTML & PDFs.';
       if (activeStepId === 'refine') return '> Analysis: Gaps detected in Enterprise tier.\n> Decision: Iterate.';
    } else {
       if (activeStepId === 'plan') return '> Phase 2: Refined Plan.\n> Goal: Target specific missing data.';
       if (activeStepId === 'search') return '> Executing Search queries...\n> "Adyen vs Stripe enterprise volume discounts"';
       if (activeStepId === 'read') return '> Reading 4 specific documents...\n> Extracting tables.';
       if (activeStepId === 'refine') return '> Analysis: All data points found.\n> Decision: Finalize.';
    }
    return '...';
  };

  return (
    <section className="min-h-screen bg-gemini-dark relative py-20 px-8 border-t border-white/5 flex flex-col justify-center">
      <div className="max-w-6xl w-full mx-auto">
        
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gemini-blue mb-2">02. Deep Research: The Loop</h2>
          <p className="text-gray-400">It doesn't just search once. It loops, reads, and refines until it's satisfied.</p>
        </div>

        {/* VISUALIZATION AREA */}
        <div className="relative w-full h-[400px] bg-[#0F172A]/50 rounded-2xl border border-white/5 mb-8 overflow-hidden select-none">
            
            {/* SVG Layer for lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Paths */}
                {/* Start -> Plan */}
                {renderPath('start', 'plan', activeStepId !== 'start')}
                
                {/* Loop: Plan -> Search -> Read -> Refine -> Plan */}
                {renderPath('plan', 'search', ['search', 'read', 'refine', 'write'].includes(activeStepId))}
                {renderPath('search', 'read', ['read', 'refine', 'write'].includes(activeStepId))}
                {renderPath('read', 'refine', ['refine', 'write'].includes(activeStepId))}
                
                {/* Loop Back: Refine -> Plan (Only active if we are looping back) */}
                {renderPath('refine', 'plan', loopCount === 2 && ['plan', 'search', 'read', 'refine'].includes(activeStepId))}

                {/* Exit: Refine -> Write (Only active at the end) */}
                {renderPath('refine', 'write', activeStepId === 'write', true)}

            </svg>

            {/* Nodes DOM Elements */}
            <div className="absolute inset-0 w-full h-full max-w-[800px] mx-auto relative">
                {nodes.map((node) => {
                    const isActive = node.id === activeStepId;
                    const isPassed = sequence.indexOf(node.id) < stepIndex; // Simple check, strictly for linear visuals logic often needs more complex checking for loops, but isActive is main visual driver here.
                    
                    return (
                        <div 
                            key={node.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 transition-all duration-500"
                            style={{ left: `${(node.x / 800) * 100}%`, top: `${(node.y / 400) * 100}%` }}
                        >
                            {/* Icon Circle */}
                            <div className={`
                                w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-2xl relative bg-gemini-dark z-10
                                ${isActive ? `border-white scale-110 shadow-[0_0_30px_rgba(77,166,255,0.4)]` : 'border-white/10 opacity-70 scale-100'}
                            `}>
                                <node.icon size={24} className={isActive ? node.color : 'text-gray-600'} />
                                
                                {/* Pulse Effect if active */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-full border border-white opacity-0 animate-ping"></div>
                                )}
                            </div>

                            {/* Label */}
                            <div className={`
                                text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border backdrop-blur-md transition-colors
                                ${isActive ? 'bg-white/10 border-white/50 text-white' : 'bg-black/40 border-white/5 text-gray-500'}
                            `}>
                                {node.label}
                            </div>

                            {/* Contextual Status for loop */}
                            {node.id === 'refine' && isActive && (
                                <div className="absolute top-20 w-32 text-center text-xs font-mono text-purple-300 bg-purple-900/50 px-2 py-1 rounded">
                                    {loopCount === 1 ? "Gaps Found ↺" : "Complete ✓"}
                                </div>
                            )}

                        </div>
                    );
                })}

                {/* Center Label for Loop */}
                <div className="absolute left-[44%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-30 pointer-events-none">
                    <RefreshCw size={100} className="text-white" />
                </div>

            </div>
        </div>

        {/* Terminal / Log */}
        <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-4 font-mono text-sm h-32 flex flex-col justify-between shadow-inner">
            <div className="flex items-center gap-2 text-gray-500 text-xs border-b border-white/5 pb-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                AGENT_LOG.txt
            </div>
            <div className="text-gray-300 whitespace-pre-line">
                {getLogContent()}
                <span className="animate-pulse text-gemini-blue ml-1">_</span>
            </div>
            <div className="mt-2 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-gemini-blue transition-all duration-500 ease-linear" 
                    style={{ width: `${((stepIndex + 1) / sequence.length) * 100}%` }}
                ></div>
            </div>
        </div>

      </div>
    </section>
  );
};
