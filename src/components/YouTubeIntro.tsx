export default function YouTubeIntro() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] animate-introFade">
      
      {/* Red Loading Bar */}
      <div className="absolute top-0 left-0 h-[4px] bg-red-600 animate-introBar"></div>

      {/* Your Name */}
      <h1 className="text-white text-4xl md:text-5xl font-bold tracking-[0.3em] opacity-0 animate-introText">
        M
      </h1>

      {/* White Flash */}
      <div className="absolute inset-0 bg-white opacity-0 animate-introFlash"></div>
    </div>
  );
}
