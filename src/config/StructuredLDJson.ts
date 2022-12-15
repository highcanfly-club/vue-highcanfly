/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SKI SENSATIONS CHAMONIX
=========================================================
This website use:
- Vuejs v3
- Font Awesome
- And many others
*/
import type {
  SportsOrganization,
  WithContext,
  OpeningHoursSpecification,
  Product,
  PostalAddress,
  AggregateRating,
  DayOfWeek
} from "schema-dts";
import { $require } from "@/utilities/viteHelper.js";

const daysOfWeek:DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getStartOfSeason(): string {
  const now = new Date();
  const curMonth = now.getMonth();
  if (curMonth > 4) return `${now.getFullYear()}-12-01`;
  else return `${now.getFullYear() - 1}-12-01`;
}
function getEndOfSeason(): string {
  const now = new Date();
  const curMonth = now.getMonth();
  if (curMonth > 4) return `${now.getFullYear() + 1}-04-30`;
  else return `${now.getFullYear()}-04-30`;
}

function getOpeningHours(): OpeningHoursSpecification[] {
  const oh = [];
  daysOfWeek.forEach((day) => {
    oh.push({
      "@type": "OpeningHoursSpecification",
      validFrom: getStartOfSeason(),
      validThrough: getEndOfSeason(),
      dayOfWeek: `https://schema.org/${day}`,
      opens: "09:00:00",
      closes: "17:00:00",
    });
  });
  return oh;
}

const cdvl59: SportsOrganization = {
  "@type": "SportsOrganization",
  name: "Comité Départemental de Vol Libre du Nord",
  url: "https://cdvl59.cf",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 digue Nicolas II",
    postalCode: "59240",
    addressLocality: "Dunkerque",
    addressCountry: "FR",
  },
};

const ligueHautDeFrance: SportsOrganization = {
  "@type": "SportsOrganization",
  name: "Ligue de Vol Libre des Hauts-de-France",
};

const ffvl: SportsOrganization = {
  "@type": "SportsOrganization",
  name: "Fédération Française de Vol Libre",
  url: "https://www.ffvl.fr",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1 place du Général Goiran",
    postalCode: "06100",
    addressLocality: "Nice",
    addressCountry: "FR",
  } as PostalAddress,
};

const license: WithContext<Product> = {
  "@context": "https://schema.org",
  "@type": "Product",
  description: "Licence FFVL 2023",
  name: "Licence FFVL 2023",
  image: $require("@/assets/img/FFVL.svg"),
  brand: ffvl,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    price: "108.00",
    priceValidUntil: "2023-12-31",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "4"
  } as AggregateRating
};

export const addJsonLD = () => {
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "SportsClub",
      description: "Club de Parapente du Nord",
      name: "High Can Fly Parapente",
      alternateName: "Highcanfly",
      naics: "711211",
      image: $require("@/assets/img/logo_high_can_fly.svg"),
      logo: $require("@/assets/img/logo_high_can_fly.svg"),
      telephone: "+33 3 66 72 14 65",
      nonprofitStatus: "Nonprofit501c7",
      url: "https://www.highcanfly.club",
      address: {
        "@type": "PostalAddress",
        streetAddress: "119 rue Marceau Martin",
        postalCode: "59128",
        addressLocality: "Flers-en-Escrebieux",
        addressCountry: "FR",
      } as PostalAddress,
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.399619,
        longitude: 3.096906,
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 50.43358,
          longitude: 2.585847,
        },
        geoRadius: 200000,
      },
      sameAs: [
        "https://twitter.com/HighCanFlyClub",
        "https://www.instagram.com/highcanfly_parapente/",
        "https://github.com/eltorio/vue-highcanfly/tree/main",
      ],
      priceRange: "$",
      memberOf: [cdvl59, ligueHautDeFrance, ffvl],
    },
    license,
  ];
  const ldScript = document.createElement("script");
  ldScript.setAttribute("type", "application/ld+json");
  ldScript.textContent = JSON.stringify(jsonld);
  document.head.appendChild(ldScript);
};
