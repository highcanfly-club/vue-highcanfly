<template>
  <div>
    <navbar />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          style="
            background-image: url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80');
          "
        >
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style="transform: translateZ(0);"
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
            <polygon class="text-slate-200 fill-current" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <section class="relative py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <img
                      alt="..."
                      :src="logo"
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div class="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      class="bg-emerald-500 active:bg-emerald-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onclick="location.href='https://intranet.ffvl.fr/ffvl_licenceonline/pre_rempli/NEW/14172'"
                    >Prenez votre licence</button>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                  <div class="flex justify-center py-4 lg:pt-4 pt-8">
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-slate-600"
                      >22</span>
                      <span class="text-sm text-slate-400">Amis</span>
                    </div>
                    <div class="mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-slate-600"
                      >10</span>
                      <span class="text-sm text-slate-400">Photos</span>
                    </div>
                    <div class="lg:mr-4 p-3 text-center">
                      <span
                        class="text-xl font-bold block uppercase tracking-wide text-slate-600"
                      >89</span>
                      <span class="text-sm text-slate-400">Commentaires</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center mt-12">
                <h3
                  class="text-4xl font-semibold leading-normal mb-2 text-slate-700 mb-2"
                >Association High Can Fly</h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>
                  Flers-en-Escrebieux, Nord, France
                  <br />119, rue Marceau Martin
                  <br />59128 Marceau Martin
                </div>
                <div class="mb-2 text-slate-600 mt-10">
                  <i class="fas fa-dove mr-2 text-lg text-slate-400"></i>
                  Club de parapente affilié à la F.F.V.L.
                </div>
              </div>
              <div class="mt-10 py-10 border-t border-slate-200 text-center">
                <div class="flex flex-wrap justify-center">
                  <div class="w-full lg:w-9/12 px-4">
                    <p
                      class="mb-4 text-lg leading-relaxed text-slate-700"
                    >Merci à nos partenaires:</p>
                    <ol>
                      <li>Comité départemental de vol libre</li>
                      <li>Conseil départemtal du Nord</li>
                      <li>Commission «handi» de la Fédération Française de vol libre</li>
                    </ol>

                    <router-link to="/landing" class="tfont-normal text-emerald-500">Accueil</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer-component />
  </div>
</template>
<script>
import Navbar from "@/components/Navbars/Navbar.vue";
import FooterComponent from "@/components/Footers/Footer.vue";
import backgroundImageAsset from "@/assets/img/mountain.jpg";
import backgroundImageAssetWebp from "@/assets/img/mountain.webp";
import { inject, reactive} from 'vue' ;
import logo from "@/assets/img/logo_high_can_fly.svg";

export default {
  title: "High Can Fly | Club de parapente | À propos",
  description: "Club de parapente dans le Nord FFVL n°29070. À propos de nous…",
  data() {
    const state = reactive({//eslint-disable-line
                            backgroundImageURL: '',
                          });
    inject('getJpgOrWebpIfSupported')(backgroundImageAsset,backgroundImageAssetWebp,'lossy').then( file => {console.log('Webp support: ' + file);state.backgroundImageURL = file});
    return {
      state,
      logo,
    };
  },
  components: {
    Navbar,
    FooterComponent,
  },
};
</script>
