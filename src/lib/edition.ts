// Everything the page says lives here, so a content change never touches layout.

export const profile = {
  name: "Bishal Banerjee",
  email: "bishal@bebishal.com",
  github: "https://github.com/ZenderGoD",
  linkedin: "https://www.linkedin.com/in/bishal-banerjee-4742a8190/",
  wisperBack: "https://composer1.com",
  imai: "https://imai.studio",
};

export const chapters = [
  { id: "prologue", numeral: "I", label: "Prologue" },
  { id: "rocket", numeral: "II", label: "The rocket" },
  { id: "rare", numeral: "III", label: "The allocation" },
  { id: "imai", numeral: "IV", label: "The studio" },
  { id: "wisper", numeral: "V", label: "The voice" },
  { id: "lab", numeral: "VI", label: "The lab" },
  { id: "workshop", numeral: "VII", label: "The workshop" },
  { id: "beliefs", numeral: "VIII", label: "What I believe" },
  { id: "epilogue", numeral: "IX", label: "Epilogue" },
] as const;

export const rocketCaptions = [
  { text: "Before software, I trained as a [mechatronics] engineer." },
  { text: "My final-year project was a prototype [rocket]." },
  { text: "It never flew. It passed every [simulation] we put it through." },
  { text: "I still work that way: build the real thing, then [test it honestly]." },
];

export const rareFacts = [
  { value: "100+", label: "stores, each with its own mix of what to send and how many" },
  { value: "70-80%", label: "accuracy for the allocation model once it ran in production" },
];

export const voiceDemo =
  "Remind the team the launch moves to Thursday and ask Priya for the final screenshots";

export const voicePolished =
  "Reminder: the launch moves to Thursday. Priya, could you send the final screenshots?";

export const wisperModes = [
  {
    name: "Dictation",
    line: "Hold a key, speak, let go. Clean text lands wherever your cursor is, in any app.",
  },
  {
    name: "Narration",
    line: "Select any text and hear it in a natural voice, or have it summarised first.",
  },
  {
    name: "Author",
    line: "A voice partner that sees what you point at and acts on your Mac when you ask.",
  },
  {
    name: "Wispy",
    line: "One shortcut for files, calendar, the web and the shell, always under your permission.",
  },
  {
    name: "The API",
    line: "The same engine as a public API, for teams who want it inside their own product.",
  },
];

export const labWorks = [
  {
    kind: "Research",
    title: "Forest fire and cyclone detection",
    line: "Vision transformers on satellite imagery, spotting events as they form.",
  },
  {
    kind: "Research",
    title: "Multi-modal market prediction",
    line: "News language and price history read together instead of apart.",
  },
  {
    kind: "Product",
    title: "Outfit recommendation",
    line: "A conversational stylist that ranks what to wear from what you own.",
  },
  {
    kind: "Shipped",
    title: "Dribe and Composer1",
    line: "Production websites, designed, built and run end to end.",
  },
  {
    kind: "Community",
    title: "Maker's Club and Paradox",
    line: "Co-founded a 200-member makers club, and ran events at IIT Madras's fest for three years.",
  },
];

export const education = [
  { school: "VIT Vellore", degree: "M.Tech, AI and ML" },
  { school: "IIT Madras", degree: "B.S., Data Science" },
  { school: "REVA University", degree: "B.Tech, Mechatronics" },
];

export const credits =
  "Engravings: Albrecht Dürer, Leonardo da Vinci, Jost Amman, Robert Hooke, the Flammarion woodcut (public domain), and Athanasius Kircher via Wellcome Collection (CC BY 4.0).";

// Projects with a live site get a picture of it; the rest get their icon or the red sun.
export const projects: {
  name: string;
  kind: string;
  line: string;
  href?: string;
  image?: string;
  icon?: string;
}[] = [
  {
    name: "AeroIntel",
    kind: "Product",
    line: "Live flight tracking for flying schools: every aircraft on a 3D globe, with weather and airport radar.",
    href: "https://aeroplane-mu.vercel.app",
    image: "/work/aerointel.webp",
  },
  {
    name: "RentCloths",
    kind: "Product",
    line: "Rent outfits from other people's closets, with pickup, cleaning and returns handled for you.",
    href: "https://fas-o-rent.vercel.app",
    image: "/work/rentcloths.webp",
  },
  {
    name: "YumYard",
    kind: "Client",
    line: "Ordering for a cafe: scan at the table or order home, with live kitchen status and an owner dashboard.",
    href: "https://yumyardfinal.vercel.app",
    image: "/work/yumyard.webp",
  },
  {
    name: "Zephsole",
    kind: "Studio",
    line: "A studio for designing footwear with AI, from first sketch to a finished render.",
    href: "https://zephsole.vercel.app",
    image: "/work/zephsole.webp",
  },
  {
    name: "Camera Bubble",
    kind: "Mac app",
    line: "A private camera overlay with its own stopwatch, for recording demos.",
    href: "https://github.com/ZenderGoD/camera-bubble",
    icon: "/work/camera-bubble.webp",
  },
  {
    name: "Deadline Bubble",
    kind: "Mac app",
    line: "A split-flap countdown that stays on top and turns from green to red as time runs out.",
    icon: "/work/deadline-bubble.webp",
  },
  {
    name: "Atherum",
    kind: "Engine",
    line: "Many AI agents deliberate in rounds and return one verdict on content, strategy or decisions.",
  },
  {
    name: "VAST",
    kind: "Product",
    line: "Upload a photo of an empty room and get interior design renders back.",
  },
];

export const tools = [
  "Swift",
  "SwiftUI",
  "Next.js",
  "TypeScript",
  "Convex",
  "Python",
  "PyTorch",
  "WebRTC",
  "Vercel",
  "Cloudflare",
];

// The lines that carry the reader from one chapter into the next, in Bishal's voice. Words in
// [brackets] ink in red. Keyed by the chapter they lead into.
export const bridges: Record<string, string> = {
  rocket: "It starts with [machines], not code.",
  rare: "That habit got me my first job. I didn't apply. I [messaged] the head of technology.",
  imai: "From one company's stores to a studio that helps [any brand] make things.",
  wisper: "IMAI's conversations got too long to read. So I made something that [reads them to you].",
  lab: "The same curiosity runs through the [smaller] work.",
  beliefs: "Everything I make comes back to a [few beliefs].",
  epilogue: "Which brings me to [you].",
};

// What I believe: principles Bishal has said in his own words while building.
export const beliefs = [
  {
    line: "Software should wait to be asked.",
    why: "Nothing I build watches you in the background. It acts when you ask, stays on your Mac, and shows you what it did.",
  },
  {
    line: "Use everything you have.",
    why: "Every part of a product should draw on every capability it has, so the best answer arrives the fastest way.",
  },
  {
    line: "Simple, then simpler.",
    why: "One line, one layer. More appears only when someone asks for it.",
  },
  {
    line: "Say what it really does.",
    why: "My rocket never flew. I would rather tell you that than dress it up.",
  },
  {
    line: "Anyone can build it.",
    why: "I'll give the ones who can't a service they can subscribe to. The craft is in making it easy.",
  },
];

// Each chapter of the story has its own colours: one combination from Sanzo Wada's Dictionary of
// Color Combinations (sanzo-wada.dmbk.io), softened slightly for screens. The page eases from one
// to the next as you scroll.
export const palettes: Record<string, { paper: string; ink: string; accent: string; wada: string }> = {
  prologue: { paper: "#e9dcab", ink: "#151412", accent: "#c4471a", wada: "190: Ivory Buff, English Red, Black" },
  rocket: { paper: "#b9e2da", ink: "#26316f", accent: "#c24a17", wada: "339: Light Glaucous Blue, Violet Blue, English Red" },
  rare: { paper: "#ebb994", ink: "#0a1033", accent: "#b7163f", wada: "232: Pinkish Cinnamon, Deep Indigo, Carmine" },
  imai: { paper: "#efeec4", ink: "#1f3540", accent: "#7a4a17", wada: "296: Sulphur Yellow, Slate, Raw Umber" },
  wisper: { paper: "#e6d9a9", ink: "#0f3d72", accent: "#9c3b10", wada: "343: Ivory Buff, Vandar Poel's Blue, Burnt Sienna" },
  lab: { paper: "#cdefe1", ink: "#182515", accent: "#a05a12", wada: "268: Nile Blue, Deep Slate Olive, Raw Sienna" },
  workshop: { paper: "#efe5a2", ink: "#11241e", accent: "#c63a6f", wada: "325: Naples Yellow, Deep Slate Green, Eugenia Red" },
  beliefs: { paper: "#bfd2ce", ink: "#121414", accent: "#8f1a33", wada: "221: Neutral Gray, Black, Carmine Red" },
  epilogue: { paper: "#efc184", ink: "#141311", accent: "#1834b0", wada: "344: Cinnamon Buff, Black, Deep Lyons Blue" },
};
