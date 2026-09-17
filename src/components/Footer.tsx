"use client";

import { Logo } from "@/components/Logo";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="section-pad border-t border-[var(--line)] py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo size="lg" />
          <p className="mt-4 max-w-md text-ink-soft">
            {t.tagline}. {t.footerFormerly} {site.formerName}.
          </p>
          <p className="mt-4 text-sm text-ink-soft">
            {site.address.full} · {site.phone} ·{" "}
            <a href={site.emailHref} className="hover:text-ink">
              {site.email}
            </a>
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-ink-soft">
          <a href="/medica-life-style" className="hover:text-ink">
            Medica life &amp; style
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl">
        <div className="hairline mb-6" />
        <p className="text-sm text-ink-soft">
          © {new Date().getFullYear()} {site.name}. {t.rights}
        </p>
      </div>
    </footer>
  );
}
