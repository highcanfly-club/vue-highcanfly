<template>
  <nav
    class="top-0 fixed z-40 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
      >
        <router-link
          class="text-slate-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          to="/"
        >
          High Can Fly 
        </router-link>

      </div>
      <div
        class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none "
        :class="[navbarOpen ? 'block rounded shadow-lg' : 'hidden']"
        id="example-navbar-warning"
      >
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto ">
          <li class="flex items-center">
            <PagesDropdownWhite />
          </li>
          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://www.instagram.com/highcanfly_parapente/"
              target="_blank"
            >
              <i
                class="text-slate-400 fab fa-instagram text-lg leading-lg"
              />
              <span class="lg:hidden inline-block ml-2">Share</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://twitter.com/HighCanFlyClub"
              target="_blank"
            >
              <i
                class="text-slate-400 fab fa-twitter text-lg leading-lg"
              />
              <span class="lg:hidden inline-block ml-2">Tweet</span>
            </a>
          </li>

          <li class="flex items-center">
            <a
              class="lg:text-white lg:hover:text-slate-200 text-slate-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
              href="https://github.com/eltorio/vue-highcanfly/tree/highcanfly?ref=vn-auth-navbar"
              target="_blank"
            >
              <i
                class="text-slate-400 fab fa-github text-lg leading-lg"
              />
              <span class="lg:hidden inline-block ml-2">Star</span>
            </a>
          </li>

          <li class="flex items-center">
            <button
              class="bg-gradient-to-r from-watermelon-500 to-pistachio-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
              onclick="location.href='https://intranet.ffvl.fr/ffvl_licenceonline/pre_rempli/NEW/14172'"
            >
              <i class="fas fa-arrow-alt-circle-down"></i> Prenez votre licence
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import PagesDropdownWhite from "@/components/Dropdowns/PagesDropdownWhite.vue";
export default {
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
    PagesDropdownWhite,
  },
};
</script>
