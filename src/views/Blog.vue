<template>
  <div>
    <navbar />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ backgroundImage: 'url(' + state.backgroundImageURL + ')' }"
        >
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0);"
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
      <sanity-blog />
    </main>
    <footer-component />
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/Navbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import backgroundImageAsset from "@/assets/img/mountain.jpg";
import backgroundImageAssetWebp from "@/assets/img/mountain.webp";
import { inject, reactive } from 'vue';
import SanityBlog from '@/views/SanityBlog.vue';


export default {
  title: "High Can Fly | Club de parapente | News",
  description: "Nous sommes un club vivant, ici il y a quelques nouvelles. Mais nous sommes plus souvent dehors que devant un ordinateur",
  data() {
    const state = reactive({
      backgroundImageURL: '',
    });
    inject('getJpgOrWebpIfSupported')(backgroundImageAsset, backgroundImageAssetWebp, 'lossy').then(file => { console.log('Webp support: ' + file); state.backgroundImageURL = file });
    return {
      state,
    };
  },
  components: {
    Navbar,
    FooterComponent,
    SanityBlog,
  },
};
</script>
