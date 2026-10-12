// A story caption: words in [brackets] are inked red.
export function Caption({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <p className="caption">
      {parts.map((part, i) =>
        part.startsWith("[") ? <mark key={i}>{part.slice(1, -1)}</mark> : <span key={i}>{part}</span>,
      )}
    </p>
  );
}
