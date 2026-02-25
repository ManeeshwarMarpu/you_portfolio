

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { coreSkills } from "../data/skills"; // Ensure your data path is correct
import CinematicSkillSection from "../components/CinematicSkillSection";
import { Cloud, ShieldCheck, Brain, Code2, Layout,  Terminal } from "lucide-react";

export default function Skills() {
  const [activeTab, setActiveTab] = useState(coreSkills[0].title);

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("cloud")) return <Cloud size={14} />;
    if (t.includes("security")) return <ShieldCheck size={14} />;
    if (t.includes("ai")) return <Brain size={14} />;
    if (t.includes("frontend")) return <Layout size={14} />;
    if (t.includes("backend")) return <Code2 size={14} />;
    return <Terminal size={14} />;
  };

  const activeGroup = coreSkills.find((g) => g.title === activeTab) || coreSkills[0];

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#050505] selection:bg-red-500/30 transition-colors duration-500">
      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        
        {/* Header: Scaled down for better screen fit */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1px] w-8 bg-red-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600/80">Module_Selector</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-zinc-900 dark:text-white uppercase leading-none">
            System <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Modules</span>
          </h1>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-10">
          
          {/* Sidebar: Refined container */}
          <aside className="lg:sticky lg:top-12 h-fit">
            <nav className="flex lg:flex-col gap-1.5 p-2 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 backdrop-blur-md overflow-x-auto scrollbar-hide">
              {coreSkills.map((group) => (
                <button
                  key={group.title}
                  onClick={() => setActiveTab(group.title)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 whitespace-nowrap lg:w-full group ${
                    activeTab === group.title
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5"
                  }`}
                >
                  <span className={`${activeTab === group.title ? "text-white" : "text-red-600 group-hover:scale-110 transition-transform"}`}>
                    {getIcon(group.title)}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{group.title}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
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