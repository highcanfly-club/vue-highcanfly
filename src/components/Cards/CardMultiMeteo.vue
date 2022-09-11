<template>
  <div class="flex justify-center">
    <div
      class="flex flex-wrap sm:flex-nowrap sm:flex-row overflow-x-auto items-center"
    >
      <div
        v-for="(place,index) in places" :key="place"
        class="m-4 w-full sm:w-152 h-200 sm:min-w-152 overflow-y-auto"
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
<script lang="ts">
import LazyObserver from "@/components/Utilities/LazyObserver.vue";
import CardMeteo from "@/components/Cards/CardMeteo.vue";
import { defineComponent, ref } from "vue";
import placesJson from "@/config/places.json";

export default defineComponent({
  data() {
    const slug =  this.$route.params.slug ? this.$route.params.slug : null;
    const places = this.getPlaces(this.slug);
    return {
        slug: ref(slug),
        places: ref(places),
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
    getPlaces(slug:string) {
      const _places = slug
        ? this.getPlaceWithSlug(slug).length > 0
          ? this.getPlaceWithSlug(slug) || slug === "all"
          : placesJson.features
        : placesJson.features.filter((place) => {
            return place.properties.default === true;
          });
      return _places;
    },
    onlazyMeteo(entry:IntersectionObserverEntry, unobserve:Function, id:number) {
      if (entry.isIntersecting && this.$refs.card_meteo !== undefined) {
        unobserve();
        this.$refs.card_meteo[id].getWeatherData();
      }
    },
    getPlaceWithSlug(slug:string) {
      return placesJson.features.filter((place) => {
        return place.properties.slug === slug;
      });
    },
  },
  components: {
    LazyObserver,
    CardMeteo,
  },
});
</script>
