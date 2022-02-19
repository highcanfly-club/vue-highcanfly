<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LazyObserver",
  data() {
    return {
      LazyObserver: null
    };
  },
  props: {
    root: {
      type: [Object],
      default: null
    },
    rootMargin: {
      type: [String, Number],
      default: "0px"
    },
    // means that the callback function will be executed as long as there is a target pixel present in the root element
    threshold: {
      type: [Array, Number],
      default: 0
    }
  },
  methods: {
    unobserve() {
      this.LazyObserver.unobserve(this.$el);
    }
  },
  mounted() {
    const options = {
      root: this.root,
      rootMargin: this.rootMargin,
      threshold: this.threshold
    };
    this.LazyObserver = new IntersectionObserver(entries => {
      this.$emit("on-change", entries[0], this.unobserve);
    }, options);
    this.LazyObserver.observe(this.$el);
  },
  beforeDestroy() {
    if (this.LazyObserver) {
      this.unobserve();
      this.LazyObserver = null;
    }
  }
};
</script>