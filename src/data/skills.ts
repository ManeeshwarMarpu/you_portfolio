export interface Skill {
  id: string;
  name: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const coreSkills: SkillGroup[] = [
  {
    title: "Cloud Platforms",
    skills: [
      { 
        id: "aws", 
        name: "AWS (EC2, S3, RDS, EKS, IAM, CloudWatch)", 
        description: "Provisioned production-grade infrastructure including EKS clusters and RDS instances using Terraform with zero unplanned downtime[cite: 15]. Integrated CloudWatch for real-time incident triaging within defined SLAs[cite: 18]." 
      },
      { 
        id: "azure", 
        name: "Azure (VMs, Azure Monitor)", 
        description: "Managed mission-critical VMs and non-production monitoring setups to enable earlier detection of reliability issues[cite: 25, 62]. Migrated high-volume CI/CD pipelines from Azure DevOps to GitHub Actions[cite: 24]." 
      },
    ],
  },
  {
    title: "IaC & Automation",
    skills: [
      { 
        id: "terraform", 
        name: "Terraform", 
        description: "Designed and maintained complex infrastructure state for AWS and Kubernetes environments, ensuring 99%+ service availability[cite: 12, 15]." 
      },
      { 
        id: "ansible", 
        name: "Ansible", 
        description: "Automated system setup and dependency resolution across Linux-based development and lab environments[cite: 35, 63]." 
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { 
        id: "k8s", 
        name: "Kubernetes", 
        description: "Optimized workloads through CPU/memory right-sizing and autoscaling, reducing cloud infrastructure costs by 15%[cite: 17]. Validated system resiliency using failure-injected microservices[cite: 52]." 
      },
      { 
        id: "docker", 
        name: "Docker / Helm", 
        description: "Containerized SRE platforms and managed deployments using Helm charts for scalable, failure-tolerant microservices[cite: 52, 64]." 
      },
    ],
  },
  {
    title: "Observability & SRE",
    skills: [
      { 
        id: "prometheus", 
        name: "Prometheus & Grafana", 
        description: "Developed 20+ dashboards monitoring latency and error rates, reducing Mean Time to Detection (MTTD) by 25%. Set up Grafana Loki for AI-driven semantic drift detection in log streams[cite: 49, 50]." 
      },
      { 
        id: "chaos", 
        name: "Chaos Engineering (Litmus)", 
        description: "Executed 10+ chaos experiments to validate fault tolerance and system recovery workflows under failure conditions[cite: 13]." 
      },
    ],
  },
];