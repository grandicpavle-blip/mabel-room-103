"use client";

import { IconPlus } from "@/components/Icons";
import { useLang } from "@/lib/i18n";

export function Faq() {
  const { t } = useLang();

  return (
    <section id="pitanja" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <div className="reveal">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
            {t.faqEyebrow}
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {t.faqTitle}
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{t.faqLead}</p>
        </div>

        <div className="reveal">
          {t.faq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>
                <span>{item.q}</span>
                <IconPlus className="faq-sign h-4 w-4" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
