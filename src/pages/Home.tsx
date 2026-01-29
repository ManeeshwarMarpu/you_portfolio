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
      className="space-y-6 w-full px-4 md:px-6 lg:px-8"
    >
      <FilterChips items={allCategories} onChange={handleChipChange} initial={urlTag} />

      {!q && <HeroAd />}

      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonVideoCard key={i} />
          ))}
        </div>
      ) : (
        <SectionRow
          title={q ? `Results for “${q}”` : cat === "All" ? "Recommended" : cat}
          items={randomProjects}
        />
      )}

      {!q && !loading && randomExperiences.length > 0 && (
        <SectionRow title="Experiences" items={randomExperiences} />
      )}
    </motion.div>
  );
}
