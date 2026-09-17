"use client";

import { IconClock, IconMaps, IconPhone, IconStar } from "@/components/Icons";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Hero() {
  const { t } = useLang();

  return (
    <section id="top" className="hero-shell">
      <div className="hero-media">
        <div className="hero-media-frame">
          <video
            width={480}
            height={848}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/salon-poster.jpg"
            aria-label={t.heroVideoAlt}
          >
            <source src="/video/salon-loop.mp4" type="video/mp4" />
          </video>
          <span className="hero-scrim" aria-hidden="true" />
        </div>
        <p className="hero-media-caption">{t.heroVideoCaption}</p>
      </div>

      <div className="hero-inner section-pad">
        <div className="hero-col">
          <p className="hero-eyebrow">{t.heroEyebrow}</p>

          <h1 className="hero-title font-display">
            {site.name}
            <span className="hero-h1-sub">{t.heroH1Sub}</span>
          </h1>

          <p className="hero-lead">
            {t.tagline}. {t.supportLine}.
          </p>

          <a
            href={site.googleReviews}
            target="_blank"
            rel="noreferrer"
            className="hero-rating"
          >
            <span className="hero-rating-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <IconStar key={i} className="h-3.5 w-3.5" />
              ))}
            </span>
            <span>
              <strong>{site.rating.value.toFixed(1)}</strong> · {site.rating.count}{" "}
              {t.heroRatingSuffix}
            </span>
          </a>

          <div className="hero-actions">
            <a href="#zakazi" className="btn-primary">
              {t.bookCta}
            </a>
            <a href={site.phoneHref} className="btn-ink-ghost">
              <IconPhone className="h-4 w-4" />
              {t.call}
            </a>
          </div>

          <dl className="hero-facts">
            <div>
              <dt>
                <IconMaps className="h-4 w-4" />
                {t.address}
              </dt>
              <dd>
                <a href={site.googleMaps} target="_blank" rel="noreferrer">
                  {site.address.full}
                </a>
              </dd>
            </div>
            <div>
              <dt>
                <IconClock className="h-4 w-4" />
                {t.hours}
              </dt>
              <dd>{t.heroHoursShort}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
