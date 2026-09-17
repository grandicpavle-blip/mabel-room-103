export type Work = {
  src: string;
  width: number;
  height: number;
  sr: string;
  en: string;
};

export const hairWorks: Work[] = [
  {
    src: "/gallery/kosa-1.jpg",
    width: 720,
    height: 960,
    sr: "Duga plava kosa sa stepenastim šišanjem",
    en: "Long blonde hair with layered cut",
  },
  {
    src: "/gallery/kosa-2.jpg",
    width: 720,
    height: 960,
    sr: "Plavi pramenovi u hladnom tonu",
    en: "Cool-toned blonde highlights",
  },
  {
    src: "/gallery/kosa-3.jpg",
    width: 540,
    height: 960,
    sr: "Tamna kosa sa balayage prelivima i talasima",
    en: "Dark hair with balayage and waves",
  },
  {
    src: "/gallery/kosa-4.jpg",
    width: 720,
    height: 960,
    sr: "Duga talasasta kosa u pepeljastoj plavoj",
    en: "Long wavy hair in ash blonde",
  },
  {
    src: "/gallery/kosa-5.jpg",
    width: 540,
    height: 960,
    sr: "Podignuta frizura u bakarnom tonu",
    en: "Copper-toned updo",
  },
  {
    src: "/gallery/kosa-6.jpg",
    width: 720,
    height: 960,
    sr: "Duga ravna plava kosa",
    en: "Long straight blonde hair",
  },
  {
    src: "/gallery/kosa-7.jpg",
    width: 720,
    height: 960,
    sr: "Medeno plava kosa sa mekim talasima",
    en: "Honey blonde hair with soft waves",
  },
];

export const nailWorks: Work[] = [
  {
    src: "/gallery/nokti-1.jpg",
    width: 1080,
    height: 1080,
    sr: "Gel lak u nude tonu sa pastelnim linijama",
    en: "Nude gel polish with pastel line art",
  },
  {
    src: "/gallery/nokti-2.jpg",
    width: 1080,
    height: 916,
    sr: "Francuski manikir sa cirkonima",
    en: "French manicure with rhinestones",
  },
  {
    src: "/gallery/nokti-3.jpg",
    width: 1080,
    height: 810,
    sr: "Roze ombre nokti, duži oblik",
    en: "Pink ombre nails, long shape",
  },
  {
    src: "/gallery/nokti-4.jpg",
    width: 1080,
    height: 810,
    sr: "Crveni i crni nokti sa ručno crtanim detaljima",
    en: "Red and black nails with hand-painted detail",
  },
  {
    src: "/gallery/nokti-5.jpg",
    width: 1080,
    height: 1080,
    sr: "Nude nokti bademastog oblika",
    en: "Nude almond-shaped nails",
  },
  {
    src: "/gallery/nokti-6.jpg",
    width: 1080,
    height: 810,
    sr: "Crveni francuski manikir sa srcima",
    en: "Red french manicure with hearts",
  },
];

export const allWorks: Work[] = [...hairWorks, ...nailWorks];
