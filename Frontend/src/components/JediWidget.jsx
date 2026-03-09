import React, { useState } from "react";
import { useJediGestures } from "../hooks/useJediGestures";
import { motion, AnimatePresence } from "framer-motion";
import { Hand, Power, PowerOff, Info } from "lucide-react";

const JediWidget = () => {
  const [isActive, setIsActive] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { videoRef, isReady } = useJediGestures(isActive);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-4">
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.6)] bg-black"
          >
            {/* Dark overlay to make video less distracting */}
            <div className="absolute inset-0 bg-cyan-900/30 backdrop-blur-[2px] z-10 pointer-events-none rounded-full flex items-center justify-center">
               {!isReady && <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent animate-spin rounded-full"></div>}
            </div>
            
            <video
              ref={videoRef}
              className="w-full h-full object-cover transform -scale-x-100" // Mirror video
              autoPlay
              playsInline
              muted
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isActive
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              : "bg-zinc-900/80 text-gray-400 border border-zinc-700 hover:text-white backdrop-blur-md"
          }`}
        >
          {isActive ? (
            <>
              <Hand size={20} className="animate-pulse" />
              <span>Jedi Mode ON</span>
            </>
          ) : (
            <>
              <PowerOff size={20} />
              <span>Jedi Mode</span>
            </>
          )}
        </button>

        <button 
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          onClick={() => setShowInfo(!showInfo)}
          className="p-3 rounded-full bg-zinc-900/80 text-gray-400 border border-zinc-700 hover:text-cyan-400 hover:border-cyan-500/50 backdrop-blur-md transition-all z-50"
        >
          <Info size={20} />
        </button>
      </div>

      {/* Helper text balloon */}
      <AnimatePresence>
        {(isActive || showInfo) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 left-0 w-72 bg-black/95 backdrop-blur-xl p-5 rounded-2xl text-sm text-cyan-100 border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)] origin-bottom-left"
          >
            <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2"><Hand size={16}/> How to use Jedi Mode</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><strong className="text-white">1. Get back:</strong> Sit 1-2 feet away.</li>
              <li><strong className="text-white">2. Open Palm:</strong> Show your open hand to the camera.</li>
              <li><strong className="text-white">3. Flick Left/Right:</strong> Quick swipe horizontally to scroll carousels.</li>
              <li><strong className="text-white">4. Flick Up/Down:</strong> Quick swipe vertically to scroll the page.</li>
            </ul>
             <p className="mt-3 text-xs text-cyan-500/80 italic">Tip: Use fast, sharp movements like a flick!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JediWidget;
