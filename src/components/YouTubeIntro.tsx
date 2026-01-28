import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroProps {
  onFinish: () => void;
  brand?: string;
  subtitle?: string;
}

export default function CinematicIntro({ 
  onFinish, 
  brand = "MANEESHWAR", 
  subtitle = "Original Production" 
}: IntroProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const controls = useAnimationControls();

  // Split the name: "M" and "ANEESHWAR"
  const firstLetter = brand.charAt(0);
  const remainingLetters = brand.slice(1).split("");

  useEffect(() => {
    const sequence = async () => {
      // 1. Initial Entry
      await controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
      
      // 2. Reveal Subtitle
      setShowSubtitle(true);
      
      // 3. Hold and let the "Flash" repeat
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // 4. Prep Exit
      setShowSubtitle(false);
      setIsZooming(true);
      
      // 5. Warp Speed Zoom
      await controls.start({ 
        scale: 50, 
        opacity: 0, 
        filter: "blur(15px)",
        transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
      });

      onFinish();
    };

    sequence();
  }, [controls, onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.15)_0%,_transparent_70%)]" 
      />

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={controls}
          initial={{ opacity: 0, y: 20 }}
          className="flex text-7xl md:text-9xl font-black italic tracking-tighter text-white"
          style={{ textShadow: "0 0 40px rgba(229,9,20,0.5)" }}
        >
          {/* Static Anchor Letter */}
          <span>{firstLetter}</span>

          {/* Flashing Letters */}
          {remainingLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                y: [0, -10, 0] // Subtle up and down bounce
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1, // Staggered ripple effect
                ease: "easeInOut"
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute mt-32 text-zinc-400 text-[10px] tracking-[1.2em] uppercase font-bold text-center w-full"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Finishing Flash */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isZooming ? { opacity: [0, 1, 0] } : {}}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-white z-[10000] pointer-events-none"
      />
    </div>
  );
}