// import { motion, type Variants } from "framer-motion";
// import { Briefcase, Download, MapPin, Rocket, Star, Wrench, Sparkles } from "lucide-react";
// import { experiences as data } from "../data/experiences";

// const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu.pdf?alt=media";
// const PROFILE_IMAGE = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/po-about.png?alt=media&token=bd7a3d9e-b004-40a8-bf9b-9e71c1e54217";

// const stack = [
//   "Python", "Java", "React", "TypeScript", "Spring Boot", "Django",
//   "AWS", "Docker", "Kubernetes", "GitHub Actions", "Grafana", "Prometheus",
// ];

// const achievements = [
//   { icon: <Rocket className="w-5 h-5" />, title: "15+ Projects Shipped", blurb: "Full-stack & SRE solutions." },
//   { icon: <Wrench className="w-5 h-5" />, title: "CI/CD Automation", blurb: "Hours → minutes deployment." },
//   { icon: <Star className="w-5 h-5" />, title: "Cloud Mentorship", blurb: "K8s labs & student guidance." },
// ];

// const container: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const item: Variants = {
//   hidden: { y: 20, opacity: 0 },
//   show: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//   },
// };

// export default function About() {
//   const timeline = Array.isArray(data) ? data.slice(0, 3) : [];

//   return (
//     <motion.section
//       variants={container}
//       initial="hidden"
//       animate="show"
//       className="max-w-6xl mx-auto pb-20 px-4 space-y-6"
//     >
//       {/* --- HERO SECTION --- */}
//       <motion.div variants={item} className="relative group overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 min-h-[550px] flex items-center">
//         <div className="absolute inset-0 z-0 flex justify-end">
//           <div className="relative w-full md:w-2/3 h-full">
//             <img 
//               src={PROFILE_IMAGE} 
//               alt="Maneeshwar Marpu" 
//               className="w-full h-full object-cover object-top grayscale contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent dark:from-zinc-950 dark:via-zinc-950/50 dark:to-transparent" />
//           </div>
//         </div>

//         <div className="relative z-10 p-8 md:p-14 w-full">
//           <div className="space-y-8 max-w-2xl">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">
//               <Sparkles className="w-3 h-3" /> Software Engineer & SRE
//             </div>
            
//             <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white leading-[0.85]">
//               Maneeshwar <span className="text-red-600">Marpu</span>
//             </h1>
            
//             <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg md:text-xl max-w-lg italic">
//               Focusing on <span className="text-zinc-900 dark:text-white underline decoration-red-600/40 underline-offset-4">Cloud reliability</span> and 
//               <span className="text-zinc-900 dark:text-white"> Developer Experience</span>.
//             </p>
            
//             <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
//               <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600" /> Houston, TX</span>
//               <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-red-600" /> Open to DevOps and SRE Roles</span>
//             </div>

//             <motion.a
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               href={RESUME_URL}
//               target="_blank"
//               className="relative overflow-hidden group/btn inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all"
//             >
//               <div className="flex items-center gap-3 relative z-10">
//                 <Download className="w-4 h-4" />
//                 <span>Resume</span>
//               </div>
//               <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
//             </motion.a>
//           </div>
//         </div>
//       </motion.div>

//       {/* --- BENTO GRID: STACK & ACHIEVEMENTS --- */}
//       <div className="grid lg:grid-cols-3 gap-6">
//         <motion.div variants={item} className="lg:col-span-2 p-8 rounded-[2rem] border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-md">
//           <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 mb-8 flex items-center gap-3">
//             <span className="w-10 h-[1px] bg-red-600" /> Expert Stack
//           </h2>
//           <div className="flex flex-wrap gap-2">
//             {stack.map((t) => (
//               <motion.span
//                 key={t}
//                 whileHover={{ 
//                   scale: 1.1, 
//                   backgroundColor: "rgba(220,38,38,0.1)", 
//                   borderColor: "rgba(220,38,38,0.4)",
//                   color: "#ef4444"
//                 }}
//                 className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 transition-all cursor-default shadow-sm"
//               >
//                 {t}
//               </motion.span>
//             ))}
//           </div>
//         </motion.div>

//         <div className="space-y-6">
//           {achievements.map((a, i) => (
//             <motion.div
//               key={i}
//               variants={item}
//               whileHover={{ y: -5 }}
//               className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/50 flex items-center gap-5 group hover:border-red-600/20 transition-all"
//             >
//               <div className="p-4 rounded-2xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
//                 {a.icon}
//               </div>
//               <div>
//                 <div className="font-black text-zinc-900 dark:text-white text-sm uppercase tracking-tight">{a.title}</div>
//                 <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">{a.blurb}</div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.section>
//   );
// }

import { motion, type Variants,  useTransform, useMotionValue } from "framer-motion";
import { Briefcase, Download, MapPin, Rocket, Star, Wrench, Sparkles } from "lucide-react";
import { experiences as data } from "../data/experiences";

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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const timeline = Array.isArray(data) ? data.slice(0, 3) : [];
  
  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const x = useTransform(mouseX, [0, 1000], [5, -5]);
  const y = useTransform(mouseY, [0, 600], [5, -5]);

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
        className="relative group overflow-hidden rounded-[2.5rem] border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 min-h-[550px] flex items-center"
      >
        {/* ENHANCED BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <motion.div 
            style={{ x, y }}
            className="relative w-full md:w-2/3 h-full overflow-hidden"
          >
            <motion.img 
              src={PROFILE_IMAGE} 
              alt="Maneeshwar Marpu" 
              className="w-full h-full object-cover object-top grayscale contrast-[1.15] brightness-90 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              style={{
                maskImage: 'linear-gradient(to left, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 100%)'
              }}
            />
            
            {/* SRE/Tech Overlay (Animated Grid) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none bg-[length:30px_30px] [background-image:linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]" />
            
            {/* Color Wash for "Active" state */}
            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-700" />
            
            {/* Gradient blending for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent dark:from-zinc-950 dark:via-zinc-950/40 dark:to-transparent" />
          </motion.div>
        </div>

        <div className="relative z-10 p-8 md:p-14 w-full">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-600 text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-3 h-3" /> Software Engineer & SRE
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-zinc-900 dark:text-white leading-[0.85]">
              Maneeshwar <span className="text-red-600">Marpu</span>
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg md:text-xl max-w-lg italic">
              Focusing on <span className="text-zinc-900 dark:text-white underline decoration-red-600/40 underline-offset-4">Cloud reliability</span> and 
              <span className="text-zinc-900 dark:text-white"> Developer Experience</span>.
            </p>
            
            <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-600" /> Houston, TX</span>
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-red-600" /> Open to DevOps and SRE Roles</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={RESUME_URL}
              target="_blank"
              className="relative overflow-hidden group/btn inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 relative z-10">
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </div>
              <div className="absolute inset-0 bg-red-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* --- BENTO GRID: STACK & ACHIEVEMENTS --- */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="lg:col-span-2 p-8 rounded-[2rem] border border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-md">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500 mb-8 flex items-center gap-3">
            <span className="w-10 h-[1px] bg-red-600" /> Expert Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {stack.map((t) => (
              <motion.span
                key={t}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(220,38,38,0.1)", 
                  borderColor: "rgba(220,38,38,0.4)",
                  color: "#ef4444"
                }}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 transition-all cursor-default shadow-sm"
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
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950/50 flex items-center gap-5 group hover:border-red-600/20 transition-all"
            >
              <div className="p-4 rounded-2xl bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {a.icon}
              </div>
              <div>
                <div className="font-black text-zinc-900 dark:text-white text-sm uppercase tracking-tight">{a.title}</div>
                <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-wider">{a.blurb}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}