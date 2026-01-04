import React from 'react';
import { Terminal } from 'lucide-react';

const TerminalHeader = () => {
  return (
    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700 sticky top-0 z-10">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
      </div>
      <div className="text-gray-400 flex items-center gap-2 text-xs md:text-sm font-mono opacity-80">
        <Terminal size={14} />
        <span>manish@portfolio — -zsh</span>
      </div>
      <div className="w-10"></div> {/* Spacer for perfect centering */}
    </div>
  );
};

export default TerminalHeader;