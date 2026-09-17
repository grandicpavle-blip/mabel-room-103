"use client";

import { useLang } from "@/lib/i18n";

export function SkipLink() {
  const { t } = useLang();

  return (
    <a href="#sadrzaj" className="skip-link">
      {t.skipToContent}
    </a>
  );
}
