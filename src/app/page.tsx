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

export default function Home() {
  return (
    <div className="relative overflow-hidden pb-16 text-[var(--foreground)]">
      <div className="pointer-events-none absolute -left-8 top-36 hidden h-24 w-24 rotate-[-8deg] rounded-[2rem] border border-[var(--outline)] bg-[rgba(248,245,239,0.92)] shadow-[16px_16px_28px_rgba(168,162,151,0.34),_-12px_-12px_22px_rgba(255,255,255,0.9)] xl:block" />
      <div className="pointer-events-none absolute right-8 top-20 hidden h-[5.5rem] w-[5.5rem] rotate-[8deg] rounded-[1.75rem] border border-[var(--outline)] bg-[rgba(232,216,221,0.94)] shadow-[14px_14px_28px_rgba(168,162,151,0.34),_-12px_-12px_22px_rgba(255,255,255,0.92)] xl:block" />
      <div className="pointer-events-none absolute bottom-16 right-4 hidden h-28 w-28 rounded-full border border-[rgba(77,130,255,0.24)] bg-[rgba(77,130,255,0.08)] shadow-[14px_14px_28px_rgba(168,162,151,0.28),_-12px_-12px_22px_rgba(255,255,255,0.88)] lg:block" />

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="portfolio-reveal flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="portfolio-punch max-w-max px-5 py-3">
            <p className="mono-font text-xs uppercase tracking-[0.35em] text-[var(--muted)]">
              Portfolio / Bishal Banerjee / 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="portfolio-btn-neo text-sm font-semibold text-[var(--foreground)]"
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </header>

        <main className="space-y-8">
          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <article className="portfolio-sheet portfolio-reveal p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="portfolio-spec-label">Foundations</span>
                  <div className="portfolio-inset hidden items-center gap-3 px-4 py-3 sm:flex">
                    <span className="mono-font text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                      Focus ring
                    </span>
                    <div className="h-1.5 w-[4.5rem] rounded-full bg-[rgba(37,36,32,0.09)]">
                      <div className="ml-auto h-1.5 w-6 rounded-full bg-[var(--accent-blue)]" />
                    </div>
                  </div>
                </div>

                <div className="portfolio-spec-rule" />
                <div className="portfolio-brutal-rule" />
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {heroBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <span
                      key={badge.label}
                      className={`${
                        index === 0 ? "portfolio-annotation" : "portfolio-control px-4 py-3"
                      } text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {badge.label}
                    </span>
                  );
                })}
              </div>

              <div className="mt-8 space-y-6">
                <p className="mono-font text-xs uppercase tracking-[0.34em] text-[var(--muted)]">
                  {profile.currentRole}
                </p>
                <h1 className="display-font max-w-4xl text-5xl leading-[0.92] sm:text-6xl xl:text-7xl">
                  Loud interfaces. Clean systems. AI-powered products that actually ship.
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                  I build web experiences with a product engineer&apos;s discipline: strong
                  architecture, reliable delivery, and interface choices that feel deliberate
                  instead of generic.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:bishal@bebishal.com?subject=Let%27s%20build%20something"
                  className="portfolio-btn-brutal text-sm font-semibold"
                >
                  Let&apos;s build together
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="/help"
                  className="portfolio-btn-neo text-sm font-semibold text-[var(--foreground)]"
                >
                  Full dossier
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="https://github.com/ZenderGoD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-btn-neo text-sm font-semibold text-[var(--foreground)]"
                >
                  View GitHub
                  <MoveRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {currentFocus.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="portfolio-inset p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl border border-[var(--outline)] bg-[rgba(248,245,239,0.8)] p-2">
                            <Icon className="h-4 w-4" />
                          </div>
                          <p className="mono-font text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                            {item.label}
                          </p>
                        </div>
                        <span className="portfolio-annotation">active</span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>

            <div className="grid gap-6">
              <aside
                className="portfolio-neo portfolio-reveal p-6 sm:p-7"
                style={{ animationDelay: "120ms" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="portfolio-spec-label">System status</span>
                    <h2 className="display-font mt-4 text-3xl leading-tight">
                      Product engineering with backend weight and visual taste.
                    </h2>
                  </div>
                  <div className="portfolio-annotation hidden sm:inline-flex">Open to work</div>
                </div>

                <div className="portfolio-inset mt-6 p-5">
                  <p className="text-sm leading-7 text-[var(--muted)]">{profile.availability}</p>
                  <div className="mt-4 grid gap-3 text-sm text-[var(--foreground)]">
                    <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                      <span className="mono-font uppercase tracking-[0.2em] text-[var(--muted)]">
                        Base
                      </span>
                      <span>{profile.location}</span>
                    </div>
                    <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                      <span className="mono-font uppercase tracking-[0.2em] text-[var(--muted)]">
                        Focus
                      </span>
                      <span>AI products, systems, and full-stack delivery</span>
                    </div>
                    <div className="portfolio-control flex items-center justify-between gap-3 px-4 py-3">
                      <span className="mono-font uppercase tracking-[0.2em] text-[var(--muted)]">
                        Style
                      </span>
                      <span>Bold UI direction and pragmatic engineering</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="portfolio-control px-4 py-3 text-center">
                    <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      Raised
                    </p>
                  </div>
                  <div className="portfolio-inset px-4 py-3 text-center">
                    <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      Inset
                    </p>
                  </div>
                  <div className="portfolio-control px-4 py-3 text-center">
                    <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
                      Focused
                    </p>
                  </div>
                </div>
              </aside>

              <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
                {highlights.map((item, index) => (
                  <article
                    key={item.title}
                    className="portfolio-brutal portfolio-reveal p-5"
                    style={{
                      animationDelay: `${220 + index * 90}ms`,
                      background:
                        item.tone === "yellow"
                          ? "linear-gradient(145deg, #f4e3a6, #fbf1cc)"
                          : item.tone === "mint"
                            ? "linear-gradient(145deg, #dcebd7, #edf6eb)"
                            : "linear-gradient(145deg, #f8f5ef, #ece7df)",
                    }}
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
                    <h3 className="display-font mt-4 text-2xl leading-tight">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <article
                key={item.label}
                className="portfolio-brutal portfolio-reveal p-5"
                style={{
                  animationDelay: `${140 + index * 60}ms`,
                  background:
                    index === 0
                      ? "linear-gradient(145deg, #f4e3a6, #fbf1cc)"
                      : index === 2
                        ? "linear-gradient(145deg, #dcebd7, #edf6eb)"
                        : "linear-gradient(145deg, #f8f5ef, #ece7df)",
                }}
              >
                <span className="portfolio-spec-label">Level 0{index + 1}</span>
                <p className="display-font mt-5 text-4xl leading-none sm:text-5xl">{item.value}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.note}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <article className="portfolio-sheet portfolio-reveal p-6 sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="portfolio-spec-label">Data display</span>
                  <h2 className="display-font mt-4 text-4xl leading-tight">
                    Projects that mix product thinking with serious technical depth.
                  </h2>
                </div>
                <Link href="/help" className="text-sm font-semibold underline decoration-2 underline-offset-4">
                  See the full profile
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => {
                  const Icon = project.icon;
                  const cardClass =
                    index % 2 === 0
                      ? "portfolio-brutal"
                      : "portfolio-neo";

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
                      <h3 className="display-font mt-4 text-2xl leading-tight">{project.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">
                        {project.summary}
                      </p>
                      <p className="mt-4 text-sm font-semibold text-[var(--muted)]">
                        {project.result}
                      </p>
                    </article>
                  );
                })}
              </div>
            </article>

            <article
              className="portfolio-neo portfolio-reveal p-6 sm:p-8"
              style={{ animationDelay: "120ms" }}
            >
              <span className="portfolio-spec-label">Controls</span>
              <h2 className="display-font mt-4 text-4xl leading-tight">
                The way I like to work is loud on taste and strict on execution.
              </h2>

              <div className="portfolio-inset mt-6 p-5">
                <ul className="space-y-4 text-sm leading-7 text-[var(--foreground)]">
                  {principles.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent-blue)] shadow-[0_0_0_4px_rgba(77,130,255,0.12)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <span className="portfolio-spec-label">Toolbox</span>
                <div className="mt-4 flex flex-wrap gap-3">
                  {toolbox.map((item) => (
                    <span
                      key={item}
                      className="portfolio-btn-neo px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <article
              className="portfolio-brutal portfolio-reveal bg-[var(--paper-strong)] p-6 sm:p-8"
              style={{ animationDelay: "120ms" }}
            >
              <span className="portfolio-spec-label">Timeline</span>
              <h2 className="display-font mt-4 text-4xl leading-tight">
                Built across AI platforms, data products, and production delivery.
              </h2>

              <div className="mt-6 space-y-4">
                {experience.map((item) => (
                  <article key={item.company} className="portfolio-inset p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="display-font text-2xl leading-tight">{item.company}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">
                          {item.role}
                        </p>
                      </div>
                      <p className="mono-font text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
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

            <div className="grid gap-6">
              <section
                className="portfolio-brutal portfolio-reveal p-6 sm:p-8"
                style={{ background: "linear-gradient(145deg, #f4e3a6, #fbf1cc)" }}
              >
                <span className="portfolio-spec-label">Feedback</span>
                <h2 className="display-font mt-4 text-4xl leading-tight">
                  Ready to build something that feels sharp, fast, and memorable?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--foreground)]">
                  If the work needs backend rigor, product sense, and a frontend that does not look like
                  everyone else&apos;s, I&apos;m interested.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a href={`mailto:${profile.email}`} className="portfolio-btn-brutal text-sm font-semibold">
                    Say hello
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bishal-banerjee-4742a8190/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-btn-neo text-sm font-semibold"
                  >
                    Connect on LinkedIn
                    <MoveRight className="h-4 w-4" />
                  </a>
                </div>
              </section>

              <section
                id="contact"
                className="portfolio-neo portfolio-reveal p-6 sm:p-8"
                style={{ animationDelay: "140ms" }}
              >
                <span className="portfolio-spec-label">Contact details</span>
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
              </section>
            </div>
          </section>
        </main>

        <footer className="portfolio-brutal portfolio-reveal mt-2 bg-[var(--paper-strong)] px-5 py-4 text-sm text-[var(--muted)] sm:flex sm:items-center sm:justify-between">
          <span>Copyright {new Date().getFullYear()} Bishal Banerjee.</span>
          <span>Neobrutal edges, neoneu depth, and a clear engineering signal.</span>
        </footer>
      </div>
    </div>
  );
}
