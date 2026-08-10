import { useMemo, useState } from "react";
import ExperienceRow, { type Experience } from "../components/ExperienceRow";
import FilterChips from "../components/FilterChips";
import ExperienceDrawer from "../components/ExperienceDrawer";

const data: Experience[] = [
  {
    role: "DevOps Engineer",
    org: "Capital One",
    period: "Sep 2025 – Present · USA",
    bullets: [
      "Introduced Agile-based release planning and cross-functional sprint workflows to streamline collaboration between development and operations teams, accelerating feature delivery by 30% through improved sprint execution and continuous feedback.",
      "Implemented GitOps automation using ArgoCD and Python-based validation scripts to eliminate manual deployment steps, improve release traceability, and reduce configuration drift by 35% across Kubernetes-based environments supporting enterprise applications.",
      "Developed reusable AWS CloudFormation templates to standardize infrastructure provisioning across development environments, lowering provisioning effort by 40% and reducing setup time from days to hours while ensuring compliant cloud deployments.",
      "Managed enterprise workloads on Azure Kubernetes Service (AKS) and OpenShift, performing zero-downtime upgrades, capacity optimization, and platform maintenance to maintain 99.9% application uptime across multi-cloud environments.",
      "Created end-to-end GitLab CI/CD pipelines with Helm-based deployment automation to streamline build, test, and release processes, reducing deployment failures by 45% and shortening release cycles from weekly to daily.",
    ],
    tags: ["GitOps", "ArgoCD", "AKS", "OpenShift", "CloudFormation", "GitLab CI/CD", "Helm", "Kubernetes"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/capital.png?alt=media&token=065cbe8b-1e6c-4ebf-be60-f5054fbd9002",
  },


  {
    role: "Software Engineer – DevOps & Site Reliability Engineering",
    org: "Motorola Solutions Pvt. Ltd.",
    period: "Mar 2022 – Jul 2024 · Bangalore, India",
    bullets: [
      "Owned development and operational management of 14 distributed microservices, handling feature development, dependency management, and inter-service communication to ensure reliability and consistency across production environments.",
      "Established and shipped internal portal UI enhancements using Vue.js, building reusable component libraries and improving the responsiveness of enterprise-facing dashboards consumed by cross-functional teams across global operations.",
      "Migrated CI/CD pipelines from Azure Pipelines to GitHub Actions by rewriting pipeline configurations and standardizing deployment workflows across microservices to improve build reliability and development velocity.",
      "Resolved Twistlock container security scan issues in Docker images by fixing vulnerable dependencies and enforcing compliance policies in CI pipelines, while maintaining and debugging cron job schedules for reliable execution.",
      "Provisioned and maintained Azure Key Vaults for secrets and credential management, supporting containerized workloads via Docker across Azure-hosted environments throughout the platform migration lifecycle.",
      "Transitioned into an SRE role focused on chaos engineering by running fault injection tests using LitmusChaos and building observability dashboards with Prometheus and Grafana to monitor service health and improve SLO compliance.",
      "Designed and executed 10+ chaos engineering experiments to validate fault tolerance and system resiliency under node, pod, and network failure scenarios.",
      "Developed and maintained 20+ Grafana dashboards integrated with Prometheus, tracking latency, error rates, saturation, and service health — reducing MTTD by 25%.",
    ],
    tags: ["SRE", "AWS", "Azure", "Kubernetes", "Terraform", "Grafana", "Prometheus", "Chaos Engineering", "GitHub Actions", "Docker"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/moto_clou.png?alt=media&token=e0445835-9769-4aa7-b462-fe98991cbf4b",
  },

  {
    role: "Cloud Engineer",
    org: "Cognitive Healthcare Solutions",
    period: "Jun 2021 – Feb 2022 · India",
    bullets: [
      "Adopted Test-Driven Development (TDD) practices for cloud applications by writing unit and integration tests before implementation, reducing post-deployment defects by 88% across CI/CD-driven development environments.",
      "Designed AWS S3 backup and disaster recovery strategies using versioning and cross-region replication to safeguard critical enterprise data, reducing recovery time by 92% and improving business continuity readiness.",
      "Architected secure AWS and Azure hybrid cloud environments with integrated identity management, secure networking, and workload portability, improving infrastructure resilience by 90% and enabling seamless cross-platform deployments.",
      "Built centralized observability solutions by integrating infrastructure and application metrics, logs, and alerts into unified monitoring dashboards, reducing incident response time by 87% and improving operational visibility.",
      "Automated provisioning and day-to-day operational tasks using PowerShell scripts to eliminate repetitive manual work and standardize administrative workflows, improving team productivity by 85%.",
      "Optimized PostgreSQL database performance through indexing, query tuning, and replication strategies, improving query response times by 91% while enhancing scalability and data integrity.",
    ],
    tags: ["AWS", "Azure", "Hybrid Cloud", "TDD", "CI/CD", "PowerShell", "PostgreSQL", "Observability"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/congnitive.png?alt=media&token=159bf993-0132-4642-b3d8-b7425f3f14da",
  },

  {
    role: "Graduate Assistant",
    org: "University of Houston",
    period: "Jan 2025 – May 2025 · Houston, TX",
    bullets: [
      "Supported Linux-based lab environments by assisting students with system setup, configuration validation, and dependency resolution.",
      "Helped debug Python applications, container-related issues, and environment-level errors across academic projects.",
      "Provided hands-on guidance for basic cloud workflows, scripting, and troubleshooting practices using AWS and Docker.",
      "Assisted students in understanding core concepts in operating systems, virtualization, and cloud computing.",
      "Maintained and updated lab documentation and setup guides to ensure repeatable and consistent development environments.",
      "Collaborated with faculty to improve lab design, grading workflows, and technical learning outcomes."
    ],
    tags: ["Teaching", "Linux", "Python", "Cloud", "Docker"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/casa.png?alt=media&token=6e0ef35a-0935-4127-8ded-5efa6ee33b4e",
  },];

// Chips
const allChips = ["All", ...Array.from(new Set(data.flatMap((x) => x.tags)))];

const RESUME_URL =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Maneeshwar%20Marpu_DevOps%20%26%20Cloud%20Engineer.pdf?alt=media&token=ae481e64-473f-414e-8327-c25f558d20b8";

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