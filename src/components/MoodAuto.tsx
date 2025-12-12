"use client";

import { useEffect, useRef } from "react";
import { triggerMoodFromApi } from "@/utils/moodClient";

type MoodAutoProps = {
  intervalMs?: number;
  immediate?: boolean;
};

export default function MoodAuto({ intervalMs = 30000, immediate = true }: MoodAutoProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        await triggerMoodFromApi();
      } catch (err) {
        // swallow errors; it's a background effect
      }
    };

    if (immediate) run();

    timerRef.current = setInterval(() => {
      if (active) run();
    }, Math.max(5000, intervalMs)); // guard against too-frequent polling

    return () => {
      active = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [immediate, intervalMs]);

  return null;
}


