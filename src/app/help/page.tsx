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

export default function HelpPage() {
  return (
    <div className="relative overflow-hidden py-8 text-[var(--foreground)] sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="portfolio-btn-neo max-w-max text-sm font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="portfolio-punch max-w-max px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]">
            Full dossier
          </div>
        </div>

        <section
          className="portfolio-brutal p-6 sm:p-8 lg:p-10"
          style={{ background: "linear-gradient(145deg, #f8f5ef, #ece7df)" }}
        >
          <span className="portfolio-spec-label">Overview</span>
          <p className="mono-font mt-5 text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
            {profile.name} / {profile.role}
          </p>
          <h1 className="display-font mt-4 max-w-4xl text-5xl leading-[0.92] sm:text-6xl">
            The full profile behind the portfolio.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            Engineer focused on scalable AI-powered products, strong system design, production
            deployment, and interfaces that feel intentional.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-sm font-semibold">
              Email Bishal
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/ZenderGoD"
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-btn-neo text-sm font-semibold"
            >
              GitHub
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="portfolio-neo p-6 sm:p-8">
            <span className="portfolio-spec-label">Contact</span>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => {
                const Icon = card.icon;
                const isDisabled = card.href === "#";

                return isDisabled ? (
                  <div key={card.label} className="portfolio-inset p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-[var(--outline)] bg-[rgba(248,245,239,0.8)] p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="mono-font text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                          {card.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a key={card.label} href={card.href} className="portfolio-inset p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-[var(--outline)] bg-[rgba(248,245,239,0.8)] p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="mono-font text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                          {card.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                          {card.value}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </article>

          <article className="portfolio-sheet p-6 sm:p-8">
            <span className="portfolio-spec-label">Snapshot</span>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="portfolio-inset p-5">
                <p className="mono-font text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Current role
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  Backend and full-stack engineer building AI infrastructure and product flows at
                  IMAI Studio.
                </p>
              </div>
              <div className="portfolio-inset p-5">
                <p className="mono-font text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Core strengths
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  System design, ML optimization, production deployment, and UX-aware engineering.
                </p>
              </div>
              <div className="portfolio-inset p-5 sm:col-span-2">
                <p className="mono-font text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                  Summary
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                  Built live platforms, authored multi-modal AI research, optimized real-world
                  inference pipelines, and shipped product work that balances polish with reliability.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article
            className="portfolio-brutal p-6 sm:p-8"
            style={{ background: "linear-gradient(145deg, #f8f5ef, #ece7df)" }}
          >
            <span className="portfolio-spec-label">Experience</span>
            <div className="mt-6 space-y-4">
              {experience.map((item) => (
                <article key={item.company} className="portfolio-inset p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="display-font text-2xl leading-tight">{item.company}</h2>
                      <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                        {item.role}
                      </p>
                    </div>
                    <p className="mono-font text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                      {item.period}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--foreground)]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent-blue)] shadow-[0_0_0_4px_rgba(77,130,255,0.12)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>

          <article className="portfolio-neo p-6 sm:p-8">
            <span className="portfolio-spec-label">Education</span>
            <div className="mt-6 grid gap-4">
              {education.map((item) => (
                <article key={item.degree} className="portfolio-inset p-5">
                  <p className="display-font text-2xl leading-tight">{item.degree}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.school}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.details}</p>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="portfolio-sheet p-6 sm:p-8">
          <span className="portfolio-spec-label">Selected projects</span>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const cardClass =
                index % 2 === 0 ? "portfolio-brutal" : "portfolio-neo";

              return (
                <article
                  key={project.title}
                  className={`${cardClass} p-5`}
                  style={{
                    background:
                      project.tone === "blue"
                        ? "linear-gradient(145deg, #dde6ff, #f0f4ff)"
                        : project.tone === "pink"
                          ? "linear-gradient(145deg, #f2e1e7, #f8edf0)"
                          : project.tone === "mint"
                            ? "linear-gradient(145deg, #dcebd7, #edf6eb)"
                            : "linear-gradient(145deg, #f8f5ef, #ece7df)",
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="portfolio-spec-label">{project.tag}</span>
                    <div className="rounded-2xl border border-[var(--outline)] bg-[rgba(248,245,239,0.8)] p-2">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h2 className="display-font mt-4 text-2xl leading-tight">{project.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{project.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-[var(--muted)]">{project.result}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <article className="portfolio-sheet p-6 sm:p-8">
            <span className="portfolio-spec-label">Skills</span>
            <div className="mt-6 grid gap-4">
              {skillsGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article key={group.title} className="portfolio-inset p-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-[var(--outline)] bg-[rgba(248,245,239,0.8)] p-2">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="display-font text-2xl leading-tight">{group.title}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {group.items.map((item) => (
                        <span key={item} className="portfolio-btn-neo px-4 py-2 text-sm font-semibold">
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </article>

          <article
            className="portfolio-brutal p-6 sm:p-8"
            style={{ background: "linear-gradient(145deg, #f4e3a6, #fbf1cc)" }}
          >
            <span className="portfolio-spec-label">Work with me</span>
            <h2 className="display-font mt-4 text-4xl leading-tight">
              Looking for a builder who can move from model behavior to product polish?
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--foreground)]">
              I&apos;m especially interested in product teams that want strong engineering judgment,
              clearer systems, and a visual point of view that does not flatten into templates.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-sm font-semibold">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/" className="portfolio-btn-neo text-sm font-semibold">
                Back to portfolio
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
