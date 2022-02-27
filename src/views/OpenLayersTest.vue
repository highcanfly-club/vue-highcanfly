<template>
  <div>
    <navbar-default color="text-white" colorhover="text-slate-200" iconscolor="text-slate-200" buttoncolor="bg-white text-slate-700 active:bg-slate-50"/>
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ backgroundImage: 'url(' + backgroundImageURL + ')' }"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-grey"
          ></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0)"
        >
          <svg
            class="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              class="text-slate-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
<div class="px-6 py-6">
<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px">

    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" 
    :projection="projection" />

    <ol-tile-layer>
        <ol-source-osm />
    </ol-tile-layer>
    
</ol-map>
</div>
          </div>
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>
<script>
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import FooterComponent from "@/components/Footers/MainFooter.vue";
import backgroundImageAsset from "@/assets/img/blancnezhugues-101.jpg";
import {
    ref
} from 'vue'

export default {
  data() {
    return {
      backgroundImageURL: backgroundImageAsset,
    };
  },
  components: {
    NavbarDefault,
    FooterComponent,
  },
    setup() {
        const center = ref([40, 40])
        const projection = ref('EPSG:4326')
        const zoom = ref(8)
        const rotation = ref(0)
        return {
            center,
            projection,
            zoom,
            rotation
        }
    },
};
</script>
