<template>
  <div>
    <navbar />
    <main class="profile-page">
      <section class="relative block h-500-px">
        <div
          class="absolute top-0 w-full h-full bg-center bg-cover"
          v-bind:style="{ backgroundImage: 'url(' + state.backgroundImageURL + ')' }"
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
                    <picture >
                      <source srcset="@/assets/img/capucine.webp" type="image/webp" />
                      <source srcset="@/assets/img/capucine.jpg" type="image/jpeg" />
                      <img class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" src="@/assets/img/capucine.jpg" alt="Alt Text!" />
                    </picture>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
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
                >Championnats de France 2021</h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>
                  Combe de Savoie
                </div>
                <div class="mb-2 text-slate-600 mt-10">
                  <i class="fas fa-rss mr-2 text-lg text-slate-400"></i>
                  - Championnats de France de Parapente de distance -
                  <br />Luc Armant , impérial, s'adjuge le titre de champion de France 2021 ( après avoir remporté en août la Superfinale de la Coupe du Monde PWCA ) !
                  <br />Honorin Hamard ( second ) et Pierre REMY ( troisième) complètent le podium devant Jonathan Marin ( quatrième ) et Julien Wirtz ( cinquième ).
                  <br />
                  <b>Le podium féminin :</b>
                  <br />Nanda Walliser ( CH ) est sur la plus haute marche devant les françaises Sandra Antony ( seconde ) et
                  <b>Capucine Déliot ( troisième )</b>.
                  <br />Félicitations aux championnes et champions, à tous les compétiteurs, et merci pour l'organisation au club " Lei Courpatas " et à tous les bénévoles sans qui rien ne serait possible.
                  <br />Tous les résultats sont en ligne sur le site web fédéral:
                  <br />
                </div>
                <div class="text-sm leading-normal mt-0 mb-2 text-slate-600 font-bold uppercase">
                  <i class="fas fa-medal mr-2 text-lg"></i>
                  Bravo Capucine !
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="relative pt-[300px] py-16 bg-slate-200">
        <div class="container mx-auto px-4">
          <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
          >
            <div class="px-6">
              <div class="flex flex-wrap justify-center">
                <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div class="relative">
                    <picture >
                      <source srcset="@/assets/img/highcanfly-106.webp" type="image/webp" />
                      <source srcset="@/assets/img/highcanfly-106.jpg" type="image/jpeg" />
                      <img class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" src="@/assets/img/highcanfly-106.jpg" alt="Alt Text!" />
                    </picture>
                  </div>
                </div>
                <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"></div>
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
                >Assemblage de traces marche et vol</h3>
                <div class="text-sm leading-normal mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i class="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>
                  <a href="https://parapente.ffvl.fr/cfdmv">Site compétition de la fédération</a>
                </div>
                <div class="mb-2 text-slate-600 mt-10">
                  <i class="fas fa-rss mr-2 text-lg text-slate-400"></i>
                  À la demande de la commission marche et vol de la fédération nous avons réalisé 
                  l'outil qui permet l'assemblage des traces lors d'une sortie marche et vol<br/>
                  L'outil brut est <a href="https://cfdmv.highcanfly.club/">ici (en anglais)</a> mais il est intégré directement dans la page de saisie de vols vols…<br />
                </div>
                <div class="mb-2 text-slate-600 mt-10">
                  <i class="fab fa-github mr-2 text-lg text-slate-400"></i>
                   Si vous en avez les compétences il y a des dizaines de choses à faire pour améliorer le système.<br />
                  Votre aide est la bienvenue ! <a  class="text-slate-400" href="https://github.com/eltorio/CFDTrackJoiner">Le code est sur Github</a>.
                </div>
                <div class="text-sm leading-normal mt-0 mb-2 text-slate-600 font-bold uppercase">
                  <i class="fas fa-medal mr-2 text-lg"></i>
                  <a href="ttps://parapente.ffvl.fr/cfdmv">Participez à la CFD Marche et vol !</a>
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
import { inject, reactive } from 'vue';


export default {
  data() {
    const state = reactive({//eslint-disable-line
      backgroundImageURL: '',
    });
    inject('getJpgOrWebpIfSupported')(backgroundImageAsset, backgroundImageAssetWebp, 'lossy').then(file => { console.log('Webp support: ' + file); state.backgroundImageURL = file });
    return {
      state,
    };
  },
  components: {
    Navbar,
    FooterComponent,
  },
};
</script>
