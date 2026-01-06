// src/components/FullScreenTerminal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';

const FullScreenTerminal = () => {
    const { toggleViewMode } = usePortfolio();
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'Initializing Portfolio OS v2.0...' },
        { type: 'system', content: 'Access Granted. Welcome, User.' },
        { type: 'info', content: 'Type "help" for available commands.' }
    ]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
    }, [history]);

    // Command Handler
    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'user', content: input }];

            // Command Logic
            switch (cmd) {
                case 'help':
                    newHistory.push({ type: 'response', content: 'Available commands: help, clear, gui, about, projects, contact, whoami' });
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'gui':
                case 'exit':
                    newHistory.push({ type: 'system', content: 'Switching to GUI Mode...' });
                    setHistory(newHistory);
                    setTimeout(() => toggleViewMode(), 800);
                    setInput('');
                    return;
                case 'ls':
                    newHistory.push({ type: 'response', content: 'home  about  skills  projects  education  contact' });
                    break;
                case 'whoami':
                    newHistory.push({ type: 'response', content: 'root_user: Manish Kumar' });
                    break;
                case 'about':
                    navigate('/about');
                    newHistory.push({ type: 'response', content: 'Opening About module in background...' });
                    break;
                default:
                    newHistory.push({ type: 'error', content: `Command not found: ${cmd}` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black text-green-500 font-mono p-6 overflow-hidden z-50 selection:bg-green-500/30 selection:text-black"
            onClick={() => inputRef.current?.focus()}
        >
            {/* CRT Scanline Effect Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[60] bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="max-w-4xl mx-auto h-full overflow-y-auto custom-scrollbar pb-10">
                {history.map((line, i) => (
                    <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-500' : line.type === 'user' ? 'text-white' : 'text-green-400'}`}>
                        {line.type === 'user' ? '> ' : ''}{line.content}
                    </div>
                ))}

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-500">{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="flex-1 bg-transparent border-none outline-none text-white caret-green-500"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default FullScreenTerminal;