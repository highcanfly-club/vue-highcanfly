<template>
  <div class="rounded-lg bg-slate-100 shadow-xl p-8">
    <ais-instant-search
      :index-name="indexName"
      :search-client="searchClient"
    >
      <ais-search-box placeholder="rechercher dans nos publications…" :class-names="{'ais-SearchBox':'relative', 'ais-SearchBox-input': 'w-full mr-1 rounded ', 'ais-SearchBox-submit':'hidden','ais-SearchBox-reset':'hidden absolute right-8 inset-y-0'}">
        <template v-slot:reset-icon><i class="fa-solid fa-ban"></i></template>
      </ais-search-box>
      <ais-hits :transform-items="transformAlgoliaHits" :class-names="{'ais-Hits': 'mt-2'}">
        <template v-slot="{ items }">
          <ul>
            <li v-for="item in items" :key="item.objectID">
              <h3 class="text-3xl font-semibold">
                <router-link
                  :to="`${baseUrl}/${item.slug}`"
                  >{{ item.title }}</router-link
                >
              </h3>
              <div class="text-lg text-slate-500 indent-8">
                <router-link
                  :to="`${baseUrl}/${item.slug}`"
                >
                  <p v-html="item._highlightResult.body.value" />
                </router-link>
              </div>
            </li>
          </ul>
        </template>
      </ais-hits>
      <ais-powered-by class="flex justify-end" />
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisPoweredBy,
} from "vue-instantsearch/vue3/es";

export default {
  name: "AlgoliaSearch",
  props: {
    applicationId: String,
    searchKey: String,
    indexName: String,
    filter: {
      type: [String],
      default: "",
    },
    baseUrl:{
      type: [String],
      default: "/",
    },
  },
  data() {
    const algoliaClient = algoliasearch(
      this.$props.applicationId,
      this.$props.searchKey
    );
    const filter = this.$props.filter;
    const searchClient = {
      ...algoliaClient,
      search(requests) {
        if (requests.every(({ params }) => !params.query)) {
          return Promise.resolve({
            results: requests.map(() => ({
              hits: [],
              nbHits: 0,
              nbPages: 0,
              page: 0,
              processingTimeMS: 0,
            })),
          });
        }
        requests.forEach((request) => {
          request.params.filters = filter;
        });
        return algoliaClient.search(requests);
      },
    };
    return {
      searchClient: searchClient,
    };
  },
  methods: {
    transformAlgoliaHits(items) {
      return items;
    },
  },
  components: {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
    AisPoweredBy,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
