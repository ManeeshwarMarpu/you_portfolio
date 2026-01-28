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
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-3
        w-full min-w-0 overflow-hidden
      "
    >
      {items.map((v) => (
        <VideoCard key={String(v.id)} v={v} />
      ))}
    </div>
  );
}