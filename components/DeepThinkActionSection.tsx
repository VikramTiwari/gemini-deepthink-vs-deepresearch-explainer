import React, { useState, useEffect } from 'react';
import { Brain, RefreshCw, CheckCircle, XCircle, ChevronRight, Lightbulb, ArrowRight, ArrowDown, Loader2 } from 'lucide-react';

// Types for our Grid
type GridData = number[][];
const GRID_SIZE = 4;

// Colors: 0=Empty, 1=Red, 2=Green, 3=Blue
const COLORS = [
  'bg-[#1e293b]', // Empty (Slate-800)
  'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]',   // Red
  'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]', // Green
  'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]'   // Blue
];

const GridDisplay: React.FC<{ data: GridData; label: string; active?: boolean; status?: 'neutral'|'success'|'error' }> = ({ data, label, active, status = 'neutral' }) => {
  let borderColor = 'border-white/10';
  if (status === 'success') borderColor = 'border-green-500';
  if (status === 'error') borderColor = 'border-red-500';
  if (active && status === 'neutral') borderColor = 'border-gemini-purple';

  return (
    <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${active ? 'scale-105' : 'opacity-80'}`}>
      <span className={`text-xs font-mono uppercase tracking-widest ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
        {label}
      </span>
      <div className={`grid grid-cols-4 gap-1 p-2 bg-black rounded-lg border-2 ${borderColor} transition-colors duration-300`}>
        {data.map((row, r) => (
          row.map((cell, c) => (
            <div 
              key={`${r}-${c}`} 
              className={`w-8 h-8 rounded-sm transition-all duration-300 ${COLORS[cell]}`}
            />
          ))
        ))}
      </div>
    </div>
  );
};

export const DeepThinkActionSection: React.FC = () => {
  // --- PUZZLE DATA ---
  // Task: "Gravity" - Objects fall to the bottom row.
  
  const inputGrid: GridData = [
    [1, 0, 0, 0], // Red at top
    [0, 2, 0, 0], // Green middle
    [0, 0, 0, 0],
    [0, 0, 3, 0]  // Blue at bottom
  ];

  // Hypothesis 1: Move Right (Wrong)
  const hypothesis1Grid: GridData = [
    [0, 0, 0, 1], 
    [0, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 3] 
  ];

  // Hypothesis 2: Gravity (Correct)
  const hypothesis2Grid: GridData = [
    [0, 0, 0, 0], 
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 2, 3, 0] 
  ];

  // --- STATE MACHINE ---
  const [phase, setPhase] = useState(0); 
  // 0: Start
  // 1: Thinking (Hypothesis 1)
  // 2: Visualization 1 (Show Move Right)
  // 3: Evaluation 1 (Reject)
  // 4: Thinking (Backtrack)
  // 5: Visualization 2 (Show Gravity)
  // 6: Evaluation 2 (Accept/Success)

  const [thoughts, setThoughts] = useState<string[]>([]);
  const [displayedGrid, setDisplayedGrid] = useState<GridData>([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  
  // Animation Loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const runPhase = (p: number) => {
      setPhase(p);
      
      switch (p) {
        case 0: // Reset
          setThoughts(['> Observing Input Grid...']);
          setDisplayedGrid(Array(4).fill(Array(4).fill(0)));
          timer = setTimeout(() => runPhase(1), 1500);
          break;
          
        case 1: // Think 1
          setThoughts(prev => [...prev, '> Objects detected: Red, Green, Blue.', '> Hypothesis 1: Objects move to the far right edge.']);
          timer = setTimeout(() => runPhase(2), 2000);
          break;

        case 2: // Vis 1
          setDisplayedGrid(hypothesis1Grid);
          timer = setTimeout(() => runPhase(3), 2000);
          break;

        case 3: // Reject
          setThoughts(prev => [...prev, '> Checking pattern consistency...', '> ERROR: Transformation rule invalid for column 3.', '> ACTION: Backtracking...']);
          timer = setTimeout(() => runPhase(4), 2000);
          break;

        case 4: // Think 2
          setThoughts(prev => [...prev, '> Hypothesis 2: Vertical Gravity (Drop to bottom).']);
          setDisplayedGrid(Array(4).fill(Array(4).fill(0))); // clear
          timer = setTimeout(() => runPhase(5), 1500);
          break;

        case 5: // Vis 2
          setDisplayedGrid(hypothesis2Grid);
          timer = setTimeout(() => runPhase(6), 2000);
          break;

        case 6: // Success
          setThoughts(prev => [...prev, '> Verification: Consistent across all examples.', '> SOLUTION FOUND.']);
          timer = setTimeout(() => runPhase(0), 5000); // Loop back
          break;
      }
    };

    runPhase(phase === 0 ? 0 : phase);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to start loop logic (state updates handle recursion)

  // Helper for scrolling log
  const logContainerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [thoughts]);

  // Helper to visualize the rule being applied
  const getRuleStatus = () => {
    if (phase <= 1) return { text: "ANALYZING...", color: "text-gray-500", bg: "bg-gray-900", icon: Loader2, animate: true };
    if (phase <= 3) return { text: "TRY: SHIFT RIGHT", color: phase === 3 ? "text-red-400" : "text-white", bg: phase === 3 ? "bg-red-900/20" : "bg-white/10", icon: ArrowRight, animate: false };
    if (phase === 4) return { text: "BACKTRACKING...", color: "text-gemini-purple", bg: "bg-purple-900/20", icon: RefreshCw, animate: true };
    return { text: "TRY: GRAVITY", color: phase === 6 ? "text-green-400" : "text-white", bg: phase === 6 ? "bg-green-900/20" : "bg-white/10", icon: ArrowDown, animate: false };
  }

  const status = getRuleStatus();
  const StatusIcon = status.icon;

  return (
    <section className="min-h-screen bg-black relative py-20 px-8 border-t border-white/5 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gemini-purple mb-2">04. Deep Think: In Action</h2>
          <p className="text-gray-400">Visualizing the hidden chain of thought on an ARC-AGI reasoning task.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: THE PUZZLE VISUALIZATION */}
          <div className="bg-gemini-surface/30 p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 relative overflow-hidden h-[400px]">
            {/* Background Neural Pulse */}
            <div className={`absolute inset-0 bg-gemini-purple/5 transition-opacity duration-500 ${phase === 1 || phase === 4 ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

            <div className="flex items-center gap-4 md:gap-8 z-10 w-full justify-center">
              {/* Input */}
              <GridDisplay data={inputGrid} label="Input" />

              {/* Dynamic Rule Indicator */}
              <div className="flex flex-col items-center gap-2 min-w-[140px]">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Hypothesis</span>
                
                <div className={`
                    flex flex-col items-center justify-center gap-1 w-full py-2 px-3 rounded-lg border border-white/5
                    transition-all duration-300 ${status.bg}
                `}>
                    <StatusIcon 
                        size={20} 
                        className={`transition-colors duration-300 ${status.color} ${status.animate ? 'animate-spin' : ''}`} 
                    />
                    <span className={`text-[10px] font-bold font-mono tracking-wider ${status.color}`}>
                        {status.text}
                    </span>
                </div>

                {/* Connecting Line */}
                <div className="h-[2px] w-full bg-white/10 relative mt-1">
                    <div className={`absolute left-0 top-0 h-full bg-gemini-purple transition-all duration-1000 ${phase === 2 || phase === 5 ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>

              {/* Output (Dynamic) */}
              <div className="relative">
                 <GridDisplay 
                    data={displayedGrid} 
                    label="Prediction" 
                    active={phase === 2 || phase === 5} 
                    status={phase === 3 ? 'error' : phase === 6 ? 'success' : 'neutral'}
                 />
                 
                 {/* Status Icons Overlay */}
                 {phase === 3 && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg animate-[fadeIn_0.2s]">
                      <XCircle className="text-red-500 w-12 h-12" />
                   </div>
                 )}
                 {phase === 6 && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg animate-[fadeIn_0.2s]">
                      <CheckCircle className="text-green-500 w-12 h-12" />
                   </div>
                 )}
              </div>
            </div>
            
            <div className="text-xs text-gray-400 font-mono mt-8 text-center max-w-sm">
              <span className="text-white font-bold">TASK:</span> Objects are scattered. Determine where they go based on hidden physical rules.
            </div>
          </div>

          {/* RIGHT: THE THOUGHT STREAM */}
          <div className="flex flex-col h-[400px]">
            
            <div className="flex items-center gap-2 mb-4">
               <Brain size={20} className="text-gemini-purple" />
               <h3 className="font-bold text-white tracking-widest text-sm">INTERNAL MONOLOGUE (HIDDEN)</h3>
            </div>

            <div 
              ref={logContainerRef}
              className="flex-1 bg-black border border-white/20 rounded-xl p-6 font-mono text-sm overflow-y-auto relative shadow-inner custom-scrollbar"
            >
               {/* Scanline effect */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

               <div className="relative z-0 space-y-3">
                 {thoughts.map((t, i) => (
                   <div key={i} className={`
                      ${t.includes('ERROR') ? 'text-red-400' : 
                        t.includes('SOLUTION') ? 'text-green-400 font-bold' : 
                        t.includes('Hypothesis') ? 'text-gemini-purple' : 'text-gray-300'}
                      animate-[fadeIn_0.5s_ease-out]
                   `}>
                     {t}
                   </div>
                 ))}
                 {(phase === 1 || phase === 4) && (
                   <div className="flex gap-1 items-center text-gemini-purple">
                     <span className="w-1.5 h-1.5 bg-gemini-purple rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                     <span className="w-1.5 h-1.5 bg-gemini-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                     <span className="w-1.5 h-1.5 bg-gemini-purple rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                   </div>
                 )}
               </div>
            </div>

            {/* Explanation Card */}
            <div className="mt-6 bg-white/5 p-4 rounded-lg border-l-2 border-gemini-purple flex gap-3">
               <Lightbulb className="text-yellow-400 shrink-0" size={20} />
               <p className="text-sm text-gray-400">
                 <span className="text-white font-bold">Reinforcement Learning</span> enables the model to simulate an outcome, evaluate if it makes sense, and "backtrack" if it's wrong—all before showing you the answer.
               </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
