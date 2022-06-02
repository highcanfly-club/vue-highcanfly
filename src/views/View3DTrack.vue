<template>
  <div>
    <navbar-default color="text-white" colorhover="text-slate-200" iconscolor="text-slate-200"
      buttoncolor="bg-white text-slate-700 active:bg-slate-50" />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div class="absolute top-0 w-full h-full bg-center bg-cover" v-bind:style="{
          backgroundImage: 'url(' + reactiveBackground + ')',
        }">
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-grey"></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-slate-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div class="px-6 py-6">
              <!-- goes_here -->
              <div id="cesiumContainer"></div>
              <!-- /goes_here -->
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>
<script lang="ts">
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import { ref, defineComponent } from "vue";
import logo from "@/assets/img/logo_high_can_fly.svg";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import cesiumConf from "@/config/cesium-conf.json";
import * as Cesium from "cesium";
import { createDB, getDBFixesRowsAsPromise, trackTypes } from 'trackjoiner';
import type { Fix } from 'trackjoiner';
import Cartesian2 from "cesium/Source/Core/Cartesian2";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
//import "cesium_src/Widgets/widgets.css";

const backgroundImage = "static-web-highcanfly/mountain";

export default defineComponent({
  title: "High Can Fly | Club de parapente du Nord | Test",
  description: "Club de parapente dans le Nord FFVL n°29070. À propos de nous…",
  canonical: new URL(window.location.href),
  setup() {
    const fixes = [] as Fix[];
    const reactiveBackground = ref("");
    const resizeId = 0;
    const previousWindowSize = 0;
    return {
      fixes,
      logo,
      reactiveBackground,
      cesiumConf
    }
  },
  mounted() {
    createDB();
    getDBFixesRowsAsPromise().then((values) => {
      window.CESIUM_BASE_URL = window.location.origin + '/cesium';
      Cesium.Ion.defaultAccessToken = cesiumConf.token;
      const viewer = new Cesium.Viewer('cesiumContainer', {
        geocoder: false,
        infoBox: true,
        navigationHelpButton: true,
        sceneModePicker: false,
        terrainProvider: Cesium.createWorldTerrain(),
        // imageryProvider: new Cesium.OpenStreetMapImageryProvider({
        //   url: 'https://a.tile.openstreetmap.org/'
        // }),
        imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
          url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        })
      });
      const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildings());
      this.fixes = values;

      const positionProperty = new Cesium.SampledPositionProperty();
      const start = Cesium.JulianDate.fromDate(values[0].dt)
      const stop = Cesium.JulianDate.fromDate(values[values.length - 1].dt)
      viewer.clock.startTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.currentTime = start.clone();
      viewer.timeline.zoomTo(start, stop);
      // Speed up the playback speed 50x.
      viewer.clock.multiplier = 50;
      // Start playing the scene.
      viewer.clock.shouldAnimate = false;

      // Create a point for each.
      let previousPoint = { ts: 0 } as Fix;
      for (let i = 0; i < values.length; i++) {
        const currentPoint = values[i] as Fix;
        if (currentPoint.point !== undefined) {
          const time = Cesium.JulianDate.fromDate(values[i].dt);
          let position = new Cesium.Cartesian3(0, 0, 0);
          if (currentPoint.type === trackTypes.HIKE) {
            //eslint-disable-next-line no-debugger
            //debugger;
            if ((currentPoint.ts - previousPoint.ts) > 10000) { //one point each 30s for hike
              position = Cesium.Cartesian3.fromDegrees(currentPoint.point.lon, currentPoint.point.lat, 2);
              viewer.entities.add({
                description: `Marche: (${currentPoint.point.lon}, ${currentPoint.point.lat}, ${currentPoint.gpsAltitude})`,
                position: position,
                point: { pixelSize: 3, color: Cesium.Color.BLUE, heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND }
              });
              previousPoint = currentPoint;
            }
          } else {
            position = Cesium.Cartesian3.fromDegrees(currentPoint.point.lon, currentPoint.point.lat, currentPoint.gpsAltitude);
            viewer.entities.add({
              description: `Vol: (${currentPoint.point.lon}, ${currentPoint.point.lat}, ${currentPoint.gpsAltitude})`,
              position: position,
              point: { pixelSize: 3, color: Cesium.Color.RED }
            });
          }
          positionProperty.addSample(time, position);
        }
      }
      // Fly the camera to first point.
      viewer.flyTo(viewer.entities);
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        function (e) {
          e.cancel = true;
          viewer.flyTo(viewer.entities);
        });
    })

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
    MainFooter,
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
});
</script>
<style>
/* must match cesium npm version in package.json */
@import "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.0/Widgets/widgets.min.css"
</style>