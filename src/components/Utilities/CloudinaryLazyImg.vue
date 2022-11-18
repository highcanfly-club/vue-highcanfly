<template>
  <lazy-img
    :src="cloudinarySrc(src, width, height).format('auto').toURL()"
    :srcPlaceholder="srcPlaceholder"
  />
</template>
<script>
import {LazyImg} from "@sctg/lazy-vue"
import {getCloudinaryImg} from '@/plugins/highcanfly';
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    srcPlaceholder: {
      type: String,
      default:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  methods: {
    cloudinarySrc: (img, width, height) => {
      return getCloudinaryImg(img, width, height);
    },
  },
  components: {
    LazyImg,
  },
};
</script>
