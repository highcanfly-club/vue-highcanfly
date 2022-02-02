<template>
  <div>
    <navbar-grey />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ backgroundImage: 'url(' + state.backgroundImageURL + ')' }"
        >
          <span
            id="blackOverlay"
            class="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
            h-70-px
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
      </section>
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="
              relative
              flex flex-col
              min-w-0
              break-words
              bg-white
              w-full
              mb-6
              shadow-xl
              rounded-lg
              -mt-64
            "
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div
                  class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                >
                  <div class="relative">
                    <img
                      alt="..."
                      :src="logo"
                      class="
                        shadow-xl
                        rounded-full
                        h-auto
                        align-middle
                        border-none
                        absolute
                        -m-16
                        -ml-20
                        lg:-ml-16
                        max-w-150-px
                      "
                    />
                  </div>
                </div>
                <div
                  class="
                    w-full
                    lg:w-4/12
                    px-4
                    lg:order-3 lg:text-right lg:self-center
                  "
                >
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      class="
                        bg-gradient-to-r
                        from-watermelon-500
                        to-pistachio-500
                        text-white
                        active:bg-emerald-600
                        text-xs
                        font-bold
                        uppercase
                        px-4
                        py-2
                        rounded
                        shadow
                        hover:shadow-lg
                        outline-none
                        focus:outline-none
                        lg:mr-1 lg:mb-0
                        ml-3
                        mb-3
                        ease-linear
                        transition-all
                        duration-150
                      "
                      type="button"
                      onclick="location.href='https://intranet.ffvl.fr/ffvl_licenceonline/pre_rempli/NEW/14172'"
                    >
                      Prenez votre licence
                    </button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="
                          text-xl
                          font-bold
                          block
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                        >22</span
                      >
                      <span class="text-sm text-slate-400">Amis</span>
                    </div>
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="
                          text-xl
                          font-bold
                          block
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                        >10</span
                      >
                      <span class="text-sm text-slate-400">Photos</span>
                    </div>
                    <div class="lg:mr-4 p-3 text-center">
                      <span
                        class="
                          text-xl
                          font-bold
                          block
                          uppercase
                          tracking-wide
                          text-slate-600
                        "
                        >89</span
                      >
                      <span class="text-sm text-slate-400">Commentaires</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3
                  class="
                    text-4xl
                    font-semibold
                    leading-normal
                    mb-2
                    text-slate-700
                    mb-2
                  "
                >
                  Association High Can Fly
                </h3>
                <div
                  class="
                    text-sm
                    leading-normal
                    mt-0
                    mb-2
                    text-slate-400
                    font-bold
                    uppercase
                  "
                >
                  <i
                    class="fas fa-map-marker-alt mr-2 text-lg text-slate-400"
                  ></i>
                  Flers-en-Escrebieux, Nord, France
                  <br />119, rue Marceau Martin <br />59128 Marceau Martin
                </div>
                <div class="mb-2 text-slate-600 mt-10">
                  <i class="fas fa-dove mr-2 text-lg text-slate-400"></i>
                  Club de parapente affilié à la F.F.V.L.
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-slate-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p class="mb-4 text-lg leading-relaxed text-slate-700">
                      Merci à nos partenaires:
                    </p>
                    <ol>
                      <li>Comité départemental de vol libre</li>
                      <li>Conseil départemtal du Nord</li>
                      <li>
                        Commission «handi» de la Fédération Française de vol
                        libre
                      </li>
                    </ol>
                    <router-link
                      to="/landing"
                      class="tfont-normal text-emerald-500"
                      >Accueil</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="text-sm text-slate-400 mr-2"
                >Site hébergé gracieusement par
                <a href="https://www.cloudflare.com"
                  ><i style="color: #e7873b" class="fab fa-cloudflare"></i>
                  Cloudflare™</a
                >,
                <a href="https://www.sanity.io">
                  <svg
                    class="inline align-text-bottom max-h-4"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="28" height="28" rx="3" fill="#F03E2F"></rect>
                    <path
                      d="M8.62 7.25c0 2.41 1.52 3.84 4.54 4.6l3.21.73c2.87.64 4.61 2.25 4.61 4.87a4.91 4.91 0 01-1.07 3.15c0-2.61-1.37-4.02-4.69-4.87l-3.15-.7c-2.52-.57-4.47-1.89-4.47-4.73a4.89 4.89 0 011.02-3.05z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M17.94 16.8c1.37.87 1.97 2.07 1.97 3.8-1.13 1.42-3.12 2.22-5.46 2.22-3.94 0-6.7-1.9-7.3-5.21h3.78c.48 1.52 1.77 2.22 3.5 2.22 2.1 0 3.49-1.1 3.52-3.03"
                      fill="#F9B1AB"
                    ></path>
                    <path
                      d="M10.59 10.82a3.99 3.99 0 01-1.97-3.57c1.1-1.4 3-2.27 5.32-2.27 4 0 6.33 2.08 6.9 5H17.2c-.4-1.15-1.4-2.05-3.23-2.05-1.96 0-3.3 1.12-3.37 2.9"
                      fill="#F9B1AB"
                    ></path>
                  </svg>
                  Sanity.io</a
                >
                et propulsé par
                <a href="https://v3.vuejs.org/"
                  ><i style="color: #64b587" class="fab fa-vuejs"></i> Vue.js
                  {{ app.version }}</a
                ></span
              >
            </div>
          </div>
        </div>
      </section>
    </main>
    <main-footer />
  </div>
</template>

<script>
import NavbarGrey from "@/components/Navbars/NavbarGrey.vue";
import MainFooter from "@/components/Footers/MainFooter.vue";
import backgroundImageAsset from "@/assets/img/mountain.jpg";
import backgroundImageAssetWebp from "@/assets/img/mountain.webp";
import { inject, reactive } from "vue";
import logo from "@/assets/img/logo_high_can_fly.svg";

export default {
  title: "High Can Fly | Club de parapente | À propos",
  description: "Club de parapente dans le Nord FFVL n°29070. À propos de nous…",
  data() {
    const state = reactive({
      //eslint-disable-line
      backgroundImageURL: "",
    });
    inject("getJpgOrWebpIfSupported")(
      backgroundImageAsset,
      backgroundImageAssetWebp,
      "lossy"
    ).then((file) => {
      console.log("Webp support: " + file);
      state.backgroundImageURL = file;
    });
    return {
      state,
      logo,
      app, //eslint-disable-line
    };
  },
  components: {
    NavbarGrey,
    MainFooter,
  },
};
</script>
