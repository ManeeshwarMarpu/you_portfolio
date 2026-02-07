import { Link } from "react-router-dom";
import { Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  image: string;
  tags: string[];
  category: string;
  github?: string;
};

export default function ProjectPreviewCard({ p }: { p: Project }) {
  return (
    <Link
      to={`/projects/${p.id}`}
      className="group block rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/80 hover:bg-zinc-900 transition shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {p.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {p.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-300"
            >
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-zinc-400">
          <span className="uppercase tracking-wider">{p.category}</span>
          {p.github && (
            <Github size={12} className="ml-auto opacity-60" />
          )}
        </div>
      </div>
    </Link>
  );
}
