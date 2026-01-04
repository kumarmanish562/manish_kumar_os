import React, { useEffect, useRef } from 'react';
import TerminalHeader from '../components/TerminalHeader';
import TerminalInput from '../components/TerminalInput';
import OutputItem from '../components/OutputItem';
import { useTerminal } from '../hooks/useTerminal';

const Home = () => {
  const { history, input, setInput, executeCommand, loading } = useTerminal();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    // Background Layer
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-mono">
      
      {/* The Glassmorphism Terminal Window */}
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden ring-1 ring-white/5">
        
        {/* Header Component */}
        <TerminalHeader />

        {/* Scrollable Content Area */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          
          {/* Map through History */}
          {history.map((item, index) => (
            <OutputItem key={index} data={item} />
          ))}

          {/* Loading State */}
          {loading && <div className="text-gray-500 ml-4 mb-4 italic">Processing...</div>}

          {/* Input Component */}
          <TerminalInput 
            input={input} 
            setInput={setInput} 
            onEnter={executeCommand} 
          />
          
          {/* Invisible div for auto-scroll */}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default Home;