import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  themeColor: "#faf7f3",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Frizerski i nail salon, Bežanijska kosa`,
    template: `%s | ${site.name}`,
  },
  description: `Frizerski i nail salon na Bežanijskoj kosi, Novi Beograd. Šišanje, farbanje, balayage, manikir, gel lak i pedikir. Ranije ${site.formerName}. Zakažite online ili pozovite ${site.phone}.`,
  keywords: [
    "Mabel Room 103",
    "frizerski salon Bežanijska kosa",
    "nail salon Bežanijska kosa",
    "manikir Novi Beograd",
    "gel lak Bežanijska kosa",
    "pedikir Novi Beograd",
    "balayage Beograd",
    "farbanje kose Novi Beograd",
    "Medica life & style",
    "frizerski salon Novi Beograd",
    "salon lepote Bežanijska kosa",
    "Ljubinke Bobić 3",
  ],
  applicationName: site.name,
  category: "beauty",
  openGraph: {
    type: "website",
    locale: "sr_RS",
    alternateLocale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Frizerski i nail salon, Bežanijska kosa`,
    description: `${site.tagline}. Kosa, farbanje, manikir i pedikir na Bežanijskoj kosi. Ranije ${site.formerName}.`,
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: `Rad iz salona ${site.name} - balayage i talasi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Frizerski i nail salon, Bežanijska kosa`,
    description: `${site.tagline}. Kosa, farbanje, manikir i pedikir - Novi Beograd.`,
    images: ["/og-cover.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <JsonLd />
        <RevealObserver />
        {children}
      </body>
    </html>
  );
}
