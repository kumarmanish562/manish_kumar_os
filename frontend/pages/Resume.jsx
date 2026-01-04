import React from 'react';
import { usePortfolio } from '../src/context/PortfolioContext';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const Resume = () => {
    const { portfolioData } = usePortfolio();
    const { resume } = portfolioData || {};

    if (!resume) return <div>Loading...</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-10rem)] flex flex-col items-center justify-center p-4"
        >
            <div className="glass-panel p-10 flex flex-col items-center text-center max-w-md w-full">
                <div className="w-20 h-20 bg-neon-blue/10 rounded-full flex items-center justify-center text-neon-blue mb-6">
                    <FileText size={40} />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">My Resume</h2>
                <p className="text-gray-400 mb-8">
                    View my professional background, skills, and accomplishments in detail.
                </p>

                <a
                    href={resume.pdf_link || "#"}
                    download
                    className="w-full"
                >
                    <button className="glass-btn w-full flex items-center justify-center gap-2 py-3 bg-neon-blue/10 border-neon-blue/50 hover:bg-neon-blue/20 text-white font-medium">
                        <Download size={20} />
                        Download PDF
                    </button>
                </a>

                {resume.preview_image && (
                    <div className="mt-8 relative group cursor-pointer overflow-hidden rounded-lg border border-white/10 hidden md:block">
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                            Download to view full
                        </div>
                        <img
                            src={resume.preview_image}
                            alt="Resume Preview"
                            className="w-64 opacity-50 blur-[1px] group-hover:blur-sm transition-all grayscale"
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Resume;
