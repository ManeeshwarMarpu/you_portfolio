
import React, { useMemo, useState, useEffect } from "react";
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
    <main className="p-4">
      {/* Chip strip with fade edges */}
      <header className="mb-3">
        <FilterChips items={allChips} initial={chip} onChange={handleChipClick} />
      </header>

      <section className="space-y-6">
        {/* Optional title when searching */}
        {urlQ && (
          <h2 className="text-base text-yt-muted">
            Results for “<span className="text-yt">{urlQ}</span>”
            {chip !== "All" && <span className="text-yt-muted"> • #{chip}</span>}
          </h2>
        )}

        {/* Results */}
        <VideoGrid items={filtered} />
        {filtered.length === 0 && (
          <div className="text-sm text-yt-muted">No matches for your search.</div>
        )}
      </section>
    </main>
  );
}
