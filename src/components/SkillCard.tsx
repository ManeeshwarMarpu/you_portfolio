// import type { Skill } from "../data/skills";

// export default function SkillCard({ skill }: { skill: Skill }) {
//   return (
//     <div className="
//       group relative rounded-2xl
//       border border-black/10 dark:border-white/10
//       bg-white/70 dark:bg-white/5
//       backdrop-blur
//       p-4
//       transition-all duration-500
//       hover:scale-[1.03]
//       hover:shadow-xl
//     ">
//       {/* Glow */}
//       <div className="
//         absolute inset-0 rounded-2xl
//         opacity-0 group-hover:opacity-100
//         bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent
//         transition-opacity duration-500
//       " />

//       <div className="relative z-10 flex items-center gap-4">
//         <img src={skill.icon} className="w-12 h-12" />
//         <div>
//           <h4 className="font-semibold text-black dark:text-white">
//             {skill.name}
//           </h4>
//           <p className="text-xs text-black/60 dark:text-white/60">
//             {skill.level}
//           </p>
//         </div>
//       </div>

//       {/* Progress */}
//       <div className="relative mt-4 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
//         <div
//           className="
//             absolute left-0 top-0 h-full
//             bg-gradient-to-r from-blue-500 to-cyan-400
//             transition-all duration-700
//           "
//           style={{ width: `${skill.percent}%` }}
//         />
//       </div>
//     </div>
//   );
// }
