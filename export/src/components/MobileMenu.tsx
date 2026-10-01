"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

/** Native <details> menu that closes itself after a page change. */
export function MobileMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <details ref={ref} className="group relative xl:hidden">
      <summary className="flex cursor-pointer list-none items-center rounded-md p-2 text-steel hover:bg-white/10 [&::-webkit-details-marker]:hidden">
        <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span className="sr-only">{label}</span>
      </summary>
      <div className="absolute right-0 mt-2 w-64 rounded-lg border border-white/10 bg-ink p-3 shadow-xl">
        {children}
      </div>
    </details>
  );
}
