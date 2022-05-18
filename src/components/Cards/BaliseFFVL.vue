<template>
    <div class="w-full">
        <p><span class="cursor-pointer text-blue-600" @click="routerPush">Météo à {{ name }}</span><br>
            En direct à {{ baliseName }}:<br />
            <span :class="isOk ? 'text-emerald-500' : 'text-red-500'">{{ baliseData.vitesseVentMin }} min / {{
                    baliseData.vitesseVentMoy
            }} moy / {{
        baliseData.vitesseVentMax
}} max (km/h)</span>
            <svg class="mx-auto w-7 h-7 fill-transparent stroke-red-400 stroke-2" :style="{ transform: `rotate(${Number(baliseData.directVentMoy) + 180}deg)` }" :class="
                isOk
                    ? 'stroke-green-400'
                    : 'stroke-red-400'
            " version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
                style="enable-background: new 0 0 50 50" xml:space="preserve">
                <g id="surface1">
                    <path
                        d="M43.1,24c-0.6,0.6-1.4,0.9-2.2,0.9s-1.6-0.3-2.2-0.9L28.2,13.7v30c0,1.7-1.4,3-3.1,3s-3.3-1.3-3.3-3v-30
		L11.4,24c-1.2,1.2-3.2,1.2-4.5,0s-1.2-3.2,0-4.4L22.8,3.9c1.2-1.2,3.2-1.2,4.5,0l15.8,15.6C44.3,20.8,44.3,22.8,43.1,24z" />
                </g>
            </svg>
        </p>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Balise } from '@/types/Balise';
import { Router } from 'vue-router';
import _places from "@/config/places.json";
import type GeoJSON from '@/types/GeoJSON';
import { weatherIsFlyable } from '@/plugins/highcanfly'
import { Forecast } from '@/types/ForecastCollection';

const places: GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection;
const globalRouter = (window as any).app.config.globalProperties.$router as Router; //because it will run in a distinct App

const baliseNull = {
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

export default defineComponent({
    props: {
        id: {
            type: Number,
            default: 0,
        },
        idAlt: {
            type: Number,
            default: 0,
        },
        slug: {
            type: String,
            default: "null",
        },
        name: {
            type: String,
            default: "null",
        },
        nameAlt: {
            type: String,
            default: "null",
        },
    },
    setup() {
        const baliseData = ref(baliseNull);
        const baliseName = ref("");
        const flyingPlace = ref(null as GeoJSON.FlyingPlace);
        const isOk = ref(false);
        return {
            baliseData,
            baliseName,
            flyingPlace,
            isOk,
        }
    },
    mounted() {
        this.getBaliseData(this.id);
        this.flyingPlace = this.getFlyingPlace(this.slug);
    },
    methods: {
        routerPush(event: Event) {
            globalRouter.push({ path: `/meteo/${this.slug}`, hash: "#top-nav" });
        },
        getFFVLOpendataUrl(idBalise: number) {
            return `https://data.ffvl.fr/php/historique_relevesmeteo.php?idbalise=${idBalise}&heures=3`
        },
        getBaliseData() {
            fetch(this.getFFVLOpendataUrl(this.id)).then(response => response.json() as Promise<Balise[]>)
                .then(baliseData => {
                    if (baliseData.length > 0) {
                        this.baliseData = baliseData[0];
                        this.baliseName = this.name;
                        this.isOk = this.isFlyable(this.getFlyingPlace(this.slug),
                            Number(baliseData[0].vitesseVentMoy) / 3.6,
                            Number(baliseData[0].vitesseVentMax) / 3.6,
                            Number(baliseData[0].directVentMoy) / 3.6)
                    }
                    else {
                        if (this.idAlt !== 0 && this.idAlt !== undefined) {
                            // second chance
                            fetch(this.getFFVLOpendataUrl(this.idAlt)).then(response => response.json() as Promise<Balise[]>)
                                .then(baliseData => {
                                    if (baliseData.length > 0) {
                                        this.baliseData = baliseData[0];
                                        this.baliseData.vitesseVentMin = this.baliseData.vitesseVentMin === null ? "0" : this.baliseData.vitesseVentMin;
                                        this.baliseData.vitesseVentMoy = this.baliseData.vitesseVentMoy === null ? "0" : this.baliseData.vitesseVentMoy;
                                        this.baliseData.vitesseVentMax = this.baliseData.vitesseVentMax === null ? "0" : this.baliseData.vitesseVentMax;
                                        this.baliseName = this.nameAlt;
                                        this.isOk = this.isFlyable(this.getFlyingPlace(this.slug),
                                            Number(baliseData[0].vitesseVentMoy) / 3.6,
                                            Number(baliseData[0].vitesseVentMax) / 3.6,
                                            Number(baliseData[0].directVentMoy) / 3.6)
                                    }
                                    else {
                                        this.baliseData = baliseNull;
                                    }
                                })

                        } else {
                            this.baliseData = baliseNull;
                        }
                    }
                });
        },
        getFlyingPlace(slug: string): GeoJSON.FlyingPlace {
            return places.features.filter((place: GeoJSON.FlyingPlace) => { return place.properties.slug === slug })[0];
        },
        isFlyable(place: GeoJSON.FlyingPlace, wind_speed_ms: number, wind_speed_max_ms: number, wind_dir_deg: number) {
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
        },

    }
})
</script>