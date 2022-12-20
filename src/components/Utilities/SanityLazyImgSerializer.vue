<!--
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
-->
<!--
=========================================================
* © 2022 Ronan LE MEILLAT for Les Ailes du Mont-Blanc
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
  <!-- <lazy-img ref="gallery-row-image" class="" :src="imageUrlFor(asset as Asset).auto('format').width(1200).toString()"
    :alt="asset.altText" :src-placeholder="imageUrlFor(asset as Asset).auto('format').width(1200).quality(5).toString()"
    @load="lazyImgLoad((asset as Asset).url)" @click="lightBox(asset as Asset)" /> -->
    <css-lightbox :src="imageUrlFor(asset as Asset).auto('format').width(1200).toString()" 
    :full-screen-src="imageUrlFor(asset as Asset).auto('format').toString()"
    @load="lazyImgLoad((asset as Asset).url)"
    :lazy="true"
    />


</template>
<script setup lang="ts">
// import * as basiclightbox from "basiclightbox";
// import LazyImg from "@/components/Utilities/LazyImg.vue";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConf } from "@/plugins/auth0/sanityStore"
import type { Asset } from "@sanity/types";
import {CssLightbox} from "@sctg/lazy-vue";
import '@sctg/lazy-vue/dist/index.css'
const props = defineProps<{
  asset: Asset;
}>()

const imageBuilder = imageUrlBuilder(sanityClient(sanityConf));
function imageUrlFor(source: Asset) {
  const url = imageBuilder.image(source);
  return url;
};
const lazyImgLoad = (url: string) => {
  console.log(`image ${url} lazy loaded`);
};

// const lightBox = (image: Asset) => {
//   const url = imageBuilder.image(image).auto("format").toString();
//   basiclightbox
//     .create(`<img src="${url}" />`)
//     .show(() => console.log(`lightbox ${(image as Asset).url} now visible`));
// };

</script>
