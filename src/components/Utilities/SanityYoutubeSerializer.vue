<!--
=========================================================
* © 2022 Ronan LE MEILLAT for Les Ailes du Mont-Blanc
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
  <iframe class="w-full aspect-video" :src="`https://www.youtube.com/embed${youtubeURL.pathname}`"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
</template>
<script setup lang="ts">

const props = defineProps<{
  url: string;
}>()
const youtubeURL = new URL(props.url)

</script>
