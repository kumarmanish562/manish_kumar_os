import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, Minus, Square, X as CloseIcon, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Canvas } from '@react-three/fiber';
import { Image, Float, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Terminal = () => {
    const { toggleViewMode } = usePortfolio();
    const [history, setHistory] = useState([
        "Kali GNU/Linux Rolling [Version 2026.1]",
        "System Initialized...",
        "Type 'help' for available commands.",
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

    // Keep focus on input
    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const handleCommand = async (cmd) => {
        if (!cmd.trim()) return;

        const lowerCmd = cmd.trim().toLowerCase();

        if (lowerCmd === 'clear' || lowerCmd === 'cls') {
            setHistory([]);
            return;
        }

        if (lowerCmd === 'gui' || lowerCmd === 'exit') {
            setHistory(prev => [...prev, cmd, "Starting Graphical User Interface..."]);
            setTimeout(() => toggleViewMode('gui'), 800);
            return;
        }

        // Add command to history (we handle the prompt display in the map)
        setIsProcessing(true);

        try {
            // Send to backend
            const res = await fetch('http://localhost:5000/api/command', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: cmd })
            });
            const data = await res.json();

            const outputLines = data.output.split('\n');
            setHistory(prev => [...prev, { type: 'command', cmd }, { type: 'output', lines: outputLines }]);

        } catch (error) {
            setHistory(prev => [...prev, { type: 'command', cmd }, { type: 'output', lines: ["Error: Connection refused"] }]);
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
        <div className="w-full h-screen bg-[url('https://www.kali.org/images/kali-dragon-icon.svg')] bg-cover bg-center bg-no-repeat bg-fixed font-mono overflow-hidden relative">
            {/* Background Overlay to darken */}
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-0"></div>

            {/* FULLSCREEN TERMINAL CONTAINER */}
            <div className="relative z-10 w-full h-full flex flex-col bg-[#1e1f29]">

                {/* CUSTOM MINIMAL TOP BAR */}
                <div className="h-10 bg-[#232433] flex items-center justify-between px-4 select-none border-b border-black shadow-md z-50">

                    {/* LEFT: Identity */}
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                            <User size={14} className="text-slate-300" />
                        </div>
                        <span className="text-sm font-bold text-slate-200 tracking-wide font-sans">Manish Kumar</span>
                    </div>

                    {/* RIGHT: Tools */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => toggleViewMode('gui')}
                            className="flex items-center gap-2 px-3 py-1 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/30 rounded text-xs font-bold uppercase tracking-wider transition-all"
                        >
                            <CloseIcon size={14} />
                            Exit Terminal
                        </button>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="flex flex-1 overflow-hidden relative">

                    {/* Left: Interactive Terminal */}
                    <div
                        className="flex-1 p-4 bg-transparent overflow-y-auto text-sm"
                        onClick={handleTerminalClick}
                        style={{ fontFamily: '"Fira Code", monospace' }}
                    >
                        {history.map((item, i) => {
                            if (typeof item === 'string') return <div key={i} className="text-gray-300 mb-1">{item}</div>;

                            if (item.type === 'command') {
                                return (
                                    <div key={i} className="mb-0">
                                        <div className="flex flex-wrap">
                                            <span className="text-[#3271d4] mr-2">┌──(</span>
                                            <span className="text-[#dd464c] font-bold">root㉿kali</span>
                                            <span className="text-[#3271d4]">)-[</span>
                                            <span className="text-white">~</span>
                                            <span className="text-[#3271d4]">]</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-[#3271d4] mr-2">└─#</span>
                                            <span className="text-white">{item.cmd}</span>
                                        </div>
                                    </div>
                                );
                            }

                            if (item.type === 'output') {
                                return (
                                    <div key={i} className="mb-2 text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {item.lines.map((line, idx) => <div key={idx}>{line}</div>)}
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {/* Active Input Line */}
                        <div className="mt-0">
                            <div className="flex flex-wrap">
                                <span className="text-[#3271d4] mr-2">┌──(</span>
                                <span className="text-[#dd464c] font-bold">root㉿kali</span>
                                <span className="text-[#3271d4]">)-[</span>
                                <span className="text-white">~</span>
                                <span className="text-[#3271d4]">]</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[#3271d4] mr-2">└─#</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent border-none outline-none text-white flex-1 caret-white"
                                    autoFocus
                                    disabled={isProcessing}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div ref={bottomRef}></div>
                    </div>

                    {/* Right: Neofetch / System Info Panel */}
                    <RightPanel />
                </div>

                {/* Absolute Bottom Status Bar (Kali style) */}
                <div className="h-6 bg-[#16171d] border-t border-black flex items-center justify-between px-2 text-[10px] text-gray-500 select-none">
                    <div className="flex gap-4">
                        <span>NORMAL</span>
                        <span>master*</span>
                        <span>utf-8</span>
                    </div>
                    <div className="flex gap-4">
                        <span>Ln 1, Col 1</span>
                        <span>Fira Code</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Extracted Component to use Hooks cleanly
const RightPanel = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.profile-card', {
            opacity: 0,
            scale: 0.9,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
        });
    }, []);

    return (
        <div ref={containerRef} className="hidden lg:flex w-5/12 bg-[#121212] border-l border-black flex-col items-center justify-center font-sans z-20 shadow-2xl relative overflow-hidden">
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Glassy/Premium Profile Card */}
            <div className="profile-card relative w-80 h-[32rem] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-700/50 group bg-gray-900">
                {/* Image - Grayscale & High Contrast */}
                <div className="absolute inset-0">
                    <img
                        src="/profile.jpg"
                        alt="Manish Kumar"
                        className="w-full h-full object-cover grayscale contrast-110 brightness-90 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Manish Kumar</h2>
                    <p className="text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-3">@manishkumar.dev</p>
                    <div className="h-[1px] w-12 bg-gray-600 mb-4"></div>
                    <p className="text-gray-300 text-sm leading-relaxed font-light">
                        Full Stack Web Developer | React & Node.js | AI/ML Enthusiast
                    </p>
                </div>

                {/* Top Corner Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
