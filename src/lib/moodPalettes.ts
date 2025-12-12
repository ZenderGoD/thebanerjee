export type MoodPalette = {
  top: string;
  bottom: string;
  glow?: number;
  intensity?: number;
};

export type MoodKey = "calm" | "focus" | "energy" | "dusk" | "neon" | "ocean";

export const MOOD_PALETTES: Record<MoodKey, MoodPalette> = {
  calm: { top: "#243949", bottom: "#517fa4", glow: 0.0042, intensity: 0.9 },
  focus: { top: "#1FA2FF", bottom: "#12D8FA", glow: 0.005, intensity: 0.95 },
  energy: { top: "#F76B1C", bottom: "#FAD961", glow: 0.006, intensity: 1.1 },
  dusk: { top: "#41295a", bottom: "#2F0743", glow: 0.005, intensity: 0.94 },
  neon: { top: "#8E2DE2", bottom: "#4A00E0", glow: 0.0065, intensity: 1.0 },
  ocean: { top: "#11998e", bottom: "#38ef7d", glow: 0.0045, intensity: 0.9 },
};

export const MOOD_KEYS = Object.keys(MOOD_PALETTES) as MoodKey[];

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) => Math.round(255 * x)
    .toString(16)
    .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
};

export const randomPalette = (): MoodPalette => {
  const baseHue = Math.random() * 360;
  const hueOffset = 10 + Math.random() * 40;
  const top = hslToHex(baseHue, 70 + Math.random() * 20, 48 + Math.random() * 10);
  const bottom = hslToHex((baseHue + hueOffset) % 360, 65 + Math.random() * 25, 56 + Math.random() * 10);
  const glow = 0.004 + Math.random() * 0.003;
  const intensity = 0.9 + Math.random() * 0.25;
  return { top, bottom, glow, intensity };
};

export const pickPalette = (tag?: string): MoodPalette => {
  if (tag && MOOD_PALETTES[tag as MoodKey]) return MOOD_PALETTES[tag as MoodKey];
  return randomPalette();
};

