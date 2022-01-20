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
                  ></ol-source-wmts>
                </ol-tile-layer>
              </ol-map>
              <div>
              </div>
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

// Standard IGN resolutions
var ign_resolutions = [
  156543.03392804103,
  78271.5169640205,
  39135.75848201024,
  19567.879241005125,
  9783.939620502562,
  4891.969810251281,
  2445.9849051256406,
  1222.9924525628203,
  611.4962262814101,
  305.74811314070485,
  152.87405657035254,
  76.43702828517625,
  38.218514142588134,
  19.109257071294063,
  9.554628535647034,
  4.777314267823517,
  2.3886571339117584,
  1.1943285669558792,
  0.5971642834779396,
  0.29858214173896974,
  0.14929107086948493,
  0.07464553543474241,
];

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
    const center = ref([3.096878, 50.399668]);//lng,lat
    //const center = ref([[-20037508, 20037508]]);
    const projection = ref('EPSG:4326');
    //const projection = ref('EPSG:3857');
    const zoom = ref(10);
    const rotation = ref(0);
    const matrixSet = ref('PM');
    const url = ref('https://wxs.ign.fr/pratique/geoportail/wmts');
    const layerName = ref('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');
    const format = ref('image/png');
    const styleName = ref('normal');
    const attribution = ref('Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>');

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
      ign_resolutions,
    }
  },
};
</script>
