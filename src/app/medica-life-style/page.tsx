import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.formerName} → ${site.name}`,
  description: `${site.formerName} je sada ${site.name}. Nova adresa: ${site.address.full}. Zakaži termin online.`,
  alternates: {
    canonical: "/medica-life-style",
  },
};

export default function MedicaAliasPage() {
  return (
    <main className="section-pad mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center py-24">
      <p className="mb-3 text-sm uppercase tracking-[0.24em] text-blush">
        Rebrand
      </p>
      <h1 className="font-display text-4xl leading-tight text-ink md:text-6xl">
        {site.formerName} je sada {site.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink-soft">
        Tražili ste {site.formerName}? Mi smo isti tim - sada pod imenom{" "}
        {site.name}, na adresi {site.address.full} (Bežanijska kosa).
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/#zakazi" className="btn-primary">
          Zakaži termin
        </Link>
        <Link href="/" className="btn-ink-ghost">
          Idi na početnu
        </Link>
      </div>
    </main>
  );
}
