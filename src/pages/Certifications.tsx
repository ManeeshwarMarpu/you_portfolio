import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import CertShort, { type Cert } from "../components/CertShort"
import FilterChips from "../components/FilterChips"
import { ChevronUp, ChevronDown, Volume2, VolumeX } from "lucide-react"
import { useSearchParams } from "react-router-dom"

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

const raw = [
  { id:0, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/azure.png?alt=media&token=a3d97e26-9258-4b15-a766-334e1bd0f1dc", title:"AZ:900 Microsoft Azure Fundamentals", organization:"Microsoft", date:"Feb 2023", link:"https://www.credly.com/badges/a82024a1-9066-493f-b5df-fbde9c3e1f89/linked_in_profile",video:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Azure_Certification_Video_Generation.mp4?alt=media&token=61d730be-4f0f-42f5-bbfe-dc0e0a56a9e7" },
  { id:1, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/azai.png?alt=media&token=41fac488-4b1b-4d72-8e12-6c1843a3c704", title:"AI:900 Microsoft Azure AI Fundamentals", organization:"Microsoft", date:"Feb 2023", link:"https://www.credly.com/badges/3defe85d-af56-4db7-bd7c-f6aca869cccf/linked_in_profile",video:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Azure_AI_Certification_Video_Ready.mp4?alt=media&token=0ca6bceb-a281-4431-8559-b24565d53d35" },
  { id:2, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/az400.png?alt=media&token=abe2d2b9-f683-4e16-a71b-21d956cdeebd", title:"DevOps Engineer Expert", organization:"Microsoft", date:"Aug 2022", link:"https://www.credly.com/badges/05563f8e-4216-427d-a5f0-9a68c81cb2fc/linked_in_profile" ,video: "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Azure_DevOps_Expert_Video_Generated.mp4?alt=media&token=061db1cc-fdf8-4adf-9f58-4e39997de496"},
  { id:7, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/forage.png?alt=media&token=3f216190-f146-42d4-b09f-1a781e078957", title:"Introduction to Cyber Security", organization:"Forage", date:"Jan 2022", link:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/cyber.jpg?alt=media&token=8c6aa234-ac44-4ce1-bfc7-46fa3928bc4c",video:'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Cybersecurity_Skills_Video_Generated.mp4?alt=media&token=b5bec8f4-cb0b-4b09-8409-30022c4585c5' },
  { id:3, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/ibm.png?alt=media&token=0e29a126-a60d-4bd1-987b-f3b306228e6f", title:"IBM Data Science Specilization", organization:"IBM", date:"May 2021", link:"https://www.coursera.org/account/accomplishments/specialization/certificate/8GWRQX4TAPZE",video:'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Data_Science_Specialization_Video_Ready.mp4?alt=media&token=74d4d077-71e7-4cd6-b18b-174973d95acb' },
  { id:4, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/django.png?alt=media&token=64431bfe-d264-4aa2-a0a1-61386a377f0c", title:"Django for Everybody", organization:"Coursera - Stanford University", date:"May 2021", link:"https://www.coursera.org/account/accomplishments/specialization/certificate/49ZCYRKAUEP8",video:'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Django_Full_Stack_Web_App_Video.mp4?alt=media&token=3ea6c966-ac39-4c7c-984c-d173898a960f' },
  { id:5, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/azure.png?alt=media", title:"Automation Anywhere Essential Bot Developer", organization:"Microsoft", date:"Aug 2020", link:"https://certificates.automationanywhere.com/ee826d1a-5c2f-4f67-b205-238d85d8f252#acc.3dPxnCQE" ,video:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/RPA_Developer_Video_Creation.mp4?alt=media&token=100af275-4557-4291-b1c9-1c36b548485c"},
  { id:6, img:"https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/azure.png?alt=media", title:"Automation Anywhere Advanced Bot Developer", organization:"Microsoft", date:"Nov 2020", link:"https://certificates.automationanywhere.com/32467d0c-d09c-4140-9f0e-43a422c01a60#acc.aeVQOrfR",video:'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/RPA_Development_Video_Generated(2).mp4?alt=media&token=f3db95a2-2e56-4bc3-b987-4556b53cc073' },
]

const tagsFrom = (t: string, org: string) => {
  const tags: string[] = []
  if (/azure/i.test(t) || /azure/i.test(org)) tags.push("Azure")
  if (/ai:/i.test(t)) tags.push("AI")
  if (/devops|az[- ]?400|expert/i.test(t)) tags.push("DevOps")
  if (/cyber/i.test(t)) tags.push("Security")
  if (/data science/i.test(t) || /ibm/i.test(org)) tags.push("Data Science")
  if (/django/i.test(t)) tags.push("Django")
  if (/automation anywhere/i.test(t)) tags.push("RPA")
  return tags.length ? tags : ["Certification"]
}

type LikeStore = Record<string, boolean>
const LS_KEY = "certLikes"

const seed: Cert[] = raw.map((r, i) => ({
  slug: slugify(r.title),
  title: r.title,
  issuer: r.organization,
  year: r.date,
  tags: tagsFrom(r.title, r.organization),
  video: r.video,
  verifyUrl: r.link,
  likes: 120 + i * 30,
  liked: false,
}))

const allChips = ["All", ...Array.from(new Set(seed.flatMap((c) => c.tags)))]

export default function Certifications() {
  const [chip, setChip] = useState("All")
  const [params, setParams] = useSearchParams()

  const [certs, setCerts] = useState<Cert[]>(() => {
    const liked: LikeStore = JSON.parse(localStorage.getItem(LS_KEY) || "{}")
    return seed.map((c) => ({ ...c, liked: !!liked[c.slug] }))
  })
  const saveLikes = (list: Cert[]) => {
    const store: LikeStore = {}
    list.forEach((c) => { if (c.liked) store[c.slug] = true })
    localStorage.setItem(LS_KEY, JSON.stringify(store))
  }
  const toggleLike = (slug: string) => {
    setCerts((prev) => {
      const next = prev.map((c) =>
        c.slug === slug ? { ...c, liked: !c.liked, likes: (c.likes ?? 0) + (c.liked ? -1 : 1) } : c
      )
      saveLikes(next)
      return next
    })
  }

  // per-short mute; default muted to satisfy autoplay, but we unlock audio after first user gesture
  const [muteBySlug, setMuteBySlug] = useState<Record<string, boolean>>(
    () => Object.fromEntries(seed.map((c) => [c.slug, true]))
  )
  const setMuted = (slug: string, v: boolean) => setMuteBySlug(p => ({ ...p, [slug]: v }))

  // after user clicks once anywhere on the feed, allow sound by unmuting the active slide
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  const filtered = useMemo(
    () => (chip === "All" ? certs : certs.filter((c) => c.tags.includes(chip))),
    [chip, certs]
  )

  // refs
  const rowRef = useRef<HTMLDivElement | null>(null)
  const sectionRefs = useRef<HTMLDivElement[]>([])
  const videoRefs = useRef<HTMLVideoElement[]>([])
  sectionRefs.current = []
  videoRefs.current = []
  const setSectionRef = (el: HTMLDivElement | null) => { if (el) sectionRefs.current.push(el) }
  const setVideoRef   = (el: HTMLVideoElement | null) => { if (el) videoRefs.current.push(el) }

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const idx = sectionRefs.current.indexOf(e.target as HTMLDivElement)
        if (idx >= 0 && e.isIntersecting) setActiveIdx(idx)
      })
    }, { threshold: 0.6 })
    sectionRefs.current.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [filtered.length])

  // play only active; manage mute; if audio unlocked -> unmute active by default
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === activeIdx) {
        const slug = filtered[i].slug
        const shouldMute = audioUnlocked ? false : !!muteBySlug[slug]
        v.muted = shouldMute
        v.play().catch(() => {})
        if (audioUnlocked && muteBySlug[slug]) setMuted(slug, false)
      } else {
        v.pause()
      }
    })
  }, [activeIdx, muteBySlug, filtered, audioUnlocked])

  // deep-link ?open=slug
  useEffect(() => {
    const slug = params.get("open")
    if (!slug) return
    const idx = filtered.findIndex((c) => c.slug === slug)
    if (idx >= 0) {
      sectionRefs.current[idx]?.scrollIntoView({ behavior: "instant", block: "nearest" })
      setActiveIdx(idx)
    }
  }, [params, filtered])

  const goTo = useCallback((idx: number, smooth = true) => {
    const n = Math.max(0, Math.min(filtered.length - 1, idx))
    sectionRefs.current[n]?.scrollIntoView({ behavior: smooth ? "smooth" : "instant", block: "nearest" })
    setParams({ open: filtered[n].slug }, { replace: true })
  }, [filtered, setParams])
  const next = () => goTo(activeIdx + 1)
  const prev = () => goTo(activeIdx - 1)

  // key navigation (content area only)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!rowRef.current?.contains(document.activeElement as Node)) return
      if (["ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); next() }
      if (["ArrowUp", "PageUp"].includes(e.key))        { e.preventDefault(); prev() }
    }
    window.addEventListener("keydown", onKey, { passive: false })
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev])

  // one-time audio unlock on click/tap within the feed
  const unlockAudio = async () => {
    if (audioUnlocked) return
    setAudioUnlocked(true)
    const v = videoRefs.current[activeIdx]
    if (v) {
      v.muted = false
      try { await v.play() } catch {console.log('')}
    }
  }

  return (

    <section className="mx-auto max-w-[980px] px-4">
      {/* chips in normal flow under your header */}
      <div className="mt-4 mb-3 flex justify-center">
        <FilterChips
          items={allChips}
          onChange={(c) => { setChip(c); setParams(p => { p.delete("open"); return p }, { replace: true }) }}
          initial={chip}
        />
      </div>

      {/* content area: height limited so your header/sidebar remain visible.
         Adjust the 86vh if you want more/less height inside your layout. */}
      <div
        ref={rowRef}
        onPointerDown={unlockAudio}
        className="relative mx-auto h-[86vh] w-full max-w-[980px] overflow-y-auto snap-y snap-mandatory rounded-xl"
        aria-label="Certifications Shorts Feed"
      >
        {filtered.map((c, i) => (
          <div
            key={c.slug}
            ref={setSectionRef}
            className="snap-start w-full h-[86vh] grid place-items-center"
          >
            {/* The centered 9:16 card (like YouTube Shorts) */}
          <div className="relative w-[min(500px,92vw)] h-[min(889px,86vh)] rounded-2xl overflow-hidden shadow-2xl bg-black">
  <CertShort
    c={c}
    active={i === activeIdx}
    muted={!!muteBySlug[c.slug]}
    onToggleLike={() => toggleLike(c.slug)}
    onOpenLink={() => window.open(c.verifyUrl, "_blank", "noopener,noreferrer")}
    onToggleMute={() => {
      const want = !muteBySlug[c.slug]
      setMuted(c.slug, want)
      const v = videoRefs.current[i]
      if (v) v.muted = want 
    }}
    videoRefCb={setVideoRef}
  />

  {/* right-side arrows */}
  <div className="absolute inset-y-0 right-[-70px] flex flex-col items-center justify-center gap-3">
    <button
      onClick={prev}
      className="rounded-full bg-black/60 hover:bg-black/70 w-12 h-12 grid place-items-center"
      aria-label="Previous"
    >
      ↑
    </button>
    <button
      onClick={next}
      className="rounded-full bg-black/60 hover:bg-black/70 w-12 h-12 grid place-items-center"
      aria-label="Next"
    >
      ↓
    </button>
  </div>
</div>


            {/* small up/down helpers in the content area */}
            <div className="pointer-events-none absolute bottom-6 right-6 flex flex-col gap-2">
              <button onClick={prev} className="pointer-events-auto rounded-full bg-black/60 hover:bg-black/70 w-10 h-10 grid place-items-center">
                <ChevronUp className="w-5 h-5" />
              </button>
              <button onClick={next} className="pointer-events-auto rounded-full bg-black/60 hover:bg-black/70 w-10 h-10 grid place-items-center">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* one-time audio unlock pill */}
            {!audioUnlocked && i === activeIdx && (
              <button
                onClick={unlockAudio}
                className="absolute top-4 right-4 z-20 rounded-full bg-black/70 hover:bg-black/80 px-3 py-1 text-sm flex items-center gap-1"
                title="Enable sound"
              >
                <Volume2 className="w-4 h-4" /> Enable sound
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Optional: tiny footer mute state */}
      <div className="mt-2 text-center text-xs text-white/60 flex items-center justify-center gap-2">
        <VolumeX className="w-4 h-4" /> Videos start muted due to browser policy. Click the card or “Enable sound” once to play with audio.
      </div>
    </section>
  )
}

