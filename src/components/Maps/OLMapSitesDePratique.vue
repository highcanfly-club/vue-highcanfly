<template>
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
                    <ol-vector-layer>
        <ol-source-vector projection="EPSG:2154" url="/assets/geojson/sitesdepratique.geojson" :format="geoJson"/>

                <ol-style>
            <ol-style-stroke color="red" :width="2"></ol-style-stroke>
            <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
            <ol-style-icon :src="markerIconYellow" :scale="0.1"></ol-style-icon>
        </ol-style>

    </ol-vector-layer>
              </ol-map>
</template>
<script>

import markerIconYellow from '@/assets/img/marker.png';
import {
  ref,inject
} from 'vue'

export default {
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
    const olformat = inject('ol-format'); //eslint-disable-line
    const geoJson = new olformat.GeoJSON();

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
      markerIconYellow
    }
  },
};
</script>
