import Image from "next/image";

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "sm"
      ? "h-10 w-10"
      : size === "lg"
        ? "h-16 w-16 sm:h-20 sm:w-20"
        : "h-11 w-11 sm:h-12 sm:w-12";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`relative overflow-hidden rounded-full ${dims}`}>
        <Image
          src="/brand/logo-mark.jpg"
          alt="Mabel Room 103"
          fill
          className="object-cover"
          sizes="80px"
          loading="lazy"
        />
      </span>
      <span className="leading-tight">
        <span className="font-display block text-lg tracking-tight text-ink sm:text-xl">
          Mabel Room
        </span>
        <span className="block text-[10px] uppercase tracking-[0.28em] text-blush">
          103 · salon lepote
        </span>
      </span>
    </span>
  );
}
