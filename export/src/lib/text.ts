/** Placeholder syntax used throughout the content files: [[TODO: …]] */
export const TODO_PATTERN = /\[\[TODO:\s*([^\]]+?)\s*\]\]/g;

/** Removes placeholders, for places where a badge cannot be shown (meta tags, JSON-LD). */
export function stripTodos(text: string) {
  return text.replace(TODO_PATTERN, "").replace(/\s{2,}/g, " ").trim();
}

export const hasTodo = (text: string) => new RegExp(TODO_PATTERN.source).test(text);
