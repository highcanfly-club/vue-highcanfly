<template>
    <div class="w-full"> 
       <p>Vent à {{baliseName}}: {{ baliseData.vitesseVentMin }}min/{{ baliseData.vitesseVentMoy }}moy/{{ baliseData.vitesseVentMax }}max</p>
       <span class="cursor-pointer text-blue-600" @click="routerPush">Météo à {{name}}</span>
       </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { Balise } from '@/types/Balise';
import { Router } from 'vue-router';

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
        return {
            baliseData,
            baliseName,
        }
    },
    mounted() {
        this.getBaliseData(this.id);
    },
    methods: {
        routerPush(event:Event){
             globalRouter.push({path:`/meteo/${this.slug}`,hash:"#top-nav"});
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
                    }
                    else {
                        if (this.idAlt !== 0 && this.idAlt !== undefined) {
                            // second chance
                            fetch(this.getFFVLOpendataUrl(this.idAlt)).then(response => response.json() as Promise<Balise[]>)
                                .then(baliseData => {
                                    if (baliseData.length > 0) {
                                        this.baliseData = baliseData[0];
                                        this.baliseName = this.nameAlt;
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

    }
})
</script>