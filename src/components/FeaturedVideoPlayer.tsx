import { Play, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import type { Video } from "../data/videos";

// Fix the "any" type error by defining the prop types
interface FeaturedVideoPlayerProps {
  video: Video;
  onNext: () => void;
  onPrev: () => void;
}

export default function FeaturedVideoPlayer({ video, onNext, onPrev }: FeaturedVideoPlayerProps) {
  if (!video) return null;

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

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10" />

      {/* YouTube Style Ad Badge */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
        <div className="bg-[#fbc02d] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">Ad</div>
        <span className="text-white text-sm font-semibold uppercase tracking-wider drop-shadow-md">
          Sponsored • {video.category}
        </span>
      </div>

      {/* Manual Navigation Arrows - FIXED onClick */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/60"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition hover:bg-black/60"
      >
        <ChevronRight size={32} />
      </button>

      {/* Content */}
      <div className="absolute bottom-12 left-10 z-20 max-w-xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-2xl">{video.title}</h1>
        <p className="text-gray-200 text-sm line-clamp-2 drop-shadow-md">{video.description}</p>

        <div className="flex items-center gap-3 pt-2">
          {video.github ? (
            <a href={video.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2 bg-white text-black font-bold rounded-sm hover:bg-gray-200 transition">
              <Play size={18} fill="black" /> View Project
            </a>
          ) : (
            <div className="flex items-center gap-2 px-5 py-2 bg-gray-700/60 text-gray-300 font-bold rounded-sm border border-white/10">
              <Lock size={18} /> Code Private
            </div>
          )}
          
          <a href={`/projects/${video.id}`} className="flex items-center gap-2 px-5 py-2 bg-white/20 text-white backdrop-blur-md font-bold rounded-sm hover:bg-white/30 transition border border-white/20">
            <Info size={18} /> More Info
          </a>
        </div>
      </div>
    </div>
  );
}