"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";

export function About() {
  const { t } = useLang();

  return (
    <section id="o-nama" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="reveal relative aspect-square overflow-hidden rounded-[2rem] bg-[#ebe4db]">
          <Image
            src="/brand/logo-3d.jpg"
            alt="Mabel Room 103 - 3D logo"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>

        <div className="reveal">
          <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
            {t.aboutEyebrow}
          </p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {t.aboutTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.aboutP1}</p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.aboutP2}</p>
        </div>
      </div>
    </section>
  );
}
