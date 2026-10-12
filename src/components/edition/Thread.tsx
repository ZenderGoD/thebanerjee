"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Point = { x: number; y: number };

// One red thread through the whole story. It runs through every red mark on the page ([data-thread]:
// the sun, "first.", the red block, "Back", "something.") and weaves between them, and it draws
// itself just ahead of the reader. Reduced motion shows it whole.
export function Thread() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const host = svg.current?.parentElement;
    const line = path.current;
    if (!host || !svg.current || !line) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let samples: { len: number; y: number }[] = [];
    let total = 0;

    const build = () => {
      const box = host.getBoundingClientRect();
      const w = host.clientWidth;
      const h = host.scrollHeight;
      svg.current!.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.current!.style.height = `${h}px`;

      const anchors: Point[] = Array.from(host.querySelectorAll<HTMLElement>("[data-thread]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (anchors.length < 2) return;

      // Between two marks the thread swings out to one side and back, alternating, like a
      // stitch.
      const pts: Point[] = [{ x: anchors[0].x, y: Math.max(0, anchors[0].y - 200) }];
      anchors.forEach((a, i) => {
        pts.push(a);
        const b = anchors[i + 1];
        if (!b) return;
        const side = i % 2 ? 0.08 : 0.92;
        pts.push({ x: w * side, y: (a.y + b.y) / 2 });
      });
      pts.push({ x: anchors[anchors.length - 1].x, y: h - 40 });

      // Catmull-Rom through every point, as cubic Béziers.
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
        const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
        d += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`;
      }
      line.setAttribute("d", d);
      total = line.getTotalLength();
      line.style.strokeDasharray = `${total}`;

      // Where along the thread each height is, so the tip can sit just below the reader's eye.
      samples = [];
      for (let len = 0; len <= total; len += 24) samples.push({ len, y: line.getPointAtLength(len).y });
      update();
    };

    const tip = gsap.quickTo(line, "strokeDashoffset", { duration: 0.6, ease: "power3.out" });
    const update = () => {
      if (!total) return;
      if (still) {
        line.style.strokeDashoffset = "0";
        return;
      }
      const eye = window.scrollY - (host.getBoundingClientRect().top + window.scrollY) + window.innerHeight * 0.62;
      let reached = 0;
      for (const s of samples) {
        if (s.y > eye) break;
        reached = s.len;
      }
      tip(total - reached);
    };

    line.style.strokeDashoffset = still ? "0" : "99999";
    const trigger = ScrollTrigger.create({ trigger: host, start: "top bottom", end: "bottom top", onUpdate: update });
    ScrollTrigger.addEventListener("refresh", build);
    const fonts = document.fonts?.ready.then(build);
    const t = setTimeout(build, 600);

    return () => {
      clearTimeout(t);
      void fonts;
      trigger.kill();
      ScrollTrigger.removeEventListener("refresh", build);
    };
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-0 w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <path ref={path} fill="none" stroke="var(--color-red)" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}
