import { useEffect, useRef, useState } from "react";
import type { Skill, SkillGroup } from "../data/skills";

export default function CinematicSkillSection({ group }: { group: SkillGroup }) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="group py-4">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          {group.title}
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-blue-500/30 via-blue-500/10 to-transparent" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.skills.map((skill, i) => (
          <SkillCard 
            key={skill.id} 
            skill={skill} 
            index={i} 
            isVisible={isVisible} 
          />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ skill, index, isVisible }: { 
  skill: Skill; 
  index: number;  
  isVisible: boolean 
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isOpen) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    const rotateX = (y - rect.height / 2) / 12;
    const rotateY = (rect.width / 2 - x) / 12;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setIsOpen(true)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          animationDelay: `${index * 50}ms`,
        }}
        className={`
          relative group cursor-pointer overflow-hidden rounded-2xl p-[1px]
          ${isVisible ? 'animate-skill-reveal opacity-100' : 'opacity-0'}
          bg-slate-300/50 dark:bg-white/10 shadow-lg transition-all duration-500
        `}
      >
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent)` }}
        />
        <div className="absolute inset-0 z-10 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] opacity-0 group-hover:opacity-100 bg-[conic-gradient(from_0deg,transparent_0,transparent_70%,#3b82f6_100%)]" />

        <div className="relative z-20 flex h-full flex-col justify-between bg-white/95 dark:bg-neutral-950/95 px-6 py-6 backdrop-blur-2xl rounded-[15px]">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold tracking-tight text-slate-800 dark:text-white leading-tight pr-4">
              {skill.name}
            </h3>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-8 relative h-[2px] w-full bg-slate-100 dark:bg-white/5 overflow-hidden rounded-full">
            <div className="absolute h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

{/* MODAL OVERLAY */}
{isOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
    {/* 1. Backdrop: High Saturation + Deep Blur */}
    <div 
      className="absolute inset-0 bg-slate-950/40 dark:bg-black/80 backdrop-blur-xl backdrop-saturate-150 animate-in fade-in duration-500" 
      onClick={() => setIsOpen(false)} 
    />
    
    {/* 2. Modal Container: Glassmorphism with Border Beam */}
    <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/20 
                    bg-white/80 dark:bg-neutral-900/90 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] 
                    animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out">
       
       {/* Cinematic Texture Overlay */}
       <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
       
       {/* Active Border Glow */}
       <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />

       <div className="relative z-10 p-8 sm:p-10">
          <div className="flex justify-between items-start mb-8">
             <div>
               <div className="flex items-center gap-2 mb-2">
                 <div className="h-1 w-8 bg-blue-500 rounded-full" />
                 <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-black tracking-[0.3em] uppercase">
                   Deployment_Log
                 </span>
               </div>
               <h2 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
                 {skill.name}
               </h2>
             </div>
             
             <button 
               onClick={() => setIsOpen(false)} 
               className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 hover:bg-red-500/10 transition-colors"
             >
               <svg className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
          </div>

          {/* Implementation Detail Box */}
          <div className="relative space-y-6">
             <div className="relative overflow-hidden rounded-2xl bg-slate-950 px-6 py-5 shadow-inner border border-white/5">
                {/* Subtle Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                
                <p className="relative z-10 font-mono text-xs leading-relaxed text-emerald-500/90">
                  <span className="text-slate-500 mr-2">$ cat implementation_details.txt</span>
                  <br /><br />
                  {skill.description}
                </p>
             </div>

             {/* Metadata Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-3">
                   <span className="block text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Environment</span>
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-200">PRODUCTION-GRADE </span>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 p-3">
                   <span className="block text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Uptime Metric</span>
                   <span className="text-xs font-bold text-slate-700 dark:text-slate-200">99%+ AVAILABILITY </span>
                </div>
             </div>
          </div>
       </div>

       {/* Bottom Animated Bar */}
       <div className="h-2 w-full bg-slate-100 dark:bg-white/5">
          <div className="h-full w-2/3 bg-gradient-to-r from-blue-600 to-indigo-500 animate-[shimmer_3s_infinite]" />
       </div>
    </div>
  </div>
)}
    </>
  );
}