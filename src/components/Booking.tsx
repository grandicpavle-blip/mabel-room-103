"use client";

import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Booking() {
  const { t } = useLang();

  return (
    <section id="zakazi" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="reveal mb-12 max-w-2xl md:mb-16">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
          {t.bookingEyebrow}
        </p>
        <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          {t.bookingTitle}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{t.bookingLead}</p>
      </div>

      <div className="reveal overflow-hidden rounded-[1.5rem]">
        <iframe
          title="Mabel Room 103 booking"
          src={site.sredime}
          className="booking-frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
