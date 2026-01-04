import React from 'react';

const TerminalInput = ({ input, setInput, onEnter }) => {
  return (
    <div className="flex items-center pb-2">
      <span className="text-pink-500 font-bold mr-3 shrink-0">visitor@portfolio:~$</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onEnter();
        }}
        autoFocus
        className="w-full bg-transparent border-none outline-none text-gray-200 font-mono placeholder-gray-600"
        placeholder="Type 'help'..."
        spellCheck="false"
      />
    </div>
  );
};

export default TerminalInput;