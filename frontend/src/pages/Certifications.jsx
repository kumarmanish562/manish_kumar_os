import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, X, ZoomIn } from 'lucide-react';

const Certifications = () => {
    const { portfolioData } = usePortfolio();
    const { certifications } = portfolioData || {};
    const [selectedImg, setSelectedImg] = useState(null);

    if (!certifications) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto space-y-8"
        >
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-purple-500">
                Certifications
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
                {certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        layoutId={`card-${idx}`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedImg(cert.image)}
                        className="group relative bg-[#0f121a]/60 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer"
                    >
                        {/* Image Section */}
                        <div className="h-48 w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f121a] to-transparent z-10 opacity-60" />
                            <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay Icon */}
                            <div className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-lg text-cyan-400 border border-white/10">
                                <Award size={20} />
                            </div>

                            {/* Zoom Indicator */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/60 backdrop-blur-sm p-3 rounded-full text-white border border-white/20">
                                    <ZoomIn size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 relative z-20">
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                {cert.title}
                            </h3>
                            <div className="flex flex-col gap-2">
                                <span className="text-gray-400 text-sm font-medium">
                                    {cert.issuer}
                                </span>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                                    <Calendar size={12} />
                                    {cert.date}
                                </div>
                            </div>

                            {/* View Certificate Button */}
                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="text-xs text-cyan-400 font-mono">CLICK TO VIEW CERTIFICATE</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
                        onClick={() => setSelectedImg(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] w-full bg-[#0f121a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImg(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImg}
                                alt="Certificate Full View"
                                className="w-full h-full object-contain max-h-[85vh]"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Certifications;
