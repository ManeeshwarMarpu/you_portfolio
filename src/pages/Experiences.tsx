import { useMemo, useState } from "react";
import ExperienceRow, { type Experience } from "../components/ExperienceRow";
import FilterChips from "../components/FilterChips";
import ExperienceDrawer from "../components/ExperienceDrawer";

const data: Experience[] = [
  {
    role: "Software Engineer – Site Reliability Engineering",
    org: "Motorola Solutions Pvt. Ltd.",
    period: "Jun 2023 – Jul 2024 · Bangalore, India",
    bullets: [
      "Supported end-to-end SRE operations across development, staging, and production environments, ensuring 99%+ availability for mission-critical services.",
      "Designed and executed 10+ chaos engineering experiments using Litmus to validate fault tolerance and recovery workflows under node, pod, and network failures.",
      "Built and maintained 20+ Grafana dashboards integrated with Prometheus to monitor latency, error rates, saturation, and service health, reducing MTTD by 25%.",
      "Owned Terraform-based infrastructure provisioning and updates across AWS and Kubernetes, executing changes with zero unplanned downtime.",
      "Defined and enforced Service Level Objectives (SLOs) and error budgets to guide release decisions and minimize reliability regressions.",
      "Optimized Kubernetes workloads through CPU/memory right-sizing and autoscaling strategies, achieving a 15% reduction in cloud infrastructure costs.",
      "Participated in on-call rotations, triaging alerts from Prometheus, Alertmanager, and CloudWatch to resolve incidents within SLA timelines.",
      "Collaborated with application developers during deployments and post-incident reviews, documenting root causes and implementing long-term reliability improvements."
    ],
    tags: [
      "SRE",
      "AWS",
      "Kubernetes",
      "Terraform",
      "Grafana",
      "Prometheus",
      "Chaos Engineering"
    ],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_97pyp997pyp997py.png?alt=media&token=1acf1d47-9e9a-4f1d-a0dd-2dfdd3e145b6",
  },

  {
    role: "Cloud Engineer Intern",
    org: "Motorola Solutions Pvt. Ltd.",
    period: "Mar 2022 – May 2023 · Bangalore, India",
    bullets: [
      "Migrated CI/CD pipelines from Azure DevOps to GitHub Actions, improving pipeline consistency and reducing build failures by 25%.",
      "Developed GitHub Actions workflows to automate AWS infrastructure tasks including EC2, RDS, S3, IAM, and ingress management.",
      "Supported monitoring setup and validation across non-production environments, enabling early detection of performance and reliability issues.",
      "Reviewed Prisma Cloud container security scan results, reducing false positives and unnecessary security alerts by 20%.",
      "Assisted in troubleshooting CI/CD pipeline failures and validating build artifacts prior to deployments.",
      "Performed routine environment checks and smoke tests before releases to prevent defects from reaching staging.",
      "Collaborated with developers to verify infrastructure and configuration changes during feature rollouts.",
      "Documented deployment procedures, monitoring runbooks, and troubleshooting steps to improve onboarding efficiency."
    ],
    tags: [
      "Cloud",
      "CI/CD",
      "GitHub Actions",
      "AWS",
      "Docker",
      "Security"
    ],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_vp66q4vp66q4vp66.png?alt=media&token=a7f4bb69-625b-4f7b-8ed0-bbb24ad9c8c0",
  },

  {
    role: "Instructional Assistant",
    org: "University of Houston",
    period: "Aug 2025 – Present · Houston, TX",
    bullets: [
      "Supported Linux-based lab environments by assisting students with system setup, configuration validation, and dependency resolution.",
      "Helped debug Python applications, container-related issues, and environment-level errors across academic projects.",
      "Provided hands-on guidance for basic cloud workflows, scripting, and troubleshooting practices using AWS and Docker.",
      "Assisted students in understanding operating systems, virtualization, and cloud computing fundamentals.",
      "Maintained and updated lab documentation and setup guides to ensure consistent and repeatable development environments.",
      "Collaborated with faculty to improve lab design, assessments, and technical learning outcomes."
    ],
    tags: ["Teaching", "Linux", "Python", "Cloud", "Docker"],
    thumb:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop",
  },

  {
    role: "Software Tester Intern",
    org: "Society of Health and Medical Technology",
    period: "Jun 2021 – Dec 2021 · Noida, India",
    bullets: [
      "Executed functional, regression, and integration testing across multiple application modules prior to scheduled releases.",
      "Validated application behavior across test environments and documented defects with clear reproduction steps.",
      "Supported CI/CD-driven testing workflows by identifying build and deployment issues affecting release quality.",
      "Collaborated with developers to verify bug fixes, retest resolved issues, and ensure release readiness.",
      "Maintained detailed test execution reports and defect documentation to improve system stability and traceability.",
      "Gained hands-on exposure to software quality assurance processes and defect lifecycle management."
    ],
    tags: ["Testing", "QA", "CI/CD", "Healthcare Tech"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/se_tester.png?alt=media&token=11655883-050e-4267-8955-2511a3bb44fa",
  },
];

// Chips
const allChips = ["All", ...Array.from(new Set(data.flatMap((x) => x.tags)))];

const RESUME_URL =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar_Marpu.pdf?alt=media&token=faf9f705-50bb-49b3-8a34-7868f39ad486";

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
      <FilterChips items={allChips} onChange={setChip} initial="All" />

      <div className="space-y-3">
        {items.map((x, i) => (
          <ExperienceRow x={x} key={i} onOpen={handleOpen} />
        ))}
      </div>

      <ExperienceDrawer
        item={selected}
        open={open}
        onClose={() => setOpen(false)}
        resumeUrl={RESUME_URL}
      />
    </section>
  );
}
