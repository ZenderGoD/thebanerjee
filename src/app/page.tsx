import {
  ArrowUpRight,
  ExternalLink,
  Github,
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
  { href: "mailto:hello@thebanerjee.dev", label: "Email", icon: Mail },
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/", label: "LinkedIn", icon: Linkedin },
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
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-zinc-200">
              Portfolio · 2025
            </span>
            <span className="text-sm text-zinc-400">
              Open to collaborating on meaningful products.
            </span>
          </div>
          <Dock
            className="ml-auto mt-0 h-[72px] min-w-[240px] rounded-2xl border-white/10 bg-white/5/50 p-3 shadow-[0_12px_60px_-32px_rgba(0,0,0,0.75)]"
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

        <main className="space-y-16 md:space-y-18">
          <section className="grid gap-10 lg:grid-cols-[1.35fr_0.9fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
                Bishal Banerjee · Full-stack engineer
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                I build web products that feel fast, thoughtful, and alive.
          </h1>
              <p className="max-w-3xl text-lg text-zinc-300">
                I care about the details—clean architecture, reliable delivery,
                and interfaces that respect a user&apos;s time. My work spans
                product engineering, design systems, and immersive web
                experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <RippleButton
                  as="a"
                  href="mailto:hello@thebanerjee.dev?subject=Let%27s%20build%20something"
                  className="gap-2 border-white/15 bg-[#5b4cda] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_18px_55px_-18px_rgba(91,76,218,0.75)] hover:bg-[#4a3fc0]"
                  rippleColor="rgba(255,255,255,0.65)"
                  duration={680}
                >
                  Let&apos;s build together
                  <ArrowUpRight className="h-4 w-4" />
                </RippleButton>
                <RippleButton
                  as="a"
                  href="https://github.com/"
                  className="gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-white/40 hover:bg-white/5"
                  target="_blank"
                  rel="noopener noreferrer"
                  rippleColor="rgba(255,255,255,0.55)"
                  duration={540}
                >
                  View GitHub
                  <ExternalLink className="h-4 w-4" />
                </RippleButton>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-300">
                {["Next.js & TypeScript", "Design systems", "Realtime UX", "3D & motion"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.9)]">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/5 bg-black/20 p-4 shadow-[0_10px_40px_-28px_rgba(0,0,0,0.7)]"
                >
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
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
              <div className="flex flex-wrap gap-3">
                <RippleButton
                  as="a"
                  href="mailto:hello@thebanerjee.dev"
                  className="gap-2 border-white/30 bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-white/90 hover:shadow-[0_10px_40px_-12px_rgba(255,255,255,0.45)]"
                  rippleColor="rgba(0,0,0,0.35)"
                  duration={520}
                >
                  Say hello
                  <Mail className="h-4 w-4" />
                </RippleButton>
                <RippleButton
                  as="a"
                  href="https://www.linkedin.com/"
                  className="gap-2 px-4 py-2.5 text-sm font-semibold text-zinc-100 hover:border-white/30 hover:bg-white/5"
                  target="_blank"
                  rel="noopener noreferrer"
                  rippleColor="rgba(255,255,255,0.55)"
                  duration={520}
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </RippleButton>
              </div>
            </div>
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
