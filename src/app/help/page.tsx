"use client"

import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal"
import LightPillar from "@/components/LightPillar"
import { ProgressiveBlur } from "@/components/ProgressiveBlur"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function HelpPage() {
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

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 md:py-20">
        <Link
          href="/"
          className="group mb-4 flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <Terminal className="border-white/30 bg-black/60 text-zinc-100 shadow-lg">
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
      </div>
    </div>
  )
}
