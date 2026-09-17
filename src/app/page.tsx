"use client";

import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { SkipLink } from "@/components/SkipLink";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Team } from "@/components/Team";
import { LanguageProvider } from "@/lib/i18n";
import { ReviewsProvider } from "@/lib/reviews-context";

export default function HomePage() {
  return (
    <LanguageProvider>
      <ReviewsProvider>
        <SkipLink />
        <SmoothScroll />
        <Header />
        <main id="sadrzaj">
          <Hero />
          <Services />
          <Gallery />
          <About />
          <Reviews />
          <Team />
          <Booking />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </ReviewsProvider>
    </LanguageProvider>
  );
}
