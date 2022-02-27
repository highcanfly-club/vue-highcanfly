<template>
  <div>
    <navbar-default />
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
            <div class="px-3 py-3">
                  <ol-mapsites-de-pratique mapClass="h-screen-1/2"/>
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script>
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import backgroundImageAsset from "@/assets/img/blancnezhugues-101.jpg";
import backgroundImageAssetWebp from "@/assets/img/blancnezhugues-101.webp";
import olMapsitesDePratique from "@/components/Maps/OLMapSitesDePratique.vue";
import { inject, reactive} from 'vue' ;

export default {
  title: "High Can Fly | Club de parapente du Nord | Nos sites de pratique",
  descritpion: "Les parapentistes volents. Les quelques endroits où vous nous trouverez dans les Hauts-de-France…",
  canonical: (new URL(window.location)),
  data() {
    const state = reactive({//eslint-disable-line
                            backgroundImageURL: '',
                          });
    inject('getJpgOrWebpIfSupported')(backgroundImageAsset,backgroundImageAssetWebp,'lossy').then( file => {console.log('Webp support: ' + file);state.backgroundImageURL = file});
    return {
      state,
    };
  },
  components: {
    NavbarDefault,
    MainFooter,
    olMapsitesDePratique,
  },

};
</script>
