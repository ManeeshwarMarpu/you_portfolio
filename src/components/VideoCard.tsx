import { Link } from "react-router-dom";
import type { Video } from "../data/videos";

export default function VideoCard({ v }: { v: Video }) {
  const watchHref = `/projects/${encodeURIComponent(String(v.id))}`;

  // Cards ALWAYS use an image (never video)
  const thumbnailSrc =
    v.image ||
    v.thumbnail ||
    "https://dummyimage.com/1280x720/000/fff&text=Project+Preview";

  return (
    <Link
      to={watchHref}
      className="group block rounded-2xl overflow-hidden bg-card border border-yt hover:shadow-yt transition w-full"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-black">
        <img
          src={thumbnailSrc}
          alt={v.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {v.duration && (
          <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-black/70 text-white">
            {v.duration}
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="line-clamp-2 text-base font-semibold text-yt">
          {v.title}
        </h3>

        {v.channel && (
          <div className="flex items-center gap-2 text-xs text-yt-muted">
            {v.channel.avatar && (
              <img
                src={v.channel.avatar}
                alt=""
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="font-medium truncate">
              {v.channel.name}
            </span>
            {v.channel.handle && (
              <span className="truncate">• @{v.channel.handle}</span>
            )}
          </div>
        )}

        {v.tags && (
          <div className="flex flex-wrap gap-1">
            {v.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full chip"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
