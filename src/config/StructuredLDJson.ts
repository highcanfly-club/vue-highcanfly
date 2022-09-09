/*!
=========================================================
* © 2022 Ronan LE MEILLAT for SKI SENSATIONS CHAMONIX
=========================================================
This website use:
- Vuejs v3
- Font Awesome
- And many others
*/
const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
]

function getStartOfSeason(): string {
    const now = new Date()
    const curMonth = now.getMonth()
    if (curMonth > 4)
        return `${now.getFullYear()}-12-01`
    else
        return `${now.getFullYear() - 1}-12-01`
}
function getEndOfSeason(): string {
    const now = new Date()
    const curMonth = now.getMonth()
    if (curMonth > 4)
        return `${now.getFullYear() + 1}-04-30`
    else
        return `${now.getFullYear()}-04-30`
}
declare type OpeningHoursSpecification = {
    "@type": string;
    "validFrom": string;
    "validThrough": string;
    "dayOfWeek"?: string;
    "opens": string;
    "closes": string;
}
function getOpeningHours():OpeningHoursSpecification[] {
    const oh = []
    daysOfWeek.forEach((day) => {
        oh.push({
            "@type": "OpeningHoursSpecification",
            "validFrom": getStartOfSeason(),
            "validThrough": getEndOfSeason(),
            "dayOfWeek": `https://schema.org/${day}`,
            "opens": "09:00:00",
            "closes": "17:00:00"
        })
    })
    return oh
}

export const addJsonLD = () => {
    const jsonld = {
        "@context": "https://schema.org",
        "@type": "SportsClub",
        "description": "Club de Parapente du Nord",
        "name": "High Can Fly Parapente",
        "alternateName": "Highcanfly",
        "naics": "711211",
        "image": new URL(`/src/${'assets/img/logo_high_can_fly.svg'}`, import.meta.url).href,
        "logo": new URL(`/src/${'assets/img/logo_high_can_fly.svg'}`, import.meta.url).href,
        "telephone": "+33 3 66 72 14 65",
        "nonprofitStatus": "Nonprofit501c7",
        "url": "https://www.highcanfly.club",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "119 rue Marceau Martin",
          "postalCode": "59128",
          "addressLocality": "Flers-en-Escrebieux",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 50.399619,
          "longitude": 3.096906
        },
        "areaServed": {
          "@type": "GeoCircle",
          "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 50.43358,
              "longitude": 2.585847
          },
          "geoRadius": 200000
      },
        "sameAs" : [
                      "https://twitter.com/HighCanFlyClub",
                      "https://www.instagram.com/highcanfly_parapente/",
                      "https://github.com/eltorio/vue-highcanfly/tree/main"
                    ],
        "priceRange" : "$",
        "memberOf": [
        {
          "@type": "SportsOrganization",
          "name": "Comité Départemental de Vol Libre du Nord",
          "url": "https://cdvl59.cf",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "2 digue Nicolas II",
            "postalCode": "59240",
            "addressLocality": "Dunkerque"
          }
        },{
          "@type": "SportsOrganization",
          "name": "Ligue de Vol Libre des Hauts-de-France"
        },{
          "@type": "SportsOrganization",
          "name": "Fédération Française de Vol Libre",
          "url": "https://www.ffvl.fr"
        }
       ]
      }
    const ldScript = document.createElement('script')
    ldScript.setAttribute("type", "application/ld+json")
    ldScript.setAttribute("type", "application/ld+json")
    ldScript.textContent = JSON.stringify(jsonld)
    document.head.appendChild(ldScript)
}