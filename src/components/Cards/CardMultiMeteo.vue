<template>
  <div class="flex justify-center">
    <div
      class="flex flex-wrap sm:flex-nowrap sm:flex-row overflow-x-auto items-center"
    >
      <div
        v-for="(place,index) in places" :key="place"
        class="m-4 w-full sm:w-[38rem] h-[50rem] sm:min-w-[38rem] overflow-y-auto"
      >
        <div
          class="shadow-slate-500/50 min-w-0 break-words w-full shadow-lg rounded-xl bg-slate-50 p-2"
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
import CardMeteo from "@/components/Cards/CardMeteo.vue";
import { ref } from "vue";
import places from "@/config/places.geojson";

export default {
  slug: ref(''),
  places: ref(places),
  data() {
    this.slug =  this.$route.params.slug ? this.$route.params.slug : null;
    this.places = this.getPlaces(this.slug);
    return {
        slug: this.slug,
        places: this.places,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.slug =  this.$route.params.slug ? this.$route.params.slug : null;
        this.places = this.getPlaces(this.slug);
      },
      { immediate: true }
    )
  },
  methods: {
    getPlaces(slug) {
      let _places = slug
        ? this.getPlaceWithSlug(slug).length > 0
          ? this.getPlaceWithSlug(slug) || slug === "all"
          : places.features
        : places.features.filter((place) => {
            return place.properties.default === true;
          });
      return _places;
    },
    onlazyMeteo(entry, unobserve, id) {
      if (entry.isIntersecting && this.$refs.card_meteo !== undefined) {
        unobserve();
        this.$refs.card_meteo[id].getWeatherAtPlace();
      }
    },
    getPlaceWithSlug(slug) {
      return places.features.filter((place) => {
        return place.properties.slug === slug;
      });
    },
  },
  components: {
    LazyObserver,
    CardMeteo,
  },
};
</script>
