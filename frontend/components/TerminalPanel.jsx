import React, { useState, useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function TerminalPanel() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '> Terminal ready. Type "help" for commands.' },
  ]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => [
      { type: 'output', text: 'Available commands: help, clear, echo <text>, date' },
    ],
    clear: () => null,
    date: () => [{ type: 'output', text: new Date().toString() }],
    echo: (args) => [{ type: 'output', text: args.join(' ') }],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const [cmd, ...args] = input.trim().split(' ');
    const newHistory = [...history, { type: 'input', text: `$ ${input}` }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (commands[cmd]) {
      const output = commands[cmd](args);
      if (output) {
        setHistory([...newHistory, ...output]);
      }
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', text: `Command not found: ${cmd}` },
      ]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm">
      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {history.map((entry, index) => (
          <div
            key={index}
            className={`${
              entry.type === 'input'
                ? 'text-green-400'
                : entry.type === 'error'
                ? 'text-red-400'
                : entry.type === 'system'
                ? 'text-cyan-400'
                : 'text-gray-300'
            }`}
          >
            {entry.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#252526] border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-300"
            placeholder="Type a command..."
          />
        </div>
      </form>
    </div>
  );
}
