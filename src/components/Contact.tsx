"use client";

import { IconMaps, IconPhone, IconViber } from "@/components/Icons";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Contact() {
  const { t } = useLang();
  const mapSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`;

  return (
    <section id="kontakt" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="reveal">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
            {t.contactEyebrow}
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {t.contactTitle}
          </h2>
          <div className="mt-8 space-y-6 text-ink-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-ink">
                {t.address}
              </p>
              <p className="mt-2 text-lg text-ink">{site.address.full}</p>
              <p>{t.area}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-ink">
                {t.emailLabel}
              </p>
              <p className="mt-2 text-lg">
                <a
                  href={site.emailHref}
                  className="text-ink underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-blush"
                >
                  {site.email}
                </a>
              </p>
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-ink">
                {t.hours}
              </p>
              <ul className="mt-2 space-y-1">
                {t.hoursRows.map((row) => (
                  <li
                    key={row.days}
                    className="flex justify-between gap-6 text-ink"
                  >
                    <span>{row.days}</span>
                    <span>{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
              <a href={site.phoneHref} className="btn-ink-ghost">
                <IconPhone className="h-4 w-4" />
                {site.phone}
              </a>
              <a
                href={site.viberHref}
                target="_blank"
                rel="noreferrer"
                className="btn-viber"
              >
                <IconViber className="h-5 w-5" />
                <span>{t.viber}</span>
              </a>
            </div>

            <a
              href={site.googleMaps}
              className="btn-ink-ghost"
              target="_blank"
              rel="noreferrer"
            >
              <IconMaps className="h-4 w-4" />
              {t.openMaps}
            </a>
          </div>
        </div>

        <div className="reveal min-h-[360px] overflow-hidden rounded-[1.75rem]">
          <iframe
            title="Mabel Room 103 location"
            src={mapSrc}
            className="h-full min-h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
