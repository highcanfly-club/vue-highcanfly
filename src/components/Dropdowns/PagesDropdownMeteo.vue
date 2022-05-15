<template>
  <div @mouseleave="toggleDropdown($event)">
    <button
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 text-left"
      ref="btnDropdownMeteoRef"
      v-on:click="toggleDropdown($event)"
      ><i
        style="transform: rotate(90deg)"
        class="fa-solid fa-arrow-down-short-wide"
      ></i>
      Météo d'ailleurs</button
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
        v-for="place in places.features"
        :key="place"
        :to="`/meteo/${place.properties.slug}`"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >{{ place.properties.name }}</router-link
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
<script lang="ts">
import { createPopper } from "@popperjs/core";
import _places from '@/config/places.json';
import {ref, defineComponent} from "vue";
//import type GeoJSON from '@/types/GeoJSON';
const places:GeoJSON.FlyingPlaceCollection = _places as unknown as GeoJSON.FlyingPlaceCollection;

export default defineComponent({
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
    console.log(this.places);
    return {
      places: ref(places),
      dropdownMeteoPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event:Event) {
      event.preventDefault();
      if (this.dropdownMeteoPopoverShow) {
        this.dropdownMeteoPopoverShow = false;
      } else {
        this.dropdownMeteoPopoverShow = true;
        createPopper(
          this.$refs.btnDropdownMeteoRef as HTMLElement,
          this.$refs.popoverDropdownMeteoRef as HTMLElement,
          {
            placement: "left",
          }
        );
      }
    },
  },
});
</script>
