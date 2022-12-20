<!--
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
-->
<template>
  <div class="flex w-full">
    <label :for="id" class="flex items-center cursor-pointer">
      <!-- toggle -->
      <div class="relative">
        <!-- input -->
        <input
          :id="id"
          type="checkbox"
          class="sr-only peer"
          :checked="checked"
        />
        <!-- line -->
        <div class="w-10 h-4 rounded-full shadow-inner" :class="color"></div>
        <!-- dot -->
        <div
          class="
            peer-checked:translate-x-full
            absolute
            w-6
            h-6
            bg-white
            rounded-full
            shadow
            -left-1
            -top-1
            transition
          "
          :class="dotColor"
        ></div>
      </div>
      <!-- label -->
      <div class="ml-3">
        <slot />
      </div>
    </label>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    color: {
      type: String,
      default: "bg-slate-400",
    },
    checkedColor: {
      type: String,
      default: "bg-slate-600",
    },
  },
  data() {
    return {
      dotColor: this.checkedColor
    };
  }
});
</script>
