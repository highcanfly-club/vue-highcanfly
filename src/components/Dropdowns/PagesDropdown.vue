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
  <div @mouseleave="toggleDropdown($event)">
    <button
      :class="`${color} hover:${colorhover} px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold`"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      Navigation
    </button>
    <div
      class="
        absolute
        bg-white
        text-base
        z-50
        float-left
        py-2
        list-none
        text-left
        rounded
        shadow-lg
        min-w-48
      "
      ref="popoverDropdownRef"
      v-if="dropdownPopoverShow"
    >
      <span
        class="
          text-sm
          pt-2
          pb-0
          px-4
          font-bold
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-400
        "
        >Club</span
      >
      <router-link
        to="/landing"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Accueil</router-link
      >
      <router-link
        to="/blog"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Blog</router-link
      >
      <router-link
        to="/about"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >À propos</router-link
      >
      <router-link
        to="/policy"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Politique de confidentialité</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="
          text-sm
          pt-2
          pb-0
          px-4
          font-bold
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-400
        "
        >Cartes</span
      >
      <router-link
        to="/map-sites-de-pratique"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Nos sites de pratiques</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="
          text-sm
          pt-2
          pb-0
          px-4
          font-bold
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-400
        "
        >Utilitaires</span
      >
      <router-link
        to="/trackjoiner"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Assemblez vos traces en 3D</router-link
      >
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="
          text-sm
          pt-2
          pb-0
          px-4
          font-bold
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-400
        "
        >Météo</span
      >
      <router-link
        to="/meteo"
        class="
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-700
        "
        >Météo sur nos sites</router-link
      >
      <li>
        <pages-dropdown-meteo />
      </li>
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <mini-card-algolia-search
        :applicationId="algoliaApplicationId"
        :searchKey="algoliaSearchKey"
        filter="type:post"
        baseUrl="/sanity-blog"
        :indexName="`highcanfly-${sanityDataset}-index`"
      />
      <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
      <span
        class="
          text-sm
          pt-2
          pb-0
          px-4
          font-bold
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-slate-400
        "
        >Administration</span
      >
      <administration-dropdown />
    </div>
  </div>
</template>
<script lang="ts">
import { createPopper } from "@popperjs/core";
import PagesDropdownMeteo from "@/components/Dropdowns/PagesDropdownMeteo.vue";
import MiniCardAlgoliaSearch from "@/components/Cards/MiniCardAlgoliaSearch.vue";
import AdministrationDropdown from "@/components/Dropdowns/AdministrationDropdown.vue";
import sanityConf from '@/config/sanity-conf.json'
import algoliaConf from '@/config/algolia-conf.json'

const algoliaSearchKey = algoliaConf.key
const algoliaApplicationId = algoliaConf.id
const sanityDataset = sanityConf.dataset

export default {
  location: window.location.origin,
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
      algoliaSearchKey,
      algoliaApplicationId,
      sanityDataset,
      location: this.location,
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
          placement: "bot" + "tom-start",
        });
      }
    },
  },
  components: {
    PagesDropdownMeteo,
    MiniCardAlgoliaSearch,
    AdministrationDropdown,
  },
};
</script>
