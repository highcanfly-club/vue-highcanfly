<template>
  <div>
    <navbar-default color="text-white" colorhover="text-slate-200" iconscolor="text-slate-200"
      buttoncolor="bg-white text-slate-700 active:bg-slate-50" />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div class="absolute top-0 w-full h-full bg-center bg-cover" v-bind:style="{
          backgroundImage: 'url(' + reactiveBackground + ')',
        }">
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-grey"></span>
        </div>
        <div class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
            h-70-px
          " style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-slate-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section class="relative pb-16 bg-slate-200">
        <card-multi-meteo :slug="slug" :places="placesJson" />
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script setup lang="ts">
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import {CardMultiMeteo} from "@highcanfly-club/meteo";
import "@highcanfly-club/meteo/dist/index.css"
import { onMounted, ref, watch } from "vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import { useRoute } from "vue-router";
import _places from "@/config/places.json";
const $route = useRoute()
const slug = ref($route.params.slug ? $route.params.slug as string : "")
const backgroundImage = "static-web-highcanfly/highcanfly-101";
const description =
  "La météo sur nos sites est l'élément indispensable pour un club de parapente du Nord FFVL. Nous encourageons la pratique du parapete sans utiliser de moteur. Vive le marche et vol. Affiliés à la FFVL n°29070."
const title =
  "High Can Fly | Club de parapente du Nord | La météo sur nos sites de pratiques "
const canonical = new URL(window.location.href)
const reactiveBackground = ref("")

let resizeId: ReturnType<typeof setTimeout>  = null
  const placesJson: GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection
let previousWindowSize = 0

const handleResize = () => {
  clearTimeout(resizeId);
  resizeId = setTimeout(() => {
    if (window.innerWidth > previousWindowSize) {
      previousWindowSize = window.innerWidth;
      const newUrl = getCloudinaryResponsiveBackground(backgroundImage)
        .format("auto")
        .toURL();
      if (newUrl != reactiveBackground.value) {
        reactiveBackground.value = newUrl;
      }
    }
  }, 500);
}
onMounted(() => {
  window.addEventListener("resize", handleResize);
    previousWindowSize = window.innerWidth;
    reactiveBackground.value = getCloudinaryResponsiveBackground(backgroundImage)
      .format("auto")
      .toURL();
})

watch(() => $route.params,
      () => {
        slug.value = $route.params.slug ? <string>$route.params.slug : 'default';
      },
      { immediate: true })

</script>
