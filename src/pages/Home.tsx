import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import SectionRow from "../components/SectionRow";
import FilterChips from "../components/FilterChips";
import HeroAd from "../components/HeroAd";
import SkeletonVideoCard from "../components/SkeletonVideoCard";
import { videos } from "../data/videos";
import type { Video } from "../data/videos";
import experiences from "./Experiences";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Search / Filter
  const [sp, setSp] = useSearchParams();
  const q = (sp.get("q") ?? "").trim();
  const urlTag = sp.get("tag") ?? "All";
  const [cat, setCat] = useState(urlTag);

  useEffect(() => {
    if (urlTag !== cat) setCat(urlTag);
  }, [urlTag, cat]);

  useEffect(() => {
    const loadTimer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(loadTimer);
  }, []);

  const allCategories = useMemo(
    () => Array.from(new Set(["All", ...videos.flatMap(v => v.tags ?? [])])),
    []
  );

  const shuffle = <T,>(arr: T[]) => [...arr].sort(() => 0.5 - Math.random());
  const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  const [hero] = useState<Video>(() => pickRandom(videos));
  const rest = videos.filter(v => v.id !== hero.id);

  const tagFiltered = useMemo(() => {
    if (cat === "All") return rest;
    return rest.filter(v => v.tags?.includes(cat));
  }, [cat, rest]);

  const filteredByQuery = useMemo(() => {
    if (!q) return tagFiltered;
    const needle = q.toLowerCase();
    return tagFiltered.filter(v =>
      [v.title, v.description, ...(v.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    );
  }, [q, tagFiltered]);

  const randomProjects = useMemo(
    () => (q ? filteredByQuery : shuffle(tagFiltered).slice(0, 4)),
    [q, filteredByQuery, tagFiltered]
  );

  const randomExperiences = useMemo(
    () => (Array.isArray(experiences) ? shuffle(experiences).slice(0, 4) : []),
    []
  );

  const handleChipChange = (t: string) => {
    setCat(t);
    const next = new URLSearchParams(sp);
    t !== "All" ? next.set("tag", t) : next.delete("tag");
    setSp(next, { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full px-4 md:px-6 lg:px-8 space-y-6 bg-white text-zinc-900 dark:bg-[#0f0f0f] dark:text-white transition-colors duration-300"
    >
      {/* Sticky Chip Header to match Projects look */}
      <header className="sticky top-0 z-10 py-2 bg-white/80 backdrop-blur-md dark:bg-[#0f0f0f]/80">
        <FilterChips items={allCategories} onChange={handleChipChange} initial={urlTag} />
      </header>

      {!q && <HeroAd />}

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonVideoCard key={i} />
          ))}
        </div>
      ) : (
        <div className="pb-8">
          <SectionRow
            title={q ? `Results for “${q}”` : cat === "All" ? "Recommended" : cat}
            items={randomProjects}
          />
          
          {!q && randomExperiences.length > 0 && (
            <div className="mt-10">
               <SectionRow title="Experiences" items={randomExperiences} />
            </div>
          )}
        </div>
      )}

      {/* No results state */}
      {!loading && randomProjects.length === 0 && (
        <div className="py-20 text-center text-zinc-500 dark:text-zinc-400">
          No projects found matching your criteria.
        </div>
      )}
    </motion.div>
  );
}