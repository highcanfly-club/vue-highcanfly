<!--
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
-->
<template>
 <div
  class="relative flex flex-col h-full min-w-0 break-words w-full shadow-lg rounded bg-slate-700"
 >
  <div class="p-0.5 h-full">
   <iframe
    v-if="loaded"
    class="w-full h-full rounded"
    :src="src"
   ></iframe>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      src: "https://embed.windy.com/embed2.html?lat=50.475&lon=2.390&detailLat=50.419&detailLon=2.903&width=650&height=450&zoom=8&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=default&radarRange=-1",
    }
  },
  mounted() {
    this.loaded = true;
  }
}
</script>