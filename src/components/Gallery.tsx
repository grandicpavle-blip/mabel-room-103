"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IconInstagram } from "@/components/Icons";
import { allWorks, hairWorks, nailWorks, type Work } from "@/lib/gallery";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Gallery() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : allWorks[active];

  const step = useCallback((delta: number) => {
    setActive((value) =>
      value === null
        ? value
        : (value + delta + allWorks.length) % allWorks.length,
    );
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, step]);

  const renderGroup = (
    items: Work[],
    heading: string,
    offset: number,
    variant: string,
  ) => (
    <div className="reveal mt-12 md:mt-16">
      <h3 className="work-group-title">{heading}</h3>
      <div className={`work-grid ${variant}`}>
        {items.map((item, index) => {
          const alt = lang === "sr" ? item.sr : item.en;
          return (
            <button
              key={item.src}
              type="button"
              className="work-tile"
              onClick={() => setActive(offset + index)}
              aria-label={alt}
            >
              <Image
                src={item.src}
                alt={alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section
      id="galerija"
      className="section-pad mx-auto max-w-7xl overflow-x-clip py-24 md:py-32"
    >
      <div className="reveal flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
            {t.galleryEyebrow}
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {t.galleryTitle}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{t.galleryLead}</p>
        </div>
        <a
          href={site.instagram}
          target="_blank"
          rel="noreferrer"
          className="btn-ink-ghost shrink-0"
        >
          <IconInstagram className="h-4 w-4" />
          {site.instagramHandle}
        </a>
      </div>

      {renderGroup(hairWorks, t.galleryHair, 0, "work-grid-hair")}
      {renderGroup(
        nailWorks,
        t.galleryNails,
        hairWorks.length,
        "work-grid-nails",
      )}

      {current ? (
        <div
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "sr" ? current.sr : current.en}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="work-nav work-nav-prev"
            aria-label={t.galleryPrev}
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
          >
            ‹
          </button>

          <figure
            className="work-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={lang === "sr" ? current.sr : current.en}
              width={current.width}
              height={current.height}
              sizes="(max-width: 1024px) 92vw, 900px"
              priority
            />
            <figcaption>{lang === "sr" ? current.sr : current.en}</figcaption>
          </figure>

          <button
            type="button"
            className="work-nav work-nav-next"
            aria-label={t.galleryNext}
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
          >
            ›
          </button>

          <button
            type="button"
            className="work-close"
            aria-label={t.galleryClose}
            onClick={() => setActive(null)}
          >
            ×
          </button>
        </div>
      ) : null}
    </section>
  );
}
