import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative w-full mt-20">

            {/* Gradient top border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="w-full py-8 bg-[#0d1117]/60 backdrop-blur-xl border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">

                    {/* Left: Identity */}
                    <div className="text-center md:text-left">
                        <p className="font-medium text-gray-300 tracking-wide text-lg font-mono">
                            © {new Date().getFullYear()} Manish Kumar
                        </p>
                        <p className="text-xs mt-1 text-gray-500 font-mono">
                            System.exit(0) // shutting down...
                        </p>
                    </div>

                    {/* Center: Contact Details */}
                    <div className="flex flex-col items-center md:items-start gap-1 text-xs font-mono text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="text-cyan-500">EMAIL:</span>
                            <a href="mailto:kumar.manish.in.0328@gmail.com" className="hover:text-cyan-400 transition-colors">kumar.manish.in.0328@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-500">PHONE:</span>
                            <span>+91 9334170932</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-purple-500">LOC:</span>
                            <span>India</span>
                        </div>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/kumarmanish562"
                            target="_blank"
                            rel="noreferrer"
                            className="group text-gray-400 hover:text-cyan-400 transition-all duration-300"
                        >
                            <Github
                                size={20}
                                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                            />
                        </a>

                        <a
                            href="https://linkedin.com/in/kumarmanish562"
                            target="_blank"
                            rel="noreferrer"
                            className="group text-gray-400 hover:text-blue-400 transition-all duration-300"
                        >
                            <Linkedin
                                size={20}
                                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                            />
                        </a>

                        <a
                            href="mailto:kumar.manish.in.0328@gmail.com"
                            className="group text-gray-400 hover:text-purple-400 transition-all duration-300"
                        >
                            <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
