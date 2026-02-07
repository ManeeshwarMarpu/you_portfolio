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
        description: "Provisioned and updated production-grade infrastructure on AWS and Kubernetes using Terraform, ensuring changes were executed safely with zero unplanned downtime[cite: 15]. Triaged alerts from CloudWatch to ensure timely incident resolution within SLAs[cite: 18]." 
      },
      { 
        id: "azure", 
        name: "Azure (VMs, Azure Monitor)", 
        description: "Supported monitoring setup and validation across Azure-based non-production environments to enable earlier detection of reliability issues[cite: 25]. Managed Azure VMs and migrated legacy CI/CD pipelines to GitHub Actions[cite: 24, 62]." 
      },
    ],
  },
  {
    title: "IaC & Automation",
    skills: [
      { 
        id: "terraform", 
        name: "Terraform", 
        description: "Owned end-to-end infrastructure provisioning across development, staging, and production environments[cite: 12, 15]. Used Terraform to maintain 99%+ availability for mission-critical services[cite: 12]." 
      },
      { 
        id: "iac-suite", 
        name: "AWS CDK, CloudFormation, Ansible", 
        description: "Utilized AWS CDK and CloudFormation for programmatic resource definition[cite: 63]. Leveraged Ansible and Shell scripting for system setup, configuration validation, and dependency resolution in Linux-based lab environments[cite: 35, 63, 67]." 
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { 
        id: "k8s", 
        name: "Kubernetes", 
        description: "Optimized workloads through CPU/memory right-sizing and autoscaling strategies, achieving a 15% reduction in infrastructure costs. Deployed failure-injected microservices on Kubernetes to validate alerting accuracy[cite: 52]." 
      },
      { 
        id: "docker-helm", 
        name: "Docker & Helm", 
        description: "Containerized applications and managed complex deployments using Helm charts[cite: 64]. Debugged container-related issues and environment-level errors across academic and production projects[cite: 36]." 
      },
    ],
  },
  {
    title: "CI / CD",
    skills: [
      { 
        id: "gh-actions", 
        name: "GitHub Actions & Jenkins", 
        description: "Migrated CI/CD pipelines to GitHub Actions, improving consistency and reducing build failures by 25%[cite: 24]. Managed automated testing and deployment workflows using Jenkins and Maven[cite: 43, 65]." 
      },
      { 
        id: "aws-cicd", 
        name: "AWS CodePipeline", 
        description: "Implemented CI/CD automation for frontend deployments on AWS, enabling faster release cycles and consistent production updates[cite: 59, 65]." 
      },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { 
        id: "prom-grafana", 
        name: "Prometheus & Grafana", 
        description: "Developed 20+ Grafana dashboards integrated with Prometheus to monitor service health, reducing MTTD by 25%. Tracked SLOs and error budgets to guide release decisions[cite: 16]." 
      },
      { 
        id: "elk-loki", 
        name: "ELK Stack & Grafana Loki", 
        description: "Ingested 100K+ unstructured log entries using Grafana Loki to detect semantic drift and early degradation signals[cite: 50, 51]. Leveraged ELK stack for centralized logging and observability[cite: 66]." 
      },
    ],
  },
  {
    title: "Security & Networking",
    skills: [
      { 
        id: "sec-net", 
        name: "IAM, VPC, Secrets & TLS", 
        description: "Enforced least-privilege IAM policies and secured web applications using AWS Certificate Manager (TLS/SSL)[cite: 58, 66]. Reviewed container security scans and reduced false positives by 20%[cite: 26]." 
      },
    ],
  },
  {
    title: "Development & Systems",
    skills: [
      { 
        id: "languages", 
        name: "Go, Python, Java, JS, SQL", 
        description: "Developed Python scripts for log processing and incident detection[cite: 36, 49]. Built responsive React-based portfolios and integrated LLMs (Llama 3) for automated RCA reporting[cite: 53, 56, 68]." 
      },
      { 
        id: "linux-os", 
        name: "Linux (Ubuntu, RHEL)", 
        description: "Supported Linux-based environments through system setup, configuration validation, and shell scripting for automation[cite: 35, 67]." 
      },
    ],
  },
  {
  title: "AI & Machine Learning",
  skills: [
    {
      id: "ml-anomaly",
      name: "Machine Learning & Anomaly Detection",
      description:
        "Designed and evaluated ML pipelines for anomaly and fraud detection using Isolation Forests and Autoencoders. Performed EDA, handled extreme class imbalance, and validated models using confusion matrices and classification reports. Applied these techniques in fraud detection and material defect identification projects."
    },
    {
      id: "llm-rag-systems",
      name: "LLMs, RAG & AI Systems",
      description:
        "Built production-grade AI systems using LLMs (Llama 3 via Ollama) and Retrieval-Augmented Generation (FAISS). Developed AI-powered Excel assistants and SRE platforms that generate structured insights, RCA reports, and predictions from unstructured data such as logs, spreadsheets, and PDFs."
    },
    {
      id: "aiops-ml",
      name: "AIOps & Intelligent Monitoring",
      description:
        "Developed AI-driven SRE systems that detect semantic log drift as pre-incident signals. Correlated embeddings with metrics (HTTP 5xx, error rates), auto-clustered incidents, and generated severity-classified summaries (P0–P2) using LLMs."
    }
  ]
},
// Add these to your coreSkills array
  {
    title: "Backend & Systems",
    skills: [
      {
        id: "backend-frameworks",
        name: "Spring Boot, Django, FastAPI",
        description: "Architected scalable microservices and REST APIs with robust error handling and middleware. Integrated Spring Security and JWT for secure authentication flows."
      },
      {
        id: "db-systems",
        name: "PostgreSQL, MongoDB, Redis, Firestore",
        description: "Designed optimized schemas and complex queries. Implemented Redis caching to reduce database load and Firestore for real-time application features."
      }
    ]
  },
  {
    title: "Frontend & Full Stack",
    skills: [
      {
        id: "frontend-stack",
        name: "React, Next.js, TypeScript, Tailwind",
        description: "Built cinematic, high-performance UIs using Framer Motion and modern CSS. Managed complex state using Redux and React Query."
      },
      {
        id: "mobile-dev",
        name: "React Native & Expo",
        description: "Developed cross-platform mobile applications with custom UI themes (Spider-Verse) and integrated device-level features."
      }
    ]
  },

];