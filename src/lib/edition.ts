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
  { id: "epilogue", numeral: "VIII", label: "Epilogue" },
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
