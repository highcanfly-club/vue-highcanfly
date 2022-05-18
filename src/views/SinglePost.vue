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
      <card-single-post :slug="slug" />
    </main>
    <footer-component />
  </div>
</template>
<script>
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import FooterComponent from "@/components/Footers/MainFooter.vue";
import CardSinglePost from "@/components/Cards/CardSinglePost.vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
const backgroundImage = "static-web-highcanfly/blancnezhugues-101";
import { ref } from "vue";

export default {
  description:
    "Club de parapente dans le Nord FFVL n°29070. Voici la dernière nouvelle !",
  title: "High Can Fly | Club de parapente du Nord | News",
  canonical: new URL(window.location),
  reactiveBackground: ref(""),
  resizeId: 0,
  previousWindowSize: 0,
  data() {
    const slug = this.$route.params.slug;
    return {
      reactiveBackground: this.reactiveBackground,
      slug,
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
    FooterComponent,
    CardSinglePost,
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
};
</script>
