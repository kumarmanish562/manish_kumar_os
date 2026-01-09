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
    const [welcomeLines] = useState(() => {
        const now = new Date();
        const version = `${now.getFullYear()}.${now.getMonth() + 1}`;
        const dateStr = now.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return [
            `Manish Kumar OS [Version ${version}]`,
            `System Initialized on ${dateStr}`,
            "Type 'help' for available commands.",
            ""
        ];
    });

    const [history, setHistory] = useState([]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Command History State
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

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

        // Save to command history
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        if (lowerCmd === 'clear' || lowerCmd === 'cls') {
            setHistory([]);
            return;
        }

        if (lowerCmd === 'gui' || lowerCmd === 'exit') {
            setHistory(prev => [...prev, { type: 'command', cmd }, { type: 'output', lines: ["Starting Graphical User Interface..."] }]);
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
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                } else {
                    setHistoryIndex(-1);
                    setInput("");
                }
            }
        }
    };

    return (
        <div className="w-full h-screen bg-gray-50 dark:bg-[url('https://www.kali.org/images/kali-dragon-icon.svg')] bg-cover bg-center bg-no-repeat bg-fixed font-mono overflow-hidden relative transition-colors duration-300">
            {/* Background Overlay to darken */}
            <div className="absolute inset-0 bg-gray-100/90 dark:bg-slate-900/95 backdrop-blur-sm z-0 transition-colors duration-300"></div>

            {/* FULLSCREEN TERMINAL CONTAINER */}
            <div className="relative z-10 w-full h-full flex flex-col bg-white dark:bg-[#1e1f29] transition-colors duration-300">

                {/* CUSTOM MINIMAL TOP BAR */}
                <div className="h-10 bg-gray-200 dark:bg-[#232433] flex items-center justify-between px-4 select-none border-b border-gray-300 dark:border-black shadow-md z-50 transition-colors duration-300">

                    {/* LEFT: Identity */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 overflow-hidden">
                            <img
                                src="/profile.jpg"
                                alt="User"
                                className="w-full h-full object-cover dark:grayscale contrast-125 brightness-110 hover:grayscale dark:hover:grayscale-0 transition-all"
                                style={{
                                    maskImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                                    WebkitMaskImage: 'radial-gradient(circle, black 1px, transparent 1px)',
                                    maskSize: '2px 2px',
                                    WebkitMaskSize: '2px 2px'
                                }}
                            />
                        </div>
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200 tracking-wide font-sans transition-colors duration-300">Manish Kumar</span>
                    </div>

                    {/* RIGHT: Tools */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => toggleViewMode('gui')}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-lg border-2 border-blue-600 dark:border-[#3b82f6] bg-blue-100 dark:bg-[#1d4ed8]/20 hover:bg-blue-200 dark:hover:bg-[#1d4ed8]/30 text-blue-700 dark:text-[#60a5fa] hover:text-blue-900 dark:hover:text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-md dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                        >
                            <CloseIcon size={16} strokeWidth={2.5} />
                            GUI MODE
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
                        {/* Static Welcome Message */}
                        {welcomeLines.map((item, i) => (
                            <div key={`welcome-${i}`} className="text-gray-900 dark:text-gray-300 mb-1 font-bold">{item}</div>
                        ))}

                        {/* Dynamic History */}
                        {history.map((item, i) => {
                            if (typeof item === 'string') return <div key={i} className="text-gray-900 dark:text-gray-300 mb-1 font-medium">{item}</div>;

                            if (item.type === 'command') {
                                return (
                                    <div key={i} className="mb-0">
                                        <div className="flex flex-wrap">
                                            <span className="text-blue-600 dark:text-[#3271d4] mr-2">┌──(</span>
                                            <span className="text-red-600 dark:text-[#dd464c] font-bold">root㉿manish</span>
                                            <span className="text-blue-600 dark:text-[#3271d4]">)-[</span>
                                            <span className="text-gray-800 dark:text-white">~</span>
                                            <span className="text-blue-600 dark:text-[#3271d4]">]</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-blue-600 dark:text-[#3271d4] mr-2">└─#</span>
                                            <span className="text-gray-800 dark:text-white">{item.cmd}</span>
                                        </div>
                                    </div>
                                );
                            }

                            if (item.type === 'output') {
                                return (
                                    <div key={i} className="mb-2 text-gray-900 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                                        {item.lines.map((line, idx) => {
                                            // 1. Key-Value pairs (e.g. "BIO: ...")
                                            const matchKV = line.match(/^(\s*)([^:]+)(:\s*)(.*)$/);
                                            if (matchKV) {
                                                const [_, indent, key, colon, value] = matchKV;
                                                const isHeader = !value.trim();
                                                return (
                                                    <div key={idx} className="flex items-baseline">
                                                        <span className="whitespace-pre">{indent}</span>
                                                        <span className={`${isHeader ? 'text-cyan-600 dark:text-cyan-400 font-bold underline decoration-cyan-400/30 underline-offset-4' : 'text-green-600 dark:text-green-400 font-semibold'} shrink-0`}>
                                                            {key}
                                                        </span>
                                                        <span className="text-gray-700 dark:text-gray-500 mr-2 whitespace-pre shrink-0">{colon}</span>

                                                        {/* Check if value is a URL or Image Path */}
                                                        {(() => {
                                                            const trimmed = value.trim();
                                                            const isUrl = trimmed.startsWith('http://') || trimmed.startsWith('https://');
                                                            const isLocalFile = trimmed.startsWith('/') && /\.(jpg|jpeg|png|gif|webp|svg|pdf)$/i.test(trimmed);
                                                            const isEmail = trimmed.includes('@') && !trimmed.includes(' ');

                                                            const keyUpper = key.trim().toUpperCase();
                                                            const shouldRenderImage = (keyUpper === 'PREVIEW IMAGE' || keyUpper === 'IMAGE') && (isUrl || isLocalFile);

                                                            const isPdf = trimmed.toLowerCase().endsWith('.pdf');

                                                            if (shouldRenderImage) {
                                                                return (
                                                                    <div key={idx} className="flex flex-col items-start w-full">
                                                                        <div className="flex items-baseline mb-2">
                                                                            <span className="whitespace-pre">{indent}</span>
                                                                            <span className="text-green-600 dark:text-green-400 font-semibold shrink-0">
                                                                                {key}
                                                                            </span>
                                                                            <span className="text-gray-700 dark:text-gray-500 mr-2 whitespace-pre shrink-0">{colon}</span>
                                                                        </div>
                                                                        {isPdf ? (
                                                                            <div className="w-full md:max-w-3xl h-[600px] border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#1e1e1e] mt-2 shadow-sm">
                                                                                <iframe
                                                                                    src={trimmed}
                                                                                    className="w-full h-full rounded"
                                                                                    title="PDF Preview"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <a href={trimmed} target="_blank" rel="noopener noreferrer" className="block w-full">
                                                                                <img
                                                                                    src={trimmed}
                                                                                    alt={key}
                                                                                    className="w-full max-w-full md:max-w-2xl rounded border border-gray-700 hover:opacity-90 transition-opacity"
                                                                                />
                                                                            </a>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }

                                                            if (isUrl || isLocalFile) {
                                                                return (
                                                                    <a
                                                                        href={trimmed}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex-1 break-words text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                                                    >
                                                                        {value}
                                                                    </a>
                                                                );
                                                            } else if (isEmail) {
                                                                return (
                                                                    <a
                                                                        href={`mailto:${trimmed}`}
                                                                        className="flex-1 break-words text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                                                    >
                                                                        {value}
                                                                    </a>
                                                                );
                                                            }

                                                            return <span className="text-gray-900 dark:text-gray-300 flex-1 break-words font-medium">{value}</span>;
                                                        })()}
                                                    </div>
                                                );
                                            }

                                            // 2. Help/List Items (e.g. "about   - Info")
                                            const matchList = line.match(/^(\s*)(\w+)(\s+-\s+)(.*)$/);
                                            if (matchList) {
                                                const [_, indent, cmd, separator, desc] = matchList;
                                                return (
                                                    <div key={idx} className="flex">
                                                        <span className="whitespace-pre">{indent}</span>
                                                        <span className="text-orange-600 dark:text-yellow-400 font-bold">{cmd}</span>
                                                        <span className="text-gray-700 dark:text-gray-500 whitespace-pre">{separator}</span>
                                                        <span className="text-gray-900 dark:text-gray-300 font-medium">{desc}</span>
                                                    </div>
                                                );
                                            }

                                            // Default (Handle empty lines from backend newlines)
                                            if (!line.trim()) {
                                                return <div key={idx} className="h-6"></div>;
                                            }
                                            return <div key={idx}>{line}</div>
                                        })}
                                    </div>
                                );
                            }
                            return null;
                        })}

                        {/* Active Input Line */}
                        <div className="mt-0">
                            <div className="flex flex-wrap">
                                <span className="text-blue-600 dark:text-[#3271d4] mr-2">┌──(</span>
                                <span className="text-red-600 dark:text-[#dd464c] font-bold">root㉿manish</span>
                                <span className="text-blue-600 dark:text-[#3271d4]">)-[</span>
                                <span className="text-gray-800 dark:text-white">~</span>
                                <span className="text-blue-600 dark:text-[#3271d4]">]</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-blue-600 dark:text-[#3271d4] mr-2">└─#</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="bg-transparent border-none outline-none text-gray-900 dark:text-white flex-1 caret-gray-900 dark:caret-white"
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
                <div className="h-6 bg-gray-200 dark:bg-[#16171d] border-t border-gray-300 dark:border-black flex items-center justify-between px-2 text-[10px] text-gray-600 dark:text-gray-500 select-none transition-colors duration-300">
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
        <div ref={containerRef} className="hidden lg:flex w-5/12 bg-gray-50 dark:bg-[#121212] border-l border-gray-300 dark:border-black flex-col items-center justify-center font-sans z-20 shadow-2xl relative overflow-hidden transition-colors duration-300">
            {/* Dot Pattern Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Glassy/Premium Profile Card - Flexible Height, Fixed Width */}
            <div className="profile-card relative flex flex-col w-[22rem] h-[95%] mt-4 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700/50 group bg-white dark:bg-gray-900 transition-colors duration-300">
                {/* Image Section - Maximized (78%) */}
                <div className="relative w-full h-[78%] bg-black overflow-hidden">
                    <img
                        src="/profile.jpg"
                        alt="Manish Kumar"
                        className="w-full h-full object-cover dark:grayscale contrast-125 brightness-110 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale dark:group-hover:grayscale-0"
                        style={{
                            maskImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                            WebkitMaskImage: 'radial-gradient(circle, black 1.5px, transparent 1.5px)',
                            maskSize: '4px 4px',
                            WebkitMaskSize: '4px 4px'
                        }}
                    />
                </div>

                {/* Content Section - Compact Footer (22%) */}
                <div
                    className="relative w-full h-[22%] flex flex-col items-center justify-center p-4 text-center z-10 bg-gray-50 dark:bg-[#0c0d12] border-t border-gray-200 dark:border-white/5 transition-colors duration-300"
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">Manish Kumar</h2>
                    <p className="text-cyan-600 dark:text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-2">kumarmanish562.dev</p>
                    <div className="h-[1px] w-12 bg-gray-300 dark:bg-gray-600 mb-2"></div>
                    <p className="text-gray-900 dark:text-gray-300 text-xs leading-relaxed font-medium">
                        Full Stack Web Developer | React & Node.js
                    </p>
                </div>

                {/* Top Corner Icon */}
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 z-20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
