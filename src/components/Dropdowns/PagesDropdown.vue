<template>
  <div>
    <a
      :class="`${color} hover:${colorhover} px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
      >Navigation</a
    >
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400"
        >Club</span
      >
      <router-link
        to="/landing"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Accueil</router-link
      >
      <router-link
        to="/blog"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Blog</router-link
      >
      <router-link
        to="/about"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >À propos</router-link
      >
      <router-link
        to="/policy"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Politique de confidentialité</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400"
        >Cartes</span
      >
      <router-link
        to="/map-sites-de-pratique"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Nos sites de pratiques</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400"
        >Utilitaires</span
      >
      <router-link
        to="/trackjoiner"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Assemblez vos traces</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-slate-400"
        >Météo</span
      >
      <router-link
        to="/meteo"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
        >Météo sur nos sites</router-link
      >
      <li>
        <pages-dropdown-meteo />
      </li>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";
import PagesDropdownMeteo from "@/components/Dropdowns/PagesDropdownMeteo.vue";

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
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
  components: {
    PagesDropdownMeteo,
  },
};
</script>
