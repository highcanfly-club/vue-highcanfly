<!--
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
-->
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
            class="w-full h-full absolute opacity-50 bg-black"
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
      <sanity-blog />
    </main>
    <main-footer />
  </div>
</template>
<script lang="ts">
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import { ref } from "vue";
import SanityBlog from "@/components/Utilities/ComponentSanityBlog.vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
const backgroundImage = "static-web-highcanfly/mountain";

export default {
  title: "High Can Fly | Club de parapente du Nord | News",
  description:
    "Nous sommes un club vivant, ici il y a quelques nouvelles. Mais nous sommes plus souvent dehors que devant un ordinateur",
  canonical: new URL(window.location.href),
  reactiveBackground: ref(""),
  resizeId: 0,
  previousWindowSize: 0,
  data() {
    return {
      reactiveBackground: this.reactiveBackground,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.previousWindowSize = window.innerWidth;
    this.reactiveBackground = getCloudinaryResponsiveBackground(backgroundImage)
      .format("auto")
      .toURL();
  },
  components: {
    NavbarDefault,
    MainFooter,
    SanityBlog,
  },
  methods: {
    handleResize: function () {
      clearTimeout(this.resizeId);
      this.resizeId = setTimeout(() => {
        if (window.innerWidth > this.previousWindowSize) {
          this.previousWindowSize = window.innerWidth;
          const newUrl = getCloudinaryResponsiveBackground(backgroundImage)
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
