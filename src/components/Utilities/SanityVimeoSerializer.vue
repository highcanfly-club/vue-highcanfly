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
  <iframe class="w-full aspect-video" title="vimeo-player" :src="`${vimeoURL.href}`"
    frameborder="0" allowfullscreen></iframe>
</template>
<script setup lang="ts">

const props = defineProps<{
  url: string;
}>()
const vimeoURL = new URL(props.url)


</script>