<template>
  <lazy-img
    :src="cloudinarySrc(src, width, height).format('auto').toURL()"
    :srcPlaceholder="srcPlaceholder"
  />
</template>
<script>
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import LazyImg from "@/components/Utilities/LazyImg.vue";
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "demo",
  },
});
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
      let _img = cloudinary.image(img);
      if (width !== undefined || height !== undefined) {
        let _fill = fill();
        if (width !== undefined) {
            _fill = _fill.width(width);
        }
        if (height !== undefined) {
          _fill = _fill.height(height);
        }
        _img.resize(_fill);
      }

      return _img;
    },
  },
  components: {
    LazyImg,
  },
};
</script>
