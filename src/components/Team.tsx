"use client";

import { useLang } from "@/lib/i18n";

export function Team() {
  const { t } = useLang();

  return (
    <section id="tim" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="reveal max-w-2xl">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
          {t.teamEyebrow}
        </p>
        <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
          {t.teamTitle}
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{t.teamLead}</p>
      </div>

      <div className="mt-12 grid max-w-4xl gap-10 sm:grid-cols-2 md:mt-16">
        {t.team.map((member, index) => (
          <article
            key={member.name}
            className="reveal rounded-[1.5rem] bg-[rgba(250,247,243,0.7)] p-8"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-blush">
              {member.role}
            </p>
            <h3 className="font-display mt-3 text-3xl text-ink">{member.name}</h3>
            <p className="mt-4 text-ink-soft">{member.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
