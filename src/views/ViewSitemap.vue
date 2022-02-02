<template>
  <div>
    <navbar-grey />
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
              bg-white
              w-full
              mb-6
              shadow-xl
              rounded-lg
              -mt-64
            "
          >
            <div class="px-6 py-6">
              <ul id="array-rendering">
                <li v-for="item in routesR.pathList" :key="item.id">
                  <i class="fas fa-link mr-2 text-slate-400"></i>
                  <a :href="item.path">{{ item.path }}</a>
                </li>
              </ul>

              <i class="fas fa-sitemap mr-2 text-slate-400"></i>
              <a :href="routesXML.hrefdata" download="sitemap.xml"
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
import NavbarGrey from "@/components/Navbars/NavbarGrey.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import { inject, reactive } from "vue";
import backgroundImageAsset from "@/assets/img/highcanfly-102.jpg";
import backgroundImageAssetWebp from "@/assets/img/highcanfly-102.webp";
import sanity from "@/plugins/sanity-client";

const query = `*[_type == "post"]{
  slug
}| order(slug asc)`;

let getRoutesList = function (router) {
  //eslint-disable-line
  let list = [];
  for (let i = 0; i < router.length; i++) {
    if (router[i].name != undefined)
      list.push({
        id: i,
        path: router[i].path,
      });
  }
  list.sort(function (a, b) {
    if (a.path < b.path) {
      return -1;
    }
    if (a.path > b.path) {
      return 1;
    }
    return 0;
  });

  return list;
};

let getRoutesXML = function (router) {
  //eslint-disable-line
  let list = "";
  for (let i = 0; i < router.length; i++) {
    if (router[i].path != undefined)
      list += `<url><loc>${router[i].path}</loc></url>\n`;
  }
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
};

let getSlugList = function (posts) {
  let ret = [];
  for (let i = 0; i < posts.length; i++) {
    ret.push({id:i,path:`/sanity-blog/${posts[i].slug.current}`});
  }
  return ret;
};

let getDownloadSitemapXMLHREF = function (text) {
  var theDownloadlink =
    "data:octet/stream;charset=utf-8," + encodeURIComponent(text);
  return theDownloadlink;
};
export default {
  title: "High Can Fly | Club de parapente | Plan du site",
  data() {
    const routesR = reactive({pathList:[]});
    const routesXML = reactive({xml:'',hrefdata:''});
    sanity.fetch(query).then(
      (posts) => {
        const slugList = getSlugList(posts);
        let routesList = getRoutesList(this.$router.getRoutes());
        routesList = routesList.concat(slugList);
        routesR.pathList = routesList;
        routesXML.xml = getRoutesXML(routesList);
        routesXML.hrefdata = getDownloadSitemapXMLHREF(routesXML.xml); //eslint-disable-line
      },
      (error) => {
        this.error = error;
      }
    );

    const state = reactive({
      //eslint-disable-line
      backgroundImageURL: "",
    });
    inject("getJpgOrWebpIfSupported")(
      backgroundImageAsset,
      backgroundImageAssetWebp,
      "lossy"
    ).then((file) => {
      console.log("Webp support: " + file);
      state.backgroundImageURL = file;
    });
    return {
      backgroundImageURL: 'url("' + backgroundImageAsset + '")',
      state,
      routesR,
      routesXML,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {},
  },
  components: {
    NavbarGrey,
    MainFooter,
  },
  // render() {
  //     return getRoutesXML(this.$router.getRoutes());
  // }
};
</script>