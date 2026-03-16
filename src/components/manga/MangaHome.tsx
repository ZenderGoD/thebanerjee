"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import {
  contactCards,
  currentFocus,
  experience,
  highlights,
  principles,
  profile,
  projects,
  socialLinks,
  stats,
  toolbox,
} from "@/lib/portfolioData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DesignLayerToggle } from "@/components/DesignLayerToggle";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function MangaHome() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ─── Header strip ─── */}
      <FadeIn>
        <div className="manga-panel p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="manga-chapter">Ch. 01</span>
              <h1 className="manga-title text-xl sm:text-2xl lg:text-3xl">{profile.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <DesignLayerToggle />
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="manga-panel manga-panel-thin px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                >
                  <Icon className="mr-1 inline h-3 w-3" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </FadeIn>

      <div className="manga-gutter mt-2 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr]">
        {/* ─── Hero panel ─── */}
        <FadeIn delay={0.1}>
          <div className="manga-panel manga-speed-lines relative p-6 sm:p-8 lg:p-10">
            {/* SFX watermark */}
            <span className="manga-sfx absolute right-4 top-4 text-[5rem] sm:text-[8rem] lg:text-[10rem]" aria-hidden>
              BUILD!
            </span>

            <div className="relative z-10">
              <div className="manga-narration mb-6 inline-block text-[11px]">
                {profile.currentRole}
              </div>

              <h2 className="manga-title max-w-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Loud interfaces. Clean systems. AI&#8209;powered products that actually ship.
              </h2>

              <div className="manga-bubble mt-8 max-w-2xl">
                <p className="manga-body">
                  I build web experiences with a product engineer&apos;s discipline: strong
                  architecture, reliable delivery, and interface choices that feel deliberate
                  instead of generic.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="mailto:bishal@bebishal.com?subject=Let%27s%20build%20something"
                  className="manga-burst text-[11px]"
                >
                  Let&apos;s build together!!
                </a>
                <Link
                  href="/help"
                  className="manga-panel manga-panel-thin px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                >
                  Full dossier <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Sidebar panels ─── */}
        <div className="manga-gutter grid">
          <FadeIn delay={0.15}>
            <div className="manga-panel manga-halftone relative p-5">
              <span className="manga-chapter mb-3">Status</span>
              <p className="manga-title mt-3 text-xl sm:text-2xl">
                Product eng with backend weight &amp; visual taste.
              </p>

              <Separator className="my-4 border-[#111] dark:border-[#d4d0c8]" />

              <div className="space-y-2.5 text-[12px]">
                {currentFocus.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex gap-2.5">
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-50" />
                      <div>
                        <span className="font-bold uppercase tracking-wide">{item.label}</span>
                        <span className="ml-1.5 opacity-70">{item.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="manga-narration mt-4 text-[11px]">
                {profile.availability}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="manga-panel p-5">
              <span className="manga-chapter mb-3">Highlights</span>
              <div className="mt-3 space-y-3">
                {highlights.map((h, i) => (
                  <div key={h.title}>
                    <p className="text-[13px] font-bold uppercase tracking-wide">{`0${i + 1}. ${h.title}`}</p>
                    <p className="manga-body mt-0.5">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ─── Stats strip ─── */}
      <FadeIn>
        <div className="manga-gutter mt-2 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="manga-panel manga-speed-lines relative p-4 text-center">
              <span className="manga-sfx absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem]" aria-hidden>
                {["POW!", "WHAM!", "ZOOM!", "BANG!"][i]}
              </span>
              <div className="relative z-10">
                <p className="manga-title text-3xl sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="mt-1 text-[11px] opacity-50">{stat.note}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ─── Projects tabs ─── */}
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
        {/* ─── Principles + Toolbox ─── */}
        <FadeIn>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">How I work</span>

            <StaggerChildren stagger={0.06} delay={0.1} className="mt-4 space-y-3">
              {principles.map((p, i) => (
                <StaggerItem key={p} className="flex items-start gap-3">
                  <span className="manga-panel flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-black">
                    {i + 1}
                  </span>
                  <p className="manga-body">{p}</p>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <Separator className="my-5 border-[#111] dark:border-[#d4d0c8]" />

            <span className="manga-chapter">Toolbox</span>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {toolbox.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="rounded-none border-2 border-[#111] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide dark:border-[#d4d0c8]"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ─── Experience ─── */}
        <FadeIn delay={0.1}>
          <div className="manga-panel p-5 sm:p-6">
            <span className="manga-chapter">Experience</span>

            <div className="mt-4 space-y-0">
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
      </div>

      {/* ─── CTA + Contact ─── */}
      <div className="manga-gutter mt-2 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
        <FadeIn>
          <div className="manga-panel manga-speed-lines relative p-6 sm:p-8">
            <span className="manga-sfx absolute right-4 top-2 text-[6rem]" aria-hidden>GO!!</span>
            <div className="relative z-10">
              <span className="manga-chapter">Next arc</span>
              <h2 className="manga-title mt-4 text-3xl sm:text-4xl">
                Ready to build something that feels sharp, fast, and memorable?
              </h2>
              <div className="manga-bubble mt-5 max-w-lg">
                <p className="manga-body">
                  If the work needs backend rigor, product sense, and a frontend that does not
                  look like everyone else&apos;s, I&apos;m interested.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}`} className="manga-burst text-[11px]">
                  Say hello!! <ArrowUpRight className="ml-1 inline h-3 w-3" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bishal-banerjee-4742a8190/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="manga-panel manga-panel-thin px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                >
                  LinkedIn <MoveRight className="ml-1 inline h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
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
      </div>

      {/* ─── Footer ─── */}
      <FadeIn>
        <div className="manga-panel mt-2 flex flex-col items-center justify-between gap-2 p-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] opacity-50">Copyright {new Date().getFullYear()} Bishal Banerjee.</p>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-30">To be continued...</p>
        </div>
      </FadeIn>
    </div>
  );
}
