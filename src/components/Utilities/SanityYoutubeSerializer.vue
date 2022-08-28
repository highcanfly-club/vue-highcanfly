<template>
  <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed${youtubeURL.pathname}`" title="YouTube video player"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    url: {  //the prop correspond to [name: 'url'] in the 'fields' proprety of the youtube.ts sanity schema
      type: String,
      required: true,
    }
  },
  data() {
    const youtubeURL = new URL(this.url)
    return {
      youtubeURL
    }
  },
})
</script>