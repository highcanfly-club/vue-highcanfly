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
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6 py-6">
              <!-- goes_here -->
              <cloudinary-lazy-img
                src="static-web-highcanfly/highcanfly-102"
                :width="640"
              />
              <!-- /goes_here -->
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script setup lang="ts">
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import CloudinaryLazyImg from "@/components/Utilities/CloudinaryLazyImg.vue";
import { ref, onMounted } from "vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import {setMeta} from "@/mixins/MetaMixin"
const backgroundImage = "static-web-highcanfly/mountain";
const title = "High Can Fly | Club de parapente du Nord | Payment"
const description = "Club de parapente dans le Nord FFVL n°29070. À propos de nous…"
const canonical = new URL(window.location.href)
const reactiveBackground = ref("")
const resizeId = ref(0)
const previousWindowSize = ref(0)

onMounted(() => {
  setMeta(canonical.href, title, description)
  window.addEventListener("resize", handleResize);
  previousWindowSize.value = window.innerWidth;
  reactiveBackground.value = getCloudinaryResponsiveBackground(backgroundImage)
    .format("auto")
    .toURL();
})
function handleResize() {
  clearTimeout(resizeId.value);
  resizeId.value = setTimeout(() => {
    if (window.innerWidth > previousWindowSize.value) {
      this.previousWindowSize = window.innerWidth;
      const newUrl = getCloudinaryResponsiveBackground(backgroundImage)
        .format("auto")
        .toURL();
      if (newUrl != reactiveBackground.value) {
        reactiveBackground.value = newUrl;
      }
    }
  }, 500) as any;
}

</script>
