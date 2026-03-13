
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState, useRef, useCallback } from "react";

// const CHARS = "アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&";

// // ─── Local Assets ─────────────────────────────────────────────────────────────
// import bootSoundSrc    from '../assets/sounds/boot.wav';
// import glitchSoundSrc  from '../assets/sounds/key-click.mp3';
// import typingSoundSrc  from '../assets/sounds/key-click.mp3';      // exact file, used directly
// import enterSoundSrc   from '../assets/sounds/enter.wav';           // plays on "Click to Enter"
// import accessSoundSrc  from '../assets/sounds/aceess-granted.wav';  // plays when ACCESS GRANTED text appears
// // import exitSoundSrc    from '../assets/sounds/aceess-granted.wav';

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface ColProps {
//   x: number; delay: number; speed: number; length: number; opacity: number;
// }
// interface GlitchLetterProps {
//   char: string; delay: number; onFirstGlitch?: () => void;
// }
// interface TypingLineProps {
//   text: string; delay: number; color?: string; onDone?: () => void;
//   typingSoundSrc?: string;
//   audioRegistry?: React.MutableRefObject<HTMLAudioElement[]>;
// }
// interface IntroProps {
//   onFinish: () => void; brand?: string; subtitle?: string; role?: string;
// }

// // ─── Matrix Rain Column ───────────────────────────────────────────────────────
// function MatrixColumn({ x, delay, speed, length, opacity }: ColProps) {
//   const [chars, setChars] = useState<string[]>(() =>
//     Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
//   );
//   const [headPos, setHeadPos] = useState<number>(-1);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       let pos = 0;
//       const interval = setInterval(() => {
//         setHeadPos(pos);
//         setChars((c) => c.map((ch, i) =>
//           i === pos ? CHARS[Math.floor(Math.random() * CHARS.length)] : ch
//         ));
//         pos++;
//         if (pos > length + 5) { clearInterval(interval); setHeadPos(-1); }
//       }, speed);
//       return () => clearInterval(interval);
//     }, delay);
//     return () => clearTimeout(timeout);
//   }, [delay, speed, length]);

//   return (
//     <div className="absolute top-0 flex flex-col"
//       style={{ left: x, fontFamily: "'Share Tech Mono', monospace", fontSize: "13px", lineHeight: "1.5", opacity }}>
//       {chars.map((ch, i) => (
//         <span key={i} style={{
//           color: i === headPos ? "#ffffff"
//             : i === headPos - 1 ? "#fca5a5"
//             : i > headPos ? "transparent"
//             : `rgba(220,38,38,${Math.max(0, 1 - (headPos - i) * 0.12)})`,
//           textShadow: i === headPos ? "0 0 8px #fff, 0 0 20px #ef4444" : "none",
//           transition: "color 0.05s",
//         }}>{ch}</span>
//       ))}
//     </div>
//   );
// }

// // ─── Scramble Letter ──────────────────────────────────────────────────────────
// function GlitchLetter({ char, delay, onFirstGlitch }: GlitchLetterProps) {
//   const [displayChar, setDisplayChar] = useState<string>("█");
//   const [revealed,    setRevealed]    = useState<boolean>(false);
//   const [glitching,   setGlitching]   = useState<boolean>(false);
//   const firedRef = useRef(false);

//   useEffect(() => {
//     if (char === " ") return;
//     const t1 = setTimeout(() => {
//       setGlitching(true);
//       if (!firedRef.current && onFirstGlitch) { firedRef.current = true; onFirstGlitch(); }
//       let count = 0;
//       const scramble = setInterval(() => {
//         setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
//         count++;
//         if (count > 10) {
//           clearInterval(scramble);
//           setDisplayChar(char);
//           setRevealed(true);
//           setGlitching(false);
//         }
//       }, 55);
//       return () => clearInterval(scramble);
//     }, delay);
//     return () => clearTimeout(t1);
//   }, [char, delay, onFirstGlitch]);

//   if (char === " ") return <span style={{ display: "inline-block", width: "0.4em" }} />;
//   return (
//     <span style={{
//       display: "inline-block",
//       color: revealed ? "#fff1f1" : glitching ? "#ef4444" : "#1a0a0a",
//       textShadow: revealed ? "0 0 40px rgba(239,68,68,0.3)"
//         : glitching ? "0 0 12px #ef4444, 0 0 30px #dc2626" : "none",
//       transition: "color 0.08s, text-shadow 0.08s",
//     }}>{displayChar}</span>
//   );
// }

// // ─── Typing Terminal Line ─────────────────────────────────────────────────────
// function TypingLine({ text, delay, color = "#ef4444", onDone, typingSoundSrc: soundSrc, audioRegistry }: TypingLineProps) {
//   const [displayed, setDisplayed] = useState<string>("");
//   const [done,      setDone]      = useState<boolean>(false);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       let i = 0;
//       const iv = setInterval(() => {
//         setDisplayed(text.slice(0, i + 1));

//         // Use the EXACT key-click.wav file — create fresh Audio each keystroke
//         if (soundSrc) {
//           try {
//             const a = new Audio(soundSrc);
//             a.volume = 0.22;
//             a.playbackRate = 0.85 + Math.random() * 0.3;
//             if (audioRegistry) audioRegistry.current.push(a);
//             a.play().catch(() => {});
//             a.onended = () => {
//               if (audioRegistry) audioRegistry.current = audioRegistry.current.filter(x => x !== a);
//             };
//           } catch (_) {}
//         }

//         i++;
//         if (i >= text.length) { clearInterval(iv); setDone(true); onDone?.(); }
//       }, 38);
//       return () => clearInterval(iv);
//     }, delay);
//     return () => clearTimeout(t);
//   }, [text, delay, onDone, soundSrc, audioRegistry]);

//   return (
//     <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", color, letterSpacing: "0.04em" }}>
//       <span style={{ color: "#dc2626", marginRight: 8 }}>{">"}</span>
//       {displayed}
//       {!done && (
//         <span style={{
//           display: "inline-block", width: 7, height: 13,
//           background: color, verticalAlign: "middle", marginLeft: 2,
//           animation: "cur 0.7s step-end infinite",
//         }} />
//       )}
//     </div>
//   );
// }

// // ─── Click to Enter Gate ──────────────────────────────────────────────────────
// function ClickToEnter({ onEnter }: { onEnter: () => void }) {
//   const [hovered, setHovered] = useState(false);

//   const handleClick = () => {
//     // Play enter.wav immediately on click — this is inside a user gesture so it will always work
//     try {
//       const a = new Audio(enterSoundSrc);
//       a.volume = 0.85;
//       a.play().catch(() => {});
//     } catch (_) {}
//     onEnter();
//   };

//   return (
//     <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
//       style={{ background: "#0a0000", cursor: "pointer" }}
//       onClick={handleClick}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');
//         @keyframes blink-gate { 50% { opacity: 0.2 } }
//         @keyframes scangate { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.5} 94%{opacity:1} }
//       `}</style>
//       <div className="absolute inset-0 pointer-events-none" style={{
//         backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.09) 2px,rgba(0,0,0,0.09) 4px)",
//         animation: "scangate 6s linear infinite",
//       }} />
//       <div className="absolute pointer-events-none" style={{
//         width: 500, height: 300, borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 70%)",
//         left: "50%", top: "50%", transform: "translate(-50%,-50%)",
//       }} />
//       <motion.div
//         animate={{ opacity: [0.4, 0.7, 0.4], scale: hovered ? 1.04 : 1 }}
//         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//         style={{
//           border: `1px solid rgba(220,38,38,${hovered ? 0.7 : 0.35})`,
//           padding: "28px 56px", textAlign: "center",
//           backdropFilter: "blur(4px)", background: "rgba(15,0,0,0.6)",
//           transition: "border-color 0.2s",
//         }}>
//         <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "10px", color: "#ef4444", letterSpacing: "0.5em", marginBottom: 16, opacity: 0.6 }}>
//           PORTFOLIO v1.0
//         </div>
//         <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "14px", color: "#fff1f1", letterSpacing: "0.3em", animation: "blink-gate 1.4s step-end infinite" }}>
//           [ CLICK TO ENTER ]
//         </div>
//         <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", color: "#ef4444", letterSpacing: "0.3em", marginTop: 14, opacity: 0.45 }}>
//           ⚠ ENABLE SOUND FOR BEST EXPERIENCE
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ─── Main Intro ───────────────────────────────────────────────────────────────
// export default function CinematicIntro({
//   onFinish,
//   brand    = "MANEESHWAR",
//   subtitle = "Creative Engineering",
//   role     = "Designer & Developer",
// }: IntroProps) {
//   const [gate,         setGate]         = useState<boolean>(true);
//   const [phase,        setPhase]        = useState<string>("boot");
//   const [columns,      setColumns]      = useState<ColProps[]>([]);
//   const [showName,     setShowName]     = useState<boolean>(false);
//   const [showTerminal, setShowTerminal] = useState<boolean>(false);
//   const [showExit,     setShowExit]     = useState<boolean>(false);

//   // Every Audio instance created in the intro goes here
//   const audioRegistry = useRef<HTMLAudioElement[]>([]);

//   // Register + play a sound, returns the Audio element
//   const playRegistered = useCallback((src: string, volume: number, playbackRate = 1): HTMLAudioElement | null => {
//     try {
//       const a = new Audio(src);
//       a.volume = Math.min(1, Math.max(0, volume));
//       a.playbackRate = playbackRate;
//       audioRegistry.current.push(a);
//       a.onended = () => { audioRegistry.current = audioRegistry.current.filter(x => x !== a); };
//       a.play().catch(() => {});
//       return a;
//     } catch (_) { return null; }
//   }, []);

//   // Hard-stop every registered audio immediately
//   const killAllAudio = useCallback(() => {
//     audioRegistry.current.forEach(a => {
//       try { a.pause(); a.currentTime = 0; a.src = ""; } catch (_) {}
//     });
//     audioRegistry.current = [];
//   }, []);

//   // Safety net: kill on unmount
//   useEffect(() => () => killAllAudio(), [killAllAudio]);

//   // Build matrix columns
//   useEffect(() => {
//     const cols: ColProps[] = [];
//     const count = Math.floor(window.innerWidth / 22);
//     for (let i = 0; i < count; i++) {
//       cols.push({
//         x: i * 22,
//         delay:   Math.random() * 2200,
//         speed:   40 + Math.random() * 70,
//         length:  12 + Math.floor(Math.random() * 22),
//         opacity: 0.08 + Math.random() * 0.35,
//       });
//     }
//     setColumns(cols);
//   }, []);

//   // ── MUST be defined BEFORE startIntro ──
//   // Fired by first GlitchLetter when scrambling begins
//   const handleFirstGlitch = useCallback(() => {
//     playRegistered(glitchSoundSrc, 0.75);
//   }, [playRegistered]);

//   const startIntro = useCallback(() => {
//     setGate(false);

//     const run = async () => {
//       // ── PHASE 1: BOOT ──
//       playRegistered(bootSoundSrc, 0.7);
//       setPhase("boot");
//       await new Promise((r) => setTimeout(r, 1200));

//       // ── PHASE 2: MATRIX RAIN ──
//       setPhase("matrix");
//       await new Promise((r) => setTimeout(r, 800));

//       // ── PHASE 3: NAME REVEAL ──
//       setShowName(true);
//       setPhase("name");
//       await new Promise((r) => setTimeout(r, 1500));

//       // ── PHASE 4: TERMINAL TYPING ──
//       setShowTerminal(true);
//       setPhase("terminal");
//       // Wait for all lines to finish typing
//       await new Promise((r) => setTimeout(r, 3200));

//       // ── PHASE 5: ACCESS GRANTED ──
//       // Kill typing/glitch sounds BEFORE playing access sound
//       killAllAudio();

//       // Wait for access sound to FULLY complete before proceeding
//       await new Promise<void>((resolve) => {
//         try {
//           const a = new Audio(accessSoundSrc);
//           a.volume = 0.9;
//           a.play().catch(() => resolve()); // fallback if browser blocks autoplay
//           a.onended = () => resolve();
//           // Safety timeout in case onended never fires (e.g. decode error)
//           setTimeout(resolve, 5000);
//         } catch (_) {
//           resolve();
//         }
//       });

//       // ── PHASE 6: EXIT ── (access sound is fully done now)
//       setPhase("exit");
//       setShowExit(true);

//       // Play exit sweep AFTER access sound finishes
//       // playRegistered(exitSoundSrc, 0.6);
//       // await new Promise((r) => setTimeout(r, 900));

//       killAllAudio();
//       onFinish();
//     };

//     run();
//   }, [playRegistered, killAllAudio, onFinish]);

//   const letters = brand.split("");

//   if (gate) return <ClickToEnter onEnter={startIntro} />;

//   return (
//     <div className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
//       style={{ background: "#0a0000" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Bebas+Neue&display=swap');
//         @keyframes cur { 50% { opacity: 0 } }
//         @keyframes rgb {
//           0%   { text-shadow: 3px 0 rgba(255,0,60,0.4), -3px 0 rgba(0,200,255,0.3); }
//           50%  { text-shadow: -3px 0 rgba(255,0,60,0.4), 3px 0 rgba(0,200,255,0.3); }
//           100% { text-shadow: 3px 0 rgba(255,0,60,0.4), -3px 0 rgba(0,200,255,0.3); }
//         }
//         @keyframes flicker {
//           0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.6} 94%{opacity:1} 97%{opacity:0.8} 98%{opacity:1}
//         }
//         @keyframes pulse-border {
//           0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,0.0),inset 0 0 40px rgba(0,0,0,0.5);}
//           50%{box-shadow:0 0 24px 2px rgba(220,38,38,0.18),inset 0 0 40px rgba(0,0,0,0.5);}
//         }
//       `}</style>

//       {/* CRT scanlines */}
//       <div className="absolute inset-0 pointer-events-none z-20" style={{
//         backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.07) 2px,rgba(0,0,0,0.07) 4px)",
//         animation: "flicker 8s linear infinite",
//       }} />

//       {/* Vignette */}
//       <div className="absolute inset-0 pointer-events-none z-10"
//         style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.92) 100%)" }} />

//       {/* Red ambient glow */}
//       <div className="absolute pointer-events-none" style={{
//         width: 700, height: 450, borderRadius: "50%",
//         background: "radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%)",
//         left: "50%", top: "50%", transform: "translate(-50%, -50%)",
//       }} />

//       {/* Matrix rain */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         {columns.map((col, i) => <MatrixColumn key={i} {...col} />)}
//       </div>

//       {/* Glitch scan lines */}
//       {phase !== "boot" && [11, 39, 68, 85].map((pct, i) => (
//         <motion.div key={i} className="absolute left-0 right-0 z-30 pointer-events-none"
//           style={{ top: `${pct}%`, height: 1, overflow: "hidden" }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 0.6, 0] }}
//           transition={{ delay: 0.5 + i * 0.7, duration: 0.25, repeat: Infinity, repeatDelay: 4 + i * 1.2 }}>
//           <div style={{ height: "100%", background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.8), transparent)" }} />
//         </motion.div>
//       ))}

//       <div className="relative z-40 flex flex-col items-center gap-10 w-full px-6" style={{ maxWidth: "98vw" }}>

//         {/* Boot text */}
//         <AnimatePresence>
//           {phase === "boot" && (
//             <motion.div
//               initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 1] }} exit={{ opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "13px", color: "#dc2626", letterSpacing: "0.12em" }}>
//               SYSTEM BOOT... OK
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Name */}
//         <AnimatePresence>
//           {showName && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }} className="text-center w-full">
//               <motion.div
//                 initial={{ opacity: 0, letterSpacing: "0.8em" }}
//                 animate={{ opacity: 0.65, letterSpacing: "0.5em" }}
//                 transition={{ delay: 1.4, duration: 0.8 }}
//                 style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", color: "#ef4444", textTransform: "uppercase", marginBottom: 18 }}>
//                 ◆ {role} ◆
//               </motion.div>

//               <div style={{ position: "relative", display: "block", width: "100%", textAlign: "center" }}>
//                 <span style={{
//                   position: "absolute", inset: 0, display: "block", textAlign: "center",
//                   fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400,
//                   fontSize: "clamp(3.5rem, 14vw, 11rem)", letterSpacing: "0.04em", lineHeight: 1,
//                   color: "transparent", WebkitTextStroke: "1px rgba(239,68,68,0.15)",
//                   animation: "rgb 1.8s linear infinite",
//                   pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap",
//                 }}>{brand}</span>

//                 <div style={{
//                   fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400,
//                   fontSize: "clamp(3.5rem, 14vw, 11rem)", letterSpacing: "0.04em",
//                   lineHeight: 1, position: "relative", whiteSpace: "nowrap", display: "inline-block",
//                 }}>
//                   {letters.map((char, i) => (
//                     <GlitchLetter key={i} char={char} delay={i * 110}
//                       onFirstGlitch={i === 0 ? handleFirstGlitch : undefined} />
//                   ))}
//                 </div>
//               </div>

//               <motion.div
//                 initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
//                 transition={{ delay: 1.7, duration: 0.7, ease: [0.2, 1, 0.4, 1] }}
//                 style={{
//                   height: 2, background: "linear-gradient(90deg, transparent, #dc2626, #ef4444, #dc2626, transparent)",
//                   marginTop: 14, transformOrigin: "center", boxShadow: "0 0 12px rgba(220,38,38,0.5)",
//                 }} />

//               <motion.div
//                 initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2, duration: 0.6 }}
//                 style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "8px", color: "#ef4444", letterSpacing: "0.65em", marginTop: 10, textTransform: "uppercase" }}>
//                 {subtitle}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Terminal */}
//         <AnimatePresence>
//           {showTerminal && (
//             <motion.div
//               initial={{ opacity: 0, y: 16, scaleY: 0.9 }}
//               animate={{ opacity: 1, y: 0, scaleY: 1 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.45, ease: [0.2, 1, 0.4, 1] }}
//               style={{
//                 border: "1px solid rgba(220,38,38,0.3)", borderRadius: 3,
//                 padding: "14px 22px", background: "rgba(15,0,0,0.8)",
//                 backdropFilter: "blur(6px)", width: "min(420px, 88vw)",
//                 animation: "pulse-border 3s ease-in-out infinite",
//               }}>
//               <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid rgba(220,38,38,0.12)" }}>
//                 {["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
//                   <div key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.85 }} />
//                 ))}
//                 <span style={{ marginLeft: 8, fontFamily: "'Share Tech Mono', monospace", fontSize: "9px", color: "#ef4444", opacity: 0.4, letterSpacing: "0.08em" }}>
//                   ~/portfolio/init.sh
//                 </span>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
//                 <TypingLine text="whoami"               delay={400}  color="#ef4444" typingSoundSrc={typingSoundSrc} audioRegistry={audioRegistry} />
//                 <TypingLine text={brand.toLowerCase()}  delay={700}  color="#fca5a5" typingSoundSrc={typingSoundSrc} audioRegistry={audioRegistry} />
//                 <TypingLine text="cat skills.txt"       delay={1200} color="#ef4444" typingSoundSrc={typingSoundSrc} audioRegistry={audioRegistry} />
//                 <TypingLine text={role}                 delay={1800} color="#fca5a5" typingSoundSrc={typingSoundSrc} audioRegistry={audioRegistry} />
//                 <TypingLine text="./launch --portfolio" delay={2300} color="#ef4444" typingSoundSrc={typingSoundSrc} audioRegistry={audioRegistry} />
//                 <motion.div
//                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }}
//                   style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "12px", paddingLeft: 16, color: "#ef4444" }}>
//                   <span style={{ color: "#dc2626" }}>✓ </span>ACCESS GRANTED — LOADING...
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Exit fade */}
//       <AnimatePresence>
//         {showExit && (
//           <motion.div className="absolute inset-0 z-50 pointer-events-none"
//             style={{ background: "#0a0000" }}
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import enterSound from "../assets/sounds/enter.wav"
// // Update the interface so App.tsx stops showing red errors
// interface IntroProps {
//   onFinish: () => void;
//   brand?: string;
//   subtitle?: string;
// }

// export default function VectorHorizonIntro({ 
//   onFinish, 
//   brand = "MANEESHWAR", 
//   subtitle = "CREATIVE ENGINEERING" 
// }: IntroProps) {
//   const [phase, setPhase] = useState("initial");

//   useEffect(() => {
//     const timer = setTimeout(() => setPhase("reveal"), 500);

//     const endTimer = setTimeout(() => {
//       setPhase("exit");
      
//       // Fixed the path to match your actual filename 'aceess-granted.wav'
//       const audio = new Audio(enterSound);
//       audio.volume = 0.4;
//       audio.play().catch(err => console.log("Autoplay blocked:", err));
//     }, 3500);

//     const finishTimer = setTimeout(onFinish, 4800);

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(endTimer);
//       clearTimeout(finishTimer);
//     };
//   }, [onFinish]);

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden">
//       {/* Background Red Glow */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.2 }}
//         className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff0000_0%,_transparent_70%)]"
//       />

//       {/* Content Layer */}
//       <AnimatePresence>
//         {phase === "reveal" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
//             className="relative z-10 flex flex-col items-center"
//           >
//             {/* Subtitle / Header Tag */}
//             <motion.span 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="text-red-500 text-[10px] font-mono mb-4 tracking-[0.8em] uppercase"
//             >
//               {subtitle}
//             </motion.span>

//             <div className="overflow-hidden">
//               <motion.h1
//                 initial={{ y: 100 }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//                 className="text-white text-6xl md:text-9xl font-black italic tracking-tighter uppercase"
//                 style={{ textShadow: "4px 4px 0px rgba(255,0,0,0.5)" }}
//               >
//                 {brand}
//               </motion.h1>
//             </div>

//             {/* Red Underline Decor */}
//             <motion.div 
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ delay: 0.8, duration: 1 }}
//               className="w-32 h-[2px] bg-red-600 mt-6 shadow-[0_0_15px_#ff0000]"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* The Red "Welcome" Exit */}
//       <AnimatePresence>
//         {phase === "exit" && (
//           <motion.div
//             initial={{ clipPath: 'circle(0% at 50% 50%)' }}
//             animate={{ clipPath: 'circle(150% at 50% 50%)' }}
//             transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
//             className="absolute inset-0 bg-[#ff0000] z-[10000] flex items-center justify-center"
//           >
//              <motion.span 
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-black font-black text-6xl md:text-8xl italic uppercase tracking-tighter"
//             >
//               Welcome
//             </motion.span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = ["P", "r", "o", "f", "i", "l", "i", "o"];
const N = LETTERS.length;

const ICONS = [
  <svg key={0} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <polyline points="15,9 5,22 15,35" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="29,9 39,22 29,35" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="24" y1="7" x2="18" y2="37" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
  </svg>,
  <svg key={1} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="13" cy="10" r="5" stroke="white" strokeWidth="2.4" fill="none" />
    <circle cx="13" cy="34" r="5" stroke="white" strokeWidth="2.4" fill="none" />
    <circle cx="33" cy="19" r="5" stroke="white" strokeWidth="2.4" fill="none" />
    <line x1="13" y1="15" x2="13" y2="29" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M13 16 C13 19 33 19 33 19" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
  </svg>,
  <svg key={2} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x="4" y="7" width="36" height="30" rx="4" stroke="white" strokeWidth="2.4" />
    <polyline points="11,16 19,22 11,28" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="28" x2="33" y2="28" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
  </svg>,
  <svg key={3} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <polyline points="22,4 38,13 22,22 6,13 22,4" stroke="white" strokeWidth="2.4" strokeLinejoin="round" />
    <polyline points="6,22 22,31 38,22" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="6,30 22,39 38,30" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key={4} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <rect x="13" y="13" width="18" height="18" rx="2" stroke="white" strokeWidth="2.4" />
    {[17,22,27].map(x=><g key={x}><line x1={x} y1="13" x2={x} y2="7" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1={x} y1="31" x2={x} y2="37" stroke="white" strokeWidth="2" strokeLinecap="round"/></g>)}
    {[17,22,27].map(y=><g key={y}><line x1="13" y1={y} x2="7" y2={y} stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="31" y1={y} x2="37" y2={y} stroke="white" strokeWidth="2" strokeLinecap="round"/></g>)}
  </svg>,
  <svg key={5} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M25,4 Q32,4 32,9 L32,17 Q32,22 36,22 Q32,22 32,27 L32,35 Q32,40 25,40" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    <path d="M19,4 Q12,4 12,9 L12,17 Q12,22 8,22 Q12,22 12,27 L12,35 Q12,40 19,40" stroke="white" strokeWidth="2.6" strokeLinecap="round" fill="none" />
  </svg>,
  <svg key={6} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <path d="M12,28 Q4,28 4,21 Q4,14 13,14 Q14,7 22,7 Q30,7 32,14 Q39,14 40,21 Q40,28 32,28 Z" stroke="white" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
    <line x1="22" y1="22" x2="22" y2="37" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
    <polyline points="15,31 22,38 29,31" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  <svg key={7} viewBox="0 0 44 44" fill="none" style={{ width: "100%", height: "100%" }}>
    <circle cx="22" cy="15" r="8" stroke="white" strokeWidth="2.4" fill="none" />
    <path d="M5,40 C5,30 13,25 22,25 C31,25 39,30 39,40" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
  </svg>,
];

const SLOT_W = 48;
const ROW_H  = 80;
const CIRC_D = 50;
const RECT_W = 64;
const RECT_H = 46;

type Phase = "idle"|"sweep"|"leftwall"|"rollback"|"approach"|"impact"|"morph"|"done";

// ── Dispatch helper so your navbar logo can trigger the intro ──
// In your Header/Navbar component, call: window.dispatchEvent(new Event("play-intro"))

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const rowW = N * SLOT_W;

  const [iconsIn,    setIconsIn]    = useState(false);
  const [phase,      setPhase]      = useState<Phase>("idle");
  const [revealed,   setRevealed]   = useState<boolean[]>(new Array(N).fill(false));
  const [morphed,    setMorphed]    = useState(false);
  const [exiting,    setExiting]    = useState(false); // triggers framer exit
  const [pulse,      setPulse]      = useState(false);
  const [wallFlashL, setWallFlashL] = useState(false);
  const [pBend,      setPBend]      = useState(0);
  const [sx, setSx] = useState(1);
  const [sy, setSy] = useState(1);
  const [boxCx, setBoxCx] = useState(rowW + 80);

  const rafRef      = useRef<number>(0);
  const revealedRef = useRef<boolean[]>(new Array(N).fill(false));
  const stop        = () => cancelAnimationFrame(rafRef.current);

  useEffect(() => {
    const t = setTimeout(() => setIconsIn(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setPhase("sweep"), 800);
    return () => clearTimeout(t);
  }, []);

  /* ── SWEEP ── */
  useEffect(() => {
    if (phase !== "sweep") return;
    revealedRef.current = new Array(N).fill(false);
    const startCx = rowW + 80;
    const endCx   = -CIRC_D - 40;
    const DUR     = 1400;
    const t0      = performance.now();

    const tick = (now: number) => {
      const t    = Math.min((now - t0) / DUR, 1);
      const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
      const cx   = startCx + (endCx - startCx) * ease;
      setBoxCx(cx);

      for (let i = 0; i < N; i++) {
        if (!revealedRef.current[i]) {
          const slotCx     = i * SLOT_W + SLOT_W / 2;
          const circleLeft = cx - CIRC_D / 2;
          if (circleLeft < slotCx) {
            revealedRef.current[i] = true;
            setRevealed(prev => { const a=[...prev]; a[i]=true; return a; });
            setPulse(true);
            setTimeout(() => setPulse(false), 150);
          }
        }
      }

      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { setBoxCx(endCx); setPhase("leftwall"); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return stop;
  }, [phase]);

  /* ── LEFT WALL ── */
  useEffect(() => {
    if (phase !== "leftwall") return;
    setWallFlashL(true);
    setSx(1.7); setSy(0.55);
    const t1 = setTimeout(() => { setSx(0.75); setSy(1.4); }, 90);
    const t2 = setTimeout(() => { setSx(1.05); setSy(0.97); }, 190);
    const t3 = setTimeout(() => { setSx(1); setSy(1); setWallFlashL(false); setPhase("rollback"); }, 300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase]);

  /* ── ROLLBACK ── */
  useEffect(() => {
    if (phase !== "rollback") return;
    const startCx = -CIRC_D - 40;
    const stopCx  = SLOT_W / 2 - CIRC_D / 2 - 40;
    const DUR     = 300;
    const t0      = performance.now();
    setSx(1.5); setSy(0.72);
    const tick = (now: number) => {
      const t = Math.min((now - t0) / DUR, 1);
      setBoxCx(startCx + (stopCx - startCx) * (t*t));
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { setSx(1); setSy(1); setBoxCx(stopCx); setPhase("approach"); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return stop;
  }, [phase]);

  /* ── APPROACH ── */
  useEffect(() => {
    if (phase !== "approach") return;
    const startCx = SLOT_W / 2 - CIRC_D / 2 - 40;
    const endCx   = -CIRC_D / 2 + 1;
    const DUR     = 220;
    const t0      = performance.now();
    const tick = (now: number) => {
      const t    = Math.min((now - t0) / DUR, 1);
      const ease = 1 - Math.pow(1-t, 2);
      setBoxCx(startCx + (endCx - startCx) * ease);
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { setBoxCx(endCx); setPhase("impact"); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return stop;
  }, [phase]);

  /* ── IMPACT: circle hits P, P bends ── */
  useEffect(() => {
    if (phase !== "impact") return;
    setSx(1.35); setSy(0.72); setPBend(1);
    const t1 = setTimeout(() => { setSx(1.5); setSy(0.6); }, 80);
    const t2 = setTimeout(() => { setSx(1.1); setSy(0.92); setPBend(2); }, 160);
    const t3 = setTimeout(() => { setSx(1); setSy(1); setPBend(0); }, 260);
    const t4 = setTimeout(() => setPhase("morph"), 320);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [phase]);

  /* ── MORPH + settle + exit ── */
  useEffect(() => {
    if (phase !== "morph") return;
    setMorphed(true);
    const finalCx = -RECT_W / 2 - 2;
    const startCx = -CIRC_D / 2 + 1;
    const DUR     = 480;
    const t0      = performance.now();

    const tick = (now: number) => {
      const t    = Math.min((now - t0) / DUR, 1);
      const ease = 1 - Math.pow(1-t, 3);
      setBoxCx(startCx + (finalCx - startCx) * ease);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setBoxCx(finalCx);
        // Hold logo visible for 900ms, then fade out
        setTimeout(() => {
          setExiting(true);          // triggers framer-motion exit animation
          setTimeout(() => {
            setPhase("done");
            onComplete?.();          // ← unmounts loading screen in App.tsx
          }, 600);
        }, 900);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return stop;
  }, [phase]);

  const boxW = morphed ? RECT_W : CIRC_D;
  const boxH = morphed ? RECT_H : CIRC_D;

  const pStyle: React.CSSProperties = {
    color: "white", fontSize: "54px", fontWeight: 900,
    fontFamily: "'Arial Black','Helvetica Neue',Arial,sans-serif",
    lineHeight: 1, letterSpacing: "-1px", display: "block",
    transformOrigin: "bottom center",
    transition: "transform 0.08s ease",
    transform:
      pBend === 1 ? "skewX(-14deg) scaleX(0.88) translateX(4px)" :
      pBend === 2 ? "skewX(5deg) scaleX(1.04) translateX(-2px)" :
                   "skewX(0deg) scaleX(1) translateX(0px)",
  };

  if (phase === "done") return null;

  return (
    <motion.div
      key="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", inset: 0,
        background: "#0d0d0d",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        zIndex: 9999,
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 85% 75% at 50% 55%, transparent 35%, rgba(0,0,0,0.82) 100%)",
        pointerEvents: "none",
      }} />

      {/* left wall glow */}
      {wallFlashL && (
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 28% 70% at 2% 50%, rgba(255,50,50,0.22) 0%, transparent 55%)",
          animation: "lsFadeOut 0.35s ease-out forwards",
          pointerEvents: "none",
        }} />
      )}

      {/* red glow following circle */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: `calc(50% + ${boxCx - rowW / 2}px)`,
        width: "120px", height: "120px",
        transform: "translate(-50%,-50%)",
        background: "radial-gradient(circle, rgba(200,0,0,0.2) 0%, transparent 70%)",
        filter: "blur(20px)",
        pointerEvents: "none",
        transition: phase === "morph" ? "left 0.48s cubic-bezier(0.33,1,0.68,1)" : "none",
      }} />

      {/* ── ROW ── */}
      <div style={{ position: "relative", width: `${rowW}px`, height: `${ROW_H}px` }}>
        <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center" }}>
          {LETTERS.map((letter, i) => (
            <div key={i} style={{
              width: `${SLOT_W}px`, height: "100%", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {revealed[i] ? (
                i === 0 ? (
                  <span style={pStyle}>{letter}</span>
                ) : (
                  <span style={{
                    color: "white", fontSize: "54px", fontWeight: 900,
                    fontFamily: "'Arial Black','Helvetica Neue',Arial,sans-serif",
                    lineHeight: 1, letterSpacing: "-1px", display: "block",
                    animation: "lsPop 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards",
                    opacity: 0, transformOrigin: "center center",
                  }}>{letter}</span>
                )
              ) : (
                <div style={{
                  width: "36px", height: "36px",
                  opacity: iconsIn ? 1 : 0,
                  transition: `opacity 0.25s ${i * 0.04}s`,
                  animation: iconsIn ? `lsSpin 1.5s linear ${i * 0.1}s infinite` : "none",
                  transformOrigin: "center center",
                }}>
                  {ICONS[i]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* sweep ring */}
        {pulse && (
          <div style={{
            position: "absolute", top: "50%", left: `${boxCx}px`,
            width: "48px", height: "48px",
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            border: "1.5px solid rgba(255,110,110,0.7)",
            animation: "lsRing 0.28s ease-out forwards",
            pointerEvents: "none", zIndex: 25,
          }} />
        )}

        {/* ── RED CIRCLE / BOX ── */}
        {phase !== "idle" && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: `${boxCx - boxW / 2}px`,
            transform: `translateY(-50%) scaleX(${sx}) scaleY(${sy})`,
            width: `${boxW}px`,
            height: `${boxH}px`,
            zIndex: 20,
            transition: "width 0.42s ease, height 0.42s ease, transform 0.07s ease",
            filter: `drop-shadow(0 0 ${phase==="impact"?16:pulse?14:9}px rgba(255,30,30,${phase==="impact"?0.85:pulse?0.75:0.45}))`,
          }}>
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(145deg,#ff2a2a 0%,#cc0000 50%,#880000 100%)",
              borderRadius: morphed ? "16%" : "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              boxShadow: "inset 0 2px 8px rgba(255,255,255,0.22),inset 0 -2px 6px rgba(0,0,0,0.4),0 8px 28px rgba(0,0,0,0.6)",
              transition: "border-radius 0.44s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "44%",
                background: "linear-gradient(180deg,rgba(255,255,255,0.18) 0%,transparent 100%)",
                borderRadius: "inherit",
              }} />
              <div style={{
                width: 0, height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "17px solid rgba(255,255,255,0.95)",
                marginLeft: "4px",
                filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.5))",
              }} />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes lsPop {
          0%   { opacity:0; transform:scale(0.2) rotate(-10deg); }
          65%  { opacity:1; transform:scale(1.15) rotate(3deg);  }
          100% { opacity:1; transform:scale(1) rotate(0deg);     }
        }
        @keyframes lsSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes lsRing {
          0%   { opacity:1; transform:translate(-50%,-50%) scale(1);   }
          100% { opacity:0; transform:translate(-50%,-50%) scale(2.5); }
        }
        @keyframes lsFadeOut {
          0%   { opacity:1; }
          100% { opacity:0; }
        }
      `}</style>
    </motion.div>
  );
}