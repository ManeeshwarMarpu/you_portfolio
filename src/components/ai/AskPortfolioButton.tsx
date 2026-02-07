import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, Sparkles } from "lucide-react";
import AskPortfolioChat from "./AskPortfolioChat";

export default function AskPortfolioButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="relative group"
            >
              {/* --- TOOLTIP --- */}
              <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap">
                  Ask My AI Assistant
                </div>
                {/* Tooltip Arrow */}
                <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 absolute -bottom-1 right-6" />
              </div>

              {/* --- PULSING BACKGROUND EFFECT --- */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-red-600 rounded-full blur-xl"
              />

              {/* --- MAIN BUTTON --- */}
              <button
                onClick={() => setOpen(true)}
                className="relative flex items-center gap-3 bg-zinc-900 dark:bg-white text-white dark:text-black p-4 md:p-5 rounded-full shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:shadow-[0_20px_50px_rgba(220,38,38,0.5)] transition-all duration-500 group"
              >
                <div className="relative">
                  <MessageSquareText className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  <Sparkles className="w-3 h-3 text-red-600 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em] pr-2">
                  Ask Portfolio
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- THE CHAT COMPONENT --- */}
        <AnimatePresence>
          {open && (
            <div className="relative">
               {/* Close Button Overlay (Optional, as the Chat has one, but good for UX) */}
               <AskPortfolioChat onClose={() => setOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}