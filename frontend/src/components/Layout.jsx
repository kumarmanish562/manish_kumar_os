import React, { useRef, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { usePortfolio } from "../context/PortfolioContext";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import Background3D from "./Background3D";
import FullScreenTerminal from "./FullScreenTerminal";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const Layout = () => {
  const { viewMode } = usePortfolio();
  const contentRef = useRef(null);
  const location = useLocation();

  // Entrance Animation
  useEffect(() => {
    if (viewMode === 'gui' && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, scale: 0.98, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      );
    }
  }, [viewMode]);

  if (viewMode === 'terminal') return <FullScreenTerminal />;

  return (
    <div className="relative w-screen h-screen overflow-hidden text-gray-200">

      {/* 1. Background Layer (Fixed & Behind) */}
      <Background3D />

      {/* 2. UI Layer (TopBar & Sidebar) - Clickable */}
      <div className="relative z-50 pointer-events-auto">
        <TopBar />
        <Sidebar />
      </div>

      {/* 3. Content Layer - Scrollable */}
      {/* 'pointer-events-none' on wrapper allows clicks to pass through empty spaces */}
      {/* 3. Content Layer - Scrollable */}
      {/* 'pointer-events-none' on wrapper allows clicks to pass through empty spaces */}
      <div className="absolute inset-0 top-14 left-0 lg:left-20 overflow-hidden pointer-events-none z-10 w-full">
        <main
          ref={contentRef}
          className="h-full w-full overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-32 md:pb-8 pointer-events-auto scroll-smooth custom-scrollbar"
        >
          <div className="max-w-7xl mx-auto min-h-[85vh] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="flex-1 w-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
};

export default Layout;