"use client";

import { useState } from "react";
import {
  FlagEn,
  FlagSr,
  IconInstagram,
  IconMaps,
} from "@/components/Icons";
import { useLang, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const switchLang = (next: Lang) => {
    setLang(next);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-pad mx-auto flex max-w-7xl items-center justify-end gap-3 py-4 xl:justify-between">
        <nav className="hidden items-center gap-6 rounded-full bg-[rgba(250,247,243,0.72)] px-5 py-3 text-sm text-ink-soft backdrop-blur-md xl:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="icon-btn"
          >
            <IconInstagram />
          </a>
          <a
            href={site.googleMaps}
            target="_blank"
            rel="noreferrer"
            aria-label="Google Maps"
            className="icon-btn"
          >
            <IconMaps />
          </a>

          <div className="lang-switch" role="group" aria-label="Language">
            <button
              type="button"
              className={lang === "sr" ? "is-active" : ""}
              onClick={() => switchLang("sr")}
              aria-label="Srpski"
            >
              <FlagSr />
              <span>SR</span>
            </button>
            <button
              type="button"
              className={lang === "en" ? "is-active" : ""}
              onClick={() => switchLang("en")}
              aria-label="English"
            >
              <FlagEn />
              <span>EN</span>
            </button>
          </div>

          <a
            href="#zakazi"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm text-cream transition hover:bg-blush-deep md:inline-flex"
          >
            {t.bookCta}
          </a>
          <button
            type="button"
            aria-label={t.menu}
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-full bg-[rgba(250,247,243,0.85)] px-4 py-2 text-sm text-ink backdrop-blur-md xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? t.close : t.menu}
          </button>
        </div>
      </div>

      {open ? (
        <div className="section-pad xl:hidden">
          <div className="rounded-3xl bg-[rgba(250,247,243,0.95)] p-5 shadow-lg backdrop-blur-md">
            <div className="flex flex-col gap-3 text-base text-ink">
              {t.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--line)] py-2 last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#zakazi"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                {t.bookCta}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
