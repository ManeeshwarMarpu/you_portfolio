// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
// import { Zap, X, Terminal, ShieldCheck, Activity, Cpu, HardDrive, Network } from "lucide-react";
// import type { Skill, SkillGroup } from "../data/skills";

// export default function CinematicSkillSection({ group }: { group: SkillGroup }) {
//   return (
//     <section className="w-full">
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
//         {group.skills.map((skill, i) => (
//           <SkillCard key={skill.id} skill={skill} index={i} />
//         ))}
//       </div>
//     </section>
//   );
// }

// function SkillCard({ skill, index }: { skill: Skill; index: number }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
  
//   const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
//   const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "unset";
//   }, [isOpen]);

//   function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
//     if (!cardRef.current || isOpen) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const centerY = rect.top + rect.height / 2;
//     rotateX.set((e.clientY - centerY) / -12);
//     rotateY.set((e.clientX - centerX) / 12);
//   }

//   return (
//     <>
//       <motion.div
//         ref={cardRef}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.05 }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
//         onClick={() => setIsOpen(true)}
//         style={{ rotateX, rotateY, perspective: 1000 }}
//         className="relative group cursor-pointer h-full"
//       >
//         <div className="absolute -inset-[1px] bg-gradient-to-br from-red-600/50 to-transparent rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
//         <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-[2.1rem] p-8 overflow-hidden flex flex-col justify-between">
//           <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

//           <div className="relative z-10 space-y-6">
//             <div className="flex justify-between items-start gap-4">
//               <div className="min-w-0">
//                 <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em]">Node_{index + 1}</span>
//                 <h3 className="text-xl md:text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase truncate">
//                   {skill.name}
//                 </h3>
//               </div>
//               <div className="shrink-0 p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all">
//                 <Zap size={18} />
//               </div>
//             </div>

//             <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
//               {skill.description}
//             </p>
//           </div>

//           <div className="relative z-10 pt-6 flex items-center gap-4">
//             <div className="flex-1 h-[2px] bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
//               <motion.div 
//                 initial={{ x: "-100%" }}
//                 whileInView={{ x: "0%" }}
//                 transition={{ duration: 1, delay: 0.2 }}
//                 className="h-full w-full bg-red-600"
//               />
//             </div>
//             <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">Running</span>
//           </div>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl" 
//               onClick={() => setIsOpen(false)} 
//             />
            
//             <motion.div 
//               layoutId={`card-${skill.id}`}
//               className="relative z-10 w-full max-w-5xl bg-white dark:bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] overflow-hidden grid lg:grid-cols-[1fr_350px] shadow-2xl"
//             >
//               <div className="p-8 md:p-16 overflow-y-auto max-h-[80vh] lg:max-h-none">
//                 <div className="space-y-2 mb-10">
//                   <div className="flex items-center gap-3 text-red-600">
//                     <div className="h-px w-8 bg-current" />
//                     <span className="text-[10px] font-black uppercase tracking-[0.5em]">Live_System_Trace</span>
//                   </div>
//                   <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
//                     {skill.name}
//                   </h2>
//                 </div>

//                 <div className="bg-zinc-900 rounded-[2rem] p-8 border border-white/5 relative overflow-hidden mb-8">
//                   <Terminal className="absolute top-6 right-8 w-5 h-5 text-zinc-700" />
//                   <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))]" />
//                   <p className="relative z-10 font-mono text-sm md:text-lg leading-relaxed text-zinc-300">
//                     <span className="text-red-500 mr-2">root@system:~$</span>{skill.description}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <StatBox icon={<ShieldCheck size={18}/>} label="Security" value="Encrypted" />
//                   <StatBox icon={<Activity size={18}/>} label="Status" value="99.9% Up" />
//                   <StatBox icon={<Network size={18}/>} label="Protocol" value="TCP/IP" />
//                 </div>
//               </div>

//               {/* ACTION SIDEBAR WITH DIAGNOSTICS */}
//               <div className="bg-zinc-100 dark:bg-white/[0.03] border-l border-white/5 p-8 flex flex-col">
//                 <button onClick={() => setIsOpen(false)} className="self-end p-4 mb-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all shadow-xl">
//                   <X size={20} />
//                 </button>
                
//                 {/* NEW DIAGNOSTIC HUB SECTION */}
//                 <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
//                   <div className="space-y-4">
//                     <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">System Checklist</h4>
//                     <ul className="space-y-3">
//                       {['Integrity Check', 'Latency Sync', 'Neural Weights', 'Access Control'].map((item, i) => (
//                         <motion.li 
//                           initial={{ opacity: 0, x: 10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 0.1 * i }}
//                           key={item} 
//                           className="flex items-center gap-3 group/item"
//                         >
//                           <div className="h-1 w-1 bg-red-600 group-hover/item:w-3 transition-all" />
//                           <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{item}</span>
//                           <span className="ml-auto text-[9px] font-mono text-emerald-500/80">PASS</span>
//                         </motion.li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
//                     <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Telemetry Feed</h4>
//                     <div className="space-y-2 font-mono text-[9px]">
//                       <div className="flex justify-between text-zinc-500">
//                         <span>LATENCY</span>
//                         <span className="text-emerald-500">24ms</span>
//                       </div>
//                       <div className="flex justify-between text-zinc-500">
//                         <span>NODE_ID</span>
//                         <span className="text-red-500/70">0x-FD82</span>
//                       </div>
//                       <div className="flex justify-between text-zinc-500">
//                         <span>LOAD_AVG</span>
//                         <span>0.42 / 0.12</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <div className="p-6 rounded-3xl bg-red-600 text-white shadow-[0_20px_40px_-15px_rgba(220,38,38,0.5)]">
//                     <p className="text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">Deployment State</p>
//                     <p className="text-2xl font-black italic uppercase">Operational</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
// function StatBox({ icon, label, value }: { icon: any; label: string; value: string }) {
//   return (
//     <div className="p-6 rounded-[2rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 space-y-2 group/stat hover:border-red-600/30 transition-all">
//       <div className="flex items-center gap-2 text-red-600">
//         {icon}
//         <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</span>
//       </div>
//       <div className="text-xs font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-widest">{value}</div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Zap, X, Terminal, ShieldCheck, Activity, Network } from "lucide-react";

// --- ADD THESE INTERFACES TO FIX TYPE ERRORS ---
interface Skill {
  id: string | number;
  name: string;
  description: string;
}

interface SkillGroup {
  title: string;
  skills: Skill[];
}

// Helper component for the live heartbeat animation
const HeartbeatLine = () => (
  <div className="absolute inset-0 opacity-30 overflow-hidden">
    <svg className="h-full w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
      <motion.path
        d="M0 10 L10 10 L12 2 L15 18 L18 10 L30 10 L32 2 L35 18 L38 10 L100 10"
        fill="transparent"
        stroke="#dc2626"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  </div>
);

export default function CinematicSkillSection({ group }: { group: SkillGroup }) {
  return (
    <section className="w-full">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {group.skills.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) / -12);
    rotateY.set((e.clientX - centerX) / 12);
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
        onClick={() => setIsOpen(true)}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative group cursor-pointer h-full"
      >
        {/* Hardware Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-red-600/0 group-hover:border-red-600/100 transition-all duration-500 rounded-tl-lg z-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-red-600/0 group-hover:border-red-600/100 transition-all duration-500 rounded-br-lg z-20" />

        <div className="absolute -inset-[1px] bg-gradient-to-br from-red-600/50 to-transparent rounded-[2.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-[2.1rem] p-8 overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,2px_100%]" />

          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em] block mb-1">Node_0{index + 1}</span>
                <h3 className="text-xl md:text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase truncate group-hover:skew-x-[-2deg] transition-transform">
                  {skill.name}
                </h3>
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="shrink-0 p-3 rounded-2xl bg-zinc-100 dark:bg-white/5 text-zinc-400 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all"
              >
                <Zap size={18} />
              </motion.div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed font-medium">
              {skill.description}
            </p>
          </div>

          <div className="relative z-10 pt-6 flex items-center gap-4">
            <div className="flex-1 h-[2px] bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                className="h-full w-full bg-gradient-to-r from-red-900 via-red-600 to-red-400"
              />
            </div>
            <span className="text-[8px] font-mono text-red-600/80 animate-pulse uppercase tracking-[0.2em]">Running</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/98 backdrop-blur-2xl" 
              onClick={() => setIsOpen(false)} 
            />
            
            <motion.div 
              layoutId={`card-${skill.id}`}
              className="relative z-10 w-full max-w-6xl bg-white dark:bg-[#080808] border border-white/10 rounded-[2.5rem] overflow-hidden grid lg:grid-cols-[1fr_380px] shadow-[0_0_100px_-20px_rgba(220,38,38,0.3)]"
            >
              <div className="p-8 md:p-16 overflow-y-auto max-h-[85vh] lg:max-h-none">
                <div className="space-y-4 mb-12">
                  <div className="flex items-center gap-3 text-red-600">
                    <motion.div animate={{ scaleX: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="h-[2px] w-12 bg-current" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">Live_System_Trace</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-[0.85] py-2">
                    {skill.name}
                  </h2>
                </div>

                <div className="bg-zinc-900/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden mb-10 group/terminal">
                  <Terminal className="absolute top-8 right-10 w-6 h-6 text-zinc-700 group-hover/terminal:text-red-600/50 transition-colors" />
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                  <p className="relative z-10 font-mono text-sm md:text-xl leading-relaxed text-zinc-300">
                    <span className="text-red-500 font-bold mr-3 inline-block animate-bounce"> {">"} </span>
                    {skill.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatBox icon={<ShieldCheck size={20}/>} label="Security" value="Encrypted" />
                  <StatBox icon={<Activity size={20}/>} label="Status" value="99.9% Up" />
                  <StatBox icon={<Network size={20}/>} label="Protocol" value="TCP/IP" />
                </div>
              </div>

              <div className="bg-zinc-100 dark:bg-white/[0.02] border-l border-white/5 p-10 flex flex-col relative overflow-hidden">
                <HeartbeatLine />

                <button 
                  onClick={() => setIsOpen(false)} 
                  className="relative z-20 self-end p-5 mb-12 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all transform hover:rotate-90 active:scale-90"
                >
                  <X size={24} />
                </button>
                
                <div className="relative z-20 flex-1 space-y-10 overflow-y-auto pr-2">
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-500">System Checklist</h4>
                    <ul className="space-y-4">
                      {['Integrity Check', 'Latency Sync', 'Neural Weights', 'Access Control'].map((item, i) => (
                        <motion.li 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i + 0.3 }}
                          key={item} 
                          className="flex items-center gap-4 group/item"
                        >
                          <div className="h-1 w-1 bg-red-600 rounded-full group-hover/item:scale-[3] transition-transform" />
                          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">{item}</span>
                          <span className="ml-auto text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">PASS</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-[2rem] bg-black/40 border border-white/5 space-y-4 backdrop-blur-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Telemetry Feed</h4>
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="flex justify-between items-center text-zinc-500">
                        <span>LATENCY</span>
                        <span className="text-emerald-500">24ms</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-500">
                        <span>NODE_ID</span>
                        <span className="text-red-500 font-bold select-all cursor-copy">0x-FD82</span>
                      </div>
                      <div className="flex justify-between items-center text-zinc-500">
                        <span>LOAD_AVG</span>
                        <span className="bg-zinc-800 px-2 rounded">0.42 / 0.12</span>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-12 relative z-20"
                >
                  <div className="p-7 rounded-[2.5rem] bg-red-600 text-white shadow-[0_25px_50px_-12px_rgba(220,38,38,0.5)] group/btn cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1 relative z-10">Deployment State</p>
                    <p className="text-3xl font-black italic uppercase tracking-tighter relative z-10">Operational</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function StatBox({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="p-8 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 space-y-3 hover:border-red-600/30 transition-all group/stat relative overflow-hidden">
      <div className="absolute inset-0 bg-red-600/0 group-hover/stat:bg-red-600/5 transition-colors" />
      <div className="flex items-center gap-3 text-red-600">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>{icon}</motion.div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</span>
      </div>
      <div className="text-sm font-black text-zinc-900 dark:text-zinc-200 uppercase tracking-widest">{value}</div>
    </div>
  );
}