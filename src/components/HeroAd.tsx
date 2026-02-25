import { useEffect, useMemo, useState, useCallback } from "react";
import { videos as allVideos } from "../data/videos";
import FeaturedVideoPlayer from "./FeaturedVideoPlayer";

// ── Fix ts(7006): explicitly type the array parameter ──
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
  const [index, setIndex]     = useState(0);
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
      className="relative w-full overflow-hidden bg-black md:rounded-xl group
                 aspect-video max-h-[55vw] sm:max-h-[60vw] md:max-h-[85vh] touch-pan-y"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <FeaturedVideoPlayer
        video={featuredItems[index]}
        onNext={nextVideo}
        onPrev={prevVideo}
      />

      {/* ── Bottom gradient — stronger on mobile for text legibility ── */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none
                      h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* ── Pagination dots ──
            Mobile: centered, close to bottom edge (above nav bar)
            Desktop: bottom-right                                      */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                      md:bottom-5 md:left-auto md:right-6 md:translate-x-0
                      flex gap-1.5 z-50">
        {featuredItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === index
                ? "w-6 bg-white shadow-lg"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}