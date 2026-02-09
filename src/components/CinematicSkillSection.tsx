// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
// import { Zap, X, ShieldCheck, Activity, Network, Cpu } from "lucide-react";

// interface Skill { id: string | number; name: string; description: string; }
// interface SkillGroup { title: string; skills: Skill[]; }

// export default function CinematicSkillSection({ group }: { group: SkillGroup }) {
//   return (
//     <motion.div 
//       initial="hidden"
//       animate="show"
//       variants={{
//         hidden: { opacity: 0 },
//         show: { opacity: 1, transition: { staggerChildren: 0.05 } }
//       }}
//       // Reduced gap for mobile, increased for desktop
//       className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
//     >
//       {group.skills.map((skill, i) => (
//         <SkillCard key={skill.id} skill={skill} index={i} />
//       ))}
//     </motion.div>
//   );
// }

// function SkillCard({ skill, index }: { skill: Skill; index: number }) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
//   const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "unset";
//   }, [isOpen]);

//   function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
//     if (!cardRef.current || isOpen || window.innerWidth < 1024) return;
//     const rect = cardRef.current.getBoundingClientRect();
//     rotateX.set((e.clientY - (rect.top + rect.height / 2)) / -12);
//     rotateY.set((e.clientX - (rect.left + rect.width / 2)) / 12);
//   }

//   return (
//     <>
//       <motion.div
//         ref={cardRef}
//         variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
//         onClick={() => setIsOpen(true)}
//         style={{ rotateX, rotateY, perspective: 1000 }}
//         className="relative group cursor-pointer"
//       >
//         {/* Adjusted padding: p-5 for mobile, p-6 for desktop */}
//         <div className="relative h-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 flex flex-col justify-between overflow-hidden shadow-sm transition-all duration-500 active:scale-[0.98] md:active:scale-100">
//           <div className="relative z-10 space-y-3 md:space-y-4">
//             <div className="flex justify-between items-start">
//               <div className="min-w-0">
//                 <span className="text-[7px] md:text-[8px] font-black text-red-600 uppercase tracking-[0.3em] block mb-1">Node_0{index + 1}</span>
//                 <h3 className="text-lg md:text-xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase truncate">{skill.name}</h3>
//               </div>
//               <div className="shrink-0 p-1.5 md:p-2 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-400 group-hover:text-red-500">
//                 <Zap size={12} className="md:w-3.5 md:h-3.5" />
//               </div>
//             </div>
//             <p className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">{skill.description}</p>
//           </div>
//           <div className="pt-4 md:pt-6 flex items-center gap-3">
//             <div className="flex-1 h-[1px] bg-zinc-100 dark:bg-white/10 rounded-full overflow-hidden">
//               <motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} className="h-full w-full bg-red-600" />
//             </div>
//             <span className="text-[6px] font-mono text-red-600 uppercase animate-pulse">Live</span>
//           </div>
//         </div>
//       </motion.div>

//       <AnimatePresence>
//         {isOpen && (
//           <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            
//             <motion.div 
//               layoutId={`card-${skill.id}`} 
//               className="relative z-10 w-full max-w-6xl h-[92vh] md:h-auto md:max-h-[90vh] bg-white dark:bg-[#080808] border-t md:border border-white/10 rounded-t-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col lg:grid lg:grid-cols-[1fr_350px]"
//             >
//               {/* Main Content: Scrollable */}
//               <div className="flex-1 p-6 md:p-14 overflow-y-auto custom-scrollbar">
//                 <div className="flex justify-between items-center mb-6 md:mb-8 lg:hidden">
//                    <span className="text-[9px] font-black text-red-600 tracking-[0.3em]">SYSTEM_TRACE</span>
//                    <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-zinc-100 dark:bg-white/5"><X size={18} /></button>
//                 </div>
                
//                 <h2 className="text-3xl md:text-7xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-tight mb-6 md:mb-8">{skill.name}</h2>
                
//                 <div className="bg-zinc-900 rounded-[1.2rem] md:rounded-[1.5rem] p-5 md:p-8 border border-white/5 mb-6 md:mb-8">
//                   <p className="font-mono text-xs md:text-lg text-zinc-300 leading-relaxed">
//                     <span className="text-red-500 mr-2 font-bold">{">"}</span>{skill.description}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
//                   <StatBox icon={<ShieldCheck size={14}/>} label="Security" value="Encrypted" />
//                   <StatBox icon={<Activity size={14}/>} label="Status" value="99.9% Up" />
//                   <StatBox icon={<Network size={14}/>} label="Protocol" value="TCP/IP" className="col-span-2 md:col-span-1" />
//                 </div>
//               </div>

//               {/* Sidebar: Bottom on mobile, Side on desktop */}
//               <div className="bg-zinc-50 dark:bg-white/[0.02] border-t lg:border-t-0 lg:border-l border-white/5 p-6 md:p-8 shrink-0">
//                 <div className="relative z-20 space-y-6 md:space-y-8">
//                   <div className="hidden lg:block">
//                     <button onClick={() => setIsOpen(false)} className="p-4 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-red-600 hover:text-white transition-all ml-auto block">
//                       <X size={20} />
//                     </button>
//                   </div>
                  
//                   <div className="space-y-3">
//                     <h4 className="text-[9px] font-black uppercase text-zinc-400">Diagnostic</h4>
//                     {['Integrity', 'Latency'].map((item) => (
//                       <div key={item} className="flex items-center justify-between">
//                         <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item}</span>
//                         <span className="text-[8px] font-mono text-emerald-500">OK</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-4 rounded-xl bg-red-600 text-white flex justify-between items-center lg:block lg:space-y-1">
//                     <p className="text-[8px] font-black uppercase opacity-70">Power_State</p>
//                     <p className="text-sm md:text-xl font-black italic uppercase">Operational</p>
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

// function StatBox({ icon, label, value, className = "" }: { icon: any; label: string; value: string, className?: string }) {
//   return (
//     <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 ${className}`}>
//       <div className="flex items-center gap-2 text-red-600 mb-1">
//         {icon}
//         <span className="text-[7px] md:text-[8px] font-black uppercase text-zinc-500">{label}</span>
//       </div>
//       <div className="text-[9px] md:text-[10px] font-black text-zinc-900 dark:text-zinc-200 uppercase truncate">{value}</div>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Zap, X, ShieldCheck, Activity} from "lucide-react";

interface Skill { id: string | number; name: string; description: string; }
interface SkillGroup { title: string; skills: Skill[]; }

export default function CinematicSkillSection({ group }: { group: SkillGroup }) {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
      }}
      className="grid gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
    >
      {group.skills.map((skill, i) => (
        <SkillCard key={skill.id} skill={skill} index={i} />
      ))}
    </motion.div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || isOpen || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    rotateX.set((e.clientY - (rect.top + rect.height / 2)) / -15);
    rotateY.set((e.clientX - (rect.left + rect.width / 2)) / 15);
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
        onClick={() => setIsOpen(true)}
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative group cursor-pointer"
      >
        <div className="relative h-full bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:border-red-500/40 hover:shadow-[0_0_20px_rgba(220,38,38,0.05)]">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[8px] font-black text-red-600 uppercase tracking-widest block mb-1">Node_0{index + 1}</span>
                <h3 className="text-lg font-black italic tracking-tight text-zinc-900 dark:text-zinc-100 uppercase group-hover:text-red-500 transition-colors">
                  {skill.name}
                </h3>
              </div>
              <Zap size={14} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {skill.description}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
            <div className="h-1 w-16 bg-red-600/20 rounded-full overflow-hidden">
               <div className="h-full w-2/3 bg-red-600" />
            </div>
            <span className="text-[7px] font-mono text-zinc-500 uppercase">Active_Session</span>
          </div>
        </div>
      </motion.div>

<AnimatePresence>
  {isOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop: Slightly more transparent for a lighter feel */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Dialog Box: Constrained to 3xl (approx 768px) and auto-height */}
      <motion.div 
        layoutId={`card-${skill.id}`} 
        className="relative z-10 w-full max-w-3xl bg-white dark:bg-[#0c0c0c] border border-zinc-200 dark:border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-[1fr_240px]"
      >
        {/* Main Content Area */}
        <div className="p-8 md:p-10">
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">Active_Module</span>
            </div>
            {/* Smaller, cleaner heading */}
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tight text-zinc-900 dark:text-white uppercase leading-tight">
              {skill.name}
            </h2>
          </header>
          
          <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-xl p-5 border border-zinc-200 dark:border-white/5">
            <p className="font-mono text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <span className="text-red-500 mr-2 font-bold">{"//"}</span>
              {skill.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <StatBox icon={<ShieldCheck size={12}/>} label="Security" value="Verified" />
            <StatBox icon={<Activity size={12}/>} label="Status" value="Optimal" />
          </div>
        </div>

        {/* Sidebar: Narrower and more integrated */}
        <div className="bg-zinc-50 dark:bg-white/[0.02] border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/5 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="hidden md:block text-right">
              <button 
                onClick={() => setIsOpen(false)} 
                className="inline-flex p-2 rounded-full bg-zinc-200 dark:bg-white/5 hover:bg-red-600 hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Properties</h4>
              {['Latency', 'Uptime'].map((item) => (
                <div key={item} className="flex justify-between items-center text-[8px] font-mono border-b border-zinc-200 dark:border-white/5 pb-1">
                  <span className="text-zinc-500 uppercase">{item}</span>
                  <span className="text-emerald-500">OK</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-0 p-3 rounded-lg bg-red-600 text-white">
            <p className="text-[7px] font-black uppercase opacity-80 mb-0.5">State</p>
            <p className="text-sm font-black italic uppercase leading-none">Operational</p>
          </div>
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
    <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/20">
      <div className="flex items-center gap-2 text-red-600 mb-2">
        {icon}
        <span className="text-[8px] font-black uppercase text-zinc-400 tracking-tighter">{label}</span>
      </div>
      <div className="text-[10px] font-mono font-bold text-zinc-800 dark:text-zinc-200 uppercase truncate">{value}</div>
    </div>
  );
}