"use client";

import { Loader2, Shuffle } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import RippleButton from "./RippleButton";
import { triggerMoodFromApi } from "@/utils/moodClient";

type MoodButtonProps = {
  iconOnly?: boolean;
  className?: string;
};

export default function MoodButton({ iconOnly = false, className }: MoodButtonProps) {
  const [loading, setLoading] = useState(false);
  const [lastMood, setLastMood] = useState<string | undefined>(undefined);

  const handleClick = async () => {
    try {
      setLoading(true);
      const mood = await triggerMoodFromApi();
      if (mood) setLastMood(mood);
    } finally {
      setLoading(false);
    }
  };

  const baseContent = loading ? (
    iconOnly ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      "Tuning mood..."
    )
  ) : iconOnly ? (
    <Shuffle className="h-4 w-4" />
  ) : (
    "Shuffle mood"
  );

  return (
    <RippleButton
      type="button"
      onClick={handleClick}
      className={cn(
        "gap-2 px-3 py-1.5 text-xs",
        iconOnly && "h-11 w-11 items-center justify-center px-0 py-0",
        className,
      )}
      disabled={loading}
      rippleColor="rgba(255,255,255,0.85)"
      duration={700}
    >
      {baseContent}
      {!iconOnly && lastMood ? (
        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-zinc-300">
          {lastMood}
        </span>
      ) : null}
      {iconOnly && <span className="sr-only">Shuffle mood</span>}
    </RippleButton>
  );
}


