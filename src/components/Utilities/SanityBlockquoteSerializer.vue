<template>
  <div>
    <blockquote
      className="relative p-4 text-lg italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote"
    >
      <div
        className="absolute -left-0.5 top-1 text-5xl font-serif stylistic-quote-mark"
      >
        &ldquo;
      </div>
      <cite v-html="blockquote"> </cite>
      <div
        className="absolute right-1.5 -bottom-4 text-5xl font-serif stylistic-quote-mark"
      >
        &rdquo;
      </div>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "BasicCard",
  data() {
    let blockquote = "";
    this.$slots.default().forEach((element) => {
      switch (element.type) {
        case "strong":
          blockquote += `<b>${element.children}</b>`;
          break;
        case "em":
          blockquote += `<em>${element.children}</em>`;
          break;
        case "mark":
          blockquote += `<mark>${element.children}</mark>`;
          break;
        default:
          blockquote += element.children;
      }
    });
    return {
      blockquote: blockquote,
    };
  },
  methods: {},
  components: {},
};
</script>
