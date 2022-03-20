<template>
  <div>
    <navbar-default color="text-white" colorhover="text-slate-200" iconscolor="text-slate-200" buttoncolor="bg-white text-slate-700 active:bg-slate-50"/>
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
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative text-slate-600 bg-pistachio-400 min-h-screen-1/3 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6 py-6">
              <ul id="array-rendering">
                <li v-for="item in routesReactive.pathList" :key="item.id">
                  <i class="fas fa-link mr-2 text-slate-400"></i>
                  <a :href="item.path">{{ item.path }}</a>
                </li>
              </ul>

              <i class="fas fa-sitemap mr-2 text-slate-400"></i>
              <a :href="routesReactive.hrefdata" download="sitemap.xml"
                >Télécharger le sitemap.xml</a
              >
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
import { inject, reactive } from "vue";
import backgroundImageAsset1x from "@/assets/img/highcanfly-102-1x.jpg";
import backgroundImageAsset2x from "@/assets/img/highcanfly-102.jpg";
import backgroundImageAssetWebp1x from "@/assets/img/highcanfly-102-1x.webp";
import backgroundImageAssetWebp2x from "@/assets/img/highcanfly-102.webp";
import {
  getResponsePaths,
} from "@/sitemapHelper.js";


let getDownloadSitemapXMLHREF = function (text) {
  //eslint-disable-line
  var theDownloadlink =
    "data:octet/stream;charset=utf-8," + encodeURIComponent(text);
  return theDownloadlink;
};
export default {
  title: "High Can Fly | Club de parapente du Nord | Plan du site",
  data() {
    const routesReactive = reactive({ pathList:[], xml: "", hrefdata: "" });
    const canonical = new URL(window.location).origin;
    getResponsePaths(canonical).then((sol) => {
      routesReactive.xml = sol.xml;
      routesReactive.hrefdata = getDownloadSitemapXMLHREF(routesReactive.xml);
      routesReactive.pathList = sol.paths;
    });

    const state = reactive({
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
      routesReactive,
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    NavbarDefault,
    MainFooter,
  },
};
</script>
