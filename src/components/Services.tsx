"use client";

import { useLang } from "@/lib/i18n";

export function Services() {
  const { t } = useLang();

  return (
    <section id="usluge" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="reveal max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
          {t.servicesEyebrow}
        </p>
        <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          {t.servicesTitle}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{t.servicesLead}</p>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {t.services.map((service, index) => (
          <article
            key={service.title}
            className="reveal border-t border-[var(--line)] pt-6"
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <h3 className="font-display text-2xl text-ink">{service.title}</h3>
            <p className="mt-3 text-ink-soft">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
