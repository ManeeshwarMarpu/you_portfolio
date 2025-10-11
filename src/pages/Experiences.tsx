import { useMemo, useState } from "react";
import ExperienceRow, { type Experience } from "../components/ExperienceRow";
import FilterChips from "../components/FilterChips";
import ExperienceDrawer from "../components/ExperienceDrawer";

const data: Experience[] = [
  {
    role: "Software Engineer / SRE",
    org: "Motorola Solutions",
    period: "2022 – 2024",
bullets: [
  "Interned for 14 months focusing on backend services, API development, and CI/CD pipeline migration from Azure Pipelines to GitHub Actions.",
  "Built GitHub Actions workflows to automate AWS tasks (EC2, RDS, S3, IAM, ingress) for a cloud-based video storage platform.",
  "Promoted to Site Reliability Engineer (SRE) role after internship conversion.",
  "Implemented chaos engineering with Litmus and Kubernetes to validate resilience under node, pod, and network failures.",
  "Monitored and optimized Kubernetes clusters, improving availability and resource efficiency.",
  "Automated deployments using Docker, Helm, and Kubernetes manifests, reducing manual intervention and speeding releases.",
  "Enhanced observability with Grafana dashboards, Prometheus alerts, and centralized logging pipelines for proactive monitoring.",
  "Participated in on-call rotations, resolved production incidents, and contributed to postmortems for continuous reliability improvement.",
  "Collaborated with developers, QA, and DevOps teams to deliver scalable and fault-tolerant deployments across AWS and on-prem environments."
],


    tags: ["SRE", "AWS", "Kubernetes", "CI/CD", "GitHub Actions", "Grafana", "Prometheus"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_97pyp997pyp997py.png?alt=media&token=1acf1d47-9e9a-4f1d-a0dd-2dfdd3e145b6",
  },
  {
    role: "Instructional Assistant – Cloud Computing",
    org: "University of Houston",
    period: "2024 – 2025",
bullets: [
  "Assisted students in learning cloud fundamentals: virtualization, networking, storage, and security concepts.",
  "Guided hands-on labs using AWS, Azure, Docker, and Kubernetes to bridge theory with practice.",
  "Troubleshot technical issues, debugged lab exercises, and mentored students on cloud best practices.",
  "Collaborated with faculty to prepare instructional materials and assess student progress.",
  "Fostered an engaging learning environment, clarified complex topics, and advised students on cloud career paths.",
  "Strengthened personal expertise in cloud architecture and deployment models while enabling student success."
],

    tags: ["Cloud", "Kubernetes", "Docker", "Teaching"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_vp66q4vp66q4vp66.png?alt=media&token=a7f4bb69-625b-4f7b-8ed0-bbb24ad9c8c0",
  },
  {
    role: "Frontend Developer Intern",
    org: "Healthcare Platform",
    period: "2023",
bullets: [
  "Streamlined UI/UX of a healthcare platform for doctors, patients, and administrators to access medical records and services.",
  "Developed responsive, cross-browser web interfaces using HTML, CSS, Bootstrap, and React.js.",
  "Conducted manual front-end testing, identified UI/UX issues and performance bottlenecks, and documented bugs for the dev team.",
  "Collaborated with backend developers, QA engineers, and healthcare professionals to integrate user feedback and meet compliance standards.",
  "Improved usability through iterative enhancements, reducing user-reported issues and improving resolution time by 30%.",
  "Implemented data visualization for patient reports and insights using Chart.js, improving decision-making for providers.",
  "Contributed to Agile/Scrum ceremonies including sprint planning, backlog grooming, and daily standups to ensure timely delivery."
],

    tags: ["React", "TypeScript", "REST", "UI/UX"],
    thumb:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
  },
];

// Chips
const allChips = ["All", ...Array.from(new Set(data.flatMap((x) => x.tags)))];

const RESUME_URL =
 "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu_CE.pdf?alt=media&token=c46134a1-4aa6-427b-880d-d83273250f26";

export default function Experiences() {
  const [chip, setChip] = useState("All");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const items = useMemo(() => {
    if (chip === "All") return data;
    return data.filter((x) => x.tags.includes(chip));
  }, [chip]);

  function handleOpen(x: Experience) {
    setSelected(x);
    setOpen(true);
  }

  return (
    <section className="space-y-6">
      {/* Chips row */}
      <FilterChips items={allChips} onChange={setChip} initial="All" />

      {/* Rows */}
      <div className="space-y-3">
        {items.map((x, i) => (
          <ExperienceRow x={x} key={i} onOpen={handleOpen} />
        ))}
      </div>

      {/* Slide-over details */}
      <ExperienceDrawer
        item={selected}
        open={open}
        onClose={() => setOpen(false)}
        resumeUrl={RESUME_URL}
      />
    </section>
  );
}
