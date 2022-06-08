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
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div class="
              relative
              flex flex-col
              min-w-0
              break-words
              bg-white
              w-full
              mb-6
              shadow-xl
              rounded-lg
              -mt-64
            ">
            <div class="px-6 py-6 min-h-screen-1/3">
              <Suspense>
                <template #default>
                  <track-joiner />
                </template>
                <template #fallback>
                  <p> Chargement de l'API TrackJoiner... </p>
                </template>
              </Suspense>
            </div>
            <div class="px-6 py-6 min-h-screen-1/3" v-if="tracksLength > 0">
              <button v-if="!view3d" @click="view3d = true" class="
              absolute left-0 bottom-0
              inline-flex
              items-center
              font-semibold
              leading-6
              text-sm
              shadow
              rounded-md
              text-white
              bg-blue-500
              hover:bg-blue-700
              transition
              ease-in-out
              duration-150
              py-2
              px-4
              m-2
        ">Tracer en 3D</button>
              <Suspense v-if="view3d">
                <template #default>
                  <card-cesium />
                </template>
                <template #fallback>
                  <p> Chargement de l'API 3D... </p>
                </template>
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script>
import MainFooter from "@/components/Footers/MainFooter.vue";
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import { createDB, getDBTracksRowsAsPromise, myTrackjoinerDB } from 'trackjoiner';
import { defineAsyncComponent, ref } from "vue";

const backgroundImage = "static-web-highcanfly/blancnezhugues-101";
const CHECKDB_INTERVAL = 500;

export default {
  description:
    "Assemblez vos traces de marche et vol venant de votre vario, de votre téléphone et de votre montre",
  title: "High Can Fly | Club de parapente du Nord | Assemblage de traces",
  canonical: new URL(window.location),
  setup() {
    const reactiveBackground = ref("");
    const view3d = ref(false);
    let loopTrackId = 0;
    const tracksLength = ref(0);
    let resizeId = 0;
    let previousWindowSize = 0;
    return {
      reactiveBackground,
      view3d,
      tracksLength,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.previousWindowSize = window.innerWidth;
    this.reactiveBackground = getCloudinaryResponsiveBackground(backgroundImage)
      .format("auto")
      .toURL();

  },
  mounted() {
    this.loopTrack = this.getTrackLenthLoop();
  },
  beforeUnmount() {
    clearInterval(this.loopTrack);
  },
  components: {
    NavbarDefault,
    MainFooter,
    TrackJoiner: defineAsyncComponent(() => { return import("@/components/TrackJoinerComponent.vue") }),
    CardCesium: defineAsyncComponent(() => { return import("@/components/Cards/CardCesium.vue") })
  },
  methods: {
    getTrackLenthLoop() {
      if (myTrackjoinerDB === undefined) {
        createDB();
      }
      return setInterval(() => {
        getDBTracksRowsAsPromise().then((tracks) => { this.tracksLength = tracks.length });
      }, CHECKDB_INTERVAL)
    },
    handleResize() {
      clearTimeout(this.resizeId);
      this.resizeId = setTimeout(() => {
        if (window.innerWidth > this.previousWindowSize) {
          this.previousWindowSize = window.innerWidth;
          let newUrl = getCloudinaryResponsiveBackground(backgroundImage)
            .format("auto")
            .toURL();
          if (newUrl != this.reactiveBackground) {
            this.reactiveBackground = newUrl;
          }
        }
      }, 500);
    },
  },
};
</script>
