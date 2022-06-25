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
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="
              relative
              text-slate-600
              bg-pistachio-400
              min-h-screen-1/3
              flex flex-col
              min-w-0
              break-words
              w-full
              mb-6
              shadow-xl
              rounded-lg
              -mt-64
            "
          >
            <div class="px-6 py-6">
              <ul id="array-rendering">
                <li v-for="item in routesReactive.pathList" :key="item.id">
                  <i class="fas fa-link mr-2 text-slate-400"></i>
                  <router-link :to="item.path">{{ item.path }}</router-link>
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
import { ref, reactive} from "vue";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
const backgroundImage = "static-web-highcanfly/highcanfly-102";
import { getResponsePaths } from "@/sitemapHelper";

const getDownloadSitemapXMLHREF = function (text) {
  //eslint-disable-line
  const theDownloadlink =
    "data:octet/stream;charset=utf-8," + encodeURIComponent(text);
  return theDownloadlink;
};
export default {
  title: "High Can Fly | Club de parapente du Nord | Plan du site",
  reactiveBackground: ref(""),
  resizeId: 0,
  previousWindowSize: 0,
  data() {
    const routesReactive = reactive({ pathList: [], xml: "", hrefdata: "" });
    const canonical = new URL(window.location).origin;
    getResponsePaths(canonical).then((sol) => {
      routesReactive.xml = sol.xml;
      routesReactive.hrefdata = getDownloadSitemapXMLHREF(routesReactive.xml);
      routesReactive.pathList = sol.paths;
    });
    return {
      reactiveBackground: this.reactiveBackground,
      routesReactive,
    };
  },
  created() {
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
  components: {
    NavbarDefault,
    MainFooter,
  },
};
</script>
