
import React from "react";
import VideoCard from "./VideoCard";
import type { Video } from "../data/videos";

export default function VideoGrid({ items }: { items: Video[] }) {
  if (!items?.length) {
    return (
      <div className="text-sm text-zinc-400 border border-dashed border-zinc-700 rounded-xl p-8 text-center">
        No videos match your filters.
      </div>
    );
  }

  return (
    <div
      className="
        grid gap-6
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-2
        2xl:grid-cols-3
      "
    >
      {items.map((v) => (
        <VideoCard key={String(v.id)} v={v} />
      ))}
    </div>
  );
}

