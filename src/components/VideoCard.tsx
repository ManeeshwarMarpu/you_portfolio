import { Link } from "react-router-dom";
import type { Video } from "../data/videos";

export default function VideoCard({ v }: { v: Video }) {
  const watchHref = `/projects/${encodeURIComponent(String(v.id))}`;

  return (
    <Link
      to={watchHref}
      className="group block rounded-2xl overflow-hidden bg-card border border-yt hover:shadow-yt transition w-full min-w-0"
    >
      <div className="relative w-full min-w-0 overflow-hidden">
        {v.thumbnail ? (
          <img
            src={v.thumbnail}
            alt={v.title}
            className="w-full max-w-full aspect-video object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video bg-ytbg-hover" />
        )}

        {v.duration && (
          <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-card/80 border border-yt text-yt">
            {v.duration}
          </span>
        )}
      </div>

      {/* CONTENT WRAPPER - FIXED */}
      <div className="p-4 space-y-2 w-full min-w-0 overflow-hidden">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-yt w-full min-w-0 overflow-hidden">
          {v.title}
        </h3>

        {v.channel?.name && (
          <div className="flex items-center gap-2 text-xs text-yt-muted min-w-0 overflow-hidden">
            {v.channel.avatar && (
              <img
                src={v.channel.avatar}
                alt=""
                className="w-6 h-6 rounded-full shrink-0"
              />
            )}
            <span className="font-medium text-yt truncate">
              {v.channel.name}
            </span>
            {v.channel.handle && (
              <span className="truncate">• @{v.channel.handle}</span>
            )}
          </div>
        )}

        {(v.tags?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-1 w-full min-w-0 overflow-hidden">
            {v.tags!.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded-full chip shrink-0"
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
