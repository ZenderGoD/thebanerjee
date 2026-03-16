"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MoveRight } from "lucide-react";
import {
  contactCards,
  education,
  experience,
  profile,
  projects,
  skillsGroups,
} from "@/lib/portfolioData";
import { FadeIn } from "@/components/motion/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MangaDossier() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeIn>
        <div className="manga-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-4">
            <span className="manga-chapter">Ch. 02</span>
            <h1 className="manga-title text-2xl sm:text-3xl">Full Dossier</h1>
          </div>
          <Link
            href="/"
            className="manga-panel manga-panel-thin max-w-max px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="mr-1.5 inline h-3.5 w-3.5" />
            Back to home
          </Link>
        </div>
      </FadeIn>

      {/* Overview */}
      <FadeIn delay={0.1}>
        <div className="manga-panel manga-speed-lines relative mt-2 p-6 sm:p-8 lg:p-10">
          <span className="manga-sfx absolute right-4 top-4 text-[6rem] sm:text-[9rem]" aria-hidden>
            WHO?!
          </span>
          <div className="relative z-10">
            <div className="manga-narration mb-5 inline-block text-[11px]">
              {profile.name} / {profile.role}
            </div>
            <h2 className="manga-title max-w-3xl text-4xl sm:text-5xl md:text-6xl">
              The full profile behind the portfolio.
            </h2>
            <div className="manga-bubble mt-6 max-w-2xl">
              <p className="manga-body">
                Engineer focused on scalable AI-powered products, strong system design, production
                deployment, and interfaces that feel intentional.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="manga-burst text-[11px]">
                Email Bishal <ArrowUpRight className="ml-1 inline h-3 w-3" />
              </a>
              <a
                href="https://github.com/ZenderGoD"
                target="_blank"
                rel="noopener noreferrer"
                className="manga-panel manga-panel-thin px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              >
                GitHub <MoveRight className="ml-1 inline h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="manga-gutter mt-2 grid grid-cols-1 lg:grid-cols-2">
        {/* Contact */}
        <FadeIn>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">Contact</span>
            <div className="mt-4 space-y-3">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const isLink = card.href !== "#";
                const Wrapper = isLink ? "a" : "div";
                return (
                  <Wrapper
                    key={card.label}
                    {...(isLink ? { href: card.href } : {})}
                    className="flex items-center gap-3 border-b-2 border-[#111] pb-3 last:border-0 dark:border-[#d4d0c8]"
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-50" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">{card.label}</p>
                      <p className="text-[13px] font-medium">{card.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Snapshot */}
        <FadeIn delay={0.1}>
          <div className="manga-panel manga-halftone relative p-5 sm:p-6">
            <span className="manga-chapter">Snapshot</span>
            <div className="relative z-10 mt-4 space-y-3">
              {[
                { label: "Current role", text: "Backend and full-stack engineer building AI infrastructure and product flows at IMAI Studio." },
                { label: "Core strengths", text: "System design, ML optimization, production deployment, and UX-aware engineering." },
                { label: "Summary", text: "Built live platforms, authored multi-modal AI research, optimized real-world inference pipelines, and shipped product work that balances polish with reliability." },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">{s.label}</p>
                  <p className="manga-body mt-0.5">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="manga-gutter mt-2 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Experience */}
        <FadeIn>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">Experience</span>
            <div className="mt-4">
              {experience.map((exp, i) => (
                <div key={exp.company}>
                  {i > 0 && <Separator className="my-4 border-[#111] dark:border-[#d4d0c8]" />}
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <p className="manga-title text-lg">{exp.company}</p>
                      <p className="text-[12px] font-medium opacity-70">{exp.role}</p>
                    </div>
                    <p className="mono-font text-[10px] uppercase tracking-[0.16em] opacity-50">{exp.period}</p>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {exp.bullets.map((b) => (
                      <li key={b} className="manga-body flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-current opacity-40" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Education */}
        <FadeIn delay={0.1}>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">Education</span>
            <div className="mt-4">
              {education.map((ed, i) => (
                <div key={ed.degree}>
                  {i > 0 && <Separator className="my-3 border-[#111] dark:border-[#d4d0c8]" />}
                  <p className="manga-title text-lg">{ed.degree}</p>
                  <p className="text-[12px] font-medium opacity-70">{ed.school}</p>
                  <p className="text-[11px] opacity-40">{ed.details}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Projects */}
      <FadeIn>
        <div className="manga-panel mt-2 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="manga-chapter">Projects</span>
            <Separator className="flex-1 border-[#111] dark:border-[#d4d0c8]" />
          </div>

          <Tabs defaultValue={projects[0].title} className="mt-4">
            <TabsList className="h-auto flex-wrap gap-1 rounded-none border-2 border-[#111] bg-transparent p-1 dark:border-[#d4d0c8]">
              {projects.map((p) => (
                <TabsTrigger
                  key={p.title}
                  value={p.title}
                  className="rounded-none border-2 border-transparent px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide data-[state=active]:border-[#111] data-[state=active]:bg-[#111] data-[state=active]:text-white dark:data-[state=active]:border-[#d4d0c8] dark:data-[state=active]:bg-[#d4d0c8] dark:data-[state=active]:text-[#111]"
                >
                  {p.tag}
                </TabsTrigger>
              ))}
            </TabsList>
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <TabsContent key={project.title} value={project.title} className="mt-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <div className="manga-panel manga-halftone relative flex h-24 w-24 shrink-0 items-center justify-center sm:h-32 sm:w-32">
                      <Icon className="h-10 w-10 sm:h-12 sm:w-12" />
                    </div>
                    <div className="flex-1">
                      <h3 className="manga-title text-2xl sm:text-3xl">{project.title}</h3>
                      <div className="manga-bubble mt-3">
                        <p className="manga-body">{project.summary}</p>
                      </div>
                      <p className="mt-3 text-[12px] font-bold uppercase tracking-wide opacity-60">
                        {project.result}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </FadeIn>

      <div className="manga-gutter mt-2 grid grid-cols-1 lg:grid-cols-2">
        {/* Skills */}
        <FadeIn>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">Skills</span>
            <div className="mt-4 space-y-4">
              {skillsGroups.map((group, i) => {
                const Icon = group.icon;
                return (
                  <div key={group.title}>
                    {i > 0 && <Separator className="mb-4 border-[#111] dark:border-[#d4d0c8]" />}
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 opacity-50" />
                      <p className="text-[13px] font-bold uppercase tracking-wide">{group.title}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="rounded-none border-2 border-[#111] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide dark:border-[#d4d0c8]"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.1}>
          <div className="manga-panel manga-speed-lines relative p-6 sm:p-8">
            <span className="manga-sfx absolute right-2 top-2 text-[5rem]" aria-hidden>JOIN!</span>
            <div className="relative z-10">
              <span className="manga-chapter">Work with me</span>
              <h2 className="manga-title mt-4 text-2xl sm:text-3xl">
                Looking for a builder who can move from model behavior to product polish?
              </h2>
              <div className="manga-bubble mt-4">
                <p className="manga-body">
                  I&apos;m especially interested in product teams that want strong engineering judgment,
                  clearer systems, and a visual point of view that does not flatten into templates.
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="manga-burst text-[11px]">
                  Start a conversation!!
                </a>
                <Link
                  href="/"
                  className="manga-panel manga-panel-thin px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                >
                  <ArrowLeft className="mr-1 inline h-3.5 w-3.5" /> Portfolio
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="manga-panel mt-2 flex items-center justify-between p-4">
          <p className="text-[11px] opacity-50">Copyright {new Date().getFullYear()} Bishal Banerjee.</p>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-30">End of Chapter 02</p>
        </div>
      </FadeIn>
    </div>
  );
}
