import Link from "next/link";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import {
  contactCards,
  currentFocus,
  experience,
  heroBadges,
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
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { HomeRouter } from "@/components/HomeRouter";

const toneClass: Record<string, string> = {
  paper: "tone-paper",
  yellow: "tone-yellow",
  mint: "tone-mint",
  blue: "tone-blue",
  pink: "tone-pink",
};

const statTone = ["tone-yellow", "tone-paper", "tone-mint", "tone-paper"];

export default function Home() {
  return (
    <HomeRouter>
    <div className="relative overflow-x-clip pb-16 text-foreground">
      {/* Decorative floating shapes */}
      <div className="pointer-events-none absolute -left-8 top-36 hidden h-24 w-24 rotate-[-8deg] rounded-[2rem] border border-[var(--outline)] bg-[var(--paper-strong)] opacity-90 shadow-[var(--neo-shadow-tight)] xl:block" />
      <div className="pointer-events-none absolute right-8 top-20 hidden h-[5.5rem] w-[5.5rem] rotate-[8deg] rounded-[1.75rem] border border-[var(--outline)] bg-[var(--accent-pink)] opacity-90 shadow-[var(--neo-shadow-tight)] xl:block" />
      <div className="pointer-events-none absolute bottom-16 right-4 hidden h-28 w-28 rounded-full border border-[rgba(77,130,255,0.24)] bg-[rgba(77,130,255,0.08)] shadow-[var(--neo-shadow-tight)] lg:block" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* ─── Header ─── */}
        <FadeIn>
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="portfolio-punch max-w-max px-5 py-3">
              <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Portfolio / Bishal Banerjee / 2026
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="portfolio-btn-neo text-[13px] font-medium text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <DesignLayerToggle />
              <ThemeToggle />
            </div>
          </header>
        </FadeIn>

        <main className="space-y-8">
          {/* ─── Hero + Sidebar ─── */}
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <FadeIn delay={0.1}>
              <article className="portfolio-sheet p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="portfolio-spec-label">Foundations</span>
                    <div className="portfolio-inset hidden items-center gap-3 px-4 py-3 sm:flex">
                      <span className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Focus ring
                      </span>
                      <div className="h-1.5 w-[4.5rem] rounded-full bg-[var(--outline)]">
                        <div className="ml-auto h-1.5 w-6 rounded-full bg-[var(--accent-blue)]" />
                      </div>
                    </div>
                  </div>

                  <div className="portfolio-spec-rule" />
                  <div className="portfolio-brutal-rule" />
                </div>

                <StaggerChildren stagger={0.06} delay={0.2} className="mt-6 flex flex-wrap items-center gap-3">
                  {heroBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <StaggerItem
                        key={badge.label}
                        className={
                          index === 0
                            ? "portfolio-annotation"
                            : "portfolio-control portfolio-control-pill px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground"
                        }
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {badge.label}
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>

                <FadeIn delay={0.3} y={16} className="mt-8 space-y-5">
                  <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {profile.currentRole}
                  </p>
                  <h1 className="display-font display-font-lg max-w-4xl text-4xl leading-[0.92] sm:text-5xl md:text-6xl xl:text-7xl">
                    Loud interfaces. Clean systems. AI-powered products that actually ship.
                  </h1>
                  <p className="max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg sm:leading-relaxed">
                    I build web experiences with a product engineer&apos;s discipline: strong
                    architecture, reliable delivery, and interface choices that feel deliberate
                    instead of generic.
                  </p>
                </FadeIn>

                <StaggerChildren stagger={0.08} delay={0.4} className="mt-8 flex flex-wrap gap-4">
                  <StaggerItem>
                    <a
                      href="mailto:bishal@bebishal.com?subject=Let%27s%20build%20something"
                      className="portfolio-btn-brutal text-[13px] font-semibold"
                    >
                      Let&apos;s build together
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </StaggerItem>
                  <StaggerItem>
                    <Link
                      href="/help"
                      className="portfolio-btn-neo text-[13px] font-medium text-foreground"
                    >
                      Full dossier
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </StaggerItem>
                  <StaggerItem>
                    <a
                      href="https://github.com/ZenderGoD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn-neo text-[13px] font-medium text-foreground"
                    >
                      View GitHub
                      <MoveRight className="h-4 w-4" />
                    </a>
                  </StaggerItem>
                </StaggerChildren>

                <StaggerChildren stagger={0.1} delay={0.15} className="mt-8 grid gap-4 md:grid-cols-3">
                  {currentFocus.map((item) => {
                    const Icon = item.icon;
                    return (
                      <StaggerItem key={item.label} className="portfolio-inset p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="portfolio-icon-box">
                              <Icon className="h-4 w-4" />
                            </div>
                            <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              {item.label}
                            </p>
                          </div>
                          <span className="portfolio-annotation">active</span>
                        </div>
                        <p className="mt-4 text-[13px] leading-relaxed text-foreground/80">
                          {item.value}
                        </p>
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>
              </article>
            </FadeIn>

            <div className="grid gap-6">
              <FadeIn delay={0.2}>
                <aside className="portfolio-neo p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="portfolio-spec-label">System status</span>
                      <h2 className="display-font mt-4 text-2xl leading-snug sm:text-3xl">
                        Product engineering with backend weight and visual taste.
                      </h2>
                    </div>
                    <div className="portfolio-annotation hidden sm:inline-flex">Open to work</div>
                  </div>

                  <div className="portfolio-inset mt-6 p-5">
                    <p className="text-[13px] leading-relaxed text-muted-foreground">{profile.availability}</p>
                    <div className="mt-4 grid gap-3 text-[13px] text-foreground">
                      <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                        <span className="mono-font shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Base
                        </span>
                        <span className="truncate text-right font-medium">{profile.location}</span>
                      </div>
                      <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                        <span className="mono-font shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Focus
                        </span>
                        <span className="truncate text-right font-medium">AI products, systems, and full-stack delivery</span>
                      </div>
                      <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                        <span className="mono-font shrink-0 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Style
                        </span>
                        <span className="truncate text-right font-medium">Bold UI direction and pragmatic engineering</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="portfolio-control portfolio-control-pill justify-center px-4 py-3">
                      <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Raised
                      </p>
                    </div>
                    <div className="portfolio-inset px-4 py-3 text-center">
                      <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Inset
                      </p>
                    </div>
                    <div className="portfolio-control portfolio-control-pill justify-center px-4 py-3">
                      <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Focused
                      </p>
                    </div>
                  </div>
                </aside>
              </FadeIn>

              <StaggerChildren stagger={0.1} delay={0.1} className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                {highlights.map((item, index) => (
                  <StaggerItem
                    key={item.title}
                    className={`portfolio-brutal p-5 ${toneClass[item.tone] ?? "tone-paper"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="portfolio-spec-label">Mode 0{index + 1}</span>
                      <div
                        className={`h-3 w-3 rounded-full ${
                          item.tone === "yellow"
                            ? "bg-[var(--accent-orange)]"
                            : item.tone === "mint"
                              ? "bg-[rgba(95,142,112,0.68)]"
                              : "bg-[var(--accent-blue)]"
                        }`}
                      />
                    </div>
                    <h3 className="display-font mt-4 text-xl leading-snug sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-foreground/75">
                      {item.description}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </section>

          {/* ─── Stats ─── */}
          <StaggerChildren stagger={0.08} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <StaggerItem
                key={item.label}
                className={`portfolio-brutal p-5 ${statTone[index] ?? "tone-paper"}`}
              >
                <span className="portfolio-spec-label">Level 0{index + 1}</span>
                <AnimatedCounter
                  value={item.value}
                  className="display-font display-font-lg mt-5 block text-4xl leading-none sm:text-5xl"
                />
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.1em] text-foreground/80">
                  {item.label}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{item.note}</p>
              </StaggerItem>
            ))}
          </StaggerChildren>

          {/* ─── Projects + Principles ─── */}
          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <FadeIn>
              <article className="portfolio-sheet p-6 sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="portfolio-spec-label">Data display</span>
                    <h2 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">
                      Projects that mix product thinking with serious technical depth.
                    </h2>
                  </div>
                  <Link href="/help" className="text-[13px] font-medium underline decoration-1 underline-offset-4 opacity-70 hover:opacity-100">
                    See the full profile
                  </Link>
                </div>

                <StaggerChildren stagger={0.1} delay={0.15} className="mt-6 grid gap-4 md:grid-cols-2">
                  {projects.map((project, index) => {
                    const Icon = project.icon;
                    const cardClass =
                      index % 2 === 0
                        ? "portfolio-brutal"
                        : "portfolio-neo";

                    return (
                      <StaggerItem
                        key={project.title}
                        className={`${cardClass} p-5 ${toneClass[project.tone] ?? "tone-paper"}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="portfolio-spec-label">{project.tag}</span>
                          <div className="portfolio-icon-box">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                        <h3 className="display-font mt-4 text-xl leading-snug sm:text-2xl">{project.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-foreground/75">
                          {project.summary}
                        </p>
                        <p className="mt-3 text-[12px] font-medium text-muted-foreground">
                          {project.result}
                        </p>
                      </StaggerItem>
                    );
                  })}
                </StaggerChildren>
              </article>
            </FadeIn>

            <FadeIn delay={0.15}>
              <article className="portfolio-neo p-6 sm:p-8">
                <span className="portfolio-spec-label">Controls</span>
                <h2 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">
                  The way I like to work is loud on taste and strict on execution.
                </h2>

                <div className="portfolio-inset mt-6 p-5">
                  <ul className="space-y-3.5 text-[13px] leading-relaxed text-foreground/80">
                    {principles.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="portfolio-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <span className="portfolio-spec-label">Toolbox</span>
                  <StaggerChildren stagger={0.03} delay={0.1} className="mt-4 flex flex-wrap gap-2.5">
                    {toolbox.map((item) => (
                      <StaggerItem
                        key={item}
                        className="portfolio-btn-neo portfolio-btn-neo-sm font-medium text-foreground/85"
                      >
                        {item}
                      </StaggerItem>
                    ))}
                  </StaggerChildren>
                </div>
              </article>
            </FadeIn>
          </section>

          {/* ─── Experience + CTA ─── */}
          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <FadeIn>
              <article className="portfolio-brutal bg-[var(--paper-strong)] p-6 sm:p-8">
                <span className="portfolio-spec-label">Timeline</span>
                <h2 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">
                  Built across AI platforms, data products, and production delivery.
                </h2>

                <div className="mt-6 space-y-4">
                  {experience.map((item) => (
                    <article key={item.company} className="portfolio-inset p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="display-font text-xl leading-snug sm:text-2xl">{item.company}</p>
                          <p className="mt-1 text-[13px] font-medium text-foreground/80">
                            {item.role}
                          </p>
                        </div>
                        <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          {item.period}
                        </p>
                      </div>
                      <ul className="mt-4 space-y-2.5 text-[13px] leading-relaxed text-foreground/80">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="portfolio-bullet" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </article>
            </FadeIn>

            <div className="grid gap-6">
              <FadeIn delay={0.1}>
                <section className="portfolio-brutal tone-yellow p-6 sm:p-8">
                  <span className="portfolio-spec-label">Feedback</span>
                  <h2 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">
                    Ready to build something that feels sharp, fast, and memorable?
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-foreground/75">
                    If the work needs backend rigor, product sense, and a frontend that does not look like
                    everyone else&apos;s, I&apos;m interested.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-[13px] font-semibold">
                      Say hello
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/bishal-banerjee-4742a8190/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-btn-neo text-[13px] font-medium"
                    >
                      Connect on LinkedIn
                      <MoveRight className="h-4 w-4" />
                    </a>
                  </div>
                </section>
              </FadeIn>

              <FadeIn delay={0.2}>
                <section id="contact" className="portfolio-neo p-6 sm:p-8">
                  <span className="portfolio-spec-label">Contact details</span>
                  <StaggerChildren stagger={0.08} delay={0.1} className="mt-5 grid gap-4 sm:grid-cols-2">
                    {contactCards.map((card) => {
                      const Icon = card.icon;
                      const isDisabled = card.href === "#";

                      return isDisabled ? (
                        <StaggerItem key={card.label} className="portfolio-inset p-5">
                          <div className="flex items-center gap-3">
                            <div className="portfolio-icon-box">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                                {card.label}
                              </p>
                              <p className="mt-1.5 text-[13px] font-medium text-foreground">
                                {card.value}
                              </p>
                            </div>
                          </div>
                        </StaggerItem>
                      ) : (
                        <StaggerItem key={card.label}>
                          <a href={card.href} className="portfolio-inset block p-5">
                            <div className="flex items-center gap-3">
                              <div className="portfolio-icon-box">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                                  {card.label}
                                </p>
                                <p className="mt-1.5 text-[13px] font-medium text-foreground">
                                  {card.value}
                                </p>
                              </div>
                            </div>
                          </a>
                        </StaggerItem>
                      );
                    })}
                  </StaggerChildren>
                </section>
              </FadeIn>
            </div>
          </section>
        </main>

        <FadeIn>
          <footer className="portfolio-brutal mt-2 bg-[var(--paper-strong)] px-6 py-5 text-[13px] leading-relaxed text-muted-foreground sm:flex sm:items-center sm:justify-between">
            <span>Copyright {new Date().getFullYear()} Bishal Banerjee.</span>
            <span className="mt-1 block sm:mt-0">Neobrutal edges, neoneu depth, and a clear engineering signal.</span>
          </footer>
        </FadeIn>
      </div>
    </div>
    </HomeRouter>
  );
}
