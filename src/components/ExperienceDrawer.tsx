import React, { useEffect, useState } from "react";
import type { Experience } from "./ExperienceRow";

export default function ExperienceDrawer({
  item,
  open,
  onClose,
  resumeUrl,
}: {
  item: Experience | null;
  open: boolean;
  onClose: () => void;
  resumeUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!item) return null;

  async function copyBullets() {
    if (!item) return;
    const lines = (item.highlights?.length ? item.highlights : item.bullets)
      .map((b) => `• ${b}`)
      .join("\n");

    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[520px] md:w-[640px] bg-card border-l border-yt shadow-yt transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-yt">
          <div className="min-w-0">
            <div className="text-sm text-yt-muted">
              {item.org} • {item.period}
            </div>
            <h2 className="text-base sm:text-lg font-semibold truncate text-yt">
              {item.role}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-yt px-3 py-1 text-sm hover:bg-ytbg-hover text-yt"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-5 overflow-auto h-[calc(100%-52px)]">
          {item.thumb && (
            <img
              src={item.thumb}
              alt=""
              className="w-full aspect-video object-cover rounded-xl"
            />
          )}

          {item.location && (
            <div className="text-sm text-yt-muted">📍 {item.location}</div>
          )}

          <div>
            <h3 className="text-sm font-semibold mb-2 text-yt">What I did</h3>
            <ul className="text-sm text-yt-muted list-disc pl-5 space-y-1">
              {item.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          {item.highlights?.length ? (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-yt">Highlights</h3>
              <ul className="text-sm text-yt-muted list-disc pl-5 space-y-1">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {item.tags?.length ? (
            <div>
              <h3 className="text-sm font-semibold mb-2 text-yt">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span key={t} className="chip text-[11px] px-2 py-0.5">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {item.orgUrl && (
              <a
                href={item.orgUrl}
                target="_blank"
                className="px-3 py-1.5 rounded-full text-sm bg-card border border-yt shadow-yt hover:bg-ytbg-hover text-yt"
              >
                Visit {item.org}
              </a>
            )}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                className="px-3 py-1.5 rounded-full text-sm border border-yt hover:bg-ytbg-hover text-yt"
              >
                Open Resume
              </a>
            )}
            <button
              onClick={copyBullets}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                copied
                  ? "bg-emerald-600 border-emerald-600 text-white"
                  : "border-yt hover:bg-ytbg-hover text-yt"
              }`}
            >
              {copied ? "✔ Copied!" : "Copy bullets"}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
