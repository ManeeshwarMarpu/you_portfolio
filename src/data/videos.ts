export type Video = {
  id: string | number
  title: string
  thumbnail: string
  duration?: string
  views?: number
  uploadedAt?: string
  channel?: { name: string; handle: string; avatar: string }
  tags?: string[]
  description?: string
  sources?: { mp4?: string }
  sponsored?: boolean
  github?: string  
  appUrl?: string    
  highlights?: string[]
  category?: string
  date?: string
}


export const videos: Video[] = [
 {
    id: 'polyglot-compiler',
    title: 'Polyglot Compiler Workbench (C/Java/Python/JS)',
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    duration: '6:45',
    views: 15200,
    uploadedAt: '2025-05-20',
    category: 'Tools',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['compiler', 'python', 'streamlit'],
    appUrl: 'https://compliter.streamlit.app/',
    description:
      'I built an interactive, step-by-step compiler workbench designed to make the complex process of compilation approachable and visually engaging. Using Streamlit, I crafted a single, intuitive interface where users can write code and watch it transform, stage by stage, from raw text into an executable program — all in real-time.\nThis workbench is a polyglot platform, supporting MiniLang (a custom language I designed), as well as Python, JavaScript, and C. Its strength lies in deep visualization of the entire compilation pipeline.\n - Lexing: Break code into tokens and watch them appear live.\n -Parsing: See an AST generated in ASCII, JSON, and as a Graphviz-rendered tree.\n -Semantic Analysis: Validate correctness (for MiniLang) before moving forward.\nIR Generation: Explore Three-Address Code (TAC) or bytecode output.\n-CFG Visualization: Understand program flow with clear control-flow graphs.\n -Execution & Debugging: Run programs directly inside the workbench and step through code line by line with an interactive debugger.', 
  highlights: [
  "Built with Streamlit and integrated Ace Editor for code editing and syntax highlighting",
  "Visualized ASTs and CFGs using Graphviz for a clear, interactive learning experience",
  "Enabled cross-language execution for C and Java via clang/javac with IR/bytecode output",
  "Included step-by-step debugger for Python, JS, and MiniLang",
  "Performance profiling per stage with rich error annotations for better debugging",
  "Designed a clean, tabbed UI for Tokens, AST, IR, CFG, Run, and Debug views"
],
      github: 'https://github.com/ManeeshwarMarpu/compiler-workbench/tree/main/compliter', 
  },
  {
    id: 'project-mgmt',
    title: 'Project Management System (Django + AWS)',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/mac-management.png?alt=media&token=71be2320-1e51-473a-bf42-aa3c090daeb1',
    duration: '8:33',
    views: 9800,
    uploadedAt: '2025-06-10',
    category: 'web app',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['django', 'aws', 'pandas'],
    description:
      'AgileFlow is your projects command center, a streamlined dashboard for tracking and managing every detail. It gives you a crystal-clear view of key metrics, from the total number of registered companies to the active tasks keeping your team busy. The clean, visual interface makes it easy to monitor project progress at a glance, with a dedicated space to create new tasks and assign them to your team. A powerful cost calculator is built in, helping you predict and manage project budgets to avoid surprises. This system isnt just about tracking; it is about providing the insights and tools you need to guide every project from start to successful finish. It enhances collaboration by centralizing communication and task assignments. Ultimately, AgileFlow is designed to make project management more efficient and less stressful for everyone involved\n This entire project is built on the robust Django framework, leveraging its "batteries-included" approach to accelerate development. The backend is a powerful mix of Python and technologies like Celery for handling asynchronous tasks and a PostgreSQL database for reliable data storage. For serving static and media files, the project utilizes Amazon S3, and for deployment, it runs on AWS, using services like EC2 and Elastic Beanstalk to ensure scalability and high availability.',
    highlights: [
  "Built with Django + PostgreSQL for a robust, scalable backend",
  "Implemented Celery for asynchronous task handling and background processing",
  "Deployed on AWS using EC2 and Elastic Beanstalk with S3 for static/media storage",
  "Interactive dashboard with real-time metrics, task creation, and cost calculator",
  "Centralized collaboration with task assignment and progress tracking"
],
      github: 'https://github.com/ManeeshwarMarpu/Project-management-system',
  },
  {
    id: 'loan-app',
    title: 'Loan Application Tracking (Spring Boot + MySQL)',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/loan.png?alt=media&token=ec636a43-7161-43d9-b229-75e64e1271d7',
    duration: '7:12',
    views: 11300,
    uploadedAt: '2025-07-05',
    category: 'web app',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['springboot', 'mysql', 'jsp'],
    description:
      'This is the control center for a sophisticated Loan Application Tracking System, an all-in-one platform for both applicants and managers. It allows users to apply for various loans online and easily manage their repayments through EMIs. On the other side, managers gain a comprehensive overview, with the power to review, approve, and monitor every applications status from a centralized dashboard. The entire system is built on the robust Spring Boot framework for the backend, providing a secure and scalable foundation, while the front-end is crafted with JSP, ensuring a smooth and intuitive user experience for all. This platform streamlines the entire loan lifecycle, making it efficient and transparent.',
    highlights: [
  "Developed with Spring Boot for a secure, scalable backend architecture",
  "Built a JSP-based front-end for a smooth, user-friendly experience",
  "Enabled users to apply for loans online and manage repayments via EMIs",
  "Created manager dashboard to review, approve, and monitor applications",
  "Streamlined the entire loan lifecycle for efficiency and transparency"
],

      github: 'https://github.com/ManeeshwarMarpu/sdpproj3',
  },
  {
    id: 'motorola-sre',
    title: 'Motorola Solutions — SRE & Cloud Automation',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/Gemini_Generated_Image_cja4wucja4wucja4.png?alt=media&token=a5c4be89-f628-4e59-8ab0-004943333bc5',
    duration: '9:20',
    views: 8700,
    uploadedAt: '2025-08-01',
    category: 'DevOps',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['aws', 'kubernetes', 'sre'],
    description:
      'This project, a key part of my internship, focuses on building a secure and scalable system for storing body cam videos in the cloud. My primary contribution involved the critical infrastructure and automation aspects of the project. I utilized GitHub Actions to implement a robust CI/CD pipeline, automating the deployment of code to the GitHub repository. Furthermore, I leveraged GitHub Actions to orchestrate and automate various tasks within Amazon Web Services (AWS), ensuring a seamless and efficient workflow for managing the video archives. This experience allowed me to develop expertise in cloud deployment, continuous integration, and infrastructure automation.',
    highlights: [
  "Built a secure and scalable cloud-based system for storing body cam videos",
  "Implemented CI/CD pipelines using GitHub Actions for automated deployments",
  "Automated AWS tasks including provisioning, configuration, and video archive management",
  "Focused on infrastructure reliability and seamless workflow orchestration",
  "Gained hands-on expertise in cloud deployment, CI/CD, and infrastructure automation"
],

    },

  {
    id: 'fraud-detection',
    title: 'Anomaly Detection for Fraud',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/anomoly.png?alt=media&token=746572f3-9b8c-4d1b-9911-39538cb46db5',
    duration: '10:10',
    views: 6400,
    uploadedAt: '2025-03-20',
    category: 'Data Science',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['pandas', 'numpy', 'scikit-learn', 'eda', 'anomaly-detection'],
    description:
      'This project delivers a complete pipeline for detecting anomalies within highly imbalanced fraud datasets using advanced unsupervised learning techniques. The process begins with a deep exploratory data analysis and visualization, allowing for a clear understanding of data distributions and the identification of unusual, outlier behavior. To flag potential fraudulent activities, the system employs state-of-the-art unsupervised models, including Isolation Forest and Autoencoders. The performance of these models is meticulously evaluated using key metrics such as confusion matrices and classification reports, providing a robust assessment of their effectiveness. From data preprocessing to model training and insightful visualization, this project serves as a comprehensive example of building a scalable fraud detection system. This method is particularly effective because it does not rely on labeled data, making it ideal for discovering new and evolving fraud patterns. Ultimately, the system provides a proactive and powerful defense against financial crime.',
    highlights: [
  "Performed extensive exploratory data analysis (EDA) and visualization to understand fraud patterns",
  "Preprocessed highly imbalanced datasets with techniques like resampling and feature scaling",
  "Implemented advanced unsupervised models including Isolation Forest and Autoencoders",
  "Evaluated models using confusion matrix, precision, recall, and F1-score for robust performance",
  "Designed an end-to-end pipeline from preprocessing to model training and visualization",
  "Enabled detection of unseen and evolving fraud patterns without relying on labeled data"
],

      github:
      'https://github.com/ManeeshwarMarpu/Data-Science-Projects/tree/main/Anomaly_Detection_for_Fraud',
  },
  {
    id: 'weather-analysis',
    title: 'Weather Analysis — ARIMA Forecasting',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/weather%20analysis.png?alt=media&token=4d7b6f4e-f7e6-483c-89b4-6a042bbde614',
    duration: '6:55',
    views: 7200,
    uploadedAt: '2025-02-18',
    category: 'Data Science',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['arima', 'time-series', 'data-science'],
    description:
      'This project provides a comprehensive and practical framework for time series analysis, focusing on a deep integration of key steps to deliver accurate forecasts. At its core, the system handles meticulous data preprocessing, preparing raw data for modeling. It then leverages the powerful ARIMA model to fit and forecast future trends. The framework includes a series of comprehensive diagnostic checks to rigorously validate the models assumptions and performance, ensuring reliability. Finally, it performs a thorough forecast evaluation, providing clear metrics to assess the models accuracy. This project is an invaluable learning tool for anyone looking to master time series forecasting, with applications extending to fields like weather analysis and beyond',
    highlights: [
  "Implemented end-to-end time series forecasting pipeline with ARIMA",
  "Performed rigorous data preprocessing and transformation for model readiness",
  "Conducted comprehensive diagnostic checks to validate ARIMA assumptions",
  "Evaluated forecast accuracy with metrics like MAPE and RMSE",
  "Applied solution to real-world datasets, including weather trend prediction"
],

      github: 'https://github.com/ManeeshwarMarpu/sdpproj3',
  },

  {
  id: 'you-portfolio',
  title: 'You-Portfolio (React + TypeScript)',
  thumbnail:
    'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/youtube.png?alt=media&token=69eefe35-efc6-47b0-8b48-b906544feb0e',
  duration: '6:40',
  views: 6100,
  uploadedAt: '2025-09-15',
  category: 'web app',
  channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=12' },
  tags: ['react', 'typescript', 'frontend', 'video'],
  description:
    'You-Portfolio is a unique, YouTube-inspired portfolio platform that transforms the way projects are showcased. Instead of traditional static cards, this app presents each project as a video-like card with thumbnails, durations, and meta-data, creating a more interactive and engaging experience for visitors. Users can browse projects in a responsive grid, click into a detailed "watch" page for each project, and explore descriptions, tags, GitHub links, and related work. Built with React, TypeScript, and Tailwind CSS, the interface is highly responsive and optimized for performance, offering a smooth, immersive browsing experience.The design is a testament to modern front-end engineering, leveraging React component-based architecture for a modular and scalable codebase. TypeScript ensures robust type safety throughout the application, minimizing errors and enhancing developer productivity. Tailwind CSS was instrumental in achieving the clean, minimalist, and highly responsive layout, allowing for rapid UI development. The "watch" page elevates the user journey by presenting project details in a dedicated, distraction-free environment, making it easy to dive deep into the technical specifications and live demos. This innovative approach redefines the standard portfolio, making it a memorable and compelling way to present work to potential employers and collaborators.',
  highlights: [
    "YouTube-inspired UI for project discovery and navigation",
    "Responsive video-style project cards with duration and meta-data",
    "Dedicated 'watch' pages for each project with detailed descriptions",
    "Built with React + TypeScript for type safety and maintainability",
    "Optimized with lazy loading, responsive grid layout, and smooth animations"
  ],
  github: 'https://github.com/ManeeshwarMarpu/you-portfolio',
},

  {
    id: 'portfolio-site',
    title: 'My Portfolio (React + Tailwind)',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/port.png?alt=media&token=c0608788-eff1-4b08-89ac-e49de810045e',
    duration: '5:20',
    views: 5600,
    uploadedAt: '2025-01-12',
    category: 'web app',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['react', 'tailwind', 'frontend'],
    description:
      'My portfolio serves as a dynamic showcase of my capabilities as a software engineer, featuring a collection of projects designed with a keen eye for both aesthetics and functionality. It boasts a clean, interactive user interface with seamless dark and light mode transitions, ensuring an engaging experience for every visitor. Each project is presented on a meticulously designed card, providing a glimpse into its purpose, the technologies utilized, and a direct link to its GitHub repository. A smart notification system proactively alerts users to projects with unpublished code, demonstrating transparency and ongoing development. The entire portfolio is built for exceptional responsiveness, accessibility, and smooth, modern animations.Beyond the polished front end, the site highlights my proficiency in both front-end and back-end technologies. My work emphasizes a commitment to well-structured, maintainable code, showcasing my ability to solve complex problems with elegant and functional solutions. It is not just a collection of projects, but a reflection of my passion for building high-quality, impactful software.',
    highlights: [
  "Responsive, mobile-first design with smooth dark/light mode transitions",
  "Interactive project cards with GitHub links and smart unpublished-code notifications",
  "Built with React + Tailwind for a clean, maintainable architecture",
  "Focus on accessibility, performance, and polished animations",
  "Showcases both frontend and backend capabilities through diverse projects"
],

      github: 'https://github.com/ManeeshwarMarpu/sdpproj3',
  },

  {
    id: 'construction-ai',
    title: 'Construction Material Quality Inspection AI',
    thumbnail:
      'https://firebasestorage.googleapis.com/v0/b/portfolio-84f15.firebasestorage.app/o/cnst.png?alt=media&token=80d5b321-23c5-4cf0-bf6a-08686cf86e66',
    duration: '9:10',
    views: 4800,
    uploadedAt: '2025-04-08',
    category: 'Data Science',
    channel: { name: 'Maneeshwar Marpu', handle: 'maneesh', avatar: 'https://i.pravatar.cc/100?img=11' },
    tags: ['ai', 'image-classification', 'data-science'],
    description:
      'This project introduces an AI-based system designed to revolutionize construction material quality control. The core of the system is a machine learning model trained to inspect and classify various materials, including bricks, cement, and steel, with unparalleled accuracy. By leveraging advanced computer vision techniques, the system can automatically detect and categorize a wide range of defects, such as cracks in concrete, rust on steel, or inconsistencies in brick composition. This automated approach ensures rigorous quality assurance, minimizing human error, accelerating the inspection process, and ultimately enhancing the safety and durability of construction projects.',
  highlights: [
  "Developed a machine learning model for automated material inspection and classification",
  "Used computer vision to detect defects like cracks, rust, and composition inconsistencies",
  "Reduced human error and accelerated quality inspection processes",
  "Enhanced construction safety and durability through rigorous, automated QA",
  "Delivered a scalable solution adaptable to multiple construction materials (bricks, cement, steel)"
],

    },
]