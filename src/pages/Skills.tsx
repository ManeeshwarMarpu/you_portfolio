import { coreSkills } from "../data/skills";
import CinematicSkillSection from "../components/CinematicSkillSection";

export default function Skills() {

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      {/* Background Decoration - Fixed placement */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-50/60 blur-[120px] dark:bg-blue-900/10" />
        <div className="absolute bottom-[10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-indigo-50/60 blur-[100px] dark:bg-indigo-900/10" />
      </div>

      <div className="relative z-10 space-y-16 px-6 py-20 max-w-6xl mx-auto">
        {/* Header */}
        <header className="space-y-3 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Technical Skills
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Built through production systems, large-scale automation,
            reliability engineering, and cloud-native architectures.
          </p>
        </header>

        {/* Skills Sections */}
        <div className="space-y-14">
          {coreSkills.map((group) => {

            return (
              <CinematicSkillSection 
                key={group.title} 
                group={group} 
                // globalStartIndex={sectionStart} 
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}