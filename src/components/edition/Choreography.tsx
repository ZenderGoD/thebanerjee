"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

// All scroll motion for the page, attached to data-* hooks in the server-rendered markup.
// Reduced motion gets a still page; pins and pans only run from tablet width up.
export function Choreography() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // One scene, one clock. Each frame the pointer, the scroll speed, the lamp and the print
      // register become CSS variables on the page; every [data-depth] element, lit shadow and
      // title reads them, so nothing else needs its own loop.
      const root = document.documentElement;
      q("[data-depth]").forEach((el) => el.style.setProperty("--d", el.getAttribute("data-depth") ?? "0"));
      const fine = window.matchMedia("(pointer: fine)").matches;
      const aim = { x: 0, y: 0 };
      const now = { x: 0, y: 0, v: 0 };
      const written: Record<string, string> = {};
      const write = (name: string, value: number) => {
        const text = value.toFixed(3);
        if (written[name] === text) return;
        written[name] = text;
        root.style.setProperty(name, text);
      };
      const aimAt = (e: PointerEvent) => {
        aim.x = (e.clientX / window.innerWidth) * 2 - 1;
        aim.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      if (fine) window.addEventListener("pointermove", aimAt, { passive: true });
      const scene = () => {
        now.x += (aim.x - now.x) * 0.075;
        now.y += (aim.y - now.y) * 0.075;
        const speed = gsap.utils.clamp(-1.6, 1.6, (lenis.velocity || 0) / 28);
        now.v += (speed - now.v) * 0.14;
        write("--px", now.x);
        write("--py", now.y);
        write("--vy", now.v);
        // The lamp is the cursor: shadows fall away from it, longest when it is far off.
        write("--lx", 0.55 - now.x * 1.35);
        write("--ly", 0.55 - now.y * 1.35);
        // The red plate drifts out of register with the pointer and slips when you scroll fast.
        write("--mx", -now.x * 2.4 + now.v * 2.5);
        write("--my", -now.y * 2.4 + now.v * 7);
      };
      gsap.ticker.add(scene);

      // In-page links glide instead of jump.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest('a[href^="#"]');
        if (!a) return;
        const target = document.querySelector(a.getAttribute("href")!);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
      };
      document.addEventListener("click", onClick);

      // I. The name rises, the sun comes up behind the angel.
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .from("[data-rise]", { yPercent: 105, duration: 1.3, stagger: 0.12 })
        .from("[data-sun]", { scale: 0, duration: 1.6, ease: "elastic.out(1, 0.75)" }, 0.25)
        .from("[data-hero-plate] [data-plate]", { opacity: 0, y: 40, duration: 1.4 }, 0.15)
        .from("[data-fade]", { opacity: 0, y: 18, duration: 1, stagger: 0.1 }, 0.6);

      gsap.to("[data-sun]", {
        scale: 2.3,
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: "#prologue", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-plate] [data-plate]", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: "#prologue", start: "top top", end: "bottom top", scrub: true },
      });

      // A thin red line keeps your place in the story.
      gsap.to("[data-progress]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      // Chapter titles are set line by line, rising from behind a mask.
      const splits: SplitText[] = [];
      document.fonts.ready.then(() => {
        q("[data-split]").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "pb-[0.06em]" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      // Figures count up to their real value as they arrive.
      q("[data-count]").forEach((el) => {
        const final = el.textContent ?? "";
        const state = { p: 0 };
        gsap.to(state, {
          p: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = final.replace(/\d+/g, (n) => String(Math.round(Number(n) * state.p)));
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
      });

      // The bridges between chapters ink in word by word as they pass, like being read aloud.
      q("[data-bridge]").forEach((bridge) => {
        const words = gsap.utils.toArray<HTMLElement>("[data-word]", bridge);
        gsap.fromTo(
          words,
          { color: "rgba(20, 20, 20, 0.13)", y: 10 },
          {
            color: (_i, el: HTMLElement) => (el.dataset.red ? "#c33b24" : "#141414"),
            y: 0,
            stagger: 0.5,
            ease: "none",
            scrollTrigger: { trigger: bridge, start: "top 78%", end: "bottom 52%", scrub: 0.5 },
          },
        );
      });

      // A chapter steps back as the next rises over it, so one flows into the next.
      q("[data-exit]").forEach((section) => {
        gsap.to(section, {
          opacity: 0.3,
          scale: 0.97,
          transformOrigin: "50% 100%",
          ease: "power1.in",
          scrollTrigger: { trigger: section, start: "bottom 38%", end: "bottom top", scrub: true },
        });
      });

      // Beliefs stack: each card settles on the last, and the ones beneath sink back.
      const cards = q("[data-belief]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94,
          filter: "brightness(0.93)",
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top 60%", end: () => `top ${Math.round(window.innerHeight * 0.13 + (i + 1) * 26)}px`, scrub: true },
        });
      });

      // Paragraphs and cards arrive as they enter.
      q("[data-fade-up]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      gsap.to("[data-float]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: "#rare", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        "[data-jerome-img]",
        { scale: 1.12 },
        { scale: 1.05, ease: "none", scrollTrigger: { trigger: "#imai", start: "top bottom", end: "bottom bottom", scrub: true } },
      );
      gsap.to("[data-tube]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: "#wisper", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        "[data-flea]",
        { yPercent: 10 },
        { yPercent: -10, ease: "none", scrollTrigger: { trigger: "#lab", start: "top bottom", end: "bottom top", scrub: true } },
      );

      // The tools run sideways, faster and backwards with the reader's scrolling.
      const band = document.querySelector<HTMLElement>("[data-marquee]");
      let marquee: gsap.core.Tween | undefined;
      let marqueeTrigger: ScrollTrigger | undefined;
      if (band) {
        marquee = gsap.to(band, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
        marqueeTrigger = ScrollTrigger.create({
          trigger: band,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = self.getVelocity() / 300;
            const speed = gsap.utils.clamp(-6, 6, self.direction * Math.max(1, Math.abs(v)));
            gsap.to(marquee!, { timeScale: speed, duration: 0.2, overwrite: true });
            gsap.to(marquee!, { timeScale: self.direction, duration: 1.2, delay: 0.2, ease: "power2.out" });
          },
        });
      }

      // Each project shot shifts inside its frame, a window onto the page behind it.
      q("[data-shift]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      // The contact card rises a little faster than the sky behind it.
      gsap.fromTo(
        "[data-card]",
        { y: 120 },
        { y: 0, ease: "none", scrollTrigger: { trigger: "[data-epilogue]", start: "top bottom", end: "bottom bottom", scrub: true } },
      );

      // VII. The sky opens around the traveller.
      gsap.fromTo(
        "[data-peek]",
        { clipPath: "circle(14% at 32% 62%)" },
        {
          clipPath: "circle(120% at 32% 62%)",
          ease: "none",
          scrollTrigger: { trigger: "[data-epilogue]", start: "top 80%", end: "top top", scrub: true },
        },
      );

      return () => {
        gsap.ticker.remove(scene);
        window.removeEventListener("pointermove", aimAt);
        ["--px", "--py", "--vy", "--lx", "--ly", "--mx", "--my"].forEach((n) => root.style.removeProperty(n));
        splits.forEach((sp) => sp.revert());
        marquee?.kill();
        marqueeTrigger?.kill();
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
      // II. Pinned: Leonardo's machine draws itself while the captions tell the story.
      const rocket = document.querySelector<HTMLElement>("[data-rocket] > div");
      if (rocket) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: rocket, start: "top top", end: "+=220%", pin: true, scrub: 0.6 },
        });
        tl.fromTo("[data-draw]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", duration: 4 }, 0);
        q("[data-caption]").forEach((c, i) => {
          tl.from(c, { opacity: 0, y: 30, x: -12, duration: 0.6, ease: "power3.out" }, 0.4 + i * 0.95);
        });
      }

      // V. The modes pan sideways while the chapter holds still.
      const pan = document.querySelector<HTMLElement>("[data-pan]");
      const track = document.querySelector<HTMLElement>("[data-pan-track]");
      if (pan && track) {
        const distance = () => track.scrollWidth - window.innerWidth;
        const panTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pan,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        // Panels drift at their own heights as they pass, like cards on a table.
        q("[data-panel]").forEach((panel, i) => {
          gsap.fromTo(
            panel,
            { y: i % 2 ? -60 : 70, rotate: i % 2 ? 1.2 : -1.2 },
            {
              y: i % 2 ? 50 : -40,
              rotate: 0,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: panTween, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      }
    });

    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const cleanups: (() => void)[] = [];

      // Project shots lean toward the pointer.
      q("[data-tilt]").forEach((card) => {
        gsap.set(card, { transformPerspective: 900 });
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      // Buttons lean toward the pointer, then settle back.
      q(".btn").forEach((btn) => {
        const x = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const y = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = btn.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.25);
          y((e.clientY - r.top - r.height / 2) * 0.35);
        };
        const leave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
        };
        btn.addEventListener("pointermove", move);
        btn.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          btn.removeEventListener("pointermove", move);
          btn.removeEventListener("pointerleave", leave);
        });
      });

      return () => cleanups.forEach((c) => c());
    });

    mm.add("(max-width: 767px)", () => {
      // Phones scroll the modes with a finger instead of a pin.
      const pan = document.querySelector<HTMLElement>("[data-pan]");
      if (pan) {
        pan.style.overflowX = "auto";
        pan.style.scrollSnapType = "x mandatory";
      }
    });

    // The chapter index works with or without motion. Made after the pins so it measures
    // the page with their spacers in place.
    const indexTriggers = q("[data-chapter]").map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: ({ isActive }) => {
          const id = section.getAttribute("data-chapter");
          document
            .querySelectorAll(`[data-index-link="${id}"]`)
            .forEach((a) => a.setAttribute("data-active", String(isActive)));
        },
      }),
    );

    // Triggers were made chapter by chapter, before and after the pins; order them by where they
    // start on the page so later ones measure with the pin spacers in place.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      indexTriggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return null;
}
