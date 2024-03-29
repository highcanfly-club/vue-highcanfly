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
  <div>
    <navbar-default color="text-white" colorhover="text-slate-200" iconscolor="text-slate-200"
      buttoncolor="bg-white text-slate-700 active:bg-slate-50" />
    <main>
      <div class="
          relative
          pt-16
          pb-32
          flex
          content-center
          items-center
          justify-center
          min-h-screen-75
        ">
        <div id="bg-div" class="absolute top-0 w-full h-full bg-center bg-cover" v-bind:style="{
          backgroundImage: 'url(' + reactiveBackground + ')',
        }">
          <span id="blackOverlay" class="w-full h-full absolute opacity-30 bg-black"></span>
        </div>
        <div class="container relative mx-auto">
          <div class="items-center flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div class="md:pr-12 pt-5 md:pt-0">
                <h1 class="text-white font-semibold text-5xl">
                  Venez voler avec nous !
                </h1>
                <p class="mt-4 text-lg text-slate-200">
                  On vole aussi dans le nord de la France…
                  <br />Marcher et Voler, voilà ce qui nous ressemble.
                  <br />Vous êtes un pilote autonome, en progression ou
                  débutant; partagez notre passion du vol libre.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="
            top-auto
            bottom-0
            left-0
            right-0
            w-full
            absolute
            pointer-events-none
            overflow-hidden
            h-70-px
          " style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-slate-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>

      <section class="pb-20 bg-slate-200 -mt-24">
        <div class="container mx-auto px-6">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                ">
                <div class="px-4 py-5 flex-auto">
                  <div class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-red-400
                    ">
                    <i class="fas fa-award"></i>
                  </div>
                  <h6 class="text-xl font-semibold">Club de parapente</h6>
                  <p class="mt-2 mb-4 text-slate-500">
                    Nous sommes une structure affiliée à la F.F.V.L.
                    <br />sous le numéro n°29070. <br />Nous sommes aussi membre
                    actif du comité départemental de vol libre.
                  </p>
                </div>
              </div>
            </div>

            <div class="w-full md:w-4/12 px-6 text-center">
              <div class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                ">
                <div class="px-6 py-6 flex-auto">
                  <div class="px-4 py-4 flex-auto">
                    <img src="@/assets/img/logo_high_can_fly.svg" alt="logo High Can Fly Parapente" />
                  </div>
                </div>
              </div>
            </div>

            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-white
                  w-full
                  mb-8
                  shadow-lg
                  rounded-lg
                ">
                <div class="px-4 py-5 flex flex-col items-center">
                  <div class="
                      text-white
                      p-3
                      text-center
                      inline-flex
                      items-center
                      justify-center
                      w-12
                      h-12
                      mb-5
                      shadow-lg
                      rounded-full
                      bg-emerald-400
                    ">
                    <i class="fas fa-newspaper"></i>
                  </div>
                  <div class="text-center">
                    <h6 class="text-xl font-semibold">
                      <router-link to="/blog">News</router-link>
                    </h6>
                  </div>
                  <div class="text-left">
                    <mini-sanity-blog />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center mt-16">
            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div class="
                  relative
                  flex flex-col
                  min-w-0
                  break-words
                  bg-emerald-500
                  w-full
                  mb-6
                  shadow-lg
                  rounded-lg
                ">
                <lazy-img :src="
                  getCloudinaryImg(
                    'static-web-highcanfly/highcanfly-103',
                    width < 768
                      ? Math.ceil((width - 80) / 100) * 100
                      : Math.ceil((width * 0.25) / 100) * 100
                  ).toURL()
                " @click="
  lightBox(
    getCloudinaryImg(
      'static-web-highcanfly/highcanfly-103'
    ).toURL()
  )
" alt="En route vers le Plancert." class="w-full align-middle rounded-t-lg" />
                <blockquote class="relative p-8 mb-4">
                  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                    class="absolute left-0 w-full block h-95-px -top-94-px">
                    <polygon points="-30,95 583,95 583,65" class="text-emerald-500 fill-current" />
                  </svg>
                  <h4 class="text-xl font-bold text-white">
                    Coupe française de marche et vol
                  </h4>
                  <p class="text-md font-light mt-2 text-white">
                    Marcher avec son matériel et s'envoler c'est aussi un jeu.
                    Participez avec nous au challenge des club à la CFDMV. En
                    tant que membres pensez à déclarer vos vols.
                    <br />
                    <a class="font-bold" href="https://parapente.ffvl.fr/cfdmv/liste/2021/club/14172">Les vols du
                      club</a>
                  </p>
                </blockquote>
              </div>
            </div>
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div class="
                  text-slate-500
                  p-3
                  text-center
                  inline-flex
                  items-center
                  justify-center
                  w-16
                  h-16
                  mb-6
                  shadow-lg
                  rounded-full
                  bg-white
                ">
                <i class="fas fa-user-friends text-xl"></i>
              </div>
              <h3 class="text-3xl mb-2 font-semibold leading-normal">
                Partageons nos expériences
              </h3>
              <p class="
                  text-lg
                  font-light
                  leading-relaxed
                  mt-4
                  mb-4
                  text-slate-600
                ">
                Le parapente fait partie de ces activités, comme l'alpinisme,
                qui créent des émotions fortes. Elles permettent de développer
                rapidement des liens forts avec les gens qui partagnet
                l'activité avec nous.
              </p>
              <p class="
                  text-lg
                  font-light
                  leading-relaxed
                  mt-0
                  mb-4
                  text-slate-600
                ">
                Une sortie Hike and Fly laisse souvent de nombreux souvenirs de
                conversations pendant la montée,de partage d'émotions à la vue
                des paysages… et de vols fabuleux.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="relative py-20">
        <div class="
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
          " style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-white fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>

        <div class="container mx-auto px-4">
          <div class="items-center flex flex-wrap">
            <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div class="md:pr-12">
                <div class="
                    text-emerald-600
                    p-3
                    text-center
                    inline-flex
                    items-center
                    justify-center
                    w-16
                    h-16
                    mb-6
                    shadow-lg
                    rounded-full
                    bg-emerald-300
                  ">
                  <i class="fas fa-rocket text-xl"></i>
                </div>
                <h3 class="text-3xl font-semibold">
                  Petit club deviendra grand
                </h3>
                <p class="mt-4 text-lg leading-relaxed text-slate-500">
                  La force d'un club est dans ses membres. Nos projets de
                  développement :
                </p>
                <ul class="list-none mt-6">
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-emerald-600
                            bg-emerald-200
                            mr-3
                          ">
                          <i class="fas fa-fingerprint"></i>
                        </span>
                      </div>
                      <div>
                        <h4 class="text-slate-500">
                          Accueil de jeunes pour une découverte au sol
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-emerald-600
                            bg-emerald-200
                            mr-3
                          ">
                          <i class="fab fa-html5"></i>
                        </span>
                      </div>
                      <div>
                        <h4 class="text-slate-500">
                          Développement de nouveaux sites dans la région
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="flex items-center">
                      <div>
                        <span class="
                            text-xs
                            font-semibold
                            inline-block
                            py-1
                            px-2
                            uppercase
                            rounded-full
                            text-emerald-600
                            bg-emerald-200
                            mr-3
                          ">
                          <i class="far fa-paper-plane"></i>
                        </span>
                      </div>
                      <div>
                        <h4 class="text-slate-500">
                          Favoriser la pratique «non motorisée» du parapente
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="w-full md:w-4/12 ml-auto mr-auto px-4">
              <lazy-img :src="
                getCloudinaryImg(
                  'static-web-highcanfly/highcanfly-104',
                  width < 768
                    ? Math.ceil((width - 80) / 100) * 100
                    : Math.ceil((width * 0.25) / 100) * 100
                ).toURL()
              " @click="
  lightBox(
    getCloudinaryImg(
      'static-web-highcanfly/highcanfly-104'
    ).toURL()
  )
" alt="Décollage d'Helbroner" class="w-full align-middle rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      <section class="pt-20 pb-48">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center text-center mb-24">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold">
                Quelques uns de nos pilotes
              </h2>
              <p class="text-lg leading-relaxed m-4 text-slate-500">
                Le plus simple c'est de les rencontrer dans les airs.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <lazy-img :src="
                  getCloudinaryImg(
                    'static-web-highcanfly/highcanfly-106',
                    120,
                    120
                  ).toURL()
                " @click="
  lightBox(
    getCloudinaryImg(
      'static-web-highcanfly/highcanfly-106'
    ).toURL()
  )
" class="shadow-lg rounded-full mx-auto max-w-120-px" />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">R…</h5>
                  <p class="mt-1 text-sm text-slate-400 uppercase font-semibold">
                    Animateur fédéral
                  </p>
                  <div class="mt-6">
                    <button class="
                        bg-slate-700
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button" onclick="location.href='https://www.instagram.com/klerviaudreyronanbriac/'">
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <lazy-img :src="
                  getCloudinaryImg(
                    'static-web-highcanfly/highcanfly-105',
                    120,
                    120
                  ).toURL()
                " @click="
  lightBox(
    getCloudinaryImg(
      'static-web-highcanfly/highcanfly-105'
    ).toURL()
  )
" alt="Notre moniteur professionel" class="shadow-lg rounded-full mx-auto max-w-120-px" />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">H…</h5>
                  <p class="mt-1 text-sm text-slate-400 uppercase font-semibold">
                    Moniteur professionnel
                  </p>
                  <div class="mt-6">
                    <button class="
                        bg-red-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-google"></i>
                    </button>
                    <button class="
                        bg-sky-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-facebook-f"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <lazy-img :src="
                  getCloudinaryImg(
                    'static-web-highcanfly/capucine',
                    120,
                    120
                  ).toURL()
                " @click="
  lightBox(
    getCloudinaryImg('static-web-highcanfly/capucine').toURL()
  )
" alt="Capucine en compétition" class="shadow-lg rounded-full mx-auto max-w-120-px" />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">C…</h5>
                  <p class="mt-1 text-sm text-slate-400 uppercase font-semibold">
                    Compétitrice de haut niveau
                  </p>
                  <div class="mt-6">
                    <button class="
                        bg-indigo-500
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button" onclick="location.href='https://www.instagram.com/capucine_dlt/'">
                      <i class="fab fa-instagram"></i>
                    </button>
                    <button class="
                        bg-sky-400
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button" onclick="location.href='https://twitter.com/piitchy38'">
                      <i class="fab fa-twitter"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
              <div class="px-6">
                <lazy-img :src="
                  getCloudinaryImg(
                    'static-web-highcanfly/highcanfly-107',
                    120,
                    120
                  ).toURL()
                " @click="
  lightBox(
    getCloudinaryImg(
      'static-web-highcanfly/highcanfly-107'
    ).toURL()
  )
" alt="Audrey à Samoëns" class="shadow-lg rounded-full mx-auto max-w-120-px" />
                <div class="pt-6 text-center">
                  <h5 class="text-xl font-bold">A…</h5>
                  <p class="mt-1 text-sm text-slate-400 uppercase font-semibold">
                    Notre secrétaire et trésorière
                  </p>
                  <div class="mt-6">
                    <button class="
                        bg-pink-500
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-dribbble"></i>
                    </button>
                    <button class="
                        bg-red-600
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-google"></i>
                    </button>
                    <button class="
                        bg-sky-400
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-twitter"></i>
                    </button>
                    <button class="
                        bg-slate-700
                        text-white
                        w-8
                        h-8
                        rounded-full
                        outline-none
                        focus:outline-none
                        mr-1
                        mb-1
                      " type="button">
                      <i class="fab fa-instagram"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-20 relative block bg-slate-800">
        <div class="
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
          " style="transform: translateZ(0)">
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-slate-800 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>

        <div class="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div class="flex flex-wrap text-center justify-center">
            <div class="w-full lg:w-6/12 px-4">
              <h2 class="text-4xl font-semibold text-white">Rejoignez nous</h2>
              <p class="text-lg leading-relaxed mt-4 mb-4 text-slate-400">
                Pour encourager une pratique plus vertueuse du parapente, nous
                avons besoin de votre aide. Que vous soyez débutant, pilote
                aguerri ou encadrant fédéral, venez voler.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap mt-12 justify-center">
            <div class="w-full overflow-hidden rounded-lg bg-white shadow-lg">
              <lazy-observer @on-change="onChangeMap">
                <div class="h-screen-1/2 w-full overflow-hidden">
                  <suspense v-if="loadMap">
                    <template #default>
                      <mapsites-de-pratique class="rounded" />
                    </template>
                    <template #fallback>
                      <p>Chargement de l'API de cartographie… </p>
                    </template>
                  </suspense>
                </div>
              </lazy-observer>
            </div>
          </div>
        </div>
      </section>
      <emailForm />
      <section class="pt-10 pb-20">
        <div class="container mx-auto px-4">
          <card-algolia-search :applicationId="algoliaApplicationId" :searchKey="algoliaSearchKey" filter="type:post"
            baseUrl="/sanity-blog" :indexName="`highcanfly-${sanityDataset}-index`" />
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>
<script lang="ts">
import NavbarDefault from "@/components/Navbars/NavbarDefault.vue";
import FooterComponent from "@/components/Footers/MainFooter.vue";
import { defineAsyncComponent } from "vue";
import MiniSanityBlog from "@/components/Utilities/ComponentMinSanityBlog.vue";
import CardAlgoliaSearch from "@/components/Cards/CardAlgoliaSearch.vue";
import emailForm from "@/components/Forms/EmailForm.vue";
import {LazyObserver} from "@sctg/lazy-vue"
import { getCloudinaryImg } from "@/plugins/highcanfly";
import {LazyImg} from "@sctg/lazy-vue"
import * as basiclightbox from "basiclightbox";
import { getCloudinaryResponsiveBackground } from "@/plugins/highcanfly";
import { ref } from "vue";
import Commit from '@/config/commit.json'
import sanityConf from '@/config/sanity-conf.json'
import algoliaConf from '@/config/algolia-conf.json'

const algoliaSearchKey = algoliaConf.key
const algoliaApplicationId = algoliaConf.id
const sanityDataset = sanityConf.dataset

const backgroundImage = "static-web-highcanfly/highcanfly-101";

export default {
  description:
    "Club de parapente dans le Nord FFVL n°29070. Nous encourageons la pratique du parapete sans utiliser de moteur. Vive le marche et vol. Affiliés à la FFVL n°29070.",
  title: "High Can Fly | Club de parapente du Nord",
  canonical: new URL(window.location.href),
  loadMap: false,
  reactiveBackground: ref(""),
  resizeId: 0,
  previousWindowSize: 0,
  methods: {
    checkForm: function (e) {
      if (this.name && this.email && this.message) {
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push("Nom requis.");
      }
      if (!this.email) {
        this.errors.push("Email requis.");
      }
      if (!this.message) {
        this.errors.push("Message requis.");
      }
      e.preventDefault();
    },
    onChangeMap(entry, unobserve) {
      if (entry.isIntersecting) {
        unobserve();
        this.loadMap = true;
        console.log("Loading map lazily");
      }
    },
    lightBox: (url) => {
      if (url !== undefined) {
        basiclightbox
          .create(`<img src="${url}" />`)
          .show(() => console.log(`lightbox ${url} now visible`));
      }
    },
    handleResize: function () {
      clearTimeout(this.resizeId);
      this.resizeId = setTimeout(() => {
        if (window.innerWidth > this.previousWindowSize) {
          this.previousWindowSize = window.innerWidth;
          const newUrl = getCloudinaryResponsiveBackground(backgroundImage)
            .format("auto")
            .toURL();
          if (newUrl != this.reactiveBackground) {
            this.reactiveBackground = newUrl;
          }
        }
      }, 500);
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.previousWindowSize = window.innerWidth;
    this.reactiveBackground = getCloudinaryResponsiveBackground(backgroundImage)
      .format("auto")
      .toURL();
  },
  data() {
    console.log(
      "commit date: " +
      new Intl.DateTimeFormat("fr-FR", {
        year: "2-digit",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(Commit.vue_highcanfly))
    );
    const loadMap = this.loadMap;
    const errors = [];

    return {
      errors,
      loadMap,
      algoliaSearchKey,
      algoliaApplicationId,
      sanityDataset,
      getCloudinaryImg,
      width: window.innerWidth,
      reactiveBackground: this.reactiveBackground,
    };
  },
  components: {
    NavbarDefault,
    FooterComponent,
    MapsitesDePratique: defineAsyncComponent(() =>
      import("@/components/Maps/LeafletCard.vue")
    ),
    emailForm,
    MiniSanityBlog,
    CardAlgoliaSearch,
    LazyObserver,
    LazyImg,
  },
};
</script>
