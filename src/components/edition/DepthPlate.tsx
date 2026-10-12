"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import Image, { type StaticImageData } from "next/image";

// How far a contained plate's canvas reaches past the picture, as a share of its size.
const BLEED = 0.08;

// One pointer for every plate on the page, eased per frame by each plate.
const pointer = { x: 0, y: 0, moved: 0 };
let listening = false;
function listen() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.moved = performance.now();
    },
    { passive: true },
  );
}

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() { vUv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5); gl_Position = vec4(p, 0.0, 1.0); }`;

// Each pixel moves by its own depth: near things follow the pointer, far things go the other way,
// the middle holds still. A few fixed-point steps keep edges from smearing. The picture is drawn
// as ink with alpha, so it sits on the paper without any blend mode.
const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uImg;
uniform sampler2D uDepth;
uniform vec2 uShift;
uniform vec4 uFit;
uniform float uZoom;
uniform float uBleed;
float depthAt(vec2 uv) { return texture2D(uDepth, uv).r; }
void main() {
  // The canvas reaches past the picture by uBleed on each side, so near parts can travel out of
  // the frame instead of being cut at it.
  vec2 uv = (vUv * (1.0 + 2.0 * uBleed)) - uBleed;
  uv = (uv - 0.5) / uZoom + 0.5;
  uv = uv * uFit.xy + uFit.zw;
  vec2 at = uv;
  for (int i = 0; i < 6; i++) {
    float d = depthAt(at);
    at = uv - uShift * (d - 0.45);
  }
  // Past the picture's edge there is only paper, never a smear of its last row.
  vec2 inside = smoothstep(vec2(0.0), vec2(0.004), at) * smoothstep(vec2(1.0), vec2(0.996), at);
  float l = texture2D(uImg, clamp(at, 0.0, 1.0)).r;
  float ink = smoothstep(0.98, 0.08, l) * inside.x * inside.y;
  gl_FragColor = vec4(vec3(0.078) * ink, ink);
}`;

type Props = {
  src: StaticImageData;
  depth: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** How far the nearest and farthest parts travel, as a share of the picture. */
  strength?: number;
  fit?: "contain" | "cover";
  position?: "center" | "top";
} & Omit<HTMLAttributes<HTMLDivElement>, "className">;

// An engraving with depth: a WebGL plate drawn from the picture and its depth map. Reduced
// motion, or no WebGL, keeps the plain picture.
export function DepthPlate({
  src,
  depth,
  alt,
  sizes,
  className,
  imgClassName,
  priority,
  strength = 0.06,
  fit = "contain",
  position = "center",
  ...rest
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrap.current;
    const cv = canvas.current;
    const pic = img.current;
    if (!el || !cv || !pic) return;
    const gl = cv.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;
    listen();

    let disposed = false;
    let raf = 0;
    let visible = false;
    let ready = false;
    const eased = { x: 0, y: 0 };
    const start = performance.now();

    const compile = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uShift = u("uShift");
    const uFit = u("uFit");
    const uZoom = u("uZoom");
    gl.uniform1i(u("uImg"), 0);
    gl.uniform1i(u("uDepth"), 1);
    gl.uniform1f(uZoom, fit === "cover" ? 1 + strength * 0.8 : 1);
    gl.uniform1f(u("uBleed"), fit === "cover" ? 0 : BLEED);
    gl.clearColor(0, 0, 0, 0);

    const texture = (unit: number, source: TexImageSource) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, source);
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const grow = fit === "cover" ? 1 : 1 + 2 * BLEED;
      cv.width = Math.max(1, Math.round(r.width * grow * dpr));
      cv.height = Math.max(1, Math.round(r.height * grow * dpr));
      gl.viewport(0, 0, cv.width, cv.height);
      // object-fit: cover in uv space, anchored to the top or the centre.
      const boxAspect = r.width / Math.max(1, r.height);
      const picAspect = src.width / src.height;
      let sx = 1;
      let sy = 1;
      if (fit === "cover") {
        if (boxAspect > picAspect) sy = picAspect / boxAspect;
        else sx = boxAspect / picAspect;
      }
      const ox = (1 - sx) / 2;
      const oy = position === "top" ? 0 : (1 - sy) / 2;
      gl.uniform4f(uFit, sx, sy, ox, oy);
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed || !visible || !ready) return;
      // Idle, the plate breathes on its own; the pointer takes over when it moves.
      const t = (now - start) / 1000;
      const idle = now - pointer.moved > 2500;
      const tx = idle ? Math.sin(t * 0.45) * 0.55 : pointer.x;
      const ty = idle ? Math.cos(t * 0.33) * 0.4 : pointer.y;
      eased.x += (tx - eased.x) * 0.06;
      eased.y += (ty - eased.y) * 0.06;
      // Scrolling past a plate tilts it too, so touch screens get depth as well.
      const r = el.getBoundingClientRect();
      const through = (r.top + r.height / 2) / window.innerHeight - 0.5;
      gl.uniform2f(uShift, eased.x * strength, (eased.y * 0.7 - through * 0.9) * strength);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && visible && ready && !disposed) raf = requestAnimationFrame(frame);
    };

    const load = (url: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new window.Image();
        i.decoding = "async";
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = url;
      });

    const begin = async () => {
      try {
        if (!pic.complete) await new Promise((r) => pic.addEventListener("load", r, { once: true }));
        // The same file the page already loaded, so nothing downloads twice.
        const [picture, map] = await Promise.all([load(pic.currentSrc || pic.src), load(depth)]);
        if (disposed) return;
        texture(0, picture);
        texture(1, map);
        resize();
        ready = true;
        el.dataset.depthReady = "true";
        kick();
      } catch {
        // Keep the plain picture.
      }
    };
    begin();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        kick();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    const ro = new ResizeObserver(() => ready && resize());
    ro.observe(el);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [depth, fit, position, src.height, src.width, strength]);

  return (
    <div ref={wrap} className={`group/depth relative ${className ?? ""}`} {...rest}>
      <Image
        ref={img}
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`ink transition-opacity duration-700 group-data-[depth-ready=true]/depth:opacity-0 ${imgClassName ?? "h-auto w-full"}`}
      />
      <canvas
        ref={canvas}
        aria-hidden
        className={`pointer-events-none absolute opacity-0 ${fit === "cover" ? "inset-0 h-full w-full" : "-inset-[8%] h-[116%] w-[116%]"} transition-opacity duration-700 group-data-[depth-ready=true]/depth:opacity-100`}
      />
    </div>
  );
}
