
import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

import TopBar from './TopBar';

const Terminal = () => {
    const { toggleViewMode } = usePortfolio();
    const [history, setHistory] = useState([
        "Welcome to Portfolio OS Terminal [Version 1.0.0]",
        "(c) 2026 Manish Kumar. All rights reserved.",
        "Type 'help' for a list of commands.",
        ""
    ]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Keep focus on input (only if clicking within the terminal area)
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = async (cmd) => {
        if (!cmd.trim()) return;

        // Local client-side commands
        const lowerCmd = cmd.trim().toLowerCase();

        if (lowerCmd === 'clear' || lowerCmd === 'cls') {
            setHistory([]);
            return;
        }

        if (lowerCmd === 'gui' || lowerCmd === 'exit') {
            setHistory(prev => [...prev, `guest @portfolio: ~$ ${cmd} `, "Switching to GUI mode..."]);
            setTimeout(() => toggleViewMode('gui'), 800);
            return;
        }

        // Add command to history
        setHistory(prev => [...prev, `guest @portfolio: ~$ ${cmd} `]);
        setIsProcessing(true);

        try {
            // Send to backend
            const res = await fetch('http://localhost:5000/api/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: cmd })
            });
            const data = await res.json();

            // Format output (handle newlines)
            const outputLines = data.output.split('\n');
            setHistory(prev => [...prev, ...outputLines]);

        } catch (error) {
            setHistory(prev => [...prev, `Error: Server not reachable.`]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <div className="w-full h-screen bg-black text-green-500 font-mono text-lg overflow-hidden relative flex flex-col">
            {/* Top Navigation Bar */}
            <TopBar />

            {/* Main Content Area (Split View) */}
            <div className="flex flex-1 pt-12">

                {/* Left: Terminal Input Area */}
                <div
                    className="flex-1 p-6 overflow-y-auto relative border-r border-green-900/30"
                    onClick={handleTerminalClick}
                    style={{ scrollbarWidth: 'none' }}
                >
                    {/* Scanline Effect (Local to terminal pane) */}
                    <div className="absolute inset-0 z-50 pointer-events-none scanline opacity-10"></div>
                    <div className="absolute inset-0 z-50 pointer-events-none bg-white opacity-[0.02] animate-pulse"></div>

                    <div className="max-w-4xl mx-auto h-full pb-10">
                        {history.map((line, i) => (
                            <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
                        ))}

                        <div className="flex items-center">
                            <span className="mr-2">guest@portfolio:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-green-500 flex-1 caret-green-500"
                                autoFocus
                                disabled={isProcessing}
                            />
                        </div>
                        <div ref={bottomRef}></div>
                    </div>
                </div>

                {/* Right: Hacker/Profile Image Panel */}
                <div className="hidden md:flex w-1/3 bg-black border-l border-green-900/30 flex-col items-center justify-center p-8 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                    {/* Glitchy Profile Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-64 h-64 bg-black rounded-lg overflow-hidden border border-green-500/30">
                            <img
                                src="/profile.jpg"
                                alt="Agent Profile"
                                className="w-full h-full object-cover filter grayscale sepia-[.5] hover:grayscale-0 transition-all duration-500"
                            />
                            {/* Overlay Lines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                        </div>
                    </div>

                    <div className="mt-8 w-full space-y-4">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-green-700 uppercase tracking-widest">
                                <span>System Status</span>
                                <span>Online</span>
                            </div>
                            <div className="w-full bg-green-900/20 h-1 rounded-full overflow-hidden">
                                <div className="bg-green-500 w-[92%] h-full"></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-green-700 uppercase tracking-widest">
                                <span>Encryption</span>
                                <span>AES-256</span>
                            </div>
                            <div className="w-full bg-green-900/20 h-1 rounded-full overflow-hidden">
                                <div className="bg-green-500 w-[100%] h-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;

