import { Link } from "wouter";

const MD_LINK = /\[([^\]]+)\]\((\/[^)]+)\)/g;

/** Render plain article paragraphs with markdown links and bold. */
export function RichParagraph({ text }: { text: string }) {
  const parts: Array<string | { href: string; label: string }> = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(MD_LINK.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push({ href: m[2], label: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <p>
      {parts.map((part, i) => {
        if (typeof part === "string") {
          const boldBits = part.split(/\*\*([^*]+)\*\*/);
          return boldBits.map((bit, j) =>
            j % 2 === 1 ? (
              <strong key={`${i}-${j}`}>{bit}</strong>
            ) : (
              <span key={`${i}-${j}`}>{bit}</span>
            ),
          );
        }
        return (
          <Link key={`${i}-${part.href}`} href={part.href} className="font-medium text-primary underline-offset-2 hover:underline">
            {part.label}
          </Link>
        );
      })}
    </p>
  );
}
