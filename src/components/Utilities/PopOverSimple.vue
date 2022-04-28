<template>
  <div
    class="
      absolute
      top-4
      z-10
      mt-2
      w-40
      rounded-md
      shadow-lg
      bg-white
      ring-1 ring-black ring-opacity-5
      focus:outline-none
    "
    :class="left ? 'left-0' : 'right-0'"
  >
    <svg
      class="block absolute rotate-90 right-4 -top-4"
      :class="left ? 'left-4' : 'right-4'"
      width="30px"
      height="30px"
      viewBox="0 0 9 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="Tooltips-"
          transform="translate(-874.000000, -1029.000000)"
          fill="#FFFFFF"
        >
          <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
            <g id="Group-2" transform="translate(24.000000, 0.000000)">
              <polygon
                id="Triangle"
                transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                points="4.5 57.5 12.5 66.5 -3.5 66.5"
              ></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <div class="p-2 text-left" role="none">
      <div class="font-semibold">{{ title }}</div>
      <div class="text-xs" v-html="text"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    text: String,
    left: {
      type: Boolean,
      default: false,
    },
  },
};
</script>