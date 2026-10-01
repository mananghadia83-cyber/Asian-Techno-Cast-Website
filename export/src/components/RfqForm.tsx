"use client";

import { upload } from "@vercel/blob/client";
import { CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { ALLOWED_EXTENSIONS, MAX_FILES, MAX_FILE_BYTES, isAllowedFile } from "@/lib/rfq";
import { Turnstile } from "./Turnstile";

type Option = { value: string; label: string };
type Status = "idle" | "uploading" | "sending" | "done" | "error";

const inputCls =
  "mt-1 block w-full rounded-md border border-fog/50 bg-white px-3 py-2.5 text-ink shadow-sm focus:border-ore focus:outline-none focus:ring-2 focus:ring-ore/30";

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      {required && <span className="text-ore"> *</span>}
      {children}
      {hint && <span className="mt-1 block text-xs font-normal text-mist">{hint}</span>}
    </label>
  );
}

const fmtSize = (b: number) => `${(b / 1024 / 1024).toFixed(1)} MB`;

export function RfqForm({
  products,
  grades,
  turnstileSiteKey,
}: {
  products: Option[];
  grades: Option[];
  turnstileSiteKey?: string;
}) {
  const t = useTranslations("rfq");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const productRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Pre-select the product when arriving from a product page (?product=slug).
    const slug = new URLSearchParams(window.location.search).get("product");
    if (slug && productRef.current && products.some((p) => p.value === slug)) {
      productRef.current.value = slug;
    }
  }, [products]);

  const onToken = useCallback((tk: string) => setToken(tk), []);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFileError("");
    const next = [...files];
    for (const f of Array.from(list)) {
      if (!isAllowedFile(f.name)) {
        setFileError(t("fileType", { name: f.name }));
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        setFileError(t("fileSize", { name: f.name, max: fmtSize(MAX_FILE_BYTES) }));
        continue;
      }
      if (next.length >= MAX_FILES) {
        setFileError(t("fileCount", { max: MAX_FILES }));
        break;
      }
      next.push(f);
    }
    setFiles(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (turnstileSiteKey && !token) {
      setError(t("captchaPending"));
      return;
    }
    setError("");
    const fd = new FormData(form);
    const val = (k: string) => String(fd.get(k) ?? "");

    try {
      setStatus(files.length ? "uploading" : "sending");
      const uploaded = [];
      for (const f of files) {
        const safe = f.name.replace(/[^\w.\-]+/g, "_");
        const blob = await upload(`rfq/${safe}`, f, {
          access: "private",
          handleUploadUrl: "/api/rfq/upload",
          multipart: f.size > 8 * 1024 * 1024,
        });
        uploaded.push({ pathname: blob.pathname, name: f.name, size: f.size });
      }

      setStatus("sending");
      const productLabel = products.find((p) => p.value === val("product"))?.label ?? val("product");
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: val("name"),
          company: val("company"),
          country: val("country"),
          email: val("email"),
          phone: val("phone"),
          product: productLabel,
          grade: val("grade"),
          annualQuantity: val("annualQuantity"),
          targetDelivery: val("targetDelivery"),
          message: val("message"),
          website: val("website"),
          locale,
          files: uploaded,
          elapsedMs: Date.now() - startedAt.current,
          turnstileToken: token,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!data.ok) throw new Error(data.error ?? "send");
      setStatus("done");
      form.reset();
      setFiles([]);
    } catch (err) {
      setStatus("error");
      const code = (err as Error).message;
      setError(code === "captcha" ? t("errorCaptcha") : t("errorGeneric"));
      setToken("");
      setResetSignal((n) => n + 1);
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-lg border border-green-600/30 bg-green-50 p-8 text-center">
        <CheckCircle2 aria-hidden className="mx-auto h-10 w-10 text-green-700" />
        <h2 className="mt-3 font-display text-3xl tracking-wide text-ink">{t("successTitle")}</h2>
        <p className="mt-2 text-mist">{t("successText")}</p>
      </div>
    );
  }

  const busy = status === "uploading" || status === "sending";

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} required>
          <input name="name" required minLength={2} autoComplete="name" className={inputCls} />
        </Field>
        <Field label={t("company")} required>
          <input name="company" required autoComplete="organization" className={inputCls} />
        </Field>
        <Field label={t("country")} required>
          <input name="country" required autoComplete="country-name" list="rfq-countries" className={inputCls} />
          <datalist id="rfq-countries">
            {(t.raw("countries") as string[]).map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label={t("email")} required>
          <input name="email" type="email" required autoComplete="email" className={inputCls} />
        </Field>
        <Field label={t("phone")} hint={t("phoneHint")}>
          <input name="phone" type="tel" autoComplete="tel" className={inputCls} />
        </Field>
        <Field label={t("product")} required>
          <select
            name="product"
            required
            ref={productRef}
            defaultValue=""
            className={inputCls}
          >
            <option value="" disabled>
              {t("choose")}
            </option>
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
            <option value="other">{t("otherProduct")}</option>
          </select>
        </Field>
        <Field label={t("grade")}>
          <select name="grade" defaultValue="" className={inputCls}>
            <option value="">{t("gradeUnsure")}</option>
            {grades.map((g) => (
              <option key={g.value} value={g.label}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("annualQuantity")} hint={t("annualQuantityHint")}>
          <input name="annualQuantity" className={inputCls} />
        </Field>
        <Field label={t("targetDelivery")} hint={t("targetDeliveryHint")}>
          <input name="targetDelivery" className={inputCls} />
        </Field>
      </div>

      <Field label={t("message")} required hint={t("messageHint")}>
        <textarea name="message" required minLength={5} rows={6} className={inputCls} />
      </Field>

      {/* Drawings */}
      <div>
        <span className="block text-sm font-medium text-ink">{t("drawings")}</span>
        <label className="mt-1 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-fog/50 bg-paper px-4 py-6 text-center text-sm text-mist hover:border-ore">
          <Paperclip aria-hidden className="h-5 w-5 text-ore" />
          <span className="font-semibold text-ink">{t("drawingsCta")}</span>
          <span>
            {ALLOWED_EXTENSIONS.filter((e) => !["jpeg", "stp", "iges"].includes(e))
              .map((e) => e.toUpperCase())
              .join(", ")}{" "}
            · {t("drawingsLimit", { max: MAX_FILES, size: fmtSize(MAX_FILE_BYTES) })}
          </span>
          <input
            type="file"
            multiple
            className="sr-only"
            accept={ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",")}
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </label>
        {fileError && <p className="mt-2 text-sm text-red-700">{fileError}</p>}
        {files.length > 0 && (
          <ul className="mt-3 space-y-1.5 text-sm">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between rounded bg-paper px-3 py-1.5">
                <span className="truncate">
                  {f.name} <span className="text-mist">({fmtSize(f.size)})</span>
                </span>
                <button
                  type="button"
                  onClick={() => setFiles(files.filter((_, j) => j !== i))}
                  className="ml-2 rounded p-1 hover:bg-steel"
                  aria-label={t("removeFile", { name: f.name })}
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs text-mist">{t("confidential")}</p>
      </div>

      {/* Honeypot: hidden from people, bots tend to fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {turnstileSiteKey && (
        <Turnstile
          siteKey={turnstileSiteKey}
          language={locale.toLowerCase()}
          onToken={onToken}
          resetSignal={resetSignal}
        />
      )}

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-ore px-8 py-3 font-semibold text-white hover:bg-ore-dark disabled:opacity-60"
        >
          {busy && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
          {status === "uploading" ? t("uploading") : status === "sending" ? t("sending") : t("submit")}
        </button>
        <p className="text-xs text-mist">{t("privacyNote")}</p>
      </div>
    </form>
  );
}
