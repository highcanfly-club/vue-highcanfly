<template>
  <nav
    id="top-nav" class="top-0 absolute z-40 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg z-[9999]"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-start justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          :class="color"
          class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          to="/"
        >
          High Can Fly
          <img src="@/assets/img/logo_high_can_fly.svg" alt="logo High Can Fly Parapente"/>
        </router-link>
        <button
          :class="color"
          class="self-start cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="setNavbarOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <div
        class="lg:flex lg:items-center lg:bg-opacity-0 lg:shadow-none"
        :class="[
          navbarOpen
            ? 'absolute right-3 block rounded shadow-lg mt-8 z-50 bg-white/50 pr-3'
            : 'hidden',
        ]"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li class="flex items-center">
            <PagesDropdown :color="color" :colorhover="colorhover" />
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.instagram.com/highcanfly_parapente/"
              target="_blank"
            >
              <i
                :class="iconscolor"
                class="fab fa-instagram text-lg leading-lg"
              />
              <span :class="color" class="lg:hidden inline-block ml-2"
                >instagram</span
              >
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://twitter.com/HighCanFlyClub"
              target="_blank"
            >
              <i
                :class="iconscolor"
                class="fab fa-twitter text-lg leading-lg"
              />
              <span :class="color" class="lg:hidden inline-block ml-2">tweet</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://github.com/eltorio/vue-highcanfly/tree/highcanfly?ref=vn-auth-navbar"
              target="_blank"
            >
              <i :class="iconscolor" class="fab fa-github text-lg leading-lg" />
              <span :class="color" class="lg:hidden inline-block ml-2">github</span>
            </a>
          </li>

          <li class="flex items-center">
            <button
              :class="buttoncolor"
              class="text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
              onclick="location.href='https://intranet.ffvl.fr/ffvl_licenceonline/pre_rempli/NEW/14172'"
            >
              <i class="fas fa-arrow-alt-circle-down"></i> Prenez votre licence
            </button>
          </li>
        </ul>
      </div>
      <!-- <div class="sm:hidden flex items-center absolute top-4 right-3">
        <button
          :class="buttoncolor"
          class="text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
          type="button"
          onclick="location.href='https://intranet.ffvl.fr/ffvl_licenceonline/pre_rempli/NEW/14172'"
        >
          <i class="fas fa-arrow-alt-circle-down"></i> Prenez votre licence
        </button>
      </div> -->
    </div>
  </nav>
</template>
<script>
import PagesDropdown from "@/components/Dropdowns/PagesDropdown.vue";
export default {
  props: {
    color: {
      type: String,
      default: "text-white",
    },
    iconscolor: {
      type: String,
      default: "text-slate-200",
    },
    buttoncolor: {
      type: String,
      default: "bg-white text-slate-700 active:bg-slate-50",
    },
    colorhover: {
      type: String,
      default: "text-slate-200",
    },
  },
  data() {
    return {
      navbarOpen: false,
    };
  },
  methods: {
    setNavbarOpen: function () {
      this.navbarOpen = !this.navbarOpen;
    },
  },
  components: {
    PagesDropdown,
  },
};
</script>
