<template>
    <div id="map" class="w-full h-full" />
</template>
<script lang="ts">
import { defineComponent, createApp } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import GeoJSON from "@/types/GeoJSON"
import _places from '@/config/places.json'
import mapboxConf from '@/config/mapbox-conf.json'
import { GeoJsonObject } from 'geojson'
import BaliseFFVL from '@/components/Cards/BaliseFFVL.vue'
import type { App } from 'vue'
/*
Needs 
npm i -D --save geojson @types/leaflet
npm i --save leaflet
*/

const places = _places as unknown as GeoJSON.FlyingPlaceCollection
export default defineComponent({
    data() {
        return {
            count: 1
        }
    },
    created() {
        L.Marker.prototype.options.icon = L.icon({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41],
        });
    },
    mounted() {
        const filteredPlaces = { type: "FeatureCollection" as typeof places.type, features: places.features.filter((place: GeoJSON.FlyingPlace) => { return place.properties.default }) }
        const box = this.getBBox(filteredPlaces);
        const map: L.Map = L.map('map', { attributionControl: true }).fitBounds([[box.latMin, box.longMin], [box.latMax, box.longMax]]);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxConf.token
        }).addTo(map);
        L.geoJSON(places as unknown as GeoJsonObject, {
            onEachFeature: (feature, layer) => {
                const _feature = feature as unknown as GeoJSON.FlyingPlace;
                if (_feature.properties && _feature.properties.name) {
                    let baliseFFVL: App<Element> = null;
                    layer.bindPopup(`<div id="link-${_feature.properties.slug}"></div>`,{className:"w-56"})
                        .on("popupopen", () => {
                            console.log(`create BaliseFFVL component for ${_feature.properties.name}`)
                            baliseFFVL = createApp(BaliseFFVL, {
                                id: _feature.properties.idBalise,
                                name: _feature.properties.name,
                                idAlt: _feature.properties.idBaliseAlt,
                                nameAlt: _feature.properties.nameAlt,
                                slug: _feature.properties.slug
                            }) as App<Element>;
                            baliseFFVL.mount(`#link-${_feature.properties.slug}`);
                        })
                        .on("popupclose", () => {
                            console.log(`close BaliseFFVL component ${_feature.properties.name}`);
                            baliseFFVL.unmount();
                        })
                }
            }
        }).addTo(map);
    },
    methods: {
        onClickMeteoLink(event: Event) {
            console.log(event);
        },
        /**
         * 
         * @param data A Collection of GeoJSON.FlyingPlace features
         */
        getBBox(data: GeoJSON.FlyingPlaceCollection) {
            const bounds = { longMin: Number.POSITIVE_INFINITY, latMin: Number.POSITIVE_INFINITY, longMax: Number.NEGATIVE_INFINITY, latMax: Number.NEGATIVE_INFINITY }
            let coordinates: GeoJSON.Position;
            for (let i = 0; i < data.features.length; i++) {
                coordinates = data.features[i].geometry.coordinates;
                bounds.longMin = bounds.longMin < coordinates[0] ? bounds.longMin : coordinates[0]; //Longitude
                bounds.latMin = bounds.latMin < coordinates[1] ? bounds.latMin : coordinates[1]; //latitude
                bounds.longMax = bounds.longMax > coordinates[0] ? bounds.longMax : coordinates[0];
                bounds.latMax = bounds.latMax > coordinates[1] ? bounds.latMax : coordinates[1];
            }
            return bounds;
        }
    }
})
</script>
