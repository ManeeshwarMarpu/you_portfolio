import { Play, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import type { Video } from "../data/videos";

interface FeaturedVideoPlayerProps {
  video: Video;
  onNext: () => void;
  onPrev: () => void;
}

export default function FeaturedVideoPlayer({ video, onNext, onPrev }: FeaturedVideoPlayerProps) {
  if (!video) return null;

  // Hard truncate to 2 lines worth of text (~120 chars)
  const shortDesc = video.description
    ? video.description.slice(0, 120) + (video.description.length > 120 ? '…' : '')
    : '';

  return (
    <div className="relative w-full h-full group">

      {/* Background Video */}
      <video
        key={video.sources?.mp4 || video.id}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video.sources?.mp4} type="video/mp4" />
      </video>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent z-10" />

      {/* Ad Badge */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5 z-30 flex items-center gap-2">
        <div className="bg-[#fbc02d] text-black text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
          Ad
        </div>
        <span className="text-white text-xs md:text-sm font-semibold uppercase tracking-wider drop-shadow-md">
          Sponsored • {video.category}
        </span>
      </div>

      {/* Nav Arrows — desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full
                   bg-black/30 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/60"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full
                   bg-black/30 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/60"
      >
        <ChevronRight size={28} />
      </button>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-3 md:p-8 md:max-w-2xl">

        {/* Title: 2 lines max */}
        <h1 className="text-base sm:text-xl md:text-3xl font-black text-white drop-shadow-2xl leading-tight line-clamp-2">
          {video.title}
        </h1>

        {/* Description: desktop only, hard-capped at 120 chars */}
        <p className="hidden md:block text-gray-300 text-sm drop-shadow-md mt-1.5 leading-relaxed">
          {shortDesc}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-2 md:mt-3">
          {video.github ? (
            <a
              href={video.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2
                         bg-white text-black font-bold text-xs md:text-sm
                         rounded-sm hover:bg-gray-200 transition"
            >
              <Play size={13} fill="black" /> View Project
            </a>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5
                            bg-gray-700/60 text-gray-300 font-bold text-xs
                            rounded-sm border border-white/10">
              <Lock size={13} /> Code Private
            </div>
          )}

          <a
            href={`/projects/${video.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2
                       bg-white/20 text-white backdrop-blur-md font-bold text-xs md:text-sm
                       rounded-sm hover:bg-white/30 transition border border-white/20"
          >
            <Info size={13} /> More Info
          </a>
        </div>
      </div>

    </div>
  );
}