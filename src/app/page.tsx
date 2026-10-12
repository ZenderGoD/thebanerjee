import Image from "next/image";
import { ArrowUpRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Choreography } from "@/components/edition/Choreography";
import { VoiceIsland } from "@/components/edition/VoiceIsland";
import { Caption } from "@/components/edition/Caption";
import {
  chapters,
  credits,
  education,
  labWorks,
  profile,
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

export default function Home() {
  return (
    <>
      <Choreography />

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
            <h1 className="display text-[clamp(72px,9.6vw,172px)]" data-hero-title>
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

          <div className="relative mt-10 md:col-span-5 md:mt-0" data-hero-plate>
            <div
              className="absolute top-[9%] left-[30%] aspect-square w-[46%] rounded-full bg-red"
              data-sun
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
                <dt className="display wide text-[clamp(64px,7vw,112px)] text-red">{f.value}</dt>
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

        {/* V. The voice: the one night chapter */}
        <section
          id="wisper"
          data-chapter="wisper"
          className="on-night relative overflow-hidden bg-night text-paper"
          data-night
        >
          <div className="relative flex min-h-[100dvh] flex-col justify-center px-5 pt-28 pb-20 md:px-8 lg:pl-48">
            <Image
              src={tube}
              alt="Athanasius Kircher's 1673 engraving of speaking tubes carrying voices from a courtyard into the rooms of a house."
              sizes="100vw"
              className="ink-night pointer-events-none absolute top-0 right-0 h-auto w-full opacity-30 [mask-image:linear-gradient(to_left,black_35%,transparent_85%)] md:w-[68%]"
              data-tube
            />
            <div className="relative">
              <h2 className="display text-[clamp(64px,11vw,190px)]" data-split>
                Wisper <span className="text-red">Back</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[19px] leading-[1.5] text-paper/75 md:text-[21px]">
                A Mac app I design, build and ship on my own. Hold a key and talk: it writes for
                you, reads to you, and answers back.
              </p>
            </div>
            <div className="relative mt-14">
              <VoiceIsland />
            </div>
          </div>

          <div className="relative" data-pan>
            <div className="flex w-max gap-0 bg-night pl-5 md:h-[100dvh] md:items-center md:pl-8 lg:pl-48" data-pan-track>
              {wisperModes.map((m) => (
                <article
                  key={m.name}
                  className="flex w-[86vw] flex-col justify-between border-l-[1.5px] border-paper/20 px-6 py-12 md:h-[64dvh] md:w-[38vw] md:px-10"
                >
                  <span className="h-3 w-3 bg-red" aria-hidden />
                  <div>
                    <h3 className="display text-[clamp(44px,5vw,84px)]">{m.name}</h3>
                    <p className="mt-4 max-w-[30ch] text-[18px] leading-[1.5] text-paper/70">{m.line}</p>
                  </div>
                </article>
              ))}
              <div className="flex w-[86vw] flex-col justify-center gap-6 border-l-[1.5px] border-paper/20 px-6 py-12 md:h-[64dvh] md:w-[38vw] md:px-10">
                <p className="max-w-[24ch] text-[22px] leading-[1.4] text-paper/85">
                  Signed, notarised and updated on its own, on every Mac with Apple silicon.
                </p>
                <a href={profile.wisperBack} target="_blank" rel="noreferrer" className="btn btn-line self-start">
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
            <Image
              src={flea}
              alt="Robert Hooke's 1665 engraving of a flea seen through a microscope."
              sizes="(min-width: 768px) 55vw, 100vw"
              className="ink mt-8 h-auto w-full md:absolute md:top-[10px] md:right-[-4%] md:mt-0 md:w-[46%]"
              data-flea
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

        {/* VII. Epilogue */}
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
            <div className="max-w-[900px] bg-paper p-6 md:p-10" data-fade-up>
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
