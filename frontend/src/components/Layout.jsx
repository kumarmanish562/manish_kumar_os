import React, { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Background3D from "./Background3D";
import FullScreenTerminal from "./FullScreenTerminal";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const Layout = () => {
  const { viewMode } = usePortfolio();
  const contentRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (viewMode === 'gui' && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [viewMode]);

  if (viewMode === 'terminal') return <FullScreenTerminal />;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-transparent text-gray-300 font-sans selection:bg-cyan-500/30">

      <Background3D />

      {/* Interactive Elements need pointer-events-auto */}
      <div className="pointer-events-auto">
        <TopBar />
        <Sidebar />
      </div>

      {/* Main Content Wrapper */}
      {/* ADDED: pointer-events-none to let clicks pass through to background */}
      <div className="absolute top-10 left-14 right-0 bottom-8 overflow-hidden flex flex-col z-10 pointer-events-none">
        <main
          ref={contentRef}
          // ADDED: pointer-events-auto so you can still scroll and click content
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar p-6 scroll-smooth pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

            <div className="h-20"></div>
          </div>
        </main>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 z-50 bg-[#0d1117]/80 backdrop-blur pointer-events-auto">
        <Footer />
      </div>

    </div>
  );
};

export default Layout;