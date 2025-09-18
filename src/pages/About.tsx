import { Briefcase, Download, MapPin, Rocket, Star, Wrench } from "lucide-react";
import { experiences as data } from "../data/experiences";

const RESUME_URL =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu_latest.pdf?alt=media&token=f4db5369-6a92-42d8-a23c-5c8dfc2fb536";

const stack = [
  "Python", "Java", "React", "TypeScript", "Spring Boot", "Django",
  "AWS", "Docker", "Kubernetes", "GitHub Actions", "Grafana", "Prometheus"
];

const achievements = [
  { icon: <Rocket className="w-5 h-5" />, title: "Shipped 15+ projects", blurb: "Full-stack, data and SRE." },
  { icon: <Wrench className="w-5 h-5" />, title: "CI/CD automation", blurb: "Cut deploy time from hours to minutes." },
  { icon: <Star className="w-5 h-5" />, title: "Teaching & Mentorship", blurb: "Cloud/K8s labs & student guidance." },
];

export default function About() {
  const timeline = Array.isArray(data) ? data.slice(0, 3) : [];

  return (
    <section className="space-y-6">
      {/* Header / Intro */}
      <div className="rounded-2xl border border-yt bg-card p-6 shadow-yt">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-yt">Hi, I’m Maneeshwar 👋</h1>
            <p className="mt-2 text-yt-muted leading-relaxed max-w-3xl">
              Software Engineer / SRE with a focus on{" "}
              <span className="text-yt">cloud, reliability, and developer experience</span>.
              I like shipping polished UIs, automating CI/CD, and making systems observable and fast.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-yt-muted">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" /> Houston, TX
              </span>
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> Open to SWE / SRE roles
              </span>
            </div>
          </div>

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-card border border-yt shadow-yt px-4 py-2 text-sm font-medium hover:bg-ytbg-hover text-yt"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>
      </div>

      {/* Quick Achievements */}
      <div className="grid md:grid-cols-3 gap-4">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="rounded-2xl border border-yt bg-card p-4 flex items-start gap-3"
          >
            <div className="text-yt">{a.icon}</div>
            <div>
              <div className="font-semibold text-yt">{a.title}</div>
              <div className="text-sm text-yt-muted">{a.blurb}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Core Stack */}
      <div className="rounded-2xl border border-yt bg-card p-6">
        <h2 className="text-lg font-semibold mb-3 text-yt">Core Stack</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span key={t} className="chip text-xs px-2 py-1">#{t}</span>
          ))}
        </div>
      </div>

      {/* Recent Experience (mini timeline) */}
      {timeline.length > 0 && (
        <div className="rounded-2xl border border-yt bg-card p-6">
          <h2 className="text-lg font-semibold mb-4 text-yt">Recent Experience</h2>
          <ol className="relative border-s border-yt">
            {timeline.map((x, i) => (
              <li key={i} className="ms-4 pb-6 last:pb-0">
                <div className="absolute w-2 h-2 bg-amber-500 rounded-full -left-1 mt-2.5"></div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-yt-muted">{x.org} • {x.period}</div>
                    <div className="font-semibold text-yt">{x.role}</div>
                  </div>
                </div>
                {x.bullets?.length > 0 && (
                  <ul className="mt-2 text-sm text-yt-muted list-disc pl-5 space-y-1">
                    {x.bullets.slice(0, 2).map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
