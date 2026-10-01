import Image from "next/image";
import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ImageSlot as Slot } from "@/lib/types";

/**
 * Shows the photo when one has been added to /public/images, otherwise a
 * labelled placeholder describing the photo that is needed.
 */
export function ImageSlot({
  image,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  image: Slot;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const t = useTranslations("common");
  if (image.src) {
    return (
      <div className={`relative min-w-0 self-start overflow-hidden rounded-lg bg-steel ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={`flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-fog/50 bg-paper p-6 text-center text-mist ${className}`}
    >
      <Camera aria-hidden className="h-7 w-7 text-fog" />
      <span className="font-mono text-xs uppercase tracking-wider text-fog">{t("photoNeeded")}</span>
      <span className="max-w-xs text-sm">{image.alt}</span>
    </div>
  );
}
