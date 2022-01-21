<template>
  <div>
    <navbar />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ background: backgroundImageURL }"
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
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-blueGray-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6 py-6">
              <ol-map
                :loadTilesWhileAnimating="true"
                :loadTilesWhileInteracting="true"
                style="height:400px"
              >
                <ol-projection-register
                  projectionName="EPSG:2154"
                  :projectionExtent="[-357823.2365, 6037008.6939, 1313632.3628, 7230727.3772]"
                  projectionDef="+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
                />
                <ol-view
                  ref="view"
                  :center="center"
                  :rotation="rotation"
                  :projection="projection"
                  :zoom="zoom"
                />
                <ol-zoom-control />
                <ol-zoomslider-control />
                <ol-fullscreen-control />
                <ol-scaleline-control />
                <ol-tile-layer>
                  <ol-source-wmts
                    :attributions="attribution"
                    :url="url"
                    :matrixSet="matrixSet"
                    :format="format"
                    :layer="layerName"
                    :style="styleName"
                    projection="EPSG:3857"
                  ></ol-source-wmts>
                </ol-tile-layer>
              </ol-map>
              <div></div>
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
import backgroundImageAsset from "@/assets/img/blancnezhugues-101.jpg";
import {
  ref
} from 'vue'

export default {
  data() {
    return {
      backgroundImageURL: 'url("' + backgroundImageAsset + '")',
    };
  },
  components: {
    Navbar,
    FooterComponent,
  },
  setup() {
    //const center = ref([3.096878, 50.399668]);//lng,lat
    //const projection = ref('EPSG:4326');
    //const center = ref([[344742.88, 6515781.17]]);
    //const projection = ref('EPSG:3857');

    const center = ref([706897.62,7033567.10])
    const projection = ref('EPSG:2154');
    const zoom = ref(9);
    const rotation = ref(0);
    const matrixSet = ref('PM');
    const url = ref('https://wxs.ign.fr/pratique/geoportail/wmts');
    const layerName = ref('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');
    const format = ref('image/png');
    const styleName = ref('normal');
    const attribution = ref('Tiles © <a href="https://www.ign.fr">IGN</a>');

    return {
      center,
      projection,
      zoom,
      rotation,
      url,
      layerName,
      matrixSet,
      format,
      styleName,
      attribution,
    }
  },
};
</script>
