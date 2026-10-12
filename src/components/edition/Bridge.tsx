type Word = { text: string; red: boolean };

// "It starts with [machines], not code." -> words, with the bracketed phrase red and its
// punctuation kept on the same word.
function words(text: string): Word[] {
  const out: Word[] = [];
  const re = /\[([^\]]+)\]([^\s[]*)|(\S+)/g;
  for (const m of text.matchAll(re)) {
    if (m[3]) {
      out.push({ text: m[3], red: false });
      continue;
    }
    const phrase = m[1].split(" ");
    phrase.forEach((w, i) => out.push({ text: i === phrase.length - 1 ? w + (m[2] ?? "") : w, red: true }));
  }
  return out;
}

// A line that carries the reader from one chapter into the next. With motion, each word starts
// pale and inks in as it scrolls past (Choreography scrubs [data-word]); words in [brackets] are red.
export function Bridge({ text }: { text: string }) {
  return (
    <div className="relative px-5 py-[22vh] md:px-8 lg:pl-48" data-bridge>
      <p className="max-w-[22ch] text-[clamp(34px,4.6vw,76px)] leading-[1.08] font-semibold tracking-[-0.02em]">
        {words(text).map((w, i) => (
          <span
            key={i}
            data-word
            data-red={w.red || undefined}
            className={`inline-block pr-[0.26em] ${w.red ? "text-red" : "text-ink"}`}
          >
            {w.text}
          </span>
        ))}
      </p>
    </div>
  );
}
