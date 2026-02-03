
import { motion, type Variants,  useTransform, useMotionValue } from "framer-motion";
import { Briefcase, Download, MapPin, Rocket, Star, Wrench, Sparkles } from "lucide-react";


const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu.pdf?alt=media";
const PROFILE_IMAGE = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/po-about.png?alt=media&token=bd7a3d9e-b004-40a8-bf9b-9e71c1e54217";

const stack = [
  "Python", "Java", "React", "TypeScript", "Spring Boot", "Django",
  "AWS", "Docker", "Kubernetes", "GitHub Actions", "Grafana", "Prometheus",
];

const achievements = [
  { icon: <Rocket className="w-5 h-5" />, title: "15+ Projects Shipped", blurb: "Full-stack & SRE solutions." },
  { icon: <Wrench className="w-5 h-5" />, title: "CI/CD Automation", blurb: "Hours → minutes deployment." },
  { icon: <Star className="w-5 h-5" />, title: "Cloud Mentorship", blurb: "K8s labs & student guidance." },
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
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Smooth parallax values
  const x = useTransform(mouseX, [0, 1200], [10, -10]);
  const y = useTransform(mouseY, [0, 600], [10, -10]);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto pb-20 px-4 space-y-6"
    >
      {/* --- HERO SECTION --- */}
      <motion.div 
        onMouseMove={handleMouseMove}
        variants={item} 
        className="relative group overflow-hidden rounded-[3rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 min-h-[600px] flex items-center"
      >
        {/* CINEMATIC BACKGROUND ENGINE */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <motion.div 
            style={{ x, y }}
            className="relative w-full md:w-3/4 h-full"
          >
            {/* The Image with Exposure Breathing */}
            <motion.img 
              src={PROFILE_IMAGE} 
              alt="Maneeshwar Marpu" 
              animate={{ 
                filter: ["grayscale(1) brightness(0.8)", "grayscale(1) brightness(0.95)", "grayscale(1) brightness(0.8)"] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full object-cover object-top contrast-[1.1] transition-all duration-1000 group-hover:scale-105 group-hover:contrast-[1.2] group-hover:rotate-1"
              style={{
                maskImage: 'radial-gradient(circle at 60% 40%, black 30%, transparent 90%)',
                WebkitMaskImage: 'radial-gradient(circle at 60% 40%, black 30%, transparent 90%)'
              }}
            />
            
            {/* Film Grain/Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

            {/* Lens Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            
            {/* Floating "Data" Dust Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -40, 0], 
                  x: [0, 20, 0],
                  opacity: [0, 0.3, 0] 
                }}
                transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
                className="absolute w-1 h-1 bg-red-500 rounded-full blur-[1px]"
                style={{ 
                  top: `${20 + i * 15}%`, 
                  right: `${10 + i * 10}%` 
                }}
              />
            ))}

            {/* Cinematic Red Flare (Soft) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[120px] rounded-full group-hover:bg-red-600/20 transition-colors duration-1000" />
            
            {/* Edge Fog for text blending */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent" />
          </motion.div>
        </div>

        {/* --- CONTENT LAYER --- */}
        <div className="relative z-10 p-8 md:p-14 w-full">
          <div className="space-y-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
              <Sparkles className="w-3 h-3 animate-pulse" /> Software Engineer & SRE
            </div>
            
            <div className="space-y-4">
               <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white leading-[0.8]">
                Maneeshwar <br />
                <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Marpu</span>
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg md:text-xl max-w-md italic leading-relaxed">
                Architecting <span className="text-zinc-900 dark:text-white border-b-2 border-red-600/40">resilient systems</span> and 
                <span className="text-zinc-900 dark:text-white"> high-velocity</span> CI/CD pipelines.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
              <span className="flex items-center gap-3 group/loc"><MapPin className="w-4 h-4 text-red-600 group-hover/loc:animate-bounce" /> Houston, TX</span>
              <span className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-red-600" /> Available for Hire</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={RESUME_URL}
              target="_blank"
              className="relative overflow-hidden group/btn inline-flex items-center gap-4 px-12 py-6 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-[0.3em] shadow-2xl transition-all"
            >
              <div className="flex items-center gap-3 relative z-10">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* --- BENTO GRID: STACK & ACHIEVEMENTS --- */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 p-10 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-xl">
          <h2 className="text-xs font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-500 mb-10 flex items-center gap-4">
            <span className="w-12 h-[2px] bg-red-600" /> Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {stack.map((t) => (
              <motion.span
                key={t}
                whileHover={{ y: -3, scale: 1.05, color: "#ef4444" }}
                className="px-5 py-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 transition-all cursor-crosshair shadow-sm hover:shadow-red-600/10 hover:shadow-lg"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ x: 10 }}
              className="p-8 rounded-[2rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/50 flex items-center gap-6 group hover:border-red-600/30 transition-all"
            >
              <div className="p-4 rounded-2xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700">
                {a.icon}
              </div>
              <div>
                <div className="font-black text-zinc-900 dark:text-white text-sm uppercase tracking-wider">{a.title}</div>
                <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest opacity-70">{a.blurb}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}