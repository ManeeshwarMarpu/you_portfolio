
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SectionRow from "../components/SectionRow";
import FilterChips from "../components/FilterChips";
import HeroAd from "../components/HeroAd";
import { videos } from "../data/videos";
import type { Video } from "../data/videos";
import experiences from "./Experiences";

const allCategories = Array.from(
  new Set(["All", ...videos.flatMap((v) => v.tags ?? [])])
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const pickRandom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export default function Home() {
  const [sp, setSp] = useSearchParams();
  const q = (sp.get("q") ?? "").trim();
  const urlTag = sp.get("tag") ?? "All";

  const [cat, setCat] = useState(urlTag);

  useEffect(() => {
    if (urlTag !== cat) setCat(urlTag);
  }, [urlTag]); 
  const [hero, setHero] = useState<Video>(() => pickRandom(videos));
  useEffect(() => {
    if (!q) setHero(pickRandom(videos));
  }, [q, cat]); 


  const rest = videos.filter((v) => v.id !== hero.id);

  const tagFiltered: Video[] = useMemo(() => {
    if (cat === "All") return rest;
    return rest.filter((v) => (v.tags ?? []).includes(cat));
  }, [cat, rest]);

  const filteredByQuery: Video[] = useMemo(() => {
    if (!q) return tagFiltered;
    const needle = q.toLowerCase();
    return tagFiltered.filter((v) => {
      const haystack = [v.title, v.description, ...(v.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [q, tagFiltered]);

  const randomProjects = useMemo(() => {
    if (q) return filteredByQuery; // show all matches when searching
    return shuffle(tagFiltered).slice(0, 4);
  }, [q, filteredByQuery, tagFiltered]);

  const randomExperiences = useMemo(() => {
    return Array.isArray(experiences) ? shuffle(experiences).slice(0, 4) : [];
  }, []);

  const handleChipChange = (t: string) => {
    setCat(t);
    const next = new URLSearchParams(sp);
    if (t && t !== "All") next.set("tag", t);
    else next.delete("tag");
    setSp(next, { replace: true });
  };

  return (
    <div className="space-y-6 w-full px-4 md:px-6 lg:px-8">
      <FilterChips items={allCategories} onChange={handleChipChange} initial={urlTag ?? "All"} />

      {/* Show random ad only when NOT searching */}
     
      
      {!q && <HeroAd />}

      <SectionRow
        title={q ? `Results for “${q}”` : cat === "All" ? "Recommended" : cat}
        items={randomProjects}
      />

      {!q && randomExperiences.length > 0 && (
        <SectionRow title="Experiences" items={randomExperiences} />
      )}

      {q && randomProjects.length === 0 && (
        <div className="text-sm text-white/60">No matches for “{q}”.</div>
      )}
    </div>
  );
}
