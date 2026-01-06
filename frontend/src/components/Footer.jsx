import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative w-full mt-20">

            {/* Gradient top border */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="w-full py-8 bg-[#0d1117]/60 backdrop-blur-xl border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">

                    {/* Left */}
                    <div className="text-center md:text-left">
                        <p className="font-medium text-gray-300 tracking-wide">
                            © {new Date().getFullYear()} YourName
                        </p>
                        <p className="text-xs mt-1 text-gray-500">
                            Built with React, Flask & a lot of ☕
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="group text-gray-400 hover:text-cyan-400 transition-all duration-300"
                        >
                            <Github
                                size={18}
                                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                            />
                        </a>

                        <a
                            href="https://linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="group text-gray-400 hover:text-blue-400 transition-all duration-300"
                        >
                            <Linkedin
                                size={18}
                                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                            />
                        </a>

                        <a
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="group text-gray-400 hover:text-purple-400 transition-all duration-300"
                        >
                            <Twitter
                                size={18}
                                className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
