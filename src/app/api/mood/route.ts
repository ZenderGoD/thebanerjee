import { NextResponse } from "next/server";
import { MOOD_KEYS, randomPalette } from "@/lib/moodPalettes";

const MODEL = "gpt-4o-mini";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const noStore = { "Cache-Control": "no-store" };

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  // Cheap fallback if key is missing
  if (!apiKey) {
    const palette = randomPalette();
    const randomMood = MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)];
    return NextResponse.json({ mood: randomMood, palette, source: "fallback" }, { status: 200, headers: noStore });
  }

  try {
    const seed = Math.random().toString(36).slice(2);
    const prompt = `Return ONLY compact JSON, no prose.
{
  "mood": "<any short mood word>",
  "palette": {
    "top": "#RRGGBB",
    "bottom": "#RRGGBB",
    "glow": 0.004-0.008,
    "intensity": 0.8-1.25
  }
}
Rules:
- Use a different palette every call; do not repeat. Seed: ${seed}.
- Hex colors only (#RRGGBB).
- Glow in range 0.004-0.008.
- Intensity in range 0.8-1.25.
- Do not add explanations.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You output JSON exactly as requested." },
          { role: "user", content: prompt },
        ],
        max_tokens: 120,
        temperature: 0.85,
      }),
    });

    if (!response.ok) {
      const palette = randomPalette();
      const randomMood = MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)];
      return NextResponse.json(
        { mood: randomMood, palette, source: "fallback", reason: "api_error" },
        { status: 200, headers: noStore },
      );
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch (err) {
      parsed = {};
    }

    const mood =
      typeof parsed?.mood === "string"
        ? parsed.mood.toLowerCase().trim()
        : MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)];

    const paletteInput = parsed?.palette ?? {};
    const palette = {
      top: typeof paletteInput.top === "string" ? paletteInput.top : undefined,
      bottom: typeof paletteInput.bottom === "string" ? paletteInput.bottom : undefined,
      glow:
        typeof paletteInput.glow === "number"
          ? Math.min(0.008, Math.max(0.003, paletteInput.glow))
          : undefined,
      intensity:
        typeof paletteInput.intensity === "number"
          ? Math.min(1.25, Math.max(0.8, paletteInput.intensity))
          : undefined,
    };

    const hasColors = palette.top && palette.bottom;
    const finalPalette = hasColors ? palette : randomPalette();

    const validMood = mood || MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)];

    return NextResponse.json(
      { mood: validMood, palette: finalPalette, source: "openai" },
      { status: 200, headers: noStore },
    );
  } catch (error) {
    const palette = randomPalette();
    const randomMood = MOOD_KEYS[Math.floor(Math.random() * MOOD_KEYS.length)];
    return NextResponse.json(
      { mood: randomMood, palette, source: "fallback", reason: "exception" },
      { status: 200, headers: noStore },
    );
  }
}

