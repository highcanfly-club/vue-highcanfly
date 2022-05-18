<template>
  <div>
    <navbar-default
      color="text-white"
      colorhover="text-slate-200"
      iconscolor="text-slate-200"
      buttoncolor="bg-white text-slate-700 active:bg-slate-50"
    />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{
            backgroundImage: 'url(' + reactiveBackground + ')',
          }"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-grey"
          ></span>
        </div>
        <div
          class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
            h-70-px
          "
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
            />
          </svg>
        </div>
      </section>
      <section class="relative pb-16 bg-slate-200">
        <!--
        <div class=" px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6 py-6">
              -->
        <card-multi-meteo :key="slug" />
        <!--
            </div>
          </div>
        </div>
        -->
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script>
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import CardMultiMeteo from "@/components/Cards/CardMultiMeteo.vue";

import { ref } from "vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
const backgroundImage = "static-web-highcanfly/highcanfly-101";
export default {
  slug: ref(""),
  description:
    "La météo sur nos sites est l'élément indispensable pour un club de parapente du Nord FFVL. Nous encourageons la pratique du parapete sans utiliser de moteur. Vive le marche et vol. Affiliés à la FFVL n°29070.",
  title:
    "High Can Fly | Club de parapente du Nord | La météo sur nos sites de pratiques ",
  canonical: new URL(window.location),
  reactiveBackground: ref(""),
  resizeId: 0,
  previousWindowSize: 0,
  data() {
    return {
      slug: this.slug,
      reactiveBackground: this.reactiveBackground,
    };
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.slug = this.$route.params.slug ? this.$route.params.slug : null;
      },
      { immediate: true }
    );
    window.addEventListener("resize", this.handleResize);
    this.previousWindowSize = window.innerWidth;
    this.reactiveBackground = getCloudinaryResponsiveBackground(backgroundImage)
      .format("auto")
      .toURL();
  },
  methods: {
    handleResize: function () {
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
  components: {
    NavbarDefault,
    MainFooter,
    CardMultiMeteo,
  },
};
</script>
