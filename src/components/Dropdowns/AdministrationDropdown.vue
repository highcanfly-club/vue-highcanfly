<template>
  <button
    @click="$auth0.loginWithRedirect()"
    v-if="!$auth0.user.value"
    class="
      text-sm
      py-2
      px-4
      font-normal
      block
      w-full
      whitespace-nowrap
      bg-transparent
      text-slate-700 text-left
    "
  >
    Connexion
  </button>
  <button
    @click="logout"
    v-if="$auth0.user.value"
    class="
      text-sm
      py-2
      px-4
      font-normal
      block
      w-full
      whitespace-nowrap
      bg-transparent
      text-slate-700 text-left
    "
  >
    Déconnexion
  </button>
  <router-link
    v-if="$auth0.user.value"
    to="/login"
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
    >Authentification</router-link
  >
  <slider-check
    class="
      text-sm
      py-2
      px-4
      font-normal
      block
      w-full
      whitespace-nowrap
      text-slate-700 text-left
    "
    v-if="$auth0.user.value && (hasDevelopmentPreview || hasProductionPreview)"
    id="preview"
    @change="togglePreview"
    :checked="preview"
    color="bg-slate-300"
    checkedColor="bg-pistachio-600"
    >Prévisualisation</slider-check
  >
  <slider-check
    class="
      text-sm
      py-2
      px-4
      font-normal
      block
      w-full
      whitespace-nowrap
      text-slate-700 text-left
    "
    v-if="$auth0.user.value && hasDevelopmentDataset"
    @change="toggleDevelopment"
    id="hasDevelopmentDataset"
    :checked="developmentMode"
    color="bg-slate-300"
    checkedColor="bg-pistachio-600"
    >Dataset: development</slider-check
  >
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

import {
  isAllowedAsync,
  getCustomClaim,
  HIGHCANFLY_PERMISSION,
} from "@/plugins/auth0/TokenHelper";
import { Auth0Instance } from "@/plugins/auth0/instance";
import SliderCheck from "../Utilities/SliderCheck.vue";
import {
  resetSanityConfToDefaults,
  SanityConf,
  HIGHCANFLY_DATASET,
} from "@/plugins/auth0/sanityStore";

export default defineComponent({
  components: { SliderCheck },
  data() {
    const hasDevelopmentPreview = ref(false);
    const hasProductionPreview = ref(false);
    const hasDevelopmentDataset = ref(false);
    let developmentMode = ref(
      (this.$sanityConf as unknown as SanityConf).dataset ===
        HIGHCANFLY_DATASET.development
    );
    return {
      hasDevelopmentPreview,
      hasProductionPreview,
      hasDevelopmentDataset,
      preview: ref((this.$sanityConf as unknown as SanityConf).preview),
      developmentMode,
    };
  },
  mounted() {
    isAllowedAsync(
      (this.$auth0 as Auth0Instance).getTokenSilentlyVerbose(),
      HIGHCANFLY_PERMISSION.development_preview
    ).then((value) => {
      this.hasDevelopmentPreview = ref(value);
    });
    isAllowedAsync(
      (this.$auth0 as Auth0Instance).getTokenSilentlyVerbose(),
      HIGHCANFLY_PERMISSION.production_preview
    ).then((value) => {
      this.hasProductionPreview = ref(value);
    });
    isAllowedAsync(
      (this.$auth0 as Auth0Instance).getTokenSilentlyVerbose(),
      HIGHCANFLY_PERMISSION.development
    ).then((value) => {
      this.hasDevelopmentDataset = ref(value);
    });
  },
  methods: {
    logout() {
      resetSanityConfToDefaults(); //reset to default
      this.$auth0.logout({
        localOnly: true,
      });
      console.log(this.$sanityConf);
    },
    togglePreview() {
      (this.$sanityConf as unknown as SanityConf).preview = !(
        this.$sanityConf as unknown as SanityConf
      ).preview;
      if ((this.$sanityConf as unknown as SanityConf).preview) {
        getCustomClaim(
          "sanity_token",
          (this.$auth0 as Auth0Instance).getTokenSilentlyVerbose(),
          Date.now() / 1000
        ).then((token: string) => {
          (this.$sanityConf as unknown as SanityConf).token = token;
          (this.$sanityConf as unknown as SanityConf).useCdn = true;
        });
      } else {
        (this.$sanityConf as unknown as SanityConf).token = undefined;
        (this.$sanityConf as unknown as SanityConf).useCdn = false;
      }
      console.log(this.$sanityConf);
    },
    toggleDevelopment() {
      this.developmentMode = !this.developmentMode;
      (this.$sanityConf as unknown as SanityConf).dataset = this.developmentMode
        ? HIGHCANFLY_DATASET.development
        : HIGHCANFLY_DATASET.production;
      console.log(this.$sanityConf);
    },
  },
});
</script>
