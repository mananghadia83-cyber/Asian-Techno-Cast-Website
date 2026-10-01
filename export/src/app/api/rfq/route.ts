import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MAX_ATTACH_TOTAL_BYTES, rfqSchema, type RfqInput } from "@/lib/rfq";

const MIN_FILL_MS = 3000; // humans take longer than 3 s to fill the form

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured: rely on honeypot + timing only
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

async function streamToBuffer(stream: ReadableStream<Uint8Array>) {
  return Buffer.from(await new Response(stream).arrayBuffer());
}

/** Downloads the uploaded drawings so they arrive as email attachments. */
async function collectAttachments(files: RfqInput["files"]) {
  const attachments: { filename: string; content: Buffer }[] = [];
  const notAttached: string[] = [];
  let total = 0;
  for (const f of files) {
    if (total + f.size > MAX_ATTACH_TOTAL_BYTES) {
      notAttached.push(`${f.name} (${f.pathname})`);
      continue;
    }
    try {
      const blob = await get(f.pathname, { access: "private" });
      if (!blob || blob.statusCode !== 200) throw new Error("not found");
      attachments.push({ filename: f.name, content: await streamToBuffer(blob.stream) });
      total += f.size;
    } catch {
      notAttached.push(`${f.name} (${f.pathname})`);
    }
  }
  return { attachments, notAttached };
}

export async function POST(request: Request) {
  let input: RfqInput;
  try {
    input = rfqSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Bots: pretend success so they don't retry.
  if (input.website || input.elapsedMs < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (!(await verifyTurnstile(input.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Company", input.company],
    ["Country", input.country],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Product type", input.product],
    ["Material grade", input.grade || "—"],
    ["Annual quantity", input.annualQuantity || "—"],
    ["Target delivery", input.targetDelivery || "—"],
    ["Site language", input.locale],
  ];

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RFQ_TO_EMAIL;
  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[RFQ] Email not configured; submission received:", { ...input, turnstileToken: undefined });
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[RFQ] RESEND_API_KEY or RFQ_TO_EMAIL missing");
    return NextResponse.json({ ok: false, error: "config" }, { status: 503 });
  }

  const { attachments, notAttached } = input.files.length
    ? await collectAttachments(input.files)
    : { attachments: [], notAttached: [] };

  const html = `
    <h2 style="font-family:Arial,sans-serif">New RFQ from ${escape(input.company)} (${escape(input.country)})</h2>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="color:#555;border-bottom:1px solid #eee">${k}</td><td style="border-bottom:1px solid #eee"><strong>${escape(v)}</strong></td></tr>`).join("")}
    </table>
    <h3 style="font-family:Arial,sans-serif">Message</h3>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escape(input.message)}</p>
    <p style="font-family:Arial,sans-serif">Drawings attached: ${attachments.length}${
      notAttached.length
        ? `<br/>Too large to attach (download from Vercel → Storage → Blob):<br/>${notAttached.map(escape).join("<br/>")}`
        : ""
    }</p>`;

  const text = [
    `New RFQ from ${input.company} (${input.country})`,
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    input.message,
    "",
    `Drawings attached: ${attachments.length}`,
    ...(notAttached.length ? ["Not attached (in Vercel Blob):", ...notAttached] : []),
  ].join("\n");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RFQ_FROM_EMAIL ?? "Asian Technocast RFQ <onboarding@resend.dev>",
    to: to.split(",").map((s) => s.trim()),
    replyTo: input.email,
    subject: `RFQ: ${input.product} – ${input.company} (${input.country})`,
    html,
    text,
    attachments,
  });

  if (error) {
    console.error("[RFQ] Resend error", error);
    return NextResponse.json({ ok: false, error: "send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
