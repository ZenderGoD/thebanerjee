import type { MoodPalette } from "@/lib/moodPalettes";

export async function triggerMoodFromApi() {
  try {
    const res = await fetch("/api/mood", { method: "GET", cache: "no-store" });
    if (!res.ok) throw new Error("request failed");
    const data = await res.json();
    const mood = data?.mood;
    const palette: MoodPalette | undefined = data?.palette;

    window.dispatchEvent(
      new CustomEvent("lightpillar:mood", {
        detail: { mood, palette },
      }),
    );

    return mood;
  } catch (error) {
    return undefined;
  }
}

