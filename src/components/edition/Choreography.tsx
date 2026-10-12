"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

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

      // Headlines and paragraphs arrive as they enter.
      q("[data-split], [data-fade-up]").forEach((el) => {
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
        { scale: 1, ease: "none", scrollTrigger: { trigger: "#imai", start: "top bottom", end: "bottom bottom", scrub: true } },
      );
      gsap.to("[data-tube]", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: "#wisper", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        "[data-flea]",
        { yPercent: 10, rotate: -3 },
        { yPercent: -10, rotate: 2, ease: "none", scrollTrigger: { trigger: "#lab", start: "top bottom", end: "bottom top", scrub: true } },
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
        gsap.to(track, {
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
      }
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
