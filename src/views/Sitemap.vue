<template>
    <div>
        <navbar />
        <main class="profile-page">
            <section class="relative block h-500-px">
                <div
                    class="absolute top-0 w-full h-full bg-center bg-cover"
                    v-bind:style="{ backgroundImage: 'url(' + state.backgroundImageURL + ')' }"
                >
                    <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-grey"></span>
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
                                <li v-for="item in routesList" :key="item.id">
                                    <i class="fas fa-link mr-2 text-slate-400"></i>
                                    <a :href="item.path">{{ item.path }}</a>
                                </li>
                            </ul>

                            <i class="fas fa-sitemap mr-2 text-slate-400"></i>
                            <a
                                :href="routesXMLHREF"
                                download="sitemap.xml"
                            >Télécharger le sitemap.xml</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <footer-component />
    </div>
</template>
<script>
import Navbar from "@/components/Navbars/Navbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import { inject, reactive } from 'vue';
import backgroundImageAsset from "@/assets/img/highcanfly-102.jpg";
import backgroundImageAssetWebp from "@/assets/img/highcanfly-102.webp";

let getRoutesList = function (router) { //eslint-disable-line
    let list = [];
    for (let i = 0; i < router.length; i++) {
        if (router[i].name != undefined)
            list.push({
                id: i,
                path: router[i].path
            });
    }
    list.sort(function (a, b) {
        if (a.path < b.path) { return -1; }
        if (a.path > b.path) { return 1; }
        return 0;
    })

    return list;
}

let getRoutesXML = function (router) { //eslint-disable-line
    let list = '';
    for (let i = 0; i < router.length; i++) {
        if (router[i].name != undefined)
            list += `<url><loc>/${router[i].path}</loc></url>`;
    }
    return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${list}
  </urlset>`;
}

let getDownloadSitemapXMLHREF = function (text) {
    var theDownloadlink = 'data:octet/stream;charset=utf-8,' + encodeURIComponent(text);
    return theDownloadlink;
};
export default {
    data() {
        const routesXML = getRoutesXML(this.$router.getRoutes());
        const routesList = getRoutesList(this.$router.getRoutes());
        const routesXMLHREF = getDownloadSitemapXMLHREF(routesXML);
        const state = reactive({//eslint-disable-line
            backgroundImageURL: '',
        });
        inject('getJpgOrWebpIfSupported')(backgroundImageAsset, backgroundImageAssetWebp, 'lossy').then(file => { console.log('Webp support: ' + file); state.backgroundImageURL = file });
        return {
            routesXML: routesXML,
            routesXMLHREF: routesXMLHREF,
            routesList: routesList,
            backgroundImageURL: 'url("' + backgroundImageAsset + '")',
            state,
        }
    },
    components: {
        Navbar,
        FooterComponent,
    },
    // render() {
    //     return getRoutesXML(this.$router.getRoutes());
    // }
}
</script>