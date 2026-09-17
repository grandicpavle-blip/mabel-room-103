"use client";

import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

type GoogleReview = {
  name: string;
  text: string;
  avatar: string;
  relativeTime: string;
  rating: number;
};

type ReviewsData = {
  rating: number;
  count: number;
  reviews: GoogleReview[];
  avatars: string[];
};

const PER_PAGE = 4;

function YellowStars() {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#FACC15"
          stroke="#FACC15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="17"
          viewBox="0 0 22 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
            fill={i < rating ? "#a67c52" : "rgba(42,35,32,0.18)"}
          />
        </svg>
      ))}
    </div>
  );
}

export function Reviews() {
  const { lang, t } = useLang();
  const [data, setData] = useState<ReviewsData>({
    rating: site.rating.value,
    count: site.rating.count,
    reviews: [],
    avatars: [],
  });
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [anim, setAnim] = useState<"idle" | "left" | "right">("idle");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/google-reviews?lang=${lang}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((payload: ReviewsData) => {
        if (!alive) return;
        if (payload?.rating && payload?.count) {
          setData({
            rating: payload.rating,
            count: payload.count,
            reviews: Array.isArray(payload.reviews) ? payload.reviews : [],
            avatars: Array.isArray(payload.avatars) ? payload.avatars : [],
          });
          setPage(0);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [lang]);

  const total = data.reviews.length;
  const pageCount = Math.max(1, Math.ceil(total / PER_PAGE));
  const badgeAvatars =
    data.avatars.length > 0
      ? data.avatars
      : data.reviews.map((review) => review.avatar).filter(Boolean).slice(0, 4);

  const visible = useMemo(() => {
    const start = page * PER_PAGE;
    return data.reviews.slice(start, start + PER_PAGE);
  }, [data.reviews, page]);

  const go = (dir: -1 | 1) => {
    if (pageCount <= 1) return;
    setAnim(dir === 1 ? "left" : "right");
    setPage((current) => (current + dir + pageCount) % pageCount);
  };

  return (
    <section id="utisci" className="section-pad mx-auto max-w-7xl py-24 md:py-32">
      <div className="reveal">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
          {t.reviewsEyebrow}
        </p>
        <h2 className="font-display mb-4 text-4xl leading-tight text-ink md:text-5xl">
          {t.reviewsHeading}
        </h2>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center divide-x divide-[rgba(42,35,32,0.18)]">
            <div className="flex -space-x-3 pr-3">
              {badgeAvatars.map((avatar, index) => (
                <img
                  key={`${avatar}-${index}`}
                  src={avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-12 w-12 rounded-full border-2 border-white object-cover transition hover:-translate-y-1"
                  style={{ zIndex: index + 1 }}
                />
              ))}
            </div>
            <div className="pl-3">
              <div className="flex items-center">
                <YellowStars />
                <p className="ml-2 font-medium text-ink">
                  {data.rating.toFixed(1)}
                </p>
              </div>
              <p className="text-sm text-ink-soft">
                {t.reviewsTrusted}{" "}
                <span className="font-medium text-ink">{data.count}</span>{" "}
                {t.reviewsTrustedAfter}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="reveal mt-12 md:mt-16">
        {loading && !total ? (
          <div className="rounded-lg border border-[var(--line)] bg-white px-6 py-16 text-center text-ink-soft shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            {t.reviewsLoading}
          </div>
        ) : null}

        {!loading && !total ? (
          <div className="rounded-lg border border-[var(--line)] bg-white px-6 py-12 text-center shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]">
            <p className="text-ink-soft">{t.reviewsEmpty}</p>
            <a
              href={site.googleReviews}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-6 inline-flex"
            >
              {t.allReviews}
            </a>
          </div>
        ) : null}

        {total ? (
          <div className="relative">
            <div
              key={page}
              className={`review-grid ${
                anim === "left"
                  ? "is-slide-left"
                  : anim === "right"
                    ? "is-slide-right"
                    : ""
              }`}
            >
              {visible.map((review, cardIndex) => (
                <article
                  key={`${review.name}-${review.relativeTime}-${review.text.slice(0, 24)}`}
                  className="review-card"
                  style={{ "--card-i": cardIndex } as React.CSSProperties}
                >
                  <div className="review-head">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={review.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-medium text-ink">
                        {review.name}
                      </h3>
                      {review.relativeTime ? (
                        <p className="text-sm text-ink-soft">{review.relativeTime}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="p-5">
                    <StarRow rating={review.rating} />
                    <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
                      {review.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {pageCount > 1 ? (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="review-nav-btn"
                  aria-label={t.reviewsPrev}
                  onClick={() => go(-1)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path
                      d="M15 6 9 12l6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <p className="min-w-[5rem] text-center text-sm text-ink-soft">
                  {page + 1} / {pageCount}
                </p>
                <button
                  type="button"
                  className="review-nav-btn"
                  aria-label={t.reviewsNext}
                  onClick={() => go(1)}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path
                      d="m9 6 6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="reveal mt-10 flex flex-col gap-4 rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl text-ink">{t.leaveReview}</p>
          <p className="mt-2 max-w-xl text-ink-soft">{t.leaveReviewLead}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={site.googleReviews}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            {t.leaveReview}
          </a>
          <a
            href={site.googleReviews}
            target="_blank"
            rel="noreferrer"
            className="btn-ink-ghost"
          >
            {t.allReviews}
          </a>
        </div>
      </div>
    </section>
  );
}
