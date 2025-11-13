import VideoCard from "./VideoCard";
import type { Video } from "../data/videos";

export default function SectionRow({
  title,
  items,
}: {
  title: string;
  items: Video[];
}) {
  return (
    <section className="mb-8 w-full min-w-0 overflow-hidden">
      <h2 className="text-xl font-semibold mb-3 text-yt">{title}</h2>

      {/* FIX: prevent grid overflow */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full min-w-0">
        {items.map((v) => (
          <VideoCard key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}
