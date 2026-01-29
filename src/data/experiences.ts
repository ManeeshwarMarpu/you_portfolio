import type { Experience } from "../components/ExperienceRow"

export const experiences: Experience[] = [
  {
    role: "Software Engineer – Site Reliability Engineering",
    org: "Motorola Solutions Pvt. Ltd.",
    period: "Jun 2023 – Jul 2024 · Bangalore, India",
    bullets: [
      "Supported end-to-end Site Reliability Engineering operations across development, staging, and production environments, maintaining 99%+ availability for mission-critical services.",
      "Designed and executed 10+ chaos engineering experiments using Litmus to validate fault tolerance, recovery workflows, and system resiliency under node, pod, and network failure scenarios.",
      "Developed and maintained 20+ Grafana dashboards integrated with Prometheus to track latency, error rates, saturation, and service health, reducing Mean Time to Detect (MTTD) by 25%.",
      "Owned Terraform-based infrastructure provisioning and updates across AWS and Kubernetes, executing changes with zero unplanned downtime.",
      "Defined, tracked, and enforced Service Level Objectives (SLOs) and error budgets to guide release decisions and prevent reliability regressions.",
      "Optimized Kubernetes workloads through CPU/memory right-sizing, HPA tuning, and autoscaling strategies, achieving a 15% reduction in cloud infrastructure costs.",
      "Participated in on-call rotations, triaging alerts from Prometheus, Alertmanager, and CloudWatch to resolve incidents within SLA timelines.",
      "Collaborated closely with application developers during deployments and post-incident reviews, documenting root causes and implementing long-term reliability improvements."
    ],
    tags: ["SRE", "AWS", "Kubernetes", "Terraform", "Grafana", "Prometheus", "Chaos Engineering"],
    thumb:
      "https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_97pyp997pyp997py.png?alt=media&token=1acf1d47-9e9a-4f1d-a0dd-2dfdd3e145b6",
  },

  {
    role: "Cloud Engineer Intern",
    org: "Motorola Solutions Pvt. Ltd.",
    period: "Mar 2022 – May 2023 · Bangalore, India",
    bullets: [
      "Migrated CI/CD pipelines from Azure DevOps to GitHub Actions, improving pipeline consistency and reducing build failures by 25%.",
      "Built and maintained GitHub Actions workflows to automate AWS tasks including EC2, RDS, S3, IAM, and ingress management.",
      "Supported monitoring setup and validation across non-production environments, enabling earlier detection of performance and reliability issues.",
      "Reviewed Prisma Cloud container security scan results, identifying false positives and misconfigurations, reducing unnecessary security alerts by 20%.",
      "Assisted in troubleshooting CI/CD pipeline failures and validating build artifacts prior to deployments.",
      "Performed routine environment checks and smoke tests before releases to prevent pre-release defects from reaching staging.",
      "Collaborated with developers to verify infrastructure and configuration changes during feature rollouts.",
      "Documented deployment procedures, monitoring runbooks, and troubleshooting steps to improve onboarding and operational clarity."
    ],
    tags: ["Cloud", "CI/CD", "GitHub Actions", "AWS", "Docker", "Security"],
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
      "Assisted students in understanding core concepts in operating systems, virtualization, and cloud computing.",
      "Maintained and updated lab documentation and setup guides to ensure repeatable and consistent development environments.",
      "Collaborated with faculty to improve lab design, grading workflows, and technical learning outcomes."
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
      "Validated application behavior across test environments and identified defects with clear reproduction steps and impact analysis.",
      "Supported CI/CD-driven testing workflows by detecting build and deployment issues affecting release quality.",
      "Collaborated with developers to verify bug fixes, retest resolved issues, and ensure release readiness.",
      "Maintained detailed test execution reports and defect documentation to improve system stability and traceability.",
      "Gained hands-on exposure to software quality assurance processes, release cycles, and defect lifecycle management."
    ],
    tags: ["Testing", "QA", "CI/CD", "Healthcare Tech"],
    thumb:
      "https://images.unsplash.com/photo-1581091215367-59ab6b0f5b33?q=80&w=1600&auto=format&fit=crop",
  },
]
