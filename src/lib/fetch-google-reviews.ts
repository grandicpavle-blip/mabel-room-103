export type GoogleReview = {
  name: string;
  text: string;
  avatar: string;
  relativeTime: string;
  rating: number;
  publishedAt: number;
};

export type GoogleReviewsPayload = {
  rating: number;
  count: number;
  reviews: GoogleReview[];
  avatars: string[];
  source: "google" | "fallback";
  updatedAt: string;
};

const FALLBACK: GoogleReviewsPayload = {
  rating: 5,
  count: 15,
  reviews: [],
  avatars: [],
  source: "fallback",
  updatedAt: new Date().toISOString(),
};

const FEATURE_ID = "0x475a6f006bad825b:0xce35ec6e346136c1";
const BOQ_BASE =
  "https://www.google.com/httpservice/web/PrivateLocalSearchUiDataService/GetLocalBoqProxy?msc=gwsrpc&reqpld=";
const MIN_RATING = 4;

function boqUrl(sortOrder: 1 | 2 | 3 | 4, paginationToken = "") {
  const reqpld = paginationToken
    ? [
        null,
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [
            null,
            sortOrder,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            [FEATURE_ID],
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            paginationToken,
          ],
        ],
      ]
    : [
        null,
        [
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          [
            null,
            sortOrder,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            20,
            null,
            [FEATURE_ID],
          ],
        ],
      ];

  return `${BOQ_BASE}${encodeURIComponent(JSON.stringify(reqpld))}`;
}

function upscaleAvatar(url: string) {
  if (!url) return "";
  if (url.includes("=")) return url.replace(/=.+$/, "=s120-c");
  return `${url}=s120-c`;
}

function cleanText(text: string) {
  return text
    .replace(/<\s*br\s*\/?\s*>/gi, " ")
    .replace(/&lt;\s*br\s*\/?\s*&gt;/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function formatRelative(ms: number, lang: "sr" | "en") {
  if (!Number.isFinite(ms) || ms <= 0) return "";
  const diff = Math.max(0, Date.now() - ms);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  const pick = (n: number, srOne: string, srMany: string, enOne: string, enMany: string) => {
    if (lang === "en") return n === 1 ? `1 ${enOne} ago` : `${n} ${enMany} ago`;
    return n === 1 ? `pre ${n} ${srOne}` : `pre ${n} ${srMany}`;
  };

  if (diff < hour) {
    const n = Math.max(1, Math.round(diff / minute));
    return pick(n, "minut", "minuta", "minute", "minutes");
  }
  if (diff < day) {
    const n = Math.max(1, Math.round(diff / hour));
    return pick(n, "sat", "sati", "hour", "hours");
  }
  if (diff < week * 2) {
    const n = Math.max(1, Math.round(diff / day));
    return pick(n, "dan", "dana", "day", "days");
  }
  if (diff < year) {
    const n = Math.max(1, Math.round(diff / month));
    return pick(n, "mesec", "meseci", "month", "months");
  }
  const n = Math.max(1, Math.round(diff / year));
  return pick(n, "godinu", "godina", "year", "years");
}

function extractPage(data: unknown): { reviews: unknown[]; nextToken: string } | null {
  if (!Array.isArray(data) || data.length < 2) return null;
  const payload = data[1];
  if (!Array.isArray(payload) || payload.length <= 10 || !payload[10]) return null;
  const node = payload[10];
  if (!Array.isArray(node) || node.length < 3 || !Array.isArray(node[2])) return null;
  return {
    reviews: node[2] as unknown[],
    nextToken: node.length > 6 && typeof node[6] === "string" ? node[6] : "",
  };
}

function needsTranslation(text: string) {
  if (!text.trim()) return false;
  if (/[šđčćžŠĐČĆŽ]/.test(text)) return true;
  if (
    /\b(je|su|za|na|od|do|da|sam|smo|ste|mi|ti|koji|koja|najbolji|najbolje|salon|kosa|frizer|frizerka|godina|godinama|preporuc|dobijete|uvek|usluga|profesionaln|sjajn|devojk|feniran|farbanj|sisanj|šišan|zurka|ugodno|cisto|bravo|ekipa|saradnja|dolazim|iskljucivo|savrsen)\b/i.test(
      text,
    )
  ) {
    return true;
  }
  const englishHits = (
    text.match(
      /\b(the|and|is|are|was|were|for|with|this|that|very|best|great|highly|recommend|hair|salon|years|always|service|professional)\b/gi,
    ) || []
  ).length;
  return englishHits < 2;
}

function looksEnglish(text: string) {
  return !needsTranslation(text);
}

function parseReview(raw: unknown, lang: "sr" | "en"): GoogleReview | null {
  if (!Array.isArray(raw) || raw.length < 5) return null;

  const rating = Number(raw[1]) || 5;
  const timeArr = raw[2];
  const relativeFallback =
    Array.isArray(timeArr) && typeof timeArr[0] === "string" ? timeArr[0] : "";
  const publishedMs =
    Array.isArray(timeArr) && timeArr[2] != null ? Number(timeArr[2]) : 0;

  const authorArr = raw[3];
  const name =
    Array.isArray(authorArr) && typeof authorArr[0] === "string"
      ? authorArr[0]
      : lang === "en"
        ? "Google user"
        : "Google korisnik";
  const avatar =
    Array.isArray(authorArr) && typeof authorArr[1] === "string" ? authorArr[1] : "";

  let text = "";
  if (typeof raw[27] === "string" && raw[27].trim()) text = raw[27].trim();
  else if (typeof raw[28] === "string" && raw[28].trim()) text = raw[28].trim();

  if (lang === "en") {
    for (let i = 0; i < raw.length - 1; i++) {
      if (raw[i] === "en" || raw[i] === "en-GB" || raw[i] === "en-US") {
        const next = raw[i + 1];
        if (typeof next === "string" && next.trim().length > 1) {
          text = next.trim();
          break;
        }
      }
    }
    if ((!text || !looksEnglish(text)) && typeof raw[37] === "string" && looksEnglish(raw[37])) {
      text = raw[37].trim();
    }
    if ((!text || !looksEnglish(text)) && typeof raw[38] === "string" && looksEnglish(raw[38])) {
      text = raw[38].trim();
    }
  }

  if (!text) {
    for (let i = 6; i < raw.length; i++) {
      const value = raw[i];
      if (
        typeof value === "string" &&
        value.length > 1 &&
        !value.startsWith("http") &&
        !/^[a-z]{2}(-[A-Z]{2})?$/i.test(value) &&
        !/bosanski|hrvatski|google|english|srpski/i.test(value)
      ) {
        text = value.trim();
        break;
      }
    }
  }

  text = cleanText(text);

  return {
    name,
    text,
    avatar: upscaleAvatar(avatar),
    relativeTime: formatRelative(publishedMs, lang) || relativeFallback,
    rating: rating >= 1 && rating <= 5 ? rating : 5,
    publishedAt: Number.isFinite(publishedMs) ? publishedMs : 0,
  };
}

async function fetchBoqPage(
  sortOrder: 1 | 2,
  lang: "sr" | "en",
  paginationToken = "",
) {
  const res = await fetch(boqUrl(sortOrder, paginationToken), {
    cache: "no-store",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "*/*",
      "Accept-Language":
        lang === "en"
          ? "en-US,en;q=0.9"
          : "hr,sr-Latn;q=0.9,bs;q=0.8,en;q=0.7",
    },
  });

  if (!res.ok) throw new Error(`BOQ failed (${res.status})`);
  const text = await res.text();
  const rawJson = text.includes(")]}'") ? text.split(")]}'").slice(1).join(")]}'") : text;
  return extractPage(JSON.parse(rawJson));
}

async function translateToEnglish(text: string) {
  if (!text || !needsTranslation(text)) return text;
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=sr|en`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return text;
    const data = (await res.json()) as {
      responseData?: { translatedText?: string };
    };
    const translated = data.responseData?.translatedText;
    if (!translated || /MYMEMORY WARNING/i.test(translated)) return text;
    return cleanText(translated);
  } catch {
    return text;
  }
}

async function fetchAllReviews(lang: "sr" | "en") {
  const reviews: GoogleReview[] = [];
  let token = "";

  for (let page = 0; page < 8; page++) {
    const data = await fetchBoqPage(2, lang, token);
    if (!data) break;

    for (const item of data.reviews) {
      const parsed = parseReview(item, lang);
      if (parsed) reviews.push(parsed);
    }

    if (!data.nextToken || data.nextToken === token) break;
    token = data.nextToken;
  }

  if (lang === "en") {
    return Promise.all(
      reviews.map(async (review) => ({
        ...review,
        text: await translateToEnglish(review.text),
      })),
    );
  }

  return reviews;
}

export async function fetchGoogleReviews(
  preferred: "sr" | "en" = "sr",
): Promise<GoogleReviewsPayload> {
  try {
    const reviews = await fetchAllReviews(preferred);
    if (!reviews.length) {
      return { ...FALLBACK, updatedAt: new Date().toISOString() };
    }

    const good = reviews
      .filter(
        (review) =>
          review.rating >= MIN_RATING && /[\p{L}\p{N}]/u.test(review.text),
      )
      .sort((a, b) => b.publishedAt - a.publishedAt);

    const rating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    const avatars = good
      .map((review) => review.avatar)
      .filter(Boolean)
      .slice(0, 4);

    return {
      rating: Math.round(rating * 10) / 10,
      count: reviews.length,
      reviews: good,
      avatars,
      source: "google",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return { ...FALLBACK, updatedAt: new Date().toISOString() };
  }
}
