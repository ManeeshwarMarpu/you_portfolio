
import { useMemo, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { videos } from "../data/videos";
import VideoGrid from "../components/VideoGrid";
import FilterChips from "../components/FilterChips";

const RESUME_URL = "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu_CE.pdf?alt=media&token=c46134a1-4aa6-427b-880d-d83273250f26";
const GITHUB_URL = "https://github.com/ManeeshwarMarpu";
const LINKEDIN_URL = "https://linkedin.com/in/maneeshwermarpu";

export default function Channel() {
  const { handle } = useParams();

  // HOOKS MUST COME FIRST (unconditional)
  const channelVideos = useMemo(
    () => videos.filter((v) => v.channel?.handle === handle),
    [handle]
  );
  const [chip, setChip] = useState("All");

  // ---- after hooks, you can branch/return ----
  const ch = channelVideos[0]?.channel;
  if (!ch) {
    return <div className="p-6 text-yt">Channel not found</div>;
  }

  const totalViews = (channelVideos ?? []).reduce(
    (s, v) => s + (v.views ?? 0),
    0
  );

  // Featured = top 2 by views; rest = uploads
  const sortedByViews = [...channelVideos].sort(
    (a, b) => (b.views ?? 0) - (a.views ?? 0)
  );
  const featured = sortedByViews.slice(0, 2);
  const uploads = channelVideos.filter((v) => !featured.includes(v));

  // Tag chips
  const allTags = Array.from(
    new Set(channelVideos.flatMap((v) => v.tags ?? []))
  );

  // No need for useMemo here; cheap compute and avoids extra hooks
  const filtered =
    chip === "All"
      ? uploads
      : uploads.filter((v) => (v.tags ?? []).includes(chip));

  return (
    <div className="space-y-6">
      {/* ========== Banner + Header ========== */}
      <div className="relative">
        <div className="h-36 md:h-52 rounded-xl bg-gradient-to-r from-red-500/40 via-fuchsia-500/35 to-purple-500/35" />
        <div className="px-3 sm:px-4">
          <div className="flex items-center gap-4 -mt-10">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_er63w4er63w4er63.png?alt=media&token=78db7d38-7f01-44e3-9270-203b2a877b9f"
              alt={ch.name}
              className="w-24 h-24 rounded-full border-4 border-ytbg shadow-yt"
            />
            <div className="flex-1 min-w-0">
              {/* Name + stats */}
              <h1 className="text-2xl font-bold leading-tight text-yt">
                {ch.name}
              </h1>
              <div className="text-sm text-yt-muted mt-0.5">
                @{ch.handle} • {channelVideos.length} videos •{" "}
                {Intl.NumberFormat().format(totalViews)} views
              </div>

              {/* Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-card border border-yt shadow-yt hover:bg-ytbg-hover text-sm font-medium text-yt"
                >
                  View Resume
                </a>
                <Link
                  to="/projects"
                  className="px-4 py-2 rounded-full border border-yt hover:bg-ytbg-hover text-sm text-yt"
                >
                  Projects
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 rounded-full border border-yt hover:bg-ytbg-hover text-sm text-yt"
                >
                  Contact
                </Link>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-yt hover:bg-ytbg-hover text-sm text-yt"
                >
                  GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-yt hover:bg-ytbg-hover text-sm text-yt"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Sticky Tabs ========== */}
      <div className="sticky top-[56px] z-10 bg-card/90 backdrop-blur border-b border-yt">
        <nav className="px-2 py-2 flex gap-2">
          {[
            { to: "", label: "Home", count: undefined },
            // future: videos, playlists, about
          ].map(({ to, label, count }) => (
            <NavLink
              key={label}
              to={to}
              end={to === ""}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-sm border transition ${
                  isActive ? "chip-active" : "chip hover:bg-ytbg-hover"
                }`
              }
            >
              {label}
              {typeof count === "number" && (
                <span className="ml-2 text-xs text-yt-muted">({count})</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* ========== Featured ========== */}
      {featured.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-yt">Featured</h2>
          <VideoGrid items={featured} />
        </section>
      )}

      {/* ========== Playlist-like chips ========== */}
      {allTags.length > 0 && (
        <section className="space-y-2">
          <FilterChips items={["All", ...allTags]} initial={chip} onChange={setChip} />
        </section>
      )}

      {/* ========== Uploads (filtered) ========== */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-yt">
          {chip === "All" ? "Uploads" : `#${chip}`}
        </h2>
        <VideoGrid items={filtered} />
      </section>
    </div>
  );
}
