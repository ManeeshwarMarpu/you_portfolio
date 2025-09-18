import { MoreVertical, Building2, CheckCircle2 } from "lucide-react";

export type Experience = {
  role: string;
  org: string;
  period: string;
  bullets: string[];
  tags: string[];
  thumb?: string;
  orgUrl?: string;
  location?: string;
  highlights?: string[];
};

export default function ExperienceRow({
  x,
  onOpen,
}: {
  x: Experience;
  onOpen?: (x: Experience) => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(x)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(x);
        }
      }}
      className="group grid grid-cols-[minmax(220px,360px),1fr,40px] gap-4 rounded-2xl p-2 bg-card border border-yt hover:bg-ytbg-hover/60 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yt transition"
    >
      {/* Thumbnail (16:9) */}
      <div className="relative rounded-xl overflow-hidden bg-ytbg-hover">
        {x.thumb ? (
          <img
            src={x.thumb}
            alt={x.org}
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-video grid place-items-center text-yt-muted">
            <Building2 className="w-7 h-7" />
          </div>
        )}
      </div>

      {/* Text column */}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold leading-tight text-yt">
          {x.role}
          <CheckCircle2 className="inline-block w-4 h-4 text-yt-muted align-text-top ml-1" />
        </h3>

        <div className="text-sm text-yt-muted mt-0.5 flex items-center gap-2">
          <span className="truncate">{x.org}</span>
          <span className="text-yt-muted">•</span>
          <span className="whitespace-nowrap">{x.period}</span>
        </div>

        <ul className="mt-2 text-yt space-y-1">
          {x.bullets.slice(0, 2).map((b, i) => (
            <li key={i} className="line-clamp-1 text-yt-muted">
              {b}
            </li>
          ))}
        </ul>

        {x.tags?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {x.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full chip">
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Kebab menu */}
      <button
        title="More"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="self-start opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-ytbg-hover text-yt"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </article>
  );
}
