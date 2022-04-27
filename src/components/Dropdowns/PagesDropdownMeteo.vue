<template>
  <div @mouseleave="toggleDropdown($event)">
    <a
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
      href="#meteo"
      ref="btnDropdownMeteoRef"
      v-on:click="toggleDropdown($event)"
      ><i
        style="transform: rotate(90deg)"
        class="fa-solid fa-arrow-down-short-wide"
      ></i>
      Météo d'ailleurs</a
    >
    <div
      ref="popoverDropdownMeteoRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownMeteoPopoverShow,
        block: dropdownMeteoPopoverShow,
      }"
    >
      <router-link
        to="/meteo/all"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Tous les sites</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <router-link
        v-for="place in places"
        :key="place.slug"
        :to="`/meteo/${place.slug}`"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >{{ place.name }}</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <router-link
        to="/windy"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Le vent (Windy)</router-link
      >
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";
import places from "@/places.json";
export default {
  props: {
    color: {
      type: String,
      default: "text-white",
    },
    colorhover: {
      type: String,
      default: "text-slate-200",
    },
  },
  data() {
    return {
      places,
      dropdownMeteoPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownMeteoPopoverShow) {
        this.dropdownMeteoPopoverShow = false;
      } else {
        this.dropdownMeteoPopoverShow = true;
        createPopper(
          this.$refs.btnDropdownMeteoRef,
          this.$refs.popoverDropdownMeteoRef,
          {
            placement: "left",
          }
        );
      }
    },
  },
};
</script>
