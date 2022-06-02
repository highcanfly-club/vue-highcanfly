<template>
    <div id="cesiumContainer"></div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import logo from "@/assets/img/logo_high_can_fly.svg";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import cesiumConf from "@/config/cesium-conf.json";
import * as Cesium from "cesium";
import { createDB, getDBFixesRowsAsPromise, getDBTracksRowsAsPromise, trackTypes } from 'trackjoiner';
import type { Fix } from 'trackjoiner';
//import "cesium_src/Widgets/widgets.css";

const CESIUM_MIN_FLY_INTERVAL = 1; //1ms
const CESIUM_MIN_HIKE_INTERVAL = 10000; //10s
const backgroundImage = "static-web-highcanfly/mountain";

declare interface IGNElevations {
    elevations: number[]
}
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
                console.log(`Using ${track.id} track`);
                entityPromises.push(getDBFixesRowsAsPromise(track.id).then((fixes) => {
                    return new Promise<Cesium.Entity>((resolve) => {
                        if (track.type === trackTypes.FLY) {
                            fetch(`https://wxs.ign.fr/calcul/alti/rest/elevation.json?lon=${fixes[0].point.lon}|${fixes[fixes.length - 1].point.lon}&lat=${fixes[0].point.lat}|${fixes[fixes.length - 1].point.lat}&zonly=true`)
                                .then((resp) => resp.json() as Promise<IGNElevations>)
                                .then((ign) => {
                                    console.log(ign.elevations);
                                    console.log(`fix[0]: gps=${fixes[0].gpsAltitude}m / ign=${ign.elevations[0]}m fix[${fixes.length}]: gps=${fixes[fixes.length - 1].gpsAltitude}m / ign=${ign.elevations[1]}m`)
                                })
                        }
                        const INTERVAL = track.type === trackTypes.FLY ? CESIUM_MIN_FLY_INTERVAL : CESIUM_MIN_HIKE_INTERVAL;
                        let previousPoint = { ts: 0 } as Fix;
                        const positions = [] as Cesium.Cartesian3[];
                        for (let i = 0; i < fixes.length; i++) {
                            const currentPoint = fixes[i] as Fix;
                            if (currentPoint.point !== undefined && !isNaN(currentPoint.point.lat) && !isNaN(currentPoint.point.lon)) {
                                if ((currentPoint.ts - previousPoint.ts) > INTERVAL) { //one point each CESIUM_MIN_INTERVAL
                                    positions.push(Cesium.Cartesian3
                                        .fromDegrees(currentPoint.point.lon,
                                            currentPoint.point.lat,
                                            track.type === trackTypes.FLY ? currentPoint.gpsAltitude + 30 : currentPoint.gpsAltitude));
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
                                // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(),
                                clampToGround: track.type === trackTypes.HIKE ? true : false,
                            }
                        }));
                    })
                }));
            });
            Promise.all(entityPromises).then((entities) => {
                viewer.flyTo(viewer.entities);
                //eslint-disable-next-line no-debugger
                //debugger;
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