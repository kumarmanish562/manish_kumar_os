import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const Resume = () => {
    const { portfolioData } = usePortfolio();
    const { resume } = portfolioData || {};

    if (!resume) return <div>Loading...</div>;

    return (
        <div className="min-h-[85vh] w-full px-4 lg:px-8 pb-10 pt-10 flex flex-col">
            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col space-y-8">

                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            CURRICULUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">VITAE</span>
                        </h1>
                        <p className="text-slate-500 dark:text-gray-400 font-mono text-sm mt-2">
                             // OFFICIAL_DOCUMENT_VIEWER_V1.0
                        </p>
                    </div>

                    <a
                        href={resume.pdf_link}
                        download="Manish_Kumar_Resume.pdf"
                        className="group relative px-6 py-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/50 text-cyan-600 dark:text-cyan-400 font-bold tracking-wide overflow-hidden hover:bg-cyan-500 hover:text-white dark:hover:text-black transition-all duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Download size={20} />
                            DOWNLOAD_PDF
                        </span>
                        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    </a>
                </div>

                {/* PDF Viewer Container */}
                <div className="flex-1 w-full relative group">
                    {/* Decorative Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity duration-500"></div>

                    <div className="relative w-full h-[70vh] md:h-[100vh] bg-white dark:bg-[#0f121a] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
                        <object
                            data={resume.pdf_link}
                            type="application/pdf"
                            className="w-full h-full"
                        >
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                                <FileText size={48} className="text-gray-600" />
                                <p>Unable to display PDF directly.</p>
                                <a href={resume.pdf_link} className="text-cyan-400 hover:underline">Download instead</a>
                            </div>
                        </object>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Resume;
