import React, { useState, useEffect } from 'react';
import { IntroSection } from './components/IntroSection';
import { DeepResearchSection } from './components/DeepResearchSection';
import { DeepResearchLoopSection } from './components/DeepResearchLoopSection';
import { DeepThinkSection } from './components/DeepThinkSection';
import { DeepThinkActionSection } from './components/DeepThinkActionSection';
import { DeveloperSection } from './components/DeveloperSection';
import { ValuePropSection } from './components/ValuePropSection';
import { ConclusionSection } from './components/ConclusionSection';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-gemini-purple selection:text-white">
      
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="font-bold tracking-tighter text-xl text-white">GEMINI <span className="text-gray-400 font-light">VISUAL COMPANION</span></div>
        <div className="font-mono text-xs text-gray-400">BRAIN vs BROWSER</div>
      </header>

      <main>
        <IntroSection />
        <DeepResearchSection />
        <DeepResearchLoopSection />
        <DeepThinkSection />
        <DeepThinkActionSection />
        <DeveloperSection />
        <ValuePropSection />
        <ConclusionSection />
      </main>

      {/* Scroll Hint */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500 z-50 pointer-events-none ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}
      >
        <span className="text-xs uppercase tracking-widest text-gray-500">Scroll</span>
        <ArrowDown className="animate-bounce text-white" />
      </div>

      {/* Progress Bar (Simple) */}
      <div className="fixed right-0 top-0 h-full w-1 z-50 flex flex-col justify-center gap-1 p-1">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
           <div key={i} className="w-1 h-1 bg-white/20 rounded-full"></div>
        ))}
      </div>

    </div>
  );
};

export default App;