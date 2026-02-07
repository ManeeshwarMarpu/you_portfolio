import { Link } from "react-router-dom";
import type { Video } from "../data/videos";

export default function VideoCard({
  v,
  compact = false,
}: {
  v: Video;
  compact?: boolean;
}) {
  const watchHref = `/projects/${encodeURIComponent(String(v.id))}`;

  const thumbnailSrc =
    v.image ||
    v.thumbnail ||
    "https://dummyimage.com/1280x720/000/fff&text=Project+Preview";

  return (
    <Link
      to={watchHref}
      className={`group block rounded-2xl overflow-hidden border border-yt bg-card hover:shadow-yt transition ${
        compact ? "max-w-full" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden bg-black ${
          compact ? "aspect-[16/6]" : "aspect-video"
        }`}
      >
        <img
          src={thumbnailSrc}
          alt={v.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className={`p-3 ${compact ? "space-y-1" : "space-y-2"}`}>
        <h3
          className={`font-semibold line-clamp-2 ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          {v.title}
        </h3>

        {v.tags && (
          <div className="flex flex-wrap gap-1">
            {v.tags.slice(0, compact ? 3 : 4).map((t) => (
              <span
                key={t}
                className="text-[9px] px-2 py-0.5 rounded-full chip"
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
