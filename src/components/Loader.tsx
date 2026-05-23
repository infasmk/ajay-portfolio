import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

const LOG_MESSAGES = [
  "INJECTING GRAPHICS CONTEXT...",
  "ESTABLISHING SYSTEM INERTIA...",
  "MOUNTING INTERACTION TRIGGERS...",
  "COMPOSITION RESOLVED."
];

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress counter with beautiful exponential-like speed
    let start = 0;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 8) + 3;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 800);
        }, 600);
      }
      setProgress(start);
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setLogIndex(0);
    else if (progress < 55) setLogIndex(1);
    else if (progress < 85) setLogIndex(2);
    else setLogIndex(3);
  }, [progress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="cinematic-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-[#ffffff] z-[9999] flex flex-col justify-between p-8 md:p-12 font-sans overflow-hidden select-none"
        >
          {/* Top Line Info */}
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
              <p className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                AURA PORTFOLIO v2.6.4_DEV
              </p>
            </div>
            <p className="text-xs font-mono text-slate-400">
              SYS_OK STATE_ACTIVE
            </p>
          </div>

          {/* Central Logo and Progress */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative flex justify-center items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-6xl md:text-8xl font-sans tracking-tight font-extrabold text-[#111827] flex items-center"
              >
                A
                <motion.span
                  animate={{
                    color: ["#2563eb", "#7c3aed", "#06b6d4", "#2563eb"],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  .
                </motion.span>
                V
              </motion.div>
              
              {/* Spinning Ring */}
              <div className="absolute inset-0 -m-8 border border-slate-100 rounded-full animate-spin [animation-duration:8s] pointer-events-none" />
              <div className="absolute inset-0 -m-12 border border-dashed border-slate-200 rounded-full animate-spin [animation-duration:16s] [animation-direction:reverse] pointer-events-none" />
            </div>

            <div className="flex flex-col items-center space-y-2 mt-4">
              <span className="text-4xl md:text-5xl font-mono font-medium text-slate-900 tracking-tighter">
                {progress}%
              </span>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-linear-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics / Story details */}
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end w-full space-y-4 md:space-y-0 text-left">
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                Diagnostic Pipeline
              </span>
              <div className="h-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={logIndex}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs font-mono text-slate-600 font-medium"
                  >
                    {LOG_MESSAGES[logIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] font-mono text-slate-400">
                CLIENT COORDINATES
              </span>
              <span className="text-xs font-mono text-slate-700 tracking-widest uppercase">
                LIGHT_CINEMATIC_ENGINE
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
