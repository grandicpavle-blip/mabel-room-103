import { faqSr } from "@/lib/faq";
import { services, site } from "@/lib/site";

export function JsonLd() {
  const salonId = `${site.url}/#salon`;

  const salon = {
    "@type": ["BeautySalon", "HairSalon", "NailSalon"],
    "@id": salonId,
    name: site.name,
    alternateName: [
      site.formerName,
      "Medica life style",
      "Mabel room 103",
      "Mabel hair and nails",
    ],
    description: `${site.tagline}. Frizerski i nail salon na Bežanijskoj kosi, Novi Beograd. Šišanje, farbanje, manikir, gel lak i pedikir. Ranije ${site.formerName}.`,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: [
      `${site.url}/og-cover.jpg`,
      `${site.url}/video/salon-poster.jpg`,
      `${site.url}/brand/logo-square.jpg`,
    ],
    logo: `${site.url}/brand/logo-square.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postal,
      addressRegion: "Beograd",
      addressCountry: "RS",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.googleMaps,
    areaServed: [
      { "@type": "Place", name: "Bežanijska kosa" },
      { "@type": "Place", name: "Novi Beograd" },
      { "@type": "City", name: "Beograd" },
    ],
    knowsLanguage: ["sr", "en"],
    currenciesAccepted: "RSD",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "14:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "00:00",
        closes: "00:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usluge",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.text,
          areaServed: { "@type": "City", name: "Beograd" },
          provider: { "@id": salonId },
        },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.sredime,
        inLanguage: "sr",
      },
      result: { "@type": "Reservation", name: "Termin u salonu" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [site.instagram, site.googleMaps],
    priceRange: "$$",
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faqSr.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const video = {
    "@type": "VideoObject",
    "@id": `${site.url}/#salon-video`,
    name: `Enterijer salona ${site.name}`,
    description:
      "Kratak obilazak salona Mabel Room 103 na Bežanijskoj kosi: prostor za kosu, deo za nokte i čekaonica.",
    thumbnailUrl: [`${site.url}/video/salon-poster.jpg`],
    contentUrl: `${site.url}/video/salon-loop.mp4`,
    uploadDate: "2026-09-17",
    duration: "PT12S",
    inLanguage: "sr",
    isFamilyFriendly: true,
    publisher: { "@id": salonId },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [salon, faq, video],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
