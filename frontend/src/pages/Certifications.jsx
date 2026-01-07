import React, { useRef, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Award, Calendar, X, ZoomIn, ShieldCheck, FileBadge } from 'lucide-react';

const Certifications = () => {
    const containerRef = useRef(null);
    const { portfolioData } = usePortfolio();
    const { certifications } = portfolioData || {};
    const [selectedImg, setSelectedImg] = useState(null);

    // --- GSAP Entrance Animation ---
    useGSAP(() => {
        if (!certifications) return;

        const tl = gsap.timeline();

        // 1. Header Reveal
        tl.from(".page-header", { y: -20, opacity: 0, duration: 0.6 })
            .from(".header-badge", { scale: 0.8, opacity: 0, duration: 0.4 }, "-=0.2");

        // 2. Cards Stagger In
        tl.from(".cert-card", {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)"
        }, "-=0.2");

    }, { scope: containerRef, dependencies: [certifications] });

    if (!certifications) return null;

    return (
        <div ref={containerRef} className="min-h-[85vh] w-full px-4 lg:px-8 pb-20 pt-10">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* --- Page Header --- */}
                <div className="page-header text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        CERTIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-600">MASTERY</span>
                    </h1>
                    <div className="header-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 font-mono text-xs tracking-wider">
                        <ShieldCheck size={14} className="text-green-400" />
                        <span>VERIFIED_CREDENTIALS: {certifications.length}</span>
                    </div>
                </div>

                {/* --- Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`card-${idx}`}
                            onClick={() => setSelectedImg(cert.image)}
                            className="cert-card group relative bg-[#0f121a]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 cursor-pointer flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,243,255,0.1)]"
                        >
                            {/* Image Section */}
                            <div className="h-48 w-full overflow-hidden relative border-b border-white/5">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/111827/00f3ff?text=Certificate'; }}
                                />

                                {/* Overlay Icon */}
                                <div className="absolute top-3 right-3 z-20 p-2 bg-black/60 backdrop-blur-md rounded-lg text-white/50 group-hover:text-cyan-400 border border-white/10 transition-colors">
                                    <FileBadge size={18} />
                                </div>

                                {/* Hover Zoom Hint */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                                    <div className="bg-white/10 p-3 rounded-full text-white border border-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <ZoomIn size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-1 relative">
                                {/* Glowing corner accent */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 blur-2xl rounded-full pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>

                                <div className="flex-1 space-y-2">
                                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-medium">
                                        {cert.issuer}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} />
                                        <span>{cert.date}</span>
                                    </div>
                                    <span className="group-hover:text-cyan-400 transition-colors">ID: CONFIRMED</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- Lightbox Modal --- */}
                <AnimatePresence>
                    {selectedImg && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                            onClick={() => setSelectedImg(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="relative max-w-5xl max-h-[90vh] w-full bg-[#0f121a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-black/20">
                                    <div className="flex items-center gap-2 text-white font-mono text-sm">
                                        <Award size={16} className="text-cyan-400" />
                                        CERTIFICATE_PREVIEW_MODE
                                    </div>
                                    <button
                                        onClick={() => setSelectedImg(null)}
                                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Image Container */}
                                <div className="flex-1 overflow-auto p-4 md:p-8 flex items-center justify-center bg-[radial-gradient(circle_at_center,#1a1f2e_0%,#000000_100%)]">
                                    <img
                                        src={selectedImg}
                                        alt="Certificate Full View"
                                        className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-lg border border-white/5"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default Certifications;