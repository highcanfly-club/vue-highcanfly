<!--
=========================================================
* © 2022 Ronan LE MEILLAT for Les Ailes du Mont-Blanc
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
  <div>
    <div v-if="display === 'carousel'">
      <!-- GalleryCarousel -->
      <vue-agile ref="carousel" class="carousel hidden sm:block" :as-nav-for="(returnedObject as CarouselImages).asNavFor1" :options="carouselOptions">
        <div v-for="(image, index) in images" :key="(image._key as string)" class="slide" :class="`slide--${index}`">
          <img :src="imageUrlFor(image).auto('format').width(1200).fit('crop').toString()" @click="lightBox(image)"
            :alt="((image.asset as unknown as ImageAsset).altText as string)" />
        </div>
      </vue-agile>
      <vue-agile ref="thumbnails" :as-nav-for="(returnedObject as CarouselImages).asNavFor2" :options="carouselThumbnailsOptions">
        <div v-for="(image, index) in images" :key="(image._key as string)" class="h-screen-1/2 sm:h-fit"
          :class="`slide--thumbnails slide--${index}`" @click="thumbnails.goTo(index)">
          <img :src="imageUrlFor(image).width(200).height(200).fit('crop').auto('format').toString()"
            :alt="((image.asset as unknown as ImageAsset).altText as string)"
            class="sm:aspect-square sm:object-cover sm:mx-auto" />
        </div>
        <template v-slot:prevButton><i class="fas fa-chevron-left"></i></template>
        <template v-slot:nextButton><i class="fas fa-chevron-right"></i></template>
      </vue-agile>

      <!-- /GalleryCarousel -->
    </div>

    <div v-if="display === 'grid'" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <!-- GalleryGrid -->
      <div class="rounded overflow-hidden" v-for="image in images" :key="(image._key as string)">
        <lazy-img class="aspect-square object-cover mx-auto"
          :src="imageUrlFor(image).auto('format').width(400).height(400).fit('crop').toString()"
          :alt="(image.asset as unknown as ImageAsset).altText"
          :src-placeholder="imageUrlFor(image).auto('format').width(400).height(400).fit('crop').quality(5).toString()"
          @click="lightBox(image)" @load="lazyImgLoad((image.asset as unknown as ImageAsset).url)" />
      </div>
      <!-- /GalleryGrid -->
    </div>
    <div v-if="display === 'stacked'" class="flex-col">
      <!-- GalleryStacked -->
      <div v-for="image in images" :key="image._key  as string">
        <lazy-img :src="imageUrlFor(image).auto('format').toString()" class="mx-auto" @click="lightBox(image)"
          :src-placeholder="imageUrlFor(image).auto('format').quality(5).toString()"
          :alt="(image.asset as unknown as ImageAsset).altText"
          @load="lazyImgLoad((image.asset as unknown as ImageAsset).url)" />
      </div>
      <!-- /GalleryStacked -->
    </div>
    <div v-if="display === 'tiles-justified'">
      <!-- GalleryTilesJustified -->
      <div ref="gallery" class="-mb-8" v-for="row ,index in (returnedObject as SplittedImages)" :key="index">
        <div ref="gallery-row" class="inline-block overflow-hidden whitespace-nowrap" v-for="img in row.images"
          :key="img._key  as string" :style="{
            width:
              (100 * (img.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio) /
                row.sumAspectRatio +
              '%',
          }">
          <div ref="gallery-row-image-container" class="relative m-0" :style="{
            paddingBottom:
              100 / (img.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio + '%',
          }">
            <!-- <lazy-img ref="gallery-row-image" class="absolute block left-0 top-O w-full h-full"
              :alt="(img.asset as unknown as ImageAsset).altText"
              :src="imageUrlFor(img).width(Math.round(1200 * (img.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio /row.sumAspectRatio)).auto('format').toString()"
              :src-placeholder="imageUrlFor(img).width(Math.round(1200 * (img.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio /row.sumAspectRatio)).auto('format').quality(5).toString()"
              @load="lazyImgLoad((img.asset as unknown as ImageAsset).url)" @click="lightBox(img)" /> -->
            <css-lightbox ref="gallery-row-image" class="absolute block left-0 top-O w-full h-full"
            :src="imageUrlFor(img).width(Math.round(1200 * (img.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio /row.sumAspectRatio)).auto('format').toString()"
            :full-screen-src="imageUrlFor(img).auto('format').toString()"
            :lazy="true"
            />
          </div>
        </div>
      </div>
      <!-- /GalleryTilesJustified -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { VueAgile } from "vue-agile";
import * as basiclightbox from "basiclightbox";
import LazyImg from "@/components/Utilities/LazyImg.vue";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { onMounted, ref } from "vue";
import sanityConf from "@/config/sanity-conf.json"
import type { Image, ImageAsset } from "@sanity/types";
import CssLightbox from "@/utilities/CssLightbox.vue";

type SplittedImages = { images: Image[], sumAspectRatio: number }[]
interface CarouselImages extends Array<Image> {asNavFor1: Image[], asNavFor2: Image[]}//{asNavFor1:Image[], asNavFor2:Image[], carouselOptions: typeof carouselOptions, carouselThumbnailsOptions: typeof carouselThumbnailsOptions}


const props = withDefaults(defineProps<{
  display: string;
  images: Image[];
  imagesPerRow?: number;
  zoom?: boolean;
}>(), {
  imagesPerRow: 3,
  zoom: true,
})

const thumbnails = ref(null as VueAgile)
const carousel = ref(null as VueAgile)

const client = sanityClient({
  projectId: sanityConf.projectId,//  process.env.VUE_APP_SANITY_PROJECT_ID,
  dataset: sanityConf.dataset,// process.env.VUE_APP_SANITY_DATASET,
  token: '',// process.env.VUE_APP_SANITY_READ_TOKEN,
  useCdn: sanityConf.useCdn,
  apiVersion: sanityConf.apiVersion//process.env.VUE_APP_SANITY_VERSION,
});

const imageBuilder = imageUrlBuilder(client);
let zoom = true;

const carouselOptions = {
  dots: false,
  fade: true,
  navButtons: false,
};

const carouselThumbnailsOptions = {
  autoplay: false,
  autoplaySpeed: 5000,
  centerMode: true,
  dots: true,
  navButtons: false,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 200,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        navButtons: true,
      },
    },
  ],
};

const returnedObject = ref([] as Image[] | SplittedImages | CarouselImages);
switch (props.display) {
  case "grid":
  case "stacked":
    returnedObject.value = props.images;
    break;

  case "tiles-justified":
    returnedObject.value = splitArrayPerRow(props.images, props.imagesPerRow);
    const t = returnedObject.value[0].images[0]
    break;

  case "carousel":
    returnedObject.value = props.images;
    Object.defineProperty(returnedObject.value, "asNavFor1", {
      value: []  as Image[] ,
      writable: true,
    });
    Object.defineProperty(returnedObject.value, "asNavFor2", {
      value: []  as Image[] ,
      writable: true,
    });
    Object.defineProperty(returnedObject.value, "carouselOptions", {
      value: carouselOptions,
      writable: true,
    });
    Object.defineProperty(returnedObject.value, "carouselThumbnailsOptions", {
      value: carouselThumbnailsOptions,
      writable: true,
    });
    break;
}

function imageUrlFor(source) {
  return imageBuilder.image(source);
};
const lazyImgLoad = (url) => {
  console.log(`image ${url} lazy loaded`);
};
const lightBox = (image) => {
  if (zoom) {
    const url = imageBuilder.image(image).auto('format').toString();
    basiclightbox
      .create(`<img src="${url}" />`)
      .show(() =>
        console.log(`lightbox ${image.asset.url} now visible`)
      );
  }
};
function splitArrayPerRow(array: Image[], max: number): SplittedImages {
  let srcArray = array;
  const arrays = [];
  while (srcArray.length) {
    const row = srcArray.slice(
      0,
      max < srcArray.length ? max : srcArray.length
    );
    arrays.push({
      images: row,
      sumAspectRatio: row.reduce(
        (c, n) => c + (n.asset as unknown as ImageAsset).metadata.dimensions.aspectRatio,
        0
      ),
    });
    if (max < srcArray.length) {
      srcArray = srcArray.slice(max);
    } else {
      srcArray = [];
    }
  }
  return arrays;
};

onMounted(() => {
  if (props.display === "carousel") {
    (returnedObject as any).asNavFor1.push(thumbnails.value);
    (returnedObject as any).asNavFor2.push(carousel.value);
  }
})

</script>
<style scoped>
.basicLightbox {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0.01;
  transition: opacity 0.4s ease;
  z-index: 1000;
  will-change: opacity;
}

.basicLightbox--visible {
  opacity: 1;
}

.basicLightbox__placeholder {
  max-width: 100%;
  transform: scale(0.9);
  transition: transform 0.4s ease;
  z-index: 1;
  will-change: transform;
}

.basicLightbox__placeholder>iframe:first-child:last-child,
.basicLightbox__placeholder>img:first-child:last-child,
.basicLightbox__placeholder>video:first-child:last-child {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  max-width: 95%;
  max-height: 95%;
}

.basicLightbox__placeholder>iframe:first-child:last-child,
.basicLightbox__placeholder>video:first-child:last-child {
  pointer-events: auto;
}

.basicLightbox__placeholder>img:first-child:last-child,
.basicLightbox__placeholder>video:first-child:last-child {
  width: auto;
  height: auto;
}

.basicLightbox--iframe .basicLightbox__placeholder,
.basicLightbox--img .basicLightbox__placeholder,
.basicLightbox--video .basicLightbox__placeholder {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.basicLightbox--visible .basicLightbox__placeholder {
  transform: scale(1);
}

.carousel {
  margin-bottom: 30px;
}

.thumbnails {
  margin: 0 -5px;
  width: calc(100% + 10px);
}

.agile__list {
  margin-bottom: 1rem;
}

.agile__actions {
  position: static;
}

.agile__nav-button {
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 24px;
  transition-duration: 0.3s;
}

.agile__nav-button:hover {
  color: #888;
}

.agile__dot {
  margin: 0 10px;
}

.agile__dot button {
  background-color: #eee;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: block;
  height: 10px;
  font-size: 0;
  line-height: 0;
  margin: 0;
  padding: 0;
  transition-duration: 0.3s;
  width: 10px;
}

.agile__dot--current button,
.agile__dot:hover button {
  background-color: #888;
}

.thumbnails .agile__nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.thumbnails .agile__nav-button--prev {
  left: -45px;
}

.thumbnails .agile__nav-button--next {
  right: -45px;
}

.slide {
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  height: 450px;
  justify-content: center;
}

.slide--thumbnails {
  cursor: pointer;
  height: 100px;
  padding: 0 5px;
  transition: opacity 0.3s;
}

.slide--thumbnails:hover {
  opacity: 0.75;
}

.slide img {
  height: 100%;
  object-fit: cover;
  object-position: center;
  width: 100%;
}
</style>
