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
          <h4 class="text-3xl font-semibold">High Can Fly</h4>
          <h5 class="text-lg mt-0 mb-2 text-slate-600">
            119, rue Marceau Martin
            <br />59128 Flers-en-Escrebieux
          </h5>
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
          <div class="flex flex-wrap items-top mb-6">
            <div class="w-full lg:w-4/12 px-4 ml-auto">
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
                  <a
                    class="
                      text-slate-600
                      hover:text-slate-800
                      font-semibold
                      block
                      pb-2
                      text-sm
                    "
                    href="/site-map"
                    >Plan du site</a
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
                    href="/policy?ref=vn-footer"
                    >Politique de confidentialité</a
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
                    href="https://www.facebook.com/Comité-Départemental-de-Vol-Libre-du-Nord-2518839258194595?ref=vn-footer"
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
                    href="https://federation.ffvl.fr/structure/14172?ref=vn-footer"
                    >HighCanFly - FFVL</a
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
                    href="https://www.highcanfly.club/contact?ref=vn-footer"
                    >Contactez-nous</a
                  >
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
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-slate-500 font-semibold py-1">
            <a
              href="https://www.highcanfly.club?ref=vn-footer"
              class="text-slate-500 hover:text-slate-800"
              >Copyright © High Can Fly 2018-{{ date }}</a
            >
            .
          </div>
        </div>
      </div>
    </div>

    <VueScrollUp
      tag="div"
      :scroll-duration="1000"
      :scroll-y="250">
      <img style="position: absolute;" src="@/assets/img/arrow-top.svg"/>
    </VueScrollUp>
  </footer>
</template>
<script>
import VueScrollUp from '@/plugins/vue-scroll-up';
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
  components: {
    VueScrollUp,
  }
};
</script>
