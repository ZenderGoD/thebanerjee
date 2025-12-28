import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import LightPillar from "../components/LightPillar";
import MoodAuto from "../components/MoodAuto";
import MoodButton from "../components/MoodButton";
import { ProgressiveBlur } from "../components/ProgressiveBlur";
import AnimatedThemeToggler from "../components/AnimatedThemeToggler";
import { Dock, DockIcon } from "../components/Dock";
import RippleButton from "../components/RippleButton";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { Marquee } from "@/components/ui/marquee";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const highlights = [
  {
    title: "Full-stack product engineer",
    description:
      "I design and ship end-to-end experiences with a focus on performance, polish, and thoughtful UX.",
  },
  {
    title: "Web platform specialist",
    description:
      "Comfortable across the stack: Next.js, TypeScript, edge runtimes, design systems, and production-grade APIs.",
  },
  {
    title: "Systems thinker",
    description:
      "I enjoy shaping architecture, setting standards, and collaborating closely with design and product partners.",
  },
];

const links = [
  { href: "mailto:bishal@bebishal.com", label: "Email", icon: Mail },
  { href: "https://github.com/ZenderGoD", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/bishal-banerjee-4742a8190/", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/ender._.man?igsh=MzNycGk5djFya2hs&utm_source=qr", label: "Instagram", icon: Instagram },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-[#030712] via-[#050816] to-[#04060f] text-zinc-50">
      <div className="pointer-events-none absolute inset-0">
        <LightPillar
          rotationSpeed={0.32}
          glowAmount={0.0045}
          pillarWidth={3.1}
          pillarHeight={0.42}
          noiseIntensity={0.35}
          pillarRotation={10}
          mixBlendMode="screen"
          enableMoodListener
          className="opacity-60"
        />
        <div className="absolute left-[-20%] top-[-10%] h-80 w-80 rounded-full bg-[#3b2f8f]/14 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-[#1c3f66]/12 blur-3xl" />
        <div className="absolute bottom-[-5%] left-[10%] h-72 w-72 rounded-full bg-[#7a3d1d]/7 blur-3xl" />
      </div>

      <ProgressiveBlur
        position="top"
        height="18%"
        blurLevels={[0.25, 0.6, 1.1, 1.8, 2.8, 4, 5.6, 7.5]}
        className="z-20"
      />
      <ProgressiveBlur
        position="bottom"
        height="22%"
        blurLevels={[0.3, 0.65, 1.2, 2, 3.1, 4.5, 6.2, 8.2]}
        className="z-20"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-14 px-6 py-14 md:gap-16 md:py-20">
        <MoodAuto intervalMs={28000} />
        <header className="flex flex-col gap-6 md:grid md:grid-cols-[1.35fr_0.9fr] md:items-center md:gap-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-200">
              Portfolio · 2025
            </span>
            <span className="text-sm text-zinc-400">
              Open to collaborating on meaningful products.
            </span>
          </div>
          <Dock
            className="mt-0 h-[72px] w-[374px]! rounded-2xl border-white/10 bg-white/5/50 p-3 shadow-[0_12px_60px_-32px_rgba(0,0,0,0.75)] justify-self-end"
            iconSize={88}
            iconMagnification={120}
            iconDistance={180}
          >
            <DockIcon className="overflow-hidden rounded-full border border-white/10">
              <MoodButton iconOnly />
            </DockIcon>
            <DockIcon className="overflow-hidden rounded-full border border-white/10">
              <AnimatedThemeToggler className="h-full w-full rounded-full border-none bg-transparent text-white hover:bg-white/10" />
            </DockIcon>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <DockIcon
                  key={link.label}
                  className="overflow-hidden rounded-full border border-white/10"
                >
                  <RippleButton
                    as="a"
                    href={link.href}
                    className="grid h-full w-full place-items-center rounded-full border-none bg-transparent text-zinc-100 hover:bg-white/10"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    rippleColor="rgba(255,255,255,0.55)"
                    duration={520}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.label}</span>
                  </RippleButton>
                </DockIcon>
              );
            })}
          </Dock>
        </header>

        <main className="space-y-16 md:space-y-18 w-full relative">
          <section className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-start w-full relative">
            <div className="space-y-6 w-full min-w-0">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                Bishal Banerjee · Full-stack engineer
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl break-words">
                I build web products that feel fast, thoughtful, and alive.
              </h1>
              <p className="max-w-3xl text-lg text-zinc-300">
                I care about the details—clean architecture, reliable delivery,
                and interfaces that respect a user&apos;s time. My work spans
                product engineering, design systems, and immersive web
                experiences.
              </p>
              <div className="flex flex-nowrap gap-2 md:gap-4">
                <RippleButton
                  as="a"
                  href="mailto:bishal@bebishal.com?subject=Let%27s%20build%20something"
                  className="shrink-0 gap-1.5 border-white/15 bg-[#5b4cda] px-3 py-2 text-xs font-semibold text-white shadow-[0_18px_55px_-18px_rgba(91,76,218,0.75)] hover:bg-[#4a3fc0] md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                  rippleColor="rgba(255,255,255,0.65)"
                  duration={680}
                >
                  <span className="whitespace-nowrap">Let&apos;s build together</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                </RippleButton>
                <RippleButton
                  as="a"
                  href="https://github.com/ZenderGoD"
                  className="shrink-0 gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-100 hover:border-white/40 hover:bg-white/5 md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  rippleColor="rgba(255,255,255,0.55)"
                  duration={540}
                >
                  <span className="whitespace-nowrap">View GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                </RippleButton>
              </div>
            </div>

            <div className="w-full min-w-0">
              <Accordion type="single" collapsible className="w-full">
                {highlights.map((item, index) => (
                  <AccordionItem 
                    key={item.title} 
                    value={`item-${index}`} 
                    className="border-transparent"
                  >
                    <AccordionTrigger className="text-lg font-semibold text-white hover:no-underline data-[state=open]:text-white">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-6 text-zinc-300">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
          
          <div className="relative w-full overflow-hidden py-2">
            <Marquee pauseOnHover className="gap-3">
                  {[
                    "Next.js & TypeScript",
                    "React",
                    "Python",
                    "JavaScript",
                    "FastAPI",
                    "Flask",
                    "PyTorch",
                    "TensorFlow",
                    "Transformers",
                    "Computer Vision",
                    "NLP",
                    "Multi-modal AI",
                    "AWS",
                    "GCP Vertex AI",
                    "Azure ML",
                    "Cloudflare",
                    "Docker",
                    "CI/CD",
                    "SQL",
                    "Design systems",
                    "Realtime UX",
                    "3D & motion",
                    "System Design",
                    "ML Optimization",
                    "Production Deployment",
                  ].map((item) => (
                    <span
                      key={item}
                      className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
            </Marquee>
          </div>
          <section
            id="contact"
            className="rounded-2xl border border-white/10 bg-linear-to-r from-white/10 via-white/5 to-white/10 p-8 shadow-[0_20px_100px_-40px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-zinc-300">
                  Contact
                </p>
                <h2 className="text-2xl font-semibold text-white md:text-3xl">
                  Ready to build what&apos;s next?
                </h2>
                <p className="mt-2 text-sm text-zinc-200">
                  I&apos;m always interested in ambitious teams, thoughtful products, and
                  collaborations that value craft.
                </p>
              </div>
              <div className="flex flex-nowrap gap-2 md:gap-3">
                <RippleButton
                  as="a"
                  href="mailto:bishal@bebishal.com"
                  className="shrink-0 gap-1.5 border-white/30 bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-white/90 hover:shadow-[0_10px_40px_-12px_rgba(255,255,255,0.45)] md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                  rippleColor="rgba(0,0,0,0.35)"
                  duration={520}
                >
                  <span className="whitespace-nowrap">Say hello </span>
                  <Mail className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                </RippleButton>
                <RippleButton
                  as="a"
                  href="https://www.linkedin.com/in/bishal-banerjee-4742a8190/"
                  className="shrink-0 gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-100 hover:border-white/30 hover:bg-white/5 md:gap-2 md:px-4 md:py-2.5 md:text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                  rippleColor="rgba(255,255,255,0.55)"
                  duration={520}
                >
                  <span className="whitespace-nowrap">Connect on LinkedIn </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                </RippleButton>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-linear-to-r from-white/10 via-white/5 to-white/10 p-8 shadow-[0_20px_100px_-40px_rgba(0,0,0,0.6)]">
            <Terminal className="border-white/30 bg-black/60 text-zinc-100 shadow-lg w-full" startOnView={false}>
              <TypingAnimation>$ whoami</TypingAnimation>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Bishal Banerjee
              </AnimatedSpan>
              <AnimatedSpan className="opacity-50">Full-Stack Engineer & AI/ML Specialist</AnimatedSpan>

              <TypingAnimation delay={200}>$ cat contact.txt</TypingAnimation>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Email: bishal@bebishal.com
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Website: bebishal.com
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Phone: +91-9972801985
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Location: Vellore, India
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ cat summary.txt</TypingAnimation>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Engineer focused on building scalable AI-powered products
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Strong system design, production deployment, and ML optimization experience
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Shipped multiple live platforms, authored multi-modal AI research
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Optimized real-world inference pipelines
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ cat experience.txt</TypingAnimation>
              
              <AnimatedSpan className="mt-2 text-yellow-300">=== IMAI Studio — Backend & Full-Stack Engineer ===</AnimatedSpan>
              <AnimatedSpan className="opacity-75">Jan 2025 – Present</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Architected AI platform serving 10K+ DAUs with 99.9% uptime
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Reduced API latency by 50% via system and ML optimization
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Improved inference performance by 30% through model analysis
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Led CI/CD pipelines reducing deployment time from hours to minutes
              </AnimatedSpan>

              <AnimatedSpan className="mt-4 text-yellow-300">=== The House of RARE — Data Science Engineer (Trainee) ===</AnimatedSpan>
              <AnimatedSpan className="opacity-75">Jun 2024 – Dec 2024</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Built ETL pipelines and ML models for business forecasting
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Designed PowerBI dashboards enabling data-driven decisions
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Optimized SQL queries and data validation for 99.9% data integrity
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ cat projects.txt</TypingAnimation>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Forest Fire & Cyclone Detection — Vision Transformers on satellite imagery (92%+ accuracy)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Multi-Modal Stock Market Prediction — NLP + time-series ML with 15% uplift
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Outfit Recommendation System — GenAI-powered conversational recommender
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> IMAI Backend System — scalable AI infra with 30% inference optimization
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ cat skills.txt</TypingAnimation>
              <AnimatedSpan className="text-cyan-300">Languages:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Python, JavaScript, TypeScript, SQL
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">Frameworks:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Next.js, React, FastAPI, Flask
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">AI/ML:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> PyTorch, TensorFlow, Transformers, CV, NLP, Multi-modal
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">Infra:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> AWS, GCP Vertex AI, Azure ML, Cloudflare, Docker, CI/CD
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ cat education.txt</TypingAnimation>
              <AnimatedSpan>
                <span className="text-green-400">→</span> M.Tech CSE (AI & ML) — VIT Vellore (CGPA: 8.05)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> B.Tech Mechatronics — REVA University (CGPA: 8.4)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> B.S. Data Science — IIT Madras (CGPA: 7.95)
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ echo "Available commands: whoami, cat [contact|summary|experience|projects|skills|education].txt"</TypingAnimation>
              <AnimatedSpan className="text-blue-400">
                <span className="text-green-400">→</span> Available commands: whoami, cat [contact|summary|experience|projects|skills|education].txt
              </AnimatedSpan>

              <TypingAnimation delay={200}>$ </TypingAnimation>
              <AnimatedSpan className="inline-flex items-center gap-1">
                <span className="animate-pulse">█</span>
              </AnimatedSpan>
            </Terminal>
          </section>
      </main>

        <footer className="flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Bishal Banerjee. Built with care.</span>
          <span className="text-zinc-500">
            Designed for clarity, performance, and a bit of delight.
          </span>
        </footer>
      </div>
    </div>
  );
}
