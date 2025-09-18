export default function Player({ src }: { src?: string }) {
  if (!src)
    return (
      <div className="w-full aspect-video bg-ytbg-hover rounded-xl grid place-items-center text-yt-muted">
        No video source
      </div>
    );
  return (
    <video
      className="w-full aspect-video rounded-xl bg-card border border-yt"
      src={src}
      controls
    />
  );
}
