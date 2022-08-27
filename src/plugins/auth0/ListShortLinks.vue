<template>
  <div class="overflow-scroll">
    <table>
      <tr v-for="data in kvData" :key="data.name">
        <td><a :href="`${canonical}!${data.name}`">{{data.name}}</a></td>
        <td>{{data.value}}</td>
        <td>{{ (data.metadata !==  null) ? data.metadata.description : ''}}</td>
        <td>{{(data.metadata !==  null) && (data.metadata.expiration !==  null) ? `${(new Date(data.metadata.expiration)).toLocaleDateString('fr-FR')} ${(new Date(data.metadata.expiration)).toLocaleTimeString('fr-FR')}` : ''}}</td>
      </tr>
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
