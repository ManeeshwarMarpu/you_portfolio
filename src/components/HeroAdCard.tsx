import { useEffect, useState, useCallback } from "react";
import type { Video } from "../data/videos";

type AdVideo = Video & { highlights?: string[] };

export default function HeroAdCard({
  v,
  onOpenChange,
}: {
  v: AdVideo;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });

  const VISIT_URL = v.github || v.appUrl;

  const setDrawer = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setDrawer(false);
  }, []);

  // Esc + scroll lock
  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onKey]);

  async function copy(text: string, label = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
      setToast({ open: true, msg: label });
      setTimeout(() => setToast({ open: false, msg: "" }), 1400);
    } catch {
      setToast({ open: true, msg: "Couldn’t copy" });
      setTimeout(() => setToast({ open: false, msg: "" }), 1600);
    }
  }

  const hasHighlights = Array.isArray(v.highlights) && v.highlights.length > 0;

  return (
    <article className="w-full">
      {/* Card */}
      <div className="rounded-2xl overflow-hidden border border-yt bg-card shadow-yt">
        <div className="relative">
          <img
            src={v.thumbnail}
            alt={v.title}
            className="block w-full aspect-video object-cover"
          />
          <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/90 text-black">
            Ad • Sponsored
          </span>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="text-lg font-semibold line-clamp-2 text-yt">{v.title}</h3>

          {v.channel?.name && (
            <div className="flex items-center gap-2 text-xs text-yt-muted">
              {v.channel.avatar && (
                <img
                  src={v.channel.avatar}
                  alt={v.channel.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <span className="text-yt">{v.channel.name}</span>
              {v.channel.handle && <span>• @{v.channel.handle}</span>}
            </div>
          )}

          <div className="pt-2 flex flex-wrap gap-2">
            {VISIT_URL && (
              <a
                href={VISIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-yt shadow-yt hover:bg-ytbg-hover text-yt"
              >
                Visit
              </a>
            )}
            <button
              onClick={() => setDrawer(true)}
              className="px-4 py-2 rounded-full text-sm border border-yt hover:bg-ytbg-hover text-yt"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over */}
      <div
        className={`fixed inset-0 z-[60] transition-[opacity] ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setDrawer(false)}
        />

        {/* Panel */}
        <aside
          className={`absolute right-0 top-0 h-full w-full sm:w-[520px] md:w-[640px] bg-card text-yt shadow-yt border-l border-yt transform transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-yt">
            <h2 className="text-base font-semibold">Project Highlights</h2>
            <button
              onClick={() => setDrawer(false)}
              className="rounded-full border border-yt px-3 py-1 text-sm hover:bg-ytbg-hover"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-5 overflow-auto h-[calc(100%-52px)]">
            {v.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Summary</h3>
                <p className="text-sm text-yt-muted whitespace-pre-line">
                  {v.description}
                </p>
              </div>
            )}

            {(hasHighlights || (v.tags?.length ?? 0) > 0) && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">
                  {hasHighlights ? "Highlights" : "Tech & Topics"}
                </h3>
                {hasHighlights ? (
                  <ul className="list-disc ml-5 text-sm text-yt-muted space-y-1">
                    {v.highlights!.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags!.map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full chip">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Quick Actions</h3>
              <div className="flex flex-wrap gap-2">
                {VISIT_URL && (
                  <a
                    href={VISIT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-sm bg-card border border-yt shadow-yt hover:bg-ytbg-hover"
                  >
                    Open Code
                  </a>
                )}
                <button
                  onClick={() => copy(v.channel?.handle ?? "maneesh", "Handle copied")}
                  className="px-3 py-1.5 rounded-lg text-sm border border-yt hover:bg-ytbg-hover"
                >
                  Copy Handle
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Toast */}
<div
  aria-live="polite"
  className={`fixed bottom-6 right-6 z-[120] pointer-events-none transition-all duration-300 ${
    toast.open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
  }`}
>
  <div className="rounded-xl bg-card/95 border border-yt px-4 py-2 shadow-yt backdrop-blur text-yt">
    <div className="flex items-center gap-2 text-sm">
      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span>{toast.msg}</span>
    </div>
  </div>
</div>
    </article>
  );
}
