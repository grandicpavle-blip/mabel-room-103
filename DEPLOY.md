# Deploy i Google vidljivost — Mabel Room 103

## 1. Pokretanje lokalno

```bash
npm install
npm run dev
```

Otvori http://localhost:3000

## 2. Deploy na Vercel

1. Push projekat na GitHub (ili uvezi folder u Vercel).
2. Na [vercel.com](https://vercel.com) → New Project → izaberi repo.
3. Framework: Next.js (auto). Deploy.
4. Kad imaš domen `mabelroom103.rs` (ili drugi):
   - Vercel → Project → Settings → Domains → dodaj domen
   - Kod registrar-a: A/CNAME zapisi koje Vercel prikaže

## 3. Posle deploya — Google Business

1. Otvori Google Business Profile za **Mabel room 103**.
2. Dodaj website URL (npr. https://mabelroom103.rs).
3. Proveri da NAP bude isti svuda:
   - Ime: Mabel Room 103
   - Adresa: Ljubinke Bobić 3, Beograd 11070
   - Telefon: +381 69 5018871
4. Isto u Instagram bio i SrediMe.
5. Upload još fotki na Google Maps.
6. Traži nove Google recenzije od klijenata.

## 4. Search Console

1. [Google Search Console](https://search.google.com/search-console) → dodaj property.
2. Pošalji `https://tvoj-domen.rs/sitemap.xml`.

## 5. SrediMe

Widget: https://www.sredime.rs/widget/medica-life-style  
Ako preimenuju profil, zameni URL u `src/lib/site.ts` → `sredime`.
