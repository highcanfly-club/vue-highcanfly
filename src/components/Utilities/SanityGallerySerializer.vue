<template>
  <div>
    <div v-if="display === 'carousel'">
      <!-- GalleryCarousel -->
      <vue-agile
        ref="carousel"
        class="carousel hidden sm:block"
        :as-nav-for="asNavFor1"
        :options="carouselOptions"
      >
        <div
          v-for="(image, index) in images"
          :key="image._key"
          class="slide"
          :class="`slide--${index}`"
        >
          <img :src="imageUrlFor(image).auto('format').width(1200).fit('crop').toString()" @click="lightBox(image,$event)" :alt="image.asset.altText"/>
        </div>
      </vue-agile>
      <vue-agile
        ref="thumbnails"
        :as-nav-for="asNavFor2"
        :options="carouselThumbnailsOptions"
      >
        <div
          v-for="(image, index) in images"
          :key="image._key"
          class="h-screen-1/2 sm:h-fit"
          :class="`slide--thumbnails slide--${index}`"
          @click="$refs.thumbnails.goTo(index)"
        >
          <img
            :src="imageUrlFor(image).width(200).height(200).fit('crop').auto('format').toString()"
            :alt="image.asset.altText"
            class="sm:aspect-square sm:object-cover sm:mx-auto"
          />
        </div>
        <template v-slot:prevButton
          ><i class="fas fa-chevron-left"></i
        ></template>
        <template v-slot:nextButton
          ><i class="fas fa-chevron-right"></i
        ></template>
      </vue-agile>

      <!-- /GalleryCarousel -->
    </div>

    <div
      v-if="display === 'grid'"
      class="grid grid-cols-2 sm:grid-cols-3 gap-4"
    >
      <!-- GalleryGrid -->
      <div
        class="rounded overflow-hidden"
        v-for="image in images"
        :key="image._key"
      >
        <lazy-img
          class="aspect-square object-cover mx-auto"
          :src="imageUrlFor(image).auto('format').width(400).height(400).fit('crop').toString()"
          :alt="image.asset.altText"
          :src-placeholder="imageUrlFor(image).auto('format').width(400).height(400).fit('crop').quality(5).toString()"
          @click="lightBox(image,$event)"
          @load="lazyImgLoad(image.asset.url, $event)"
        />
      </div>
      <!-- /GalleryGrid -->
    </div>
    <div v-if="display === 'stacked'" class="flex-col">
      <!-- GalleryStacked -->
      <div v-for="image in images" :key="image._key">
        <lazy-img :src="imageUrlFor(image).auto('format').toString()" class="mx-auto" @click="lightBox(image,$event)" 
        :src-placeholder="imageUrlFor(image).auto('format').quality(5).toString()"
        :alt="image.asset.altText"
        @load="lazyImgLoad(image.asset.url, $event)"/>
      </div>
      <!-- /GalleryStacked -->
    </div>
    <div v-if="display === 'tiles-justified'">
      <!-- GalleryTilesJustified -->
      <div
        ref="gallery"
        class="-mb-8"
        v-for="row in splittedImages"
        :key="row.id"
      >
        <div
          ref="gallery-row"
          class="inline-block overflow-hidden whitespace-nowrap"
          v-for="img in row.images"
          :key="img._key"
          :style="{
            width:
              (100 * img.asset.metadata.dimensions.aspectRatio) /
                row.sumAspectRatio +
              '%',
          }"
        >
          <div
            ref="gallery-row-image-container"
            class="relative m-0"
            :style="{
              paddingBottom:
                100 / img.asset.metadata.dimensions.aspectRatio + '%',
            }"
          >
            <lazy-img
              ref="gallery-row-image"
              class="absolute block left-0 top-O w-full h-full"
              :alt="img.asset.altText"
              :src="imageUrlFor(img).width(Math.round(1200 * img.asset.metadata.dimensions.aspectRatio /row.sumAspectRatio)).auto('format').toString()"
              :src-placeholder="imageUrlFor(img).width(Math.round(1200 * img.asset.metadata.dimensions.aspectRatio /row.sumAspectRatio)).auto('format').quality(5).toString()"
              @load="lazyImgLoad(img.asset.url, $event)"
              @click="lightBox(img,$event)"
            />
          </div>
        </div>
      </div>
      <!-- /GalleryTilesJustified -->
    </div>
  </div>
</template>
<script lang="ts">
import { VueAgile } from "vue-agile";
import * as basiclightbox from "basiclightbox";
import LazyImg from "@/components/Utilities/LazyImg.vue";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { defineComponent } from "vue";
import sanityConf from "@/config/sanity-conf.json"

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
export default defineComponent({
  props: {
    display: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    imagesPerRow: {
      type: Number,
      default: 3,
    },
    zoom: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    zoom = this.zoom;
    let returnedObject = {};
    switch (this.display) {
      case "grid":
      case "stacked":
        returnedObject = this.images;
        break;

      case "tiles-justified":
        returnedObject = {
          splittedImages: this.splitArrayPerRow(this.images, this.imagesPerRow),
        };
        break;

      case "carousel":
        returnedObject = this.images;
        Object.defineProperty(returnedObject, "asNavFor1", {
          value: [],
          writable: true,
        });
        Object.defineProperty(returnedObject, "asNavFor2", {
          value: [],
          writable: true,
        });
        Object.defineProperty(returnedObject, "carouselOptions", {
          value: carouselOptions,
          writable: true,
        });
        Object.defineProperty(returnedObject, "carouselThumbnailsOptions", {
          value: carouselThumbnailsOptions,
          writable: true,
        });
        break;
    }
    return returnedObject;
  },
  mounted() {
    if (this.display === "carousel") {
      this.asNavFor1.push(this.$refs.thumbnails);
      this.asNavFor2.push(this.$refs.carousel);
    }
  },
  components: {
    VueAgile,
    LazyImg,
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    lazyImgLoad: (url) => {
      console.log(`image ${url} lazy loaded`);
    },
    lightBox: (image) => {
      if (zoom) {
        const url = imageBuilder.image(image).auto('format').toString();
        basiclightbox
          .create(`<img src="${url}" />`)
          .show(() =>
            console.log(`lightbox ${image.asset.url} now visible`)
          );
      }
    },
    splitArrayPerRow: (array, max) => {
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
            (c, n) => c + n.asset.metadata.dimensions.aspectRatio,
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
    },
  },
});
</script>
<style>
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
.basicLightbox__placeholder > iframe:first-child:last-child,
.basicLightbox__placeholder > img:first-child:last-child,
.basicLightbox__placeholder > video:first-child:last-child {
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
.basicLightbox__placeholder > iframe:first-child:last-child,
.basicLightbox__placeholder > video:first-child:last-child {
  pointer-events: auto;
}
.basicLightbox__placeholder > img:first-child:last-child,
.basicLightbox__placeholder > video:first-child:last-child {
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
