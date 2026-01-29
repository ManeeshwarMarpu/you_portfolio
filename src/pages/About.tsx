import { motion, type Variants } from "framer-motion";
import { Briefcase, Download, MapPin, Rocket, Star, Wrench, Sparkles } from "lucide-react";
import { experiences as data } from "../data/experiences";

const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu.pdf?alt=media";

const stack = [
  "Python", "Java", "React", "TypeScript", "Spring Boot", "Django",
  "AWS", "Docker", "Kubernetes", "GitHub Actions", "Grafana", "Prometheus",
];

const achievements = [
  { icon: <Rocket />, title: "15+ Projects Shipped", blurb: "Full-stack & SRE solutions." },
  { icon: <Wrench />, title: "CI/CD Automation", blurb: "Hours → minutes deployment." },
  { icon: <Star />, title: "Cloud Mentorship", blurb: "K8s labs & student guidance." },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function About() {
  const timeline = Array.isArray(data) ? data.slice(0, 3) : [];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 max-w-4xl mx-auto pb-12"
    >
      {/* 1. HERO WITH RED SPARK (Adaptive Background) */}
      <motion.div variants={item} className="relative group p-[2px] rounded-[2rem] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#dc2626_360deg)] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        <div className="relative z-10 rounded-[1.9rem] border border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/90 backdrop-blur-2xl p-8 md:p-10 shadow-xl dark:shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-500 text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Software Engineer & SRE
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-zinc-900 dark:text-white leading-none">
                Maneeshwar <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Marpu</span>
              </h1>
              
              <p className="text-zinc-600 dark:text-zinc-400 font-medium max-w-xl leading-relaxed italic text-lg">
                Focusing on <span className="text-zinc-900 dark:text-white">Cloud reliability</span> and 
                <span className="text-zinc-900 dark:text-white"> Developer Experience</span>.
              </p>
              
              <div className="flex flex-wrap gap-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600" /> Houston, TX</span>
                <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-red-600" /> Open to DevOPS / SRE Roles</span>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group/btn px-10 py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-widest shadow-xl dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] transition-all"
            >
              <div className="flex items-center gap-3 relative z-10">
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </div>
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* 2. ACHIEVEMENTS (Adaptive) */}
      <div className="grid md:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/[0.01] p-5 flex gap-4 transition-all shadow-sm dark:shadow-none"
          >
            <div className="p-3 rounded-xl bg-red-600/10 text-red-600">
              {a.icon}
            </div>
            <div>
              <div className="font-bold text-zinc-900 dark:text-white text-sm">
                {a.title}
              </div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider font-medium">
                {a.blurb}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. STACK + EXPERIENCE SIDE-BY-SIDE */}
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* EXPERT STACK */}
        <motion.div variants={item} className="space-y-4">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-red-600" /> Expert Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((t) => (
              <motion.span
                key={t}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(220,38,38,0.1)", 
                  borderColor: "rgba(220,38,38,0.3)",
                  color: "#ef4444"
                }}
               className="rounded-lg border border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-white/[0.02] px-3 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 transition-all cursor-default focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"

              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* RECENT EXPERIENCE TIMELINE */}
        <motion.div variants={item} className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
            Experience <span className="flex-1 h-[1px] bg-red-600/30" />
          </h2>

          <div className="space-y-8">
            {timeline.map((x, i) => (
              <div key={i} className="group relative pl-6 border-l border-zinc-200 dark:border-white/10 hover:border-red-600 transition-colors">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 group-hover:bg-red-600 group-hover:scale-125 transition-all" />
                <div className="text-[9px] font-black text-red-600 uppercase tracking-widest mb-1">{x.period}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white mb-0.5">{x.role}</div>
                <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">{x.org}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}