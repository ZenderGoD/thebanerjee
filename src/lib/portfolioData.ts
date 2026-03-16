import {
  Bot,
  BriefcaseBusiness,
  Cloud,
  Cpu,
  Database,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  PhoneCall,
  Radar,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type SocialLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
};

export type HighlightCard = {
  title: string;
  description: string;
  tone: "paper" | "yellow" | "mint";
};

export type StatCard = {
  value: string;
  label: string;
  note: string;
};

export type ProjectCard = {
  title: string;
  tag: string;
  summary: string;
  result: string;
  icon: LucideIcon;
  tone: "paper" | "blue" | "pink" | "mint";
};

export type ExperienceCard = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  details: string;
};

export const profile = {
  name: "Bishal Banerjee",
  role: "Full-stack engineer and AI/ML specialist",
  location: "Vellore, India",
  email: "bishal@bebishal.com",
  website: "bebishal.com",
  phone: "+91-9972801985",
  currentRole: "Backend and Full-Stack Engineer at IMAI Studio",
  availability: "Open to ambitious teams, product collaborations, and high-craft builds.",
};

export const socialLinks: SocialLink[] = [
  { href: "mailto:bishal@bebishal.com", label: "Email", icon: Mail },
  { href: "https://github.com/ZenderGoD", label: "GitHub", icon: Github, external: true },
  {
    href: "https://www.linkedin.com/in/bishal-banerjee-4742a8190/",
    label: "LinkedIn",
    icon: Linkedin,
    external: true,
  },
];

export const heroBadges = [
  { icon: Sparkles, label: "Available for 2026 builds" },
  { icon: MapPin, label: "Based in Vellore, India" },
  { icon: Globe, label: "Shipping product, platform, and AI work" },
];

export const highlights: HighlightCard[] = [
  {
    title: "Full-stack product engineer",
    description:
      "I design and ship end-to-end experiences with a backend-first mindset and careful UX polish.",
    tone: "paper",
  },
  {
    title: "Web platform specialist",
    description:
      "Comfortable across Next.js, TypeScript, FastAPI, edge runtimes, design systems, and production APIs.",
    tone: "yellow",
  },
  {
    title: "Systems thinker",
    description:
      "I care about architecture, delivery standards, and infrastructure that keeps shipping smooth under pressure.",
    tone: "mint",
  },
];

export const stats: StatCard[] = [
  {
    value: "10K+",
    label: "daily active users supported",
    note: "Platform scale delivered at IMAI Studio.",
  },
  {
    value: "50%",
    label: "API latency reduced",
    note: "System and ML optimization across production paths.",
  },
  {
    value: "30%",
    label: "inference performance gained",
    note: "Model analysis and backend tuning in the real world.",
  },
  {
    value: "99.9%",
    label: "uptime kept in reach",
    note: "Reliable delivery with stronger CI/CD and deployment discipline.",
  },
];

export const principles = [
  "Distinct visual taste without sacrificing clarity.",
  "Fast, dependable systems that survive production traffic.",
  "AI features that solve real product problems, not demo problems.",
  "Tight collaboration with design, product, and research teams.",
];

export const toolbox = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "FastAPI",
  "Flask",
  "SQL",
  "Docker",
  "AWS",
  "GCP Vertex AI",
  "Azure ML",
  "Cloudflare",
  "CI/CD",
  "PyTorch",
  "TensorFlow",
  "Transformers",
  "Computer Vision",
  "NLP",
  "Multi-modal AI",
  "Realtime UX",
  "Design systems",
  "System design",
  "Production deployment",
];

export const currentFocus = [
  {
    label: "Current role",
    value: "Building backend systems and full-stack product flows at IMAI Studio.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Strength",
    value: "Turning AI-heavy ideas into usable, performant web products.",
    icon: Bot,
  },
  {
    label: "Bias",
    value: "Clean architecture, bold interface decisions, and reliable release pipelines.",
    icon: Cloud,
  },
];

export const projects: ProjectCard[] = [
  {
    title: "IMAI backend system",
    tag: "AI infrastructure",
    summary:
      "Scaled the platform backend around reliability, latency, and smoother deployments for a live AI product.",
    result: "30% inference optimization and 99.9% uptime discipline.",
    icon: Database,
    tone: "paper",
  },
  {
    title: "Forest fire and cyclone detection",
    tag: "Computer vision",
    summary:
      "Applied vision transformers on satellite imagery to detect environmental events with production-minded rigor.",
    result: "92%+ accuracy on event detection workflows.",
    icon: Radar,
    tone: "blue",
  },
  {
    title: "Multi-modal stock market prediction",
    tag: "ML systems",
    summary:
      "Combined NLP signals with time-series modeling to improve predictive performance on market movement tasks.",
    result: "15% uplift from multi-modal modeling choices.",
    icon: TrendingUp,
    tone: "pink",
  },
  {
    title: "Outfit recommendation system",
    tag: "Generative product",
    summary:
      "Built a conversational recommender that blends user context, ranking logic, and GenAI-driven UX.",
    result: "A more natural recommendation flow for style discovery.",
    icon: Sparkles,
    tone: "mint",
  },
];

export const experience: ExperienceCard[] = [
  {
    company: "IMAI Studio",
    role: "Backend and Full-Stack Engineer",
    period: "Jan 2025 - Present",
    bullets: [
      "Architected an AI platform serving 10K+ daily active users.",
      "Reduced API latency by 50% via system and ML optimization.",
      "Improved inference performance by 30% through model analysis.",
      "Led CI/CD improvements that cut deployment cycles from hours to minutes.",
    ],
  },
  {
    company: "The House of RARE",
    role: "Data Science Engineer Trainee",
    period: "Jun 2024 - Dec 2024",
    bullets: [
      "Built ETL pipelines and ML models for forecasting and business analysis.",
      "Designed PowerBI dashboards that improved decision-making velocity.",
      "Optimized SQL and validation workflows for 99.9% data integrity.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "M.Tech CSE (AI and ML)",
    school: "VIT Vellore",
    details: "CGPA 8.05",
  },
  {
    degree: "B.Tech Mechatronics",
    school: "REVA University",
    details: "CGPA 8.4",
  },
  {
    degree: "B.S. Data Science",
    school: "IIT Madras",
    details: "CGPA 7.95",
  },
];

export const contactCards = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Website", value: profile.website, href: "https://bebishal.com", icon: Globe },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: PhoneCall },
  { label: "Location", value: profile.location, href: "#", icon: MapPin },
];

export const skillsGroups = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
    icon: Cpu,
  },
  {
    title: "Frameworks",
    items: ["Next.js", "React", "FastAPI", "Flask"],
    icon: Cloud,
  },
  {
    title: "AI/ML",
    items: ["PyTorch", "TensorFlow", "Transformers", "CV", "NLP", "Multi-modal AI"],
    icon: Bot,
  },
  {
    title: "Education",
    items: education.map((item) => `${item.degree} - ${item.school}`),
    icon: GraduationCap,
  },
];
