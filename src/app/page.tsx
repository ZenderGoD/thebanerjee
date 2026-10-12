import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Choreography } from "@/components/edition/Choreography";
import { VoiceIsland } from "@/components/edition/VoiceIsland";
import { Caption } from "@/components/edition/Caption";
import { Lens } from "@/components/edition/Lens";
import {
  chapters,
  credits,
  education,
  labWorks,
  profile,
  projects,
  tools,
  rareFacts,
  rocketCaptions,
  wisperModes,
} from "@/lib/edition";
import melencolia from "../../public/art/melencolia.webp";
import flight from "../../public/art/flight.webp";
import tailor from "../../public/art/tailor.webp";
import jerome from "../../public/art/jerome.webp";
import tube from "../../public/art/tube.webp";
import flea from "../../public/art/flea.webp";
import flammarion from "../../public/art/flammarion.webp";
import wisperIcon from "../../public/work/wisper-back.webp";

export default function Home() {
  return (
    <>
      <Choreography />
      <div className="fixed top-0 left-0 z-50 h-[3px] w-full origin-left scale-x-0 bg-red" data-progress aria-hidden />

      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between px-5 mix-blend-difference text-paper md:px-8">
        <a href="#prologue" className="display text-[22px] tracking-normal">
          Bishal Banerjee
        </a>
        <a href={`mailto:${profile.email}`} className="btn btn-line h-10 text-[12px]">
          Write to me
        </a>
      </header>

      <nav
        aria-label="Chapters"
        className="fixed bottom-6 left-8 z-30 hidden mix-blend-difference text-paper lg:block"
      >
        <ol className="grid gap-[3px] font-mono text-[11px] uppercase tracking-[0.04em]">
          {chapters.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                data-index-link={c.id}
                className="grid grid-cols-[34px_1fr] opacity-45 transition-opacity duration-300 hover:opacity-100 data-[active=true]:opacity-100"
              >
                <span>{c.numeral}</span>
                <span>{c.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <main>
        {/* I. Prologue */}
        <section
          id="prologue"
          data-chapter="prologue"
          className="relative grid min-h-[100dvh] grid-cols-1 overflow-hidden px-5 pt-24 pb-10 md:grid-cols-12 md:px-8 md:pt-20"
        >
          <div className="relative z-10 flex flex-col justify-end md:col-span-7 md:pb-8 lg:pl-40">
            <h1 className="display text-[clamp(72px,9.6vw,172px)]" data-hero-title data-depth="-10">
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="block" data-rise>
                  Bishal
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.04em]">
                <span className="block text-red" data-rise>
                  Banerjee
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-[34ch] text-[19px] leading-[1.45] text-ink-soft md:text-[21px]" data-fade>
              I build software people talk to. Founding engineer at IMAI, and the maker of Wisper
              Back.
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-fade>
              <a href={`mailto:${profile.email}`} className="btn btn-solid">
                Write to me
              </a>
              <a href="#rocket" className="btn btn-line">
                Read the story <ArrowDown size={15} weight="bold" />
              </a>
            </div>
          </div>

          <div className="relative mt-10 md:col-span-5 md:mt-0" data-hero-plate data-depth="16">
            <div
              className="absolute top-[9%] left-[30%] aspect-square w-[46%] rounded-full bg-red"
              data-sun
              data-depth="34"
              aria-hidden
            />
            <Image
              src={melencolia}
              alt="Albrecht Dürer's engraving Melencolia I: a winged figure sits among a maker's tools, lost in thought."
              priority
              sizes="(min-width: 768px) 42vw, 100vw"
              className="ink relative h-auto w-full md:h-[86dvh] md:w-auto md:max-w-none md:object-contain"
            />
          </div>
        </section>

        {/* II. The rocket */}
        <section id="rocket" data-chapter="rocket" className="relative" data-rocket>
          <div className="relative flex min-h-[100dvh] bg-paper flex-col justify-center overflow-hidden px-5 py-24 md:px-8 lg:pl-48">
            <h2 className="display relative z-10 text-[clamp(56px,9vw,150px)]">
              Mechatronics
              <br />
              <span className="text-red">first.</span>
            </h2>
            <div className="relative mt-8 md:absolute md:inset-y-0 md:right-0 md:mt-0 md:flex md:w-[62%] md:items-center">
              <Image
                src={flight}
                alt="Leonardo da Vinci's drawing of a flying machine with a wing frame and pulleys."
                sizes="(min-width: 768px) 62vw, 100vw"
                className="ink h-auto w-full"
                data-draw
              />
            </div>
            <ol className="relative z-10 mt-10 grid max-w-[460px] gap-4 md:mt-12">
              {rocketCaptions.map((c, i) => (
                <li key={i} data-caption style={{ marginLeft: `${i * 22}px` }}>
                  <Caption text={c.text} />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* III. The allocation */}
        <section
          id="rare"
          data-chapter="rare"
          className="relative overflow-hidden border-t-[1.5px] border-ink px-5 py-24 md:px-8 md:py-32 lg:pl-48"
        >
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
            The House of Rare, 2024
          </p>
          <div className="mt-6 grid items-end gap-10 md:grid-cols-12">
            <h2 className="display text-[clamp(52px,8.4vw,140px)] md:col-span-8" data-split>
              Which shirt goes to <span className="text-red">which store.</span>
            </h2>
            <div className="relative md:col-span-4" data-float>
              <div className="absolute -top-4 -left-4 h-full w-full bg-red" aria-hidden />
              <Image
                src={tailor}
                alt="Jost Amman's 1568 woodcut of a tailor's workshop, with garments hanging from a rail."
                sizes="(min-width: 768px) 30vw, 90vw"
                className="relative h-auto w-full border-[1.5px] border-ink bg-paper grayscale"
              />
            </div>
          </div>
          <p className="mt-12 max-w-[60ch] text-[19px] leading-[1.55] text-ink-soft">
            At the company behind Rare Rabbit, Rareism and RAREZ, I built the assortment and
            allocation model: which garments go to which store, and how many of each. I got in by
            messaging their head of technology, started as an intern, and shipped the first version
            to production.
          </p>
          <dl className="mt-14 grid gap-10 sm:grid-cols-[auto_auto] sm:justify-start sm:gap-20">
            {rareFacts.map((f) => (
              <div key={f.value} data-fade-up>
                <dt className="display wide text-[clamp(64px,7vw,112px)] text-red" data-count>{f.value}</dt>
                <dd className="mt-2 max-w-[28ch] text-[16px] leading-snug text-ink-soft">{f.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* IV. The studio */}
        <section
          id="imai"
          data-chapter="imai"
          className="relative grid border-t-[1.5px] border-ink md:grid-cols-2"
        >
          <div className="relative md:sticky md:top-0 md:h-[100dvh] md:overflow-hidden" data-jerome>
            <Image
              src={jerome}
              alt="Albrecht Dürer's engraving of Saint Jerome working at his desk in a quiet, sunlit study."
              sizes="(min-width: 768px) 50vw, 100vw"
              className="ink h-auto w-full md:h-full md:object-cover md:object-top"
              data-jerome-img
            />
          </div>
          <div className="flex flex-col justify-center gap-10 px-5 py-24 md:min-h-[150dvh] md:px-12 lg:px-16">
            <h2 className="display text-[clamp(52px,6.6vw,112px)]">
              The quiet room where it gets <span className="text-red">built.</span>
            </h2>
            <p className="max-w-[46ch] text-[19px] leading-[1.55] text-ink-soft" data-fade-up>
              Since 2025 I&apos;ve been the founding engineer at IMAI, which helps brands design, market
              and manufacture products with AI. I build the backend, along with much of the product that sits on it.
            </p>
            <p className="max-w-[46ch] text-[19px] leading-[1.55] text-ink-soft" data-fade-up>
              IMAI is also where Wisper Back began. I wanted its long conversations summarised and
              read aloud, and realised the engine was a product of its own.
            </p>
            <a href={profile.imai} target="_blank" rel="noreferrer" className="btn btn-line self-start">
              Visit IMAI <ArrowUpRight size={15} weight="bold" />
            </a>
          </div>
        </section>

        {/* V. The voice */}
        <section
          id="wisper"
          data-chapter="wisper"
          className="relative overflow-hidden border-t-[1.5px] border-ink"
        >
          <div className="relative flex min-h-[100dvh] flex-col justify-center px-5 pt-28 pb-16 md:px-8 lg:pl-48">
            <Image
              src={tube}
              alt="Athanasius Kircher's 1673 engraving of speaking tubes carrying voices from a courtyard into the rooms of a house."
              sizes="(min-width: 768px) 46vw, 100vw"
              className="ink pointer-events-none mb-10 h-auto w-full md:absolute md:top-20 md:right-0 md:mb-0 md:w-[46%]"
              data-tube
            />
            <div className="relative z-10 max-w-[560px]">
              <Image
                src={wisperIcon}
                alt="The Wisper Back app icon."
                sizes="88px"
                className="h-[72px] w-[72px] md:h-[88px] md:w-[88px]"
                data-fade-up
              />
              <h2 className="display mt-6 text-[clamp(64px,10vw,172px)]" data-split>
                Wisper <span className="text-red">Back</span>
              </h2>
              <p className="mt-6 max-w-[34ch] text-[19px] leading-[1.5] text-ink-soft md:text-[21px]">
                A Mac app I design, build and ship on my own. Hold a key and talk: it writes for
                you, reads to you, and answers back.
              </p>
            </div>
            <div className="relative z-10 mt-14 bg-paper md:mt-24">
              <VoiceIsland />
            </div>
          </div>

          <div className="relative overflow-hidden" data-pan>
            <div
              className="flex w-max items-center gap-8 py-16 pr-[12vw] pl-5 md:h-[100dvh] md:gap-12 md:py-0 md:pl-8 lg:pl-48"
              data-pan-track
            >
              {wisperModes.map((m, i) => (
                <article
                  key={m.name}
                  data-panel
                  className={`flex w-[78vw] shrink-0 flex-col justify-end border-[1.5px] border-ink p-6 shadow-[6px_6px_0_var(--color-ink)] md:h-[52dvh] md:w-[30vw] md:p-9 ${
                    i === 1 ? "bg-red text-paper" : "bg-paper"
                  } ${i % 2 ? "md:translate-y-[7dvh]" : "md:-translate-y-[5dvh]"}`}
                >
                  <h3 className="display text-[clamp(44px,4.4vw,76px)]">{m.name}</h3>
                  <p className={`mt-4 max-w-[30ch] text-[17px] leading-[1.5] ${i === 1 ? "text-paper/90" : "text-ink-soft"}`}>
                    {m.line}
                  </p>
                </article>
              ))}
              <div className="flex w-[78vw] shrink-0 flex-col gap-6 md:w-[26vw]">
                <p className="max-w-[24ch] text-[22px] leading-[1.4]">
                  Signed, notarised and updated on its own, on every Mac with Apple silicon.
                </p>
                <a href={profile.wisperBack} target="_blank" rel="noreferrer" className="btn btn-solid self-start">
                  Get Wisper Back <ArrowUpRight size={15} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* VI. The lab */}
        <section id="lab" data-chapter="lab" className="relative px-5 py-24 md:px-8 md:py-32 lg:pl-48">
          <div className="relative">
            <h2 className="display relative z-10 max-w-[12ch] text-[clamp(52px,7vw,120px)]">
              Small things, looked at <span className="text-red">closely.</span>
            </h2>
            <Lens
              src={flea}
              alt="Robert Hooke's 1665 engraving of a flea seen through a microscope."
              className="mt-8 w-full md:absolute md:top-[10px] md:right-[-4%] md:mt-0 md:w-[46%]"
            />
          </div>

          <div className="mt-16 grid gap-[1.5px] border-[1.5px] border-ink bg-ink md:mt-40 md:grid-cols-6">
            {labWorks.map((w, i) => {
              const span = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-2", "md:col-span-2"][i];
              const tone =
                i === 0 ? "bg-red text-paper" : i === 3 ? "bg-ink text-paper" : "bg-paper text-ink";
              return (
                <article key={w.title} className={`${span} ${tone} flex min-h-[240px] flex-col justify-between p-6 md:p-8`} data-fade-up>
                  <span className="font-mono text-[12px] uppercase tracking-[0.08em] opacity-70">{w.kind}</span>
                  <div>
                    <h3 className={`display ${i === 0 ? "text-[clamp(40px,4.4vw,72px)]" : "text-[clamp(32px,2.6vw,44px)]"}`}>
                      {w.title}
                    </h3>
                    <p className="mt-3 max-w-[38ch] text-[16px] leading-[1.5] opacity-80">{w.line}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {education.map((e) => (
              <div key={e.school} className="border-t-[1.5px] border-ink pt-4">
                <p className="display text-[28px]">{e.school}</p>
                <p className="mt-1 text-[16px] text-ink-soft">{e.degree}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="overflow-hidden border-y-[1.5px] border-ink bg-ink py-5 text-paper" aria-label="Tools I build with">
          <div className="flex w-max" data-marquee>
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {tools.map((t) => (
                  <li key={t} className="display flex items-center text-[clamp(36px,4vw,64px)]">
                    <span className="px-7">{t}</span>
                    <span className="h-3 w-3 rounded-full bg-red" aria-hidden />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* VII. The workshop */}
        <section
          id="workshop"
          data-chapter="workshop"
          className="relative border-t-[1.5px] border-ink px-5 py-24 md:px-8 md:py-32 lg:pl-48"
        >
          <h2 className="display max-w-[14ch] text-[clamp(52px,7vw,120px)]" data-split>
            Built after <span className="text-red">hours.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[19px] leading-[1.55] text-ink-soft">
            Products, client sites and small Mac apps, most of them made end to end on my own.
          </p>

          <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {projects.filter((p) => p.image).map((p, i) => (
              <figure key={p.name} className={i % 2 ? "md:mt-24" : ""} data-fade-up>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden border-[1.5px] border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] [transform-style:preserve-3d]"
                  data-tilt
                >
                  <Image
                    src={p.image!}
                    alt={`The ${p.name} website.`}
                    width={1200}
                    height={750}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="h-auto w-full scale-[1.12] grayscale transition-[filter] duration-500 group-hover:grayscale-0"
                    data-shift
                  />
                </a>
                <figcaption className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="display text-[clamp(32px,3vw,48px)]">{p.name}</h3>
                    <p className="mt-2 max-w-[44ch] text-[16px] leading-[1.5] text-ink-soft">{p.line}</p>
                  </div>
                  <span className="shrink-0 pt-2 font-mono text-[12px] uppercase text-muted">{p.kind}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.filter((p) => !p.image).map((p) => {
              const body = (
                <>
                  {p.icon ? (
                    <Image src={p.icon} alt="" width={56} height={56} className="h-14 w-14 grayscale" />
                  ) : (
                    <span className="block h-14 w-14 rounded-full bg-red" aria-hidden />
                  )}
                  <h3 className="display mt-6 text-[32px]">{p.name}</h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-ink-soft">{p.line}</p>
                  <span className="mt-auto pt-6 font-mono text-[12px] uppercase text-muted">
                    <span className="inline-flex items-center gap-1">
                      {p.kind}
                      {p.href && <ArrowUpRight size={13} weight="bold" />}
                    </span>
                  </span>
                </>
              );
              const cls = "caption-card flex min-h-[300px] flex-col border-[1.5px] border-ink bg-paper p-6";
              return p.href ? (
                <a key={p.name} href={p.href} target="_blank" rel="noreferrer" className={`${cls} transition-colors hover:bg-paper-deep`} data-fade-up>
                  {body}
                </a>
              ) : (
                <div key={p.name} className={cls} data-fade-up>
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        {/* VIII. Epilogue */}
        <section
          id="epilogue"
          data-chapter="epilogue"
          className="relative min-h-[100dvh] overflow-hidden border-t-[1.5px] border-ink"
          data-epilogue
        >
          <div className="absolute inset-0" data-peek>
            <Image
              src={flammarion}
              alt="The Flammarion engraving: a traveller kneels at the edge of the sky and pushes his head through to see the workings beyond."
              sizes="100vw"
              className="ink h-full w-full object-cover"
            />
          </div>
          <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-10 md:px-8 lg:pl-48">
            <div className="max-w-[900px] border-[1.5px] border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)] md:p-10" data-card>
              <h2 className="display text-[clamp(56px,8vw,132px)]">
                Let&apos;s build <span className="text-red">something.</span>
              </h2>
              <a
                href={`mailto:${profile.email}`}
                className="mt-6 inline-block text-[clamp(22px,2.6vw,36px)] font-semibold underline decoration-red decoration-[3px] underline-offset-[6px] hover:text-red"
              >
                {profile.email}
              </a>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-line">
                  GitHub <ArrowUpRight size={15} weight="bold" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-line">
                  LinkedIn <ArrowUpRight size={15} weight="bold" />
                </a>
              </div>
            </div>
            <footer className="mt-8 flex flex-col gap-2 bg-paper/90 p-3 font-mono text-[11px] leading-relaxed text-muted md:flex-row md:justify-between">
              <span>© 2026 Bishal Banerjee</span>
              <span className="max-w-[90ch]">{credits}</span>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
