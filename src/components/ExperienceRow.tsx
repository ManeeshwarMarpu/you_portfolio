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
      className="
        group
        w-full min-w-0 overflow-hidden
        rounded-2xl p-3
        bg-card border border-yt
        hover:bg-ytbg-hover/60 
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-yt 
        transition
        flex flex-col sm:flex-row
        gap-4
      "
    >
      {/* Thumbnail (16:9) */}
      <div className="relative rounded-xl overflow-hidden bg-ytbg-hover w-full sm:w-[280px] shrink-0">
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
      <div className="min-w-0 flex-grow">
        <h3 className="text-lg font-semibold leading-tight text-yt min-w-0 overflow-hidden">
          {x.role}
          <CheckCircle2 className="inline-block w-4 h-4 text-yt-muted align-text-top ml-1" />
        </h3>

        <div className="text-sm text-yt-muted mt-0.5 flex items-center gap-2 min-w-0 overflow-hidden">
          <span className="truncate">{x.org}</span>
          <span className="text-yt-muted">•</span>
          <span className="whitespace-nowrap">{x.period}</span>
        </div>

        <ul className="mt-2 text-yt space-y-1 min-w-0 overflow-hidden">
          {x.bullets.slice(0, 2).map((b, i) => (
            <li key={i} className="line-clamp-1 text-yt-muted">
              {b}
            </li>
          ))}
        </ul>

        {x.tags?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 min-w-0 overflow-hidden">
            {x.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full chip shrink-0">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Kebab menu */}
      <button
        title="More"
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="
          opacity-0 group-hover:opacity-100 transition-opacity
          p-2 rounded-full hover:bg-ytbg-hover text-yt
          self-end sm:self-start
        "
      >
        <MoreVertical className="w-5 h-5" />
      </button>
    </article>
  );
}
