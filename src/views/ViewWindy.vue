<template>
  <div>
    <navbar-grey />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ backgroundImage: 'url(' + state.backgroundImageURL + ')' }"
        >
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-grey"></span>
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
            <polygon class="text-slate-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="h-screen-2/3 px-1 py-1">
                 <card-windy/>     
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script>
import NavbarGrey from "@/components/Navbars/NavbarGrey.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import backgroundImageAsset from "@/assets/img/mountain.jpg";
import backgroundImageAssetWebp from "@/assets/img/mountain.webp";
import CardWindy from "../components/Cards/CardWindy.vue";


import { inject, reactive } from 'vue';

export default {
  description: "Club de parapente dans le Nord FFVL n°29070. La carte des prévisions de vent dans la région, gracieusement offerte par Windy.", 
  title: "High Can Fly | Club de parapente du Nord | Le vent par Windy",
  canonical: (new URL(window.location)),
  data() {
    const state = reactive({//eslint-disable-line
      backgroundImageURL: '',
    });
    inject('getJpgOrWebpIfSupported')(backgroundImageAsset, backgroundImageAssetWebp, 'lossy').then(file => { console.log('Webp support: ' + file); state.backgroundImageURL = file });
    return {
      state,
    };
  },
  components: {
    NavbarGrey,
    MainFooter,
    CardWindy,
  },

};
</script>
