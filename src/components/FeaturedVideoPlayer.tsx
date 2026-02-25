import React from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Lock } from 'lucide-react'; 
import type { Video } from "../data/videos";

export default function FeaturedVideoPlayer({ video, onNext, onPrev }) {
  if (!video) return null;

  return (
    <div className="relative w-full h-full">
      {/* Background Video */}
      <video
        key={video.sources?.mp4 || video.id}
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video.sources?.mp4} type="video/mp4" />
      </video>

      {/* Gradients and "Ad" Badge */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10" />
      <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
        <div className="bg-[#fbc02d] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm">Ad</div>
        <span className="text-white text-sm font-semibold uppercase tracking-wider shadow-black drop-shadow-md">
          Sponsored • {video.category}
        </span>
      </div>

      {/* Manual Navigation Arrows */}
      <button 
        onClick={(e) => { e.preventDefault(); onPrev(); }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronLeft size={30} />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); onNext(); }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronRight size={30} />
      </button>

      {/* Overlay Content */}
      <div className="absolute bottom-12 left-10 z-20 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-2xl">{video.title}</h1>
        <p className="text-gray-200 text-sm line-clamp-2 mb-6 drop-shadow-md">{video.description}</p>
        
        <div className="flex items-center gap-3">
          {/* GitHub Logic */}
          {video.github ? (
            <a 
              href={video.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-sm hover:bg-gray-200 transition"
            >
              <Play size={18} fill="black" /> View Project
            </a>
          ) : (
            <div className="flex items-center gap-2 px-6 py-2 bg-gray-700/60 text-gray-300 font-bold rounded-sm border border-white/10">
              <Lock size={18} /> Private Repo
            </div>
          )}

          {/* Fixed Redirection */}
          <a 
            href={`/projects/${video.id}`} 
            className="flex items-center gap-2 px-6 py-2 bg-white/20 text-white backdrop-blur-md font-bold rounded-sm hover:bg-white/30 transition border border-white/20"
          >
            <Info size={18} /> More Info
          </a>
        </div>
      </div>
    </div>
  );
}