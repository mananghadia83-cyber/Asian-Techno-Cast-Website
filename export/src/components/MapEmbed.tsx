"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Google Maps loads only after the visitor clicks, so no third-party
 * requests or cookies happen without consent (GDPR).
 */
export function MapEmbed({
  query,
  title,
  loadLabel,
  consentText,
}: {
  query: string;
  title: string;
  loadLabel: string;
  consentText: string;
}) {
  const [show, setShow] = useState(false);
  if (show) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="aspect-[4/3] w-full rounded-lg border border-steel"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-lg border border-steel bg-paper p-6 text-center">
      <MapPin aria-hidden className="h-8 w-8 text-ore" />
      <p className="max-w-sm text-sm text-mist">{consentText}</p>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-ink-2"
      >
        {loadLabel}
      </button>
    </div>
  );
}
