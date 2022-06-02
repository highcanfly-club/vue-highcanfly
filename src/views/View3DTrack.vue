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
import { createDB, getDBFixesRowsAsPromise, getDBTracksRowsAsPromise, trackTypes } from 'trackjoiner';
import type { Fix } from 'trackjoiner';
import Cartesian2 from "cesium/Source/Core/Cartesian2";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
//import "cesium_src/Widgets/widgets.css";

const CESIUM_MIN_FLY_INTERVAL = 1; //1ms
const CESIUM_MIN_HIKE_INTERVAL = 10000; //10s
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
    window.CESIUM_BASE_URL = window.location.origin + '/cesium';
    Cesium.Ion.defaultAccessToken = cesiumConf.token;
    const viewer = new Cesium.Viewer('cesiumContainer', {
      geocoder: false,
      infoBox: true,
      timeline: false,
      animation: false,
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
    createDB();
    getDBTracksRowsAsPromise().then((tracks) => {
      const entityPromises = [] as Promise<Cesium.Entity>[];
      tracks.forEach((track) => {
        entityPromises.push(getDBFixesRowsAsPromise(track.id).then((fixes) => {
          const INTERVAL = track.type === trackTypes.FLY ? CESIUM_MIN_FLY_INTERVAL : CESIUM_MIN_HIKE_INTERVAL;
          let previousPoint = { ts: 0 } as Fix;
          const positions = [] as Cesium.Cartesian3[];
          return new Promise<Cesium.Entity>((resolve) => {
            for (let i = 0; i < fixes.length; i++) {
              const currentPoint = fixes[i] as Fix;
              if (currentPoint.point !== undefined) {
                if ((currentPoint.ts - previousPoint.ts) > INTERVAL) { //one point each CESIUM_MIN_INTERVAL
                  positions.push(Cesium.Cartesian3.fromDegrees(currentPoint.point.lon, currentPoint.point.lat, currentPoint.gpsAltitude));
                  previousPoint = currentPoint;
                }
              }
            }
            resolve(viewer.entities.add({
              name: track.name,
              polyline: {
                positions: positions,
                material: track.type === trackTypes.HIKE ? Cesium.Color.ALICEBLUE : Cesium.Color.RED,
                width: 3,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(),
                clampToGround: track.type === trackTypes.HIKE ? true : false,
              }
            }));
          })
        }));
      });
      Promise.all(entityPromises).then(() => {
        viewer.flyTo(viewer.entities);
      });
      viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
        (e) => {
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