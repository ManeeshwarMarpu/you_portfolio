
import { useEffect, useMemo, useState } from "react";
import { videos as allVideos } from "../data/videos";
import type { Video } from "../data/videos";
import HeroAdCard from "./HeroAdCard";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroAd({
  items = allVideos,
  intervalMs = 6000,
  onActiveChange,         
}: {
  items?: Video[];
  intervalMs?: number;
  onActiveChange?: (v: Video) => void;  
}) {
  const list = useMemo(() => shuffle(items), [items]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // notify parent when active changes
  useEffect(() => {
    onActiveChange?.(list[i]);
  }, [i, list, onActiveChange]);

  useEffect(() => {
    if (paused || list.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % list.length), intervalMs);
    return () => clearInterval(id);
  }, [paused, list.length, intervalMs]);

  return <HeroAdCard v={list[i]} onOpenChange={setPaused} />;
}
