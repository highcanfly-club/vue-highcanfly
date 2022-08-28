<template>
  <iframe class="w-full aspect-video" title="vimeo-player" :src="`${vimeoURL.href}`"
    frameborder="0" allowfullscreen></iframe>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    url: {  //the prop correspond to [name: 'url'] in the 'fields' proprety of the vimeo.ts sanity schema
      type: String,
      required: true,
    }
  },
  data() {
    const vimeoURL = new URL(this.url)
    return {
      vimeoURL
    }
  },
})
</script>