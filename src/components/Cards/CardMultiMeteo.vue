<template>
  <div class="">
    <div
      class="flex flex-wrap sm:flex-nowrap sm:flex-row overflow-x-auto items-center"
    >
      <div
        v-for="(place, index) in places"
        :key="place.name"
        class="m-4 w-full sm:w-[38rem] h-[50rem] sm:min-w-[38rem] overflow-y-auto"
      >
        <div
          class="shadow-lg shadow-slate-500/50 min-w-0 break-words w-full shadow-lg rounded-xl bg-slate-50 p-2"
        >
          <lazy-observer :id="index" @on-change="onlazyMeteo">
            <card-meteo
              ref="card_meteo"
              :place="place"
              :lazy="true"
              :id="index"
            />
          </lazy-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LazyObserver from "@/components/Utilities/LazyObserver.vue";
//import { defineAsyncComponent } from "vue";
import CardMeteo from "@/components/Cards/CardMeteo.vue";
const places = [
  {
    lat: 50.416924,
    lon: 2.513619,
    slug: "la-comte",
    name: "La Comté",
    fly: {
      sectors: [
        [-1, 15],
        [270, 360],
      ],
      wind: [0, 5.55],
    },
  },
  {
    lat: 50.43358,
    lon: 2.585847,
    slug: "ohlain",
    name: "Parc d'Ohlain",
    fly: { sectors: [[180, 225]], wind: [0, 5.55] },
  },
  {
    lat: 50.679484,
    lon: 1.567162,
    slug: "equihen",
    name: "Équihen-Plage",
    fly: { sectors: [[250, 290]], wind: [0, 6.11] },
  },
  {
    lat: 50.401719,
    lon: 2.92927,
    slug: "aquaterra",
    name: "Gonflage au Parc des Îles",
    fly: { sectors: [[-1, 361]], wind: [0, 4] },
  },
  {
    lat: 50.443306,
    lon: 2.778216,
    slug: "11-19",
    name: "⚠ Terrils jumeaux ⚠",
    fly: {
      sectors: [
        [-1, 30],
        [260, 360],
      ],
      wind: [0, 1.666],
    },
  },
];
export default {
  data() {
    const slug = this.$route.params.slug
      ? this.$route.params.slug
      : null;
      console.log(slug);
      let _places = slug ?  ( this.getPlaceWithSlug(slug).length > 0 ? this.getPlaceWithSlug(slug) : places) : places ;//[this.getPlaceWithSlug(slug)] : places;
      console.log(_places);
    return {
      places: _places,
    };
  },
  methods: {
    onlazyMeteo(entry, unobserve, id) {
      if (entry.isIntersecting && this.$refs.card_meteo !== undefined) {
        unobserve();
        this.$refs.card_meteo[id].getWeatherAtPlace();
      }
    },
    getPlaceWithSlug(slug) {
      return places.filter((place) => {
        return place.slug === slug;
      });
    },
  },
  components: {
    LazyObserver,
    CardMeteo,
  },
};
</script>
