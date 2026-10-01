// Lists every placeholder still in the content files.
// Run: npm run todos            (prints a report)
//      npm run todos -- --locale=de  (one language only)
//      npm run todos -- --md    (prints Markdown, used to refresh TODO.md)
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../content/", import.meta.url).pathname;
const md = process.argv.includes("--md");
// --locale=en-US limits the report to one language folder (plus company.json).
const only = process.argv.find((a) => a.startsWith("--locale="))?.split("=")[1];
const todo = /\[\[TODO:\s*([^\]]+?)\s*\]\]/g;
const results = { text: new Map(), number: new Map(), photo: new Map() };

function add(kind, label, where) {
  const m = results[kind];
  if (!m.has(label)) m.set(label, new Set());
  m.get(label).add(where);
}

function walk(node, file, path) {
  if (typeof node === "string") {
    for (const m of node.matchAll(todo)) add("text", m[1], file);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, file, `${path}[${i}]`));
  } else if (node && typeof node === "object") {
    if ("unit" in node && "todo" in node && node.min == null && node.max == null && node.value == null) {
      add("number", `${node.todo} (${node.unit})`, file);
    }
    if ("src" in node && "alt" in node && node.src === null) add("photo", node.alt, file);
    for (const [k, v] of Object.entries(node)) if (k !== "todo") walk(v, file, `${path}.${k}`);
  }
}

const files = ["company.json"];
for (const dir of readdirSync(root, { withFileTypes: true })) {
  if (dir.isDirectory() && (!only || dir.name === only)) for (const f of readdirSync(join(root, dir.name))) files.push(`${dir.name}/${f}`);
}
for (const f of files) walk(JSON.parse(readFileSync(join(root, f), "utf8")), f, "");

const section = (title, map) => {
  const lines = [...map].map(([label, where]) => `- [ ] ${label}  \n  _in: ${[...where].join(", ")}_`);
  return `### ${title} (${map.size})\n\n${lines.join("\n")}\n`;
};
const out = [
  section("Numbers to fill in", results.number),
  section("Text placeholders", results.text),
  section("Photos needed", results.photo),
].join("\n");
console.log(md ? out : out.replace(/  \n  _in: /g, "  ← ").replace(/_/g, ""));
