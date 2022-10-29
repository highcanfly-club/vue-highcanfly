<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap sm:flex-nowrap sm:flex-row overflow-x-auto items-center">
      <div v-for="(place, index) in places" :key="place" class="m-4 w-full sm:w-152 h-200 sm:min-w-152 overflow-y-auto">
        <div class="shadow-slate-500/50 min-w-0 break-words w-full shadow-lg rounded-xl bg-slate-50 p-2">
          <lazy-observer :id="index" @on-change="onlazyMeteo">
            <card-meteo ref="card_meteo" :place="place" :lazy="true" :id="index" />
          </lazy-observer>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LazyObserver from "@/components/Utilities/LazyObserver.vue";
import CardMeteo from "@/components/Cards/CardMeteo.vue";
import { defineComponent, ref } from "vue";
import { useRoute } from 'vue-router';
import _places from "@/config/places.json";
const placesJson: GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection
const $route = useRoute()
const slug = ref($route.params.slug ? $route.params.slug as string : null)
const places = ref(getPlaces(slug.value));
const card_meteo = ref<typeof CardMeteo[]>(null)

function getPlaces(slug: string): GeoJSON.FlyingPlace[]|boolean {
  const _places = slug
    ? getPlaceWithSlug(slug).length > 0
      ? getPlaceWithSlug(slug) || slug === "all"
      : placesJson.features
    : placesJson.features.filter((place) => {
      return place.properties.default === true;
    });
  return _places;
}
function onlazyMeteo(entry: IntersectionObserverEntry, unobserve: Function, id: number) {
  if (entry.isIntersecting && card_meteo.value !== undefined) {
    unobserve();
    card_meteo.value[id].getWeatherData()
  }
}
function getPlaceWithSlug(slug: string) {
  return placesJson.features.filter((place) => {
    return place.properties.slug === slug;
  });
}

function   created() {
    this.$watch(
      () => $route.params,
      () => {
        slug.value = $route.params.slug ? $route.params.slug as string : null;
        places.value = getPlaces(slug.value);
      },
      { immediate: true }
    )
  }

</script>
