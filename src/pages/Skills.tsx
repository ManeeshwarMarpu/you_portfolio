import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { coreSkills } from "../data/skills";
import CinematicSkillSection from "../components/CinematicSkillSection";
import { 
  Cloud, ShieldCheck, Brain, Code2, 
  Terminal, Layout, Activity, Cpu, Boxes 
} from "lucide-react";

export default function Skills() {
  const [activeTab, setActiveTab] = useState(coreSkills[0].title);

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("cloud")) return <Cloud size={18} />;
    if (t.includes("security") || t.includes("net")) return <ShieldCheck size={18} />;
    if (t.includes("ai") || t.includes("machine")) return <Brain size={18} />;
    if (t.includes("full stack") || t.includes("frontend")) return <Layout size={18} />;
    if (t.includes("backend") || t.includes("development")) return <Code2 size={18} />;
    if (t.includes("iac") || t.includes("automation")) return <Cpu size={18} />;
    if (t.includes("containers")) return <Boxes size={18} />;
    return <Terminal size={18} />;
  };

  const activeGroup = coreSkills.find((g) => g.title === activeTab) || coreSkills[0];

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#080808] transition-colors duration-500 overflow-x-hidden selection:bg-red-500/30">
      {/* Dynamic Background Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-zinc-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-20 max-w-7xl mx-auto">
        <header className="mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex items-center gap-3"
          >
            <Activity className="w-4 h-4 text-red-600 animate-pulse" />
            <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-red-600">
              Technical Capability
            </h2>
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white leading-[0.8] uppercase">
            System <span className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]">Modules</span>
          </h1>
        </header>

        {/* Updated Grid: Prevent squishing with minmax */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          <aside className="sticky top-24 z-20">
            <div className="p-2 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 backdrop-blur-md">
              {coreSkills.map((group) => (
                <button
                  key={group.title}
                  onClick={() => setActiveTab(group.title)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-[2rem] transition-all duration-300 group mb-1 ${
                    activeTab === group.title
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20 scale-[1.02]"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeTab === group.title ? "text-white" : "text-red-600"}>
                      {getIcon(group.title)}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-left leading-none">
                      {group.title}
                    </span>
                  </div>
                  {activeTab === group.title && (
                    <motion.div layoutId="activeDot" className="w-1 h-1 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </aside>

          <main className="min-h-[600px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
              >
                <CinematicSkillSection group={activeGroup} />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}