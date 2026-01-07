import React, { useState, useRef, useEffect } from 'react';

export default function TerminalPanel() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Kali GNU/Linux Rolling [Version 2026.1]' },
    { type: 'system', text: 'Type "help" for commands.' },
  ]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands: help, clear, echo <text>, date, whoami' },
    ],
    clear: () => null,
    date: () => [{ type: 'output', text: new Date().toString() }],
    echo: (args) => [{ type: 'output', text: args.join(' ') }],
    whoami: () => [{ type: 'output', text: 'root' }],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const [cmd, ...args] = input.trim().split(' ');
    // Add command with proper visual structure to history
    const newHistory = [...history, { type: 'input', text: input }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[cmd]) {
      const output = commands[cmd](args);
      if (output) {
        setHistory([...newHistory, ...output]);
      } else {
        setHistory(newHistory);
      }
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `zsh: command not found: ${cmd}` },
      ]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1f29] text-gray-300 font-mono text-xs overflow-hidden">
      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        style={{ fontFamily: '"Fira Code", monospace' }}
      >
        {history.map((entry, index) => {
          if (entry.type === 'input') {
            return (
              <div key={index} className="mb-1">
                <div className="flex flex-wrap">
                  <span className="text-[#3271d4] mr-1">┌──(</span>
                  <span className="text-[#dd464c] font-bold">root㉿kali</span>
                  <span className="text-[#3271d4]">)-[</span>
                  <span className="text-white">~</span>
                  <span className="text-[#3271d4]">]</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#3271d4] mr-2">└─#</span>
                  <span className="text-white">{entry.text}</span>
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className={`leading-tight whitespace-pre-wrap ml-1 ${entry.type === 'error' ? 'text-red-400' :
                  entry.type === 'system' ? 'text-blue-400' : 'text-gray-300'
                }`}
            >
              {entry.text}
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-2 bg-[#232433] border-t border-black">
        <div className="flex flex-col">
          <div className="flex flex-wrap">
            <span className="text-[#3271d4] mr-1">┌──(</span>
            <span className="text-[#dd464c] font-bold">root㉿kali</span>
            <span className="text-[#3271d4]">)-[</span>
            <span className="text-white">~</span>
            <span className="text-[#3271d4]">]</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#3271d4] mr-2">└─#</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white caret-white"
              placeholder=""
              autoComplete="off"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
