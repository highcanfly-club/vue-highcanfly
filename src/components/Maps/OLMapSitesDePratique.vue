<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    :class="mapClass"
  >
    <ol-projection-register
      projectionName="EPSG:2154"
      :projectionExtent="espg2154Extent"
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

    <ol-interaction-select
      @select="featureSelected"
      :condition="selectCondition"
      :filter="selectInteactionFilter"
    >
      <ol-style>
        <ol-style-icon :src="markerIconRed" :scale="1"></ol-style-icon>
      </ol-style>
    </ol-interaction-select>

    <ol-overlay :position="selectedSitePosition" v-if="selectedSiteHtml != ''">
      <template v-slot="slotProps"> <!-- eslint-disable-line -->
        <div class="flex max-w-xs py-4 px-4 bg-orange-500 shadow-lg rounded-lg my-20">
            <div class="text-white" ><span v-html="selectedSiteHtml"/></div>
        </div>
      </template>
    </ol-overlay>
    <ol-vector-layer>
      <ol-source-vector
        projection="EPSG:2154"
        url="/assets/geojson/sitesdepratique.geojson"
        :format="geoJson"
      />

      <ol-style>
        <ol-style-icon :src="markerIconRed" :scale="0.5"></ol-style-icon>
      </ol-style>
    </ol-vector-layer>
  </ol-map>
</template>
<script lang="ts">
import OpenLayersMap from 'vue3-openlayers'; 
import markerIconRed from '@/assets/img/marker-orange.svg';
// vue3 openlayers
// import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css'

import {
  ref, inject,
} from 'vue'

export default {
  props: {
    mapClass: {
      type: String,
      default: 'w-[400px]'
    }
  },
  setup() {
    this.$.appContext.app.use(OpenLayersMap); //eslint-disable-line 
    const center = ref([706897.62, 7033567.10])
    const projection = ref('EPSG:2154');
    const zoom = ref(9);
    const rotation = ref(0);
    const matrixSet = ref('PM');
    const url = ref('https://wxs.ign.fr/pratique/geoportail/wmts');
    const layerName = ref('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2');
    const format = ref('image/png');
    const styleName = ref('normal');
    const attribution = ref('Tiles © <a href="https://www.ign.fr">IGN</a>');
    const olformat = inject('ol-format');
    const geoJson = new olformat.GeoJSON();
    const espg2154Extent = [-357823.2365, 6037008.6939, 1313632.3628, 7230727.3772];
    const selectConditions = inject('ol-selectconditions')
    const selectCondition = selectConditions.pointerMove;
    const selectedSiteHtml = ref('')
    const selectedSitePosition = ref([]);
    const extent = inject('ol-extent');

    const featureSelected = (event) => {
      if (event.selected[0] != undefined) {
        console.log(event.selected[0].values_.html);
        selectedSitePosition.value = extent.getCenter(event.selected[0].getGeometry().extent_);
        selectedSiteHtml.value = event.selected[0].values_.html;
      }
    }
    const selectInteactionFilter = (feature) => {
      return feature.values_ != undefined;
    };

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
      geoJson,
      markerIconRed,
      espg2154Extent,
      featureSelected,
      selectCondition,
      selectInteactionFilter,
      selectedSiteHtml,
      selectedSitePosition,
    }
  },
};
</script>
