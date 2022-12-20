/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import type { Balise } from '@/types/Balise';
import { Forecast } from '@/types/ForecastCollection';
import { weatherIsFlyable } from '@/plugins/highcanfly'
import { FlyingPlace } from '@/types/GeoJSON';

export const baliseNull = {
    idbalise: "",
    date: "",
    vitesseVentMoy: "",
    vitesseVentMax: "",
    vitesseVentMin: "",
    directVentMoy: "",
    directVentInst: "",
    temperature: "",
    hydrometrie: "",
    pression: "",
    luminosite: "",
    LUM: "",
} as Balise;

export type BaliseData = { balise: Balise, baliseName: string, flyable: boolean };

export const WindSectors = {
    en: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
    fr: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"]
}

function getFFVLOpendataUrl(idBalise: number) {
    return `https://data.ffvl.fr/php/historique_relevesmeteo.php?idbalise=${idBalise}&heures=3`
}

export function getWindSector(windDeg: number, lang: string): string {
    const windDegNorm = windDeg % 360;
    const sector = Math.floor(windDegNorm / 22.5)
    return WindSectors[lang][sector];
}

export function isFlyable(place: GeoJSON.FlyingPlace, wind_speed_ms: number, wind_speed_max_ms: number, wind_dir_deg: number) {
    const forecast: Forecast = { //Fake Météo France Forecast
        dt: 0,
        T: {
            value: 0,
            windchill: 0,
        },
        humidity: 0,
        sea_level: 0,
        wind: {
            speed: wind_speed_ms,
            gust: wind_speed_max_ms,
            direction: wind_dir_deg,
            icon: "",
        },
        rain: { "1h": 0 },
        snow: { "1h": 0 },
        iso0: 0,
        "rain snow limit": 0,
        clouds: 0,
        weather: {
            icon: "",
            desc: "",
        },
    };
    return weatherIsFlyable(forecast, place.properties.fly)
}

function normalizeData(baliseData: Balise) {
    baliseData.vitesseVentMin = baliseData.vitesseVentMin === null ? "0" : baliseData.vitesseVentMin;
    baliseData.vitesseVentMoy = baliseData.vitesseVentMoy === null ? "0" : baliseData.vitesseVentMoy;
    baliseData.vitesseVentMax = baliseData.vitesseVentMax === null ? "0" : baliseData.vitesseVentMax;
    baliseData.directVentInst = baliseData.directVentInst === null ? "0" : (Number(baliseData.directVentInst) % 360).toString();
    baliseData.directVentMoy = baliseData.directVentMoy === null ? "0" : (Number(baliseData.directVentMoy) % 360).toString();
}
export function getBaliseData(flyingPlace: FlyingPlace) {
    return new Promise<BaliseData>((resolve, reject) => {
        fetch(getFFVLOpendataUrl(flyingPlace.properties.idBalise)).then(response => response.json() as Promise<Balise[]>)
            .then(baliseData => {
                let retBalise: Balise;
                let retBaliseName: string;
                let retIsOk: boolean;
                if (baliseData.length > 0) {
                    retBalise = baliseData[0];
                    normalizeData(retBalise);
                    retBaliseName = flyingPlace.properties.name
                    retIsOk = isFlyable(flyingPlace,
                        Number(retBalise.vitesseVentMoy) / 3.6,
                        Number(retBalise.vitesseVentMax) / 3.6,
                        Number(retBalise.directVentMoy));
                    resolve({ balise: retBalise, baliseName: retBaliseName, flyable: retIsOk });
                }
                else {
                    if (flyingPlace.properties.idBaliseAlt !== 0 && flyingPlace.properties.idBaliseAlt !== undefined) {
                        // second chance
                        fetch(getFFVLOpendataUrl(flyingPlace.properties.idBaliseAlt)).then(response => response.json() as Promise<Balise[]>)
                            .then(baliseData => {
                                if (baliseData.length > 0) {
                                    retBalise = baliseData[0];
                                    normalizeData(retBalise);
                                    retBaliseName = flyingPlace.properties.nameAlt;
                                    retIsOk = isFlyable(flyingPlace,
                                        Number(retBalise.vitesseVentMoy) / 3.6,
                                        Number(retBalise.vitesseVentMax) / 3.6,
                                        Number(retBalise.directVentMoy))
                                    resolve({ balise: retBalise, baliseName: retBaliseName, flyable: retIsOk });
                                }
                                else {
                                    retBalise = baliseNull;
                                    reject(`No data from balise=${flyingPlace.properties.idBaliseAlt}`);
                                }
                            })

                    } else {
                        retBalise = baliseNull;
                        reject(`No data from main balise and no balise alternative`);
                    }
                }
            });
    })

}
