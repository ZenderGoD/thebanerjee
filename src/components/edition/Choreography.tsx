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
        .from("[data-hero-plate] img", { opacity: 0, y: 40, duration: 1.4 }, 0.15)
        .from("[data-fade]", { opacity: 0, y: 18, duration: 1, stagger: 0.1 }, 0.6);

      gsap.to("[data-sun]", {
        scale: 2.3,
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: "#prologue", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-plate] img", {
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

      // Every chapter has depth: engravings, red shapes, captions and titles each sit on their
      // own layer and drift with the pointer. Positive depths follow it, negative ones move away.
      const layers = q("[data-depth]").map((el) => ({
        depth: Number(el.getAttribute("data-depth")),
        x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3.out" }),
      }));
      const follow = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(nx * l.depth);
          l.y(ny * l.depth);
        });
      };
      window.addEventListener("pointermove", follow);
      cleanups.push(() => window.removeEventListener("pointermove", follow));

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

    ScrollTrigger.refresh();

    return () => {
      indexTriggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return null;
}
