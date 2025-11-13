export default function SkeletonVideoCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-yt animate-pulse">
      <div className="w-full aspect-video bg-ytbg-hover" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-ytbg-hover rounded w-3/4"></div>
        <div className="h-4 bg-ytbg-hover rounded w-1/2"></div>

        <div className="flex items-center gap-3 mt-3">
          <div className="w-6 h-6 rounded-full bg-ytbg-hover"></div>
          <div className="h-3 bg-ytbg-hover rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
