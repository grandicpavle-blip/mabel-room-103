"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { faqEn, faqSr } from "@/lib/faq";

export type Lang = "sr" | "en";

type Dictionary = typeof dictionaries.sr;

const dictionaries = {
  sr: {
    nav: [
      { href: "#usluge", label: "Usluge" },
      { href: "#galerija", label: "Galerija" },
      { href: "#o-nama", label: "O nama" },
      { href: "#utisci", label: "Utisci" },
      { href: "#tim", label: "Tim" },
    ],
    bookCta: "Zakaži termin",
    menu: "Meni",
    close: "Zatvori",
    heroEyebrow: "Hair & Nails · Bežanijska kosa",
    heroH1Sub: "Frizerski i nail salon na Bežanijskoj kosi",
    heroRatingSuffix: "recenzija na Google-u",
    heroHoursShort: "Pon–Pet 14–21 · Sub 10–17",
    heroVideoAlt:
      "Enterijer salona Mabel Room 103: prostor za kosu, deo za nokte i čekaonica",
    heroVideoCaption: "Naš prostor na Ljubinke Bobić 3",
    tagline: "Ljupkost u svakom detalju",
    supportLine: "Sve vezano za Vašu kosu i nokte",
    servicesEyebrow: "Usluge",
    servicesTitle: "Kosa i nokti, pažljivo i sa stilom",
    servicesLead:
      "Od dnevnog feniranja do svečane frizure i pedantnog manikira - sve na jednom mestu.",
    services: [
      {
        title: "Kosa",
        text: "Šišanje, feniranje, stilizovanje i nega - pažljivo prilagođeno Vašoj kosi.",
      },
      {
        title: "Farbanje i pramenovi",
        text: "Boja, preliv, balayage i ombre sa preciznošću i prirodnim završetkom.",
      },
      {
        title: "Manikir",
        text: "Gel lak, ojačavanje, korekcija i izlivanje - uredno i dugotrajno.",
      },
      {
        title: "Pedikir",
        text: "Estetski i ruski pedikir, gel lak na nogama i nege stopala.",
      },
      {
        title: "Frizure",
        text: "Svečane frizure, kikice i stilizovanje za posebne trenutke.",
      },
      {
        title: "Nega kose",
        text: "Tretmani i keratinska nega koji vraćaju sjaj i mekoću.",
      },
    ],
    galleryEyebrow: "Galerija",
    galleryTitle: "Naši radovi",
    galleryLead:
      "Boja, pramenovi, frizure i manikir iz salona. Klikni na sliku za veći prikaz.",
    galleryHair: "Kosa",
    galleryNails: "Nokti",
    galleryClose: "Zatvori",
    galleryPrev: "Prethodna slika",
    galleryNext: "Sledeća slika",
    aboutEyebrow: "O nama",
    aboutTitle: "Isti tim. Novo ime. Nova adresa.",
    aboutP1:
      "Mabel Room 103 je salon za kosu i nokte na Bežanijskoj kosi. Ranije ste nas poznavali kao Medica life & style - danas nastavljamo isti kvalitet rada na novoj lokaciji, pod novim imenom.",
    aboutP2:
      "Dođite po boju koja stoji, nokte koji traju i atmosferu u kojoj se osećate kao kod kuće.",
    call: "Pozovi",
    reviewsEyebrow: "Utisci",
    reviewsHeading: "Šta kažu klijenti",
    reviewsTrusted: "Poverenje od",
    reviewsTrustedAfter: "klijenata",
    allReviews: "Pogledaj na Google Maps",
    leaveReview: "Ostavite recenziju - dosta nam znači",
    leaveReviewLead:
      "Ako ste zadovoljni posetom, kratka Google recenzija pomaže novim klijentima da nas pronađu.",
    reviewsLoading: "Učitavamo Google recenzije…",
    reviewsEmpty: "Recenzije trenutno nisu dostupne ovde.",
    reviewsPrev: "Prethodne recenzije",
    reviewsNext: "Sledeće recenzije",
    teamEyebrow: "Tim",
    teamTitle: "Ljudi zbog kojih se vraćate",
    teamLead: "Iskustvo, preciznost i topla atmosfera - to je naš standard.",
    team: [
      {
        name: "Mara",
        role: "Kosa i boja",
        text: "Šišanje, farbanje, feniranje i frizure sa godinama poverenja klijenata.",
      },
      {
        name: "Biljana",
        role: "Nokti i pedikir",
        text: "Manikir, gel, izlivanje i pedikir - pedantno i bez greške.",
      },
    ],
    bookingEyebrow: "Termin",
    bookingTitle: "Online rezervacija",
    bookingLead:
      "Izaberite uslugu i termin direktno u kalendaru ispod.",
    viber: "Pišite nam na Viber",
    contactEyebrow: "Posetite nas",
    contactTitle: "Adresa i radno vreme",
    address: "Adresa",
    emailLabel: "Mejl",
    hours: "Radno vreme",
    hoursRows: [
      { days: "Ponedeljak – Petak", time: "14:00 – 21:00" },
      { days: "Subota", time: "10:00 – 17:00" },
      { days: "Nedelja", time: "Zatvoreno" },
    ],
    openMaps: "Navigacija",
    area: "Bežanijska kosa, Novi Beograd",
    footerFormerly: "Ranije",
    rights: "Sva prava zadržana.",
    skipToContent: "Pređi na sadržaj",
    faqEyebrow: "Česta pitanja",
    faqTitle: "Sve što vas obično zanima",
    faqLead:
      "Adresa, zakazivanje i usluge na jednom mestu. Ako nešto nije ovde, pozovite nas.",
    faq: faqSr,
  },
  en: {
    nav: [
      { href: "#usluge", label: "Services" },
      { href: "#galerija", label: "Gallery" },
      { href: "#o-nama", label: "About" },
      { href: "#utisci", label: "Reviews" },
      { href: "#tim", label: "Team" },
    ],
    bookCta: "Book now",
    menu: "Menu",
    close: "Close",
    heroEyebrow: "Hair & Nails · Bežanijska kosa",
    heroH1Sub: "Hair and nail salon in Bežanijska kosa, Belgrade",
    heroRatingSuffix: "reviews on Google",
    heroHoursShort: "Mon–Fri 14–21 · Sat 10–17",
    heroVideoAlt:
      "Inside Mabel Room 103: the hair area, the nail station and the waiting corner",
    heroVideoCaption: "Our space at Ljubinke Bobić 3",
    tagline: "Charm in every detail",
    supportLine: "Everything for your hair and nails",
    servicesEyebrow: "Services",
    servicesTitle: "Hair and nails, carefully styled",
    servicesLead:
      "From everyday blowouts to occasion updos and precise manicures - all in one place.",
    services: [
      {
        title: "Hair",
        text: "Cuts, blowouts, styling and care - tailored to your hair.",
      },
      {
        title: "Color & highlights",
        text: "Color, gloss, balayage and ombre with precision and a natural finish.",
      },
      {
        title: "Manicure",
        text: "Gel polish, strengthening, corrections and extensions - neat and lasting.",
      },
      {
        title: "Pedicure",
        text: "Aesthetic and Russian pedicure, gel polish and foot care.",
      },
      {
        title: "Styling",
        text: "Occasion hairstyles, braids and styling for special moments.",
      },
      {
        title: "Hair treatments",
        text: "Treatments and keratin care that restore shine and softness.",
      },
    ],
    galleryEyebrow: "Gallery",
    galleryTitle: "Our work",
    galleryLead:
      "Color, highlights, styling and manicures from the salon. Click a photo to enlarge.",
    galleryHair: "Hair",
    galleryNails: "Nails",
    galleryClose: "Close",
    galleryPrev: "Previous photo",
    galleryNext: "Next photo",
    aboutEyebrow: "About",
    aboutTitle: "Same team. New name. New address.",
    aboutP1:
      "Mabel Room 103 is a hair and nail salon in Bežanijska kosa. You may have known us as Medica life & style - today we continue the same quality of work at a new location, under a new name.",
    aboutP2:
      "Come for color that lasts, nails that hold, and an atmosphere that feels like home.",
    call: "Call",
    reviewsEyebrow: "Reviews",
    reviewsHeading: "What clients say",
    reviewsTrusted: "Trusted by",
    reviewsTrustedAfter: "clients",
    allReviews: "See on Google Maps",
    leaveReview: "Leave a review - it means a lot",
    leaveReviewLead:
      "If you enjoyed your visit, a short Google review helps new clients find us.",
    reviewsLoading: "Loading Google reviews…",
    reviewsEmpty: "Reviews are temporarily unavailable here.",
    reviewsPrev: "Previous reviews",
    reviewsNext: "Next reviews",
    teamEyebrow: "Team",
    teamTitle: "The people you return for",
    teamLead: "Experience, precision and a warm atmosphere - that is our standard.",
    team: [
      {
        name: "Mara",
        role: "Hair and color",
        text: "Cuts, coloring, blowouts and styling with years of client trust.",
      },
      {
        name: "Biljana",
        role: "Nails and pedicure",
        text: "Manicure, gel, extensions and pedicure - meticulous every time.",
      },
    ],
    bookingEyebrow: "Appointment",
    bookingTitle: "Online booking",
    bookingLead:
      "Choose a service and time in the calendar below.",
    viber: "Message us on Viber",
    contactEyebrow: "Visit us",
    contactTitle: "Address and hours",
    address: "Address",
    emailLabel: "Email",
    hours: "Opening hours",
    hoursRows: [
      { days: "Monday – Friday", time: "14:00 – 21:00" },
      { days: "Saturday", time: "10:00 – 17:00" },
      { days: "Sunday", time: "Closed" },
    ],
    openMaps: "Directions",
    area: "Bežanijska kosa, Novi Beograd",
    footerFormerly: "Formerly",
    rights: "All rights reserved.",
    skipToContent: "Skip to content",
    faqEyebrow: "FAQ",
    faqTitle: "The things people usually ask",
    faqLead:
      "Address, booking and services in one place. If something is missing, give us a call.",
    faq: faqEn,
  },
} as const;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sr");

  useEffect(() => {
    const saved = window.localStorage.getItem("mabel-lang");
    if (saved === "sr" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved === "sr" ? "sr" : "en";
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("mabel-lang", next);
    document.documentElement.lang = next === "sr" ? "sr" : "en";
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang] as Dictionary,
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within LanguageProvider");
  }
  return ctx;
}
