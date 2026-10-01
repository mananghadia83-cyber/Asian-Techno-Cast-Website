import { Fragment } from "react";
import { TODO_PATTERN } from "@/lib/text";

/** Renders content text, turning [[TODO: …]] into a visible placeholder badge. */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(new RegExp(TODO_PATTERN.source, "g"))) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <mark key={i} className="todo" data-todo>
        TODO: {m[1]}
      </mark>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>{p}</Fragment>
      ))}
    </>
  );
}
