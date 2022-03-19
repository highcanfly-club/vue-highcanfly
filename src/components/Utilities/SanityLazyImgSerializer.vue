<template>
  <lazy-img
    ref="gallery-row-image"
    class=""
    :src="imageUrlFor(asset).auto('format').width(1200).toString()"
    :alt="asset.altText"
    :src-placeholder="imageUrlFor(asset).auto('format').width(1200).quality(5).toString()"
    @load="lazyImgLoad(asset.url, $event)"
    @click="lightBox(asset, $event)"
  />
</template>
<script>
import * as basiclightbox from "basiclightbox";
import LazyImg from "@/components/Utilities/LazyImg.vue";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {sanityConf} from "@/plugins/auth0/sanityStore"

const imageBuilder = imageUrlBuilder(sanityClient(sanityConf));

export default {
  props: {
    asset: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  components: {
    LazyImg,
  },
  methods: {
    imageUrlFor(source) {
      let url = imageBuilder.image(source);
      return url;
    },
    lazyImgLoad: (url) => {
      console.log(`image ${url} lazy loaded`);
    },
    lightBox: (image) => {
      let url = imageBuilder.image(image).auto("format").toString();
      basiclightbox
        .create(`<img src="${url}" />`)
        .show(() => console.log(`lightbox ${image.url} now visible`));
    },
  },
};
</script>
