"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { voiceDemo, voicePolished } from "@/lib/edition";

type Phase = "idle" | "listening" | "polishing" | "done";

const words = voiceDemo.split(" ");
const BAR_COUNT = 9;

// A working miniature of Wisper Back's dictation island: hold, talk, let go.
export function VoiceIsland() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [heard, setHeard] = useState(0);
  const [typed, setTyped] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holding = useRef(false);

  const clear = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const start = useCallback(() => {
    if (holding.current) return;
    holding.current = true;
    clear();
    setTyped(0);
    setHeard(0);
    setPhase("listening");
    timer.current = setInterval(() => {
      setHeard((n) => Math.min(n + 1, words.length));
    }, 210);
  }, []);

  const stop = useCallback(() => {
    if (!holding.current) return;
    holding.current = false;
    clear();
    setPhase("polishing");
    setHeard(words.length);
    setTimeout(() => {
      setPhase("done");
      timer.current = setInterval(() => {
        setTyped((n) => {
          if (n >= voicePolished.length) {
            clear();
            return n;
          }
          return n + 3;
        });
      }, 16);
    }, 650);
  }, []);

  useEffect(() => () => clear(), []);

  const live = phase === "listening";
  const shown = words.slice(Math.max(0, heard - 7), heard).join(" ");

  return (
    <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <button
          type="button"
          aria-label="Hold to talk"
          aria-pressed={live}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            start();
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => {
            if ((e.key === " " || e.key === "Enter") && !e.repeat) {
              e.preventDefault();
              start();
            }
          }}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") stop();
          }}
          onContextMenu={(e) => e.preventDefault()}
          className={`grid h-28 w-28 shrink-0 touch-none select-none place-items-center rounded-full border-[1.5px] font-mono text-[12px] uppercase tracking-[0.06em] transition-[transform,background-color,color] duration-200 ${
            live ? "scale-95 border-red bg-red text-paper" : "border-ink bg-paper text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          {live ? "Talking" : "Hold"}
        </button>

        <div
          className="flex h-14 w-full min-w-0 items-center gap-4 border-[1.5px] border-ink bg-paper px-5 lit [--s:5px] sm:flex-1 md:w-[460px] md:flex-none"
          role="status"
          aria-live="polite"
        >
          <div className="flex h-6 shrink-0 items-center gap-[3px]" aria-hidden>
            {Array.from({ length: BAR_COUNT }).map((_, i) => (
              <span
                key={i}
                className="block w-[3px] bg-ink"
                style={{
                  height: live ? undefined : 4,
                  animation: live ? `voice-bar 0.${5 + (i % 4)}s ease-in-out ${i * 0.06}s infinite alternate` : "none",
                }}
              />
            ))}
          </div>
          <p className="min-w-0 flex-1 truncate text-right font-mono text-[13px] uppercase text-ink" dir="ltr">
            {phase === "idle" && <span className="text-muted">Hold the button and talk</span>}
            {phase !== "idle" && shown}
            {live && <span className="ml-[2px] inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-red" />}
          </p>
        </div>
      </div>

      <div className="min-h-[88px] border-l-[3px] border-red pl-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
          {phase === "polishing" ? "Cleaning it up" : "Lands in your app as"}
        </p>
        <p className="mt-2 text-[20px] leading-[1.45] text-ink md:text-[24px]">
          {phase === "done" ? voicePolished.slice(0, typed) : <span className="text-ink/30">Your words, written properly.</span>}
        </p>
      </div>

      <style>{`
        @keyframes voice-bar { from { height: 4px; } to { height: 22px; } }
        @media (prefers-reduced-motion: reduce) { [style*="voice-bar"] { animation: none !important; height: 12px !important; } }
      `}</style>
    </div>
  );
}
