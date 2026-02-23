import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import VideoGrid from "../components/VideoGrid";
import { videos } from "../data/videos";
import type { Video } from "../data/videos";
import FilterChips from "../components/FilterChips";

export default function Projects() {
  // ------- URL params (q + tag) -------
  const [sp, setSp] = useSearchParams();
  const urlQ = (sp.get("q") ?? "").trim();
  const urlTag = sp.get("tag") ?? "All"; 

  // ------- Chips list -------
  const allChips = useMemo(() => {
    const set = new Set<string>();
    videos.forEach((v) => (v.tags ?? []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const [chip, setChip] = useState<string>(urlTag);

  useEffect(() => {
    if (urlTag !== chip) setChip(urlTag);
  }, [urlTag]);

  // ------- Filtering (tag AND query) -------
  const filtered: Video[] = useMemo(() => {
    const q = urlQ.toLowerCase();
    return videos.filter((v) => {
      const tagOk = chip === "All" || (v.tags ?? []).includes(chip);
      if (!tagOk) return false;
      if (!q) return true;
      const haystack = [v.title, v.description, ...(v.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [chip, urlQ]);

  // ------- Handlers -------
  const handleChipClick = (t: string) => {
    setChip(t);
    const next = new URLSearchParams(sp);
    if (t && t !== "All") next.set("tag", t);
    else next.delete("tag");
    setSp(next, { replace: true });
  };

  return (
    <main className="min-h-screen p-4 bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#0f0f0f] dark:text-white">
      {/* Chip strip with fade edges */}
      <header className="mb-3 sticky top-0 z-10 bg-white/80 backdrop-blur-md dark:bg-[#0f0f0f]/80">
        <FilterChips items={allChips} initial={chip} onChange={handleChipClick} />
      </header>

      <section className="space-y-6">
        {/* Search Results Title */}
        {urlQ && (
          <h2 className="text-base text-zinc-600 dark:text-zinc-400">
            Results for “<span className="font-medium text-zinc-900 dark:text-zinc-100">{urlQ}</span>”
            {chip !== "All" && (
              <span className="text-zinc-500 dark:text-zinc-500"> • #{chip}</span>
            )}
          </h2>
        )}

        {/* Results Grid */}
        <VideoGrid items={filtered} />

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No matches found for your current search or filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}