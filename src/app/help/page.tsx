import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MoveRight } from "lucide-react";
import { HelpRouter } from "@/components/HelpRouter";
import {
  contactCards,
  education,
  experience,
  profile,
  projects,
  skillsGroups,
} from "@/lib/portfolioData";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const toneClass: Record<string, string> = {
  paper: "tone-paper",
  yellow: "tone-yellow",
  mint: "tone-mint",
  blue: "tone-blue",
  pink: "tone-pink",
};

export default function HelpPage() {
  return (
    <HelpRouter>
    <div className="relative overflow-x-clip py-8 text-foreground sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="portfolio-btn-neo max-w-max text-[13px] font-medium">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="portfolio-punch max-w-max px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground">
              Full dossier
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="portfolio-brutal tone-paper p-6 sm:p-8 lg:p-10">
            <span className="portfolio-spec-label">Overview</span>
            <p className="mono-font mt-5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {profile.name} / {profile.role}
            </p>
            <h1 className="display-font display-font-lg mt-4 max-w-4xl text-4xl leading-[0.92] sm:text-5xl md:text-6xl">
              The full profile behind the portfolio.
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg sm:leading-relaxed">
              Engineer focused on scalable AI-powered products, strong system design, production
              deployment, and interfaces that feel intentional.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-[13px] font-semibold">
                Email Bishal
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/ZenderGoD"
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-btn-neo text-[13px] font-medium"
              >
                GitHub
                <MoveRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </FadeIn>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <FadeIn>
            <article className="portfolio-neo p-6 sm:p-8">
              <span className="portfolio-spec-label">Contact</span>
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
            </article>
          </FadeIn>

          <FadeIn delay={0.1}>
            <article className="portfolio-sheet p-6 sm:p-8">
              <span className="portfolio-spec-label">Snapshot</span>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="portfolio-inset p-5">
                  <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Current role
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
                    Backend and full-stack engineer building AI infrastructure and product flows at
                    IMAI Studio.
                  </p>
                </div>
                <div className="portfolio-inset p-5">
                  <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Core strengths
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
                    System design, ML optimization, production deployment, and UX-aware engineering.
                  </p>
                </div>
                <div className="portfolio-inset p-5 sm:col-span-2">
                  <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Summary
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/80">
                    Built live platforms, authored multi-modal AI research, optimized real-world
                    inference pipelines, and shipped product work that balances polish with reliability.
                  </p>
                </div>
              </div>
            </article>
          </FadeIn>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <article className="portfolio-brutal tone-paper p-6 sm:p-8">
              <span className="portfolio-spec-label">Experience</span>
              <div className="mt-6 space-y-4">
                {experience.map((item) => (
                  <article key={item.company} className="portfolio-inset p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h2 className="display-font text-xl leading-snug sm:text-2xl">{item.company}</h2>
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

          <FadeIn delay={0.1}>
            <article className="portfolio-neo p-6 sm:p-8">
              <span className="portfolio-spec-label">Education</span>
              <StaggerChildren stagger={0.1} delay={0.1} className="mt-6 grid gap-4">
                {education.map((item) => (
                  <StaggerItem key={item.degree} className="portfolio-inset p-5">
                    <p className="display-font text-xl leading-snug sm:text-2xl">{item.degree}</p>
                    <p className="mt-1.5 text-[13px] font-medium text-foreground/80">{item.school}</p>
                    <p className="mt-1 text-[12px] text-muted-foreground">{item.details}</p>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </article>
          </FadeIn>
        </section>

        <FadeIn>
          <section className="portfolio-sheet p-6 sm:p-8">
            <span className="portfolio-spec-label">Selected projects</span>
            <StaggerChildren stagger={0.1} delay={0.15} className="mt-6 grid gap-4 md:grid-cols-2">
              {projects.map((project, index) => {
                const Icon = project.icon;
                const cardClass =
                  index % 2 === 0 ? "portfolio-brutal" : "portfolio-neo";

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
                    <h2 className="display-font mt-4 text-xl leading-snug sm:text-2xl">{project.title}</h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-foreground/75">{project.summary}</p>
                    <p className="mt-3 text-[12px] font-medium text-muted-foreground">{project.result}</p>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </section>
        </FadeIn>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <FadeIn>
            <article className="portfolio-sheet p-6 sm:p-8">
              <span className="portfolio-spec-label">Skills</span>
              <div className="mt-6 grid gap-4">
                {skillsGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <article key={group.title} className="portfolio-inset p-5">
                      <div className="flex items-center gap-3">
                        <div className="portfolio-icon-box">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="display-font text-xl leading-snug sm:text-2xl">{group.title}</p>
                      </div>
                      <StaggerChildren stagger={0.03} delay={0.05} className="mt-4 flex flex-wrap gap-2.5">
                        {group.items.map((item) => (
                          <StaggerItem key={item} className="portfolio-btn-neo portfolio-btn-neo-sm font-medium">
                            {item}
                          </StaggerItem>
                        ))}
                      </StaggerChildren>
                    </article>
                  );
                })}
              </div>
            </article>
          </FadeIn>

          <FadeIn delay={0.1}>
            <article className="portfolio-brutal tone-yellow p-6 sm:p-8">
              <span className="portfolio-spec-label">Work with me</span>
              <h2 className="display-font mt-4 text-3xl leading-snug sm:text-4xl">
                Looking for a builder who can move from model behavior to product polish?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-foreground/75">
                I&apos;m especially interested in product teams that want strong engineering judgment,
                clearer systems, and a visual point of view that does not flatten into templates.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-[13px] font-semibold">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link href="/" className="portfolio-btn-neo text-[13px] font-medium">
                  Back to portfolio
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </FadeIn>
        </section>
      </div>
    </div>
    </HelpRouter>
  );
}
