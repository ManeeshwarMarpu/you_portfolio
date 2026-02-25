import { useEffect, useMemo, useState, useCallback } from "react";
import { videos as allVideos } from "../data/videos";
import FeaturedVideoPlayer from "./FeaturedVideoPlayer";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HeroAd({ items = allVideos }) {
  const featuredItems = useMemo(() => shuffle(items).slice(0, 7), [items]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextVideo = useCallback(() => {
    setIndex((prev) => (prev + 1) % featuredItems.length);
  }, [featuredItems.length]);

  const prevVideo = useCallback(() => {
    setIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  }, [featuredItems.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextVideo, 8000);
    return () => clearInterval(timer);
  }, [isPaused, nextVideo]);

  return (
    <div 
      className="relative w-full aspect-video max-h-[70vh] overflow-hidden bg-black rounded-xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FeaturedVideoPlayer 
        video={featuredItems[index]} 
        onNext={nextVideo} 
        onPrev={prevVideo} 
      />

      {/* Dotted Pagination at Bottom Right */}
      <div className="absolute bottom-6 right-8 flex gap-2 z-50">
        {featuredItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}