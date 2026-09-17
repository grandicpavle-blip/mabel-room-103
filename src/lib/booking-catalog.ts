export type CatalogService = {
  name: string;
  duration: string;
  price: string;
};

export type CatalogCategory = {
  id: string;
  title: string;
  services: CatalogService[];
};

export const bookingCatalog: CatalogCategory[] = [
  {
    id: "top",
    title: "Top tretmani",
    services: [
      { name: "Gel lak - ruke", duration: "60 min", price: "2.600" },
      { name: "Korekcija noktiju gelom - S dužina", duration: "90 min", price: "2.900" },
    ],
  },
  {
    id: "manikir",
    title: "Manikir",
    services: [
      { name: "Manikir", duration: "45 min", price: "1.800" },
      { name: "Gel lak - ruke", duration: "60 min", price: "2.600" },
      { name: "Skidanje gel laka sa manikirom", duration: "60 min", price: "2.000" },
      { name: "Skidanje gela sa manikirom", duration: "45 min", price: "2.200" },
      { name: "Ojačavanje prirodnih noktiju gelom - S", duration: "60 min", price: "2.600" },
      { name: "Ojačavanje prirodnih noktiju gelom - M", duration: "90 min", price: "2.900" },
      { name: "Ojačavanje prirodnih noktiju gelom - L", duration: "120 min", price: "3.100" },
      { name: "Korekcija noktiju gelom - S", duration: "90 min", price: "2.900" },
      { name: "Korekcija noktiju gelom - M", duration: "105 min", price: "3.100" },
      { name: "Korekcija noktiju gelom - L", duration: "120 min", price: "3.300" },
      { name: "Izlivanje noktiju gelom - S", duration: "90 min", price: "3.400" },
      { name: "Izlivanje noktiju gelom - M", duration: "120 min", price: "3.700" },
      { name: "Izlivanje noktiju gelom - L", duration: "150 min", price: "4.000" },
      { name: "Lakiranje noktiju", duration: "30 min", price: "300" },
      { name: "Nail art - 1 nokat", duration: "15 min", price: "300" },
    ],
  },
  {
    id: "pedikir",
    title: "Pedikir",
    services: [
      { name: "Gel lak - noge", duration: "45 min", price: "2.300" },
      { name: "Ruski pedikir - estetski", duration: "60 min", price: "2.800" },
      { name: "Ruski pedikir sa gel lakom", duration: "75 min", price: "3.800" },
      { name: "Polupedikir - obrada noktiju", duration: "30 min", price: "1.500" },
      { name: "Polupedikir - obrada stopala", duration: "40 min", price: "1.800" },
      { name: "Skidanje gel laka - noge", duration: "20 min", price: "800" },
    ],
  },
  {
    id: "sisanje",
    title: "Šišanje i feniranje",
    services: [
      { name: "Skraćivanje šiški", duration: "15 min", price: "800" },
      { name: "Žensko šišanje - sve dužine", duration: "45 min", price: "1.800" },
      { name: "Žensko šišanje + feniranje na ravno - srednja", duration: "60 min", price: "2.400" },
      { name: "Žensko šišanje + feniranje na ravno - duga", duration: "75 min", price: "2.800" },
      { name: "Feniranje na ravno - kratka", duration: "30 min", price: "900" },
      { name: "Feniranje na ravno - srednja", duration: "40 min", price: "1.000" },
      { name: "Feniranje na ravno - duga", duration: "45 min", price: "1.200" },
      { name: "Feniranje na talase / lokne - srednja", duration: "50 min", price: "1.100" },
      { name: "Feniranje na talase / lokne - duga", duration: "50 min", price: "1.300" },
      { name: "Feniranje + presa / figaro - srednja", duration: "45 min", price: "950" },
      { name: "Feniranje + presa / figaro - duga", duration: "45 min", price: "1.050" },
    ],
  },
  {
    id: "farbanje",
    title: "Farbanje i blajhanje kose",
    services: [
      { name: "Farbanje izrastka - kratka", duration: "70 min", price: "3.100" },
      { name: "Farbanje izrastka - srednja", duration: "75 min", price: "3.400" },
      { name: "Farbanje izrastka - duga", duration: "80 min", price: "3.600" },
      { name: "Farbanje cele dužine - kratka", duration: "90 min", price: "4.800" },
      { name: "Farbanje cele dužine - srednja", duration: "100 min", price: "5.800" },
      { name: "Farbanje cele dužine - duga", duration: "110 min", price: "6.800" },
      { name: "Preliv cele dužine - duga", duration: "60 min", price: "4.000" },
      { name: "Blajhanje izrastka - sve dužine", duration: "90 min", price: "4.500" },
    ],
  },
  {
    id: "pramenovi",
    title: "Pramenovi / ombre / balayage",
    services: [
      { name: "Površinski pramenovi - kratka", duration: "120 min", price: "5.500" },
      { name: "Površinski pramenovi - srednja", duration: "130 min", price: "6.500" },
      { name: "Površinski pramenovi - duga", duration: "150 min", price: "7.500" },
      { name: "Pramenovi na foliju - srednja", duration: "150 min", price: "7.000" },
      { name: "Pramenovi na foliju - duga", duration: "180 min", price: "8.500" },
      { name: "Balayage - srednja", duration: "160 min", price: "9.000" },
      { name: "Balayage - duga", duration: "180 min", price: "11.000" },
      { name: "Balayage - ekstra duga", duration: "180 min", price: "13.000" },
    ],
  },
  {
    id: "frizure",
    title: "Frizure i nega kose",
    services: [
      { name: "Kikica / pletenica - komad", duration: "20 min", price: "350" },
      { name: "Svečana frizura - srednja", duration: "45 min", price: "2.500" },
      { name: "Svečana frizura - duga", duration: "60 min", price: "3.200" },
      { name: "Svečana frizura - rep", duration: "45 min", price: "2.200" },
      { name: "Keratinsko ispravljanje - srednja", duration: "180 min", price: "8.000" },
      { name: "Nashi clasic tretman", duration: "40 min", price: "2.000" },
      { name: "Hashi filer therapy tretman", duration: "50 min", price: "3.700" },
      { name: "Nadogradnja kose keratin / micro ring - po pramenu", duration: "180 min", price: "600" },
    ],
  },
];
