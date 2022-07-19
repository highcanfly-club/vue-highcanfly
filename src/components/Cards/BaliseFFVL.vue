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
import { Router } from 'vue-router';
import _places from "@/config/places.json";
import type GeoJSON from '@/types/GeoJSON';
import type { BaliseData } from "@/plugins/BaliseFFVLHelper"
import { getBaliseData, baliseNull } from "@/plugins/BaliseFFVLHelper"
import { FlyingPlace } from '@/types/GeoJSON';

const places: GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection;
const globalRouter = window.app.config.globalProperties.$router as Router; //because it will run in a distinct App


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
        this.flyingPlace = this.getFlyingPlace(this.slug) as FlyingPlace;
        this.getFfvlData(this.flyingPlace);
    },
    methods: {
        routerPush() {
            globalRouter.push({ path: `/meteo/${this.slug}`, hash: "#top-nav" });
        },
        getFfvlData(flyingPlace:FlyingPlace) {
            getBaliseData(flyingPlace).then((baliseDataFfvl:BaliseData)=>{
                        this.baliseData = baliseDataFfvl.balise;
                        this.baliseName = baliseDataFfvl.baliseName;
                        this.isOk = baliseDataFfvl.flyable;
            })

        },
        getFlyingPlace(slug: string): GeoJSON.FlyingPlace {
            return places.features.filter((place: GeoJSON.FlyingPlace) => { return place.properties.slug === slug })[0];
        }
    }
})
</script>