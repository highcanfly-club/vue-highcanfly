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
  <div class="overflow-scroll">
    <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="py-3 px-6">Lien court</th>
          <th scope="col" class="py-3 px-6">Cible</th>
          <th scope="col" class="py-3 px-6">Description</th>
          <th scope="col" class="py-3 px-6">Expiration</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="data in kvData" :key="data.name">
          <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a
              :href="`${canonical}!${data.name}`">{{ data.name }}</a></td>
          <td class="py-4 px-6">{{ data.value }}</td>
          <td class="py-4 px-6">{{ (data.metadata !== null) ? data.metadata.description : '' }}</td>
          <td class="py-4 px-6">{{ (data.metadata !== null) && (data.metadata.expiration !== null) ? `${(new
              Date(data.metadata.expiration)).toLocaleDateString('fr-FR')} ${(new
                Date(data.metadata.expiration)).toLocaleTimeString('fr-FR')}` : ''
          }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { isAllowed, HIGHCANFLY_PERMISSION } from "./TokenHelper";
import jwks from "@/config/jwks.json";

interface kvStoreElement {
  name: string;
  value: string;
  metadata: { description: string; expiration: number };
}
type kvStore = kvStoreElement[]

export default defineComponent<{
  token: string;
  canListShortUrl: boolean;
  kvData: kvStore;
  canonical: URL
}>({
  mounted() {
    this.$auth0
      .getTokenSilentlyVerbose()
      .then((token: { id_token: string; access_token: string }) => {
        this.token = token.access_token;
        isAllowed(
          token.access_token,
          jwks.domain,
          Date.now() / 1000,
          HIGHCANFLY_PERMISSION.list_all_short_url
        )
          .then((hasRight) => {
            this.canListShortUrl = hasRight;
          })
          .then(() => {
            fetch("/api/list-short-url", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              },
              body: JSON.stringify({}),
            })
              .then((res: Response) => {
                return res.json();
              })
              .then((data: kvStore) => {
                console.log(data);
                this.kvData = data;
              });
          });
      });
  },
  data() {
    const canonical = new URL(window.location.origin);
    const token = ref("");
    const canListShortUrl = ref(false);
    const kvData = ref({});
    return {
      canListShortUrl,
      kvData,
      canonical,
      token
    };
  },
  methods: {},
});
</script>
