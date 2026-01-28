import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Explicitly defining types to fix the 'any' error you had
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
      // 1. Initial Entry: Logo fades in and settles
      await controls.start({ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1.2, ease: "easeOut" } 
      });
      
      // 2. Subtitle appears
      setShowSubtitle(true);
      
      // 3. Hold for 4 seconds (The name will flash/bounce during this time)
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // 4. Prep for exit
      setShowSubtitle(false);
      setIsZooming(true); // Triggers the white flash
      
      // 5. THE EXCELLENT TRANSITION: Warp speed zoom through the screen
      await controls.start({ 
        scale: 60, 
        opacity: 0, 
        filter: "blur(20px)",
        transition: { duration: 1.2, ease: [0.7, 0, 0.3, 1] } 
      });

      onFinish(); // This triggers the Home screen reveal
    };

    sequence();
  }, [controls, onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center overflow-hidden">
      {/* Background Cinematic Glow */}
      <motion.div 
        animate={{ opacity: [0, 0.5, 0.3], scale: [1, 1.2] }}
        transition={{ duration: 6 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,9,20,0.18)_0%,_transparent_70%)]" 
      />

      <div className="relative flex flex-col items-center">
        {/* LOGO CONTAINER */}
        <motion.div
          animate={controls}
          initial={{ opacity: 0, y: 30 }}
          className="flex text-6xl md:text-9xl font-black italic tracking-tighter text-white"
          style={{ textShadow: "0 0 40px rgba(229,9,20,0.6)" }}
        >
          {/* THE FIXED "M" */}
          <span className="relative z-10">{firstLetter}</span>

          {/* FLASHING & BOUNCING LETTERS: A-N-E-E-S-H-W-A-R */}
          <div className="flex">
            {remainingLetters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.2 }}
                animate={{ 
                  opacity: [0.2, 1, 0.2], // Flashing effect
                  y: [0, -15, 0],         // Up and Down bounce
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,         // Staggered ripple effect
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* SUBTITLE */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="absolute mt-32 text-zinc-400 text-[10px] md:text-xs tracking-[1em] md:tracking-[1.5em] uppercase font-bold text-center w-full"
            >
              {subtitle}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Finishing White Flash for seamless Home reveal */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isZooming ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-white z-[10000] pointer-events-none"
      />
    </div>
  );
}