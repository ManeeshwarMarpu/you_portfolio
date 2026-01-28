import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { videos } from "../data/videos";
import type { Video } from "../data/videos";

function formatViews(v?: number) {
  if (v == null) return "";
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M views`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K views`;
  return `${v} views`;
}
function timeAgo(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const days = Math.max(0, Math.floor((Date.now() - d.getTime()) / 86_400_000));
  if (days < 1) return "today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function Watch() {
  const { id } = useParams();
  const video = useMemo<Video | undefined>(
    () => videos.find((v) => String(v.id) === String(id)),
    [id]
  );

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });
  const [showMore, setShowMore] = useState(false);

  function handleLike() {
    if (!liked) {
      setLikes((n) => n + 1);
      setLiked(true);
    } else {
      setLikes((n) => Math.max(0, n - 1));
      setLiked(false);
    }
  }

  async function handleShare() {
    const url = video?.appUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setToast({ open: true, msg: "Link copied to clipboard" });
      setTimeout(() => setToast({ open: false, msg: "" }), 1800);
    } catch {
      setToast({ open: true, msg: "Couldn’t copy — long-press to copy" });
      setTimeout(() => setToast({ open: false, msg: "" }), 2000);
    }
  }

  const related = useMemo<Video[]>(
    () => videos.filter((v) => String(v.id) !== String(id)).slice(0, 10),
    [id]
  );

  if (!video) {
    return (
      <div className="p-6">
        <div className="text-sm text-yt-muted">Video not found.</div>
        <Link to="/projects" className="mt-3 inline-block text-yt hover:underline">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const watchUrl = video.sources?.mp4;
  const displayDate = video.uploadedAt ?? video.date;

  return (
     <div className="px-4 md:px-6 lg:px-8 py-4 overflow-anchor-none">
      {/* Back button */}
      <div className="mb-4">
        <Link
          to="/projects"
          className="inline-block px-4 py-2 rounded-full border border-yt hover:bg-ytbg-hover text-sm text-yt"
        >
          ← Back to Projects
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* Left: player & metadata */}
        <div className="space-y-4">
          {/* Player */}
          <div className="w-full rounded-xl overflow-hidden bg-card border border-yt">
            <div className="relative aspect-video">
              {watchUrl ? (
                <video
                  src={watchUrl}
                  poster={video.thumbnail}
                  className="absolute inset-0 w-full h-full"
                  controls
                />
              ) : (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-semibold text-yt">{video.title}</h1>

          {/* Channel row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {video.channel?.avatar && (
                <img src={video.channel.avatar} alt="" className="w-10 h-10 rounded-full" />
              )}
              <div>
                <div className="font-medium text-yt">
                  {video.channel?.name ?? "Channel"}
                </div>
                {video.channel?.handle && (
                  <div className="text-xs text-yt-muted">@{video.channel.handle}</div>
                )}
              </div>

              {video.appUrl && (
                <a
                  href={video.appUrl}
                  target="_blank"
                  className="ml-4 text-sm px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  View App
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`text-sm px-3 py-1.5 rounded-full border ${
                  liked
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "border-yt hover:bg-ytbg-hover text-yt"
                }`}
                title={liked ? `${likes} liked` : "Like"}
              >
                Like{likes ? ` (${likes})` : ""}
              </button>

              <button
                onClick={handleShare}
                className="text-sm px-3 py-1.5 rounded-full border border-yt hover:bg-ytbg-hover text-yt"
                title="Copy app link"
              >
                🔗 <span className="ml-1">Share</span>
              </button>

              {video.github && (
                <a
                  href={video.github}
                  target="_blank"
                  className="text-sm px-3 py-1.5 rounded-full border border-yt hover:bg-ytbg-hover text-yt"
                >
                  Code
                </a>
              )}
            </div>
          </div>

          {/* Stats + description */}
          <div className="rounded-xl bg-card border border-yt p-4 space-y-3">
            <div className="text-sm text-yt-muted font-medium">
              {formatViews(video.views)} • {timeAgo(displayDate)}
            </div>

            {(video.tags?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-2">
                {video.tags!.map((t) => (
                  <span key={t} className="chip text-[11px] px-2 py-0.5">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {video.description && (
              <div className="text-sm text-yt-muted">
                <p className={showMore ? "" : "line-clamp-3"}>{video.description}</p>
                <button
                  onClick={() => setShowMore((s) => !s)}
                  className="mt-2 text-xs text-yt-muted hover:text-yt"
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </div>

          {/* Comments placeholder */}
          <div className="rounded-xl bg-card border border-yt p-4">
            <div className="text-sm text-yt-muted">Comments are coming soon 🙂</div>
          </div>
        </div>

        {/* Right: related videos */}
        <aside className="space-y-3">
          {related.map((rv) => {
            const href = `/projects/${encodeURIComponent(String(rv.id))}`;
            return (
              <Link
                key={String(rv.id)}
                to={href}
                className="flex gap-3 rounded-xl overflow-hidden bg-card border border-yt hover:shadow-yt p-2"
              >
                <img
                  src={rv.thumbnail}
                  alt={rv.title}
                  className="w-44 h-24 object-cover rounded"
                />
                <div className="min-w-0">
                  <div className="text-sm font-medium line-clamp-2 text-yt">
                    {rv.title}
                  </div>
                  <div className="text-xs text-yt-muted line-clamp-1 mt-1">
                    {rv.channel?.name ?? "Channel"}
                  </div>
                  <div className="text-xs text-yt-muted">
                    {formatViews(rv.views)} • {timeAgo(rv.uploadedAt ?? rv.date)}
                  </div>
                </div>
              </Link>
            );
          })}
        </aside>
      </div>

      {/* Toast (fixed above overlays) */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-[120] pointer-events-none transition-all duration-300 ${
          toast.open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <div className="pointer-events-auto rounded-xl bg-card/95 border border-yt px-4 py-2 shadow-yt backdrop-blur text-yt">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{toast.msg}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
