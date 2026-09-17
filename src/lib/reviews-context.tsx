"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { GoogleReview } from "@/lib/fetch-google-reviews";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export type ReviewsData = {
  rating: number;
  count: number;
  reviews: GoogleReview[];
  avatars: string[];
};

type ReviewsContextValue = {
  data: ReviewsData;
  loading: boolean;
};

const initial: ReviewsData = {
  rating: site.ratingFallback.value,
  count: site.ratingFallback.count,
  reviews: [],
  avatars: [],
};

const ReviewsContext = createContext<ReviewsContextValue>({
  data: initial,
  loading: true,
});

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const [data, setData] = useState<ReviewsData>(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetch(`/api/google-reviews?lang=${lang}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((payload: Partial<ReviewsData>) => {
        if (!alive) return;
        if (payload?.rating && payload?.count) {
          setData({
            rating: payload.rating,
            count: payload.count,
            reviews: Array.isArray(payload.reviews) ? payload.reviews : [],
            avatars: Array.isArray(payload.avatars) ? payload.avatars : [],
          });
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

  const value = useMemo(() => ({ data, loading }), [data, loading]);

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewsContext);
}
