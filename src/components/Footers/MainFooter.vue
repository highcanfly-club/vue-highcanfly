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
  <footer class="relative bg-slate-200 pt-8 pb-6">
    <div
      class="
        bottom-auto
        top-0
        left-0
        right-0
        w-full
        absolute
        pointer-events-none
        overflow-hidden
        -mt-20
        h-20
      "
      style="transform: translateZ(0)"
    >
      <svg
        class="absolute bottom-0 overflow-hidden"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        version="1.1"
        viewBox="0 0 2560 100"
        x="0"
        y="0"
      >
        <polygon
          class="text-slate-200 fill-current"
          points="2560 0 2560 100 0 100"
        />
      </svg>
    </div>
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap text-center lg:text-left">
        <div class="w-full lg:w-6/12 px-4">
          <address class="not-italic text-sm mt-0 mb-2 text-slate-600">
            <h4 class="text-3xl font-semibold">High Can Fly</h4>
            119 rue Marceau Martin
            <br />59128 Flers-en-Escrebieux <br />Nord <br />Hauts-de-France
          </address>
          <div class="mt-6 lg:mb-0 mb-6">
            <button
              class="
                bg-white
                text-sky-400
                shadow-lg
                font-normal
                h-10
                w-10
                items-center
                justify-center
                align-center
                rounded-full
                outline-none
                focus:outline-none
                mr-2
              "
              type="button"
              onclick="location.href='https://twitter.com/HighCanFlyClub'"
            >
              <i class="fab fa-twitter"></i>
            </button>
            <button
              class="
                bg-white
                text-sky-600
                shadow-lg
                font-normal
                h-10
                w-10
                items-center
                justify-center
                align-center
                rounded-full
                outline-none
                focus:outline-none
                mr-2
              "
              type="button"
              onclick="location.href='https://www.instagram.com/highcanfly_parapente/'"
            >
              <i class="fab fa-instagram-square"></i>
            </button>
            <button
              class="
                bg-white
                text-slate-800
                shadow-lg
                font-normal
                h-10
                w-10
                items-center
                justify-center
                align-center
                rounded-full
                outline-none
                focus:outline-none
                mr-2
              "
              type="button"
              onclick="location.href='https://github.com/eltorio/vue-highcanfly/tree/highcanfly'"
            >
              <i class="fab fa-github"></i>
            </button>
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="flex flex-wrap items-top justify-end">
            <div
              class="w-full lg:w-4/12 px-4"
              v-if="$auth0.user.value"
            >
              <span
                class="
                  block
                  uppercase
                  text-slate-500 text-xs
                  font-semibold
                  mb-2
                "
                >Administration</span
              >
              <ul class="list-unstyled">
                <li>
                  <span
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-xs
                      cursor-pointer
                    "
                    to="/login"
                    @click="logout"
                    >Logout</span
                  >
                </li>
                <li>
                  <span class="text-xs">{{
                    $auth0.user.value !== undefined
                      ? $auth0.user.value.name
                      : ""
                  }}</span>
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span
                class="
                  block
                  uppercase
                  text-slate-500 text-sm
                  font-semibold
                  mb-2
                "
                >Liens utiles</span
              >
              <ul class="list-unstyled">
                <li>
                  <router-link
                    to="/about"
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    >À propos</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/blog"
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    >Blog</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    to="/site-map"
                    >Plan du site</router-link
                  >
                </li>
                <li>
                  <router-link
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    to="/policy"
                    >Politique de confidentialité</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="w-full lg:w-4/12 px-4">
              <span
                class="
                  block
                  uppercase
                  text-slate-500 text-sm
                  font-semibold
                  mb-2
                "
                >Autres sites</span
              >
              <ul class="list-unstyled">
                <li>
                  <a
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    href="https://wwww.cdvl59.cf"
                    >Comité Départemental de Vol Libre du Nord</a
                  >
                </li>
                <li>
                  <a
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    href="https://federation.ffvl.fr/structure/14172?ref=highcanfly-footer"
                    >HighCanFly - FFVL</a
                  >
                </li>
                <li>
                  <router-link
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    to="/contact"
                    >Contactez-nous</router-link
                  >
                </li>
                <li>
                  <span
                    class="
                      flex flex-nowrap
                      align-center
                      justify-center
                      lg:justify-start
                    "
                  >
                    <img
                      class="h-4 w-4"
                      src="@/assets/img/logo_high_can_fly.svg"
                      alt="logo High Can Fly parapente"
                    />
                    <a
                      class="
                        text-slate-600
                        hover:text-slate-800
                        font-semibold
                        block
                        pb-2
                        text-sm
                      "
                      href="https://cfdmv.highcanfly.club"
                      >Trackjoiner</a
                    >
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-6 border-slate-300" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full px-4 mx-auto text-center">
          <div class="text-sm text-slate-500 font-semibold py-1">
            <router-link
              @mouseover="copyright_text = 'build: ' + commit_date"
              @mouseleave="copyright_text = '2018-' + new Date().getFullYear()"
              to="/"
              class="whitespace-nowrap text-slate-500 hover:text-slate-800"
              >Copyright © High Can Fly {{ copyright_text }}</router-link
            ><br /><a
              class="whitespace-nowrap text-slate-500 hover:text-slate-800"
              href="https://sanity.io"
              >Données structurées propulsées gracieusement par Sanity.io</a
            ><br /><a
              class="whitespace-nowrap text-slate-500 hover:text-slate-800"
              href="https://www.algolia.com/"
              >Moteur de recherche offert par
              <i class="fab fa-algolia"></i> Algolia</a
            >
          </div>
        </div>
      </div>
    </div>

    <VueScrollUp tag="div" :scroll-duration="1000" :scroll-y="250">
      <img
        style="position: absolute"
        src="@/assets/img/arrow-top.svg"
        alt="remonter"
      />
    </VueScrollUp>
  </footer>
</template>
<script lang="ts">
import VueScrollUp from "@/plugins/vue-scroll-up";
import Commit from '@/config/commit.json'
import {
  resetSanityConfToDefaults,
} from "@/plugins/auth0/sanityStore";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      copyright_text: "2018-" + new Date().getFullYear(),
      commit_date: new Intl.DateTimeFormat("fr-FR", {
        year: "2-digit",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(Commit.vue_highcanfly)),
      date: new Date().getFullYear(),
    };
  },
  components: {
    VueScrollUp,
  },
  methods: {
    logout() {
      resetSanityConfToDefaults(); //reset to default
      this.$auth0.logout({
        localOnly: true,
      });
      console.log(this.$sanityConf);
    },
  },
});
</script>
