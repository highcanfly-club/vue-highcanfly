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
            backgroundImage: 'url(' + state.backgroundImageURL + ')',
          }"
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
            />
          </svg>
        </div>
      </section>
      <contact-form />
    </main>
    <main-footer />
  </div>
</template>
<script>
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import backgroundImageAsset1x from "@/assets/img/blancnezhugues-101-1x.jpg";
import backgroundImageAsset2x from "@/assets/img/blancnezhugues-101.jpg";
import backgroundImageAssetWebp1x from "@/assets/img/blancnezhugues-101-1x.webp";
import backgroundImageAssetWebp2x from "@/assets/img/blancnezhugues-101.webp";
import contactForm from "@/components/Forms/EmailForm.vue";

import { inject, reactive } from "vue";

export default {
  title: "High Can Fly | Club de parapente du Nord | Contactez-nous",
  description: "Pour contacter le club, chercher des informations…",
  canonical: new URL(window.location),
  data() {
    const state = reactive({
      //eslint-disable-line
      backgroundImageURL: "",
    });
    inject("getJpgOrWebpIfSupported")(
      window.innerWidth < 1024
        ? backgroundImageAsset1x
        : backgroundImageAsset2x,
      window.innerWidth < 1024
        ? backgroundImageAssetWebp1x
        : backgroundImageAssetWebp2x,
      "lossy"
    ).then((file) => {
      console.log("Webp support: " + file);
      state.backgroundImageURL = file;
    });
    return {
      state,
    };
  },
  components: {
    NavbarDefault,
    MainFooter,
    contactForm,
  },
};
</script>
