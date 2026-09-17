# Deploy i Google vidljivost — Mabel Room 103

## Gde sajt živi

| | |
|---|---|
| Hosting | Cloudflare Workers |
| Adresa | https://mabel-room-103.pavle-grandic.workers.dev |
| Domen | mabelroom103.rs (Loopia, čeka povezivanje) |
| Kod | https://github.com/grandicpavle-blip/mabel-room-103 |

## Pokretanje lokalno

Node nije globalno instaliran, pa pre svake komande:

```powershell
$env:PATH = "$env:LOCALAPPDATA\nodejs-portable\node-v22.14.0-win-x64;$env:PATH"
```

```bash
npm install
npm run dev          # razvojni server, http://localhost:3000
npm run build        # produkcijski build
npm start            # produkcijski server, http://localhost:3000
npm run preview      # lokalno u Cloudflare okruzenju, http://127.0.0.1:8787
```

`npm run preview` je bliži stvarnosti od `npm start` jer koristi isti runtime kao živi sajt.

## Objavljivanje

```bash
npm run deploy
```

Ovo gradi sajt i objavljuje ga na Cloudflare. Traje oko minut.

Ako pukne sa `EBUSY` — `npm run preview` je još pokrenut i drži fajlove. Zatvori ga.

Slanje na GitHub (`git push`) **ne** menja živi sajt. To su dve odvojene radnje.

## Povezivanje domena mabelroom103.rs

1. Cloudflare panel → Add a site → `mabelroom103.rs`
2. Cloudflare daje dva name servera
3. Kod Loopije zameni njihove name servere tim dvama
4. Sačekaj propagaciju (do 24h)
5. Cloudflare → Workers → mabel-room-103 → Settings → Domains & Routes → dodaj `mabelroom103.rs`
6. U `src/lib/site.ts` proveri da `url` odgovara domenu

## Posle povezivanja domena — Google

1. [Google Search Console](https://search.google.com/search-console) → dodaj property → pošalji `https://mabelroom103.rs/sitemap.xml`
2. Google Business Profile za **Mabel room 103** → dodaj adresu sajta
3. Proveri da su podaci isti svuda (sajt, Google Maps, Instagram, SrediMe):
   - Ime: Mabel Room 103
   - Adresa: Ljubinke Bobić 3, Beograd 11070
   - Telefon: +381 69 5018871
   - Mejl: mabelroom103@gmail.com
   - Radno vreme: Pon–Pet 14–21, Sub 10–17, nedeljom zatvoreno

Za lokalnu pretragu Google Business Profile nosi više težine od samog sajta. Redovne fotografije i nove recenzije tamo pomeraju stvari najviše.

## Podaci koji se povlače sami

- **Google recenzije** — uživo, preko `/api/google-reviews`
- **Ocena i broj recenzija** — uživo u heroju i sekciji Utisci; u strukturiranim podacima za Google se zapeče pri svakoj objavi
- **Zakazivanje** — SrediMe widget. Ako promene adresu profila, zameni `sredime` u `src/lib/site.ts`

`ratingFallback` u `site.ts` se koristi samo ako Google ne odgovori.
