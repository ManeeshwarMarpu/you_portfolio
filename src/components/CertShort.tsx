import { useEffect, useRef } from "react"
import { ThumbsUp, Share2, Volume2, VolumeX } from "lucide-react"

export type Cert = {
  slug: string
  title: string
  issuer: string
  year: string
  tags: string[]
  video: string
  verifyUrl?: string
  likes?: number
  liked?: boolean
}

export default function CertShort({
  c,
  active,
  muted,
  onToggleMute,
  onToggleLike,
  onOpenLink,
  videoRefCb,
}: {
  c: Cert
  active: boolean
  muted: boolean
  onToggleMute: () => void
  onToggleLike: () => void
  onOpenLink: () => void
  videoRefCb?: (el: HTMLVideoElement | null) => void
}) {
  const vidRef = useRef<HTMLVideoElement | null>(null)

  // give parent access to <video>
  useEffect(() => {
    if (!videoRefCb) return
    videoRefCb(vidRef.current)
    return () => videoRefCb(null)
  }, [videoRefCb])

  // keep element's mute in sync with prop
  useEffect(() => {
    if (vidRef.current) vidRef.current.muted = muted
  }, [muted])

  return (
    <article className="relative h-full w-full">
      <video
        ref={vidRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={c.video}
        loop
        playsInline
        preload="metadata"
        muted={muted}
        onClick={async () => { try { await vidRef.current?.play() } catch { console.log('')} }}
      />

      {/* gradients for readability */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

      {/* header text */}
      <div className="absolute top-4 left-4 right-20">
        <div className="text-sm text-white/80">{c.issuer} • {c.year}</div>
        <h3 className="text-xl font-semibold leading-tight mt-1">{c.title}</h3>
      </div>

      {/* tags */}
      <div className="absolute bottom-20 left-4 flex flex-wrap gap-2">
        {c.tags.map(t => (
          <span key={t} className="text-[11px] bg-white/15 px-2 py-1 rounded-full">#{t}</span>
        ))}
      </div>

      {/* right action rail */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3">
        <button
          title={c.liked ? "Unlike" : "Like"}
          onClick={(e) => { e.stopPropagation(); onToggleLike() }}
          className={`grid place-items-center rounded-full w-12 h-12 ${c.liked ? "bg-white text-black" : "bg-black/50 hover:bg-black/60"}`}
        >
          <ThumbsUp className="w-6 h-6" />
        </button>
        <span className="text-xs">{c.likes ?? 0}</span>

        <button
          title="Open credential"
          onClick={(e) => { e.stopPropagation(); onOpenLink() }}
          className="grid place-items-center rounded-full bg-black/50 hover:bg-black/60 w-12 h-12"
        >
          <Share2 className="w-6 h-6" />
        </button>

        <button
          title={muted ? "Unmute" : "Mute"}
          onClick={(e) => { e.stopPropagation(); onToggleMute() }}  // parent flips; useEffect syncs element
          className="grid place-items-center rounded-full bg-black/50 hover:bg-black/60 w-12 h-12"
        >
          {muted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      {/* subtle active ring */}
      <div className={`absolute inset-0 ${active ? "ring-2 ring-white/25 rounded-2xl" : ""}`} />
    </article>
  )
}
