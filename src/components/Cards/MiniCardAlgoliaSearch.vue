<template>
  <div>
    <ais-instant-search :index-name="indexName" :search-client="searchClient">
      <div>
        <ais-search-box placeholder="rechercher…" :class-names="{'ais-SearchBox':'relative', 'ais-SearchBox-form':'px-1', 'ais-SearchBox-input': 'text-sm w-full mr-1 rounded ', 'ais-SearchBox-submit':'hidden','ais-SearchBox-reset':'hidden '}">
        </ais-search-box>
      </div>
        <ais-hits
        class="absolute inset-x-0 -translate-x-52 -translate-y-48 text-base z-50 float-left list-none text-left bg-white rounded shadow-lg min-w-[50%]"
          :transform-items="transformAlgoliaHits"
          ref="popoverDropdownRef"
        >
          <template v-slot="{ items }">
            <ul>
              <li v-for="item in items" :key="item.objectID">
                <a
                  :href="`${baseUrl}/${item.slug}`"
                  class="text-apple-500"
                  >{{ item.title }}</a
                >
                <a
                  :href="`${baseUrl}/${item.slug}`"
                >
                  <p class="p-2 text-justify text-xs" v-html="item._highlightResult.body.value" />
                </a>
              </li>
            </ul>
          </template>
        </ais-hits>
    </ais-instant-search>
  </div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
} from "vue-instantsearch/vue3/es";
import { createPopper } from "@popperjs/core";

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
    baseUrl: {
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
      dropdownPopoverShow: false,
    };
  },
  methods: {
    transformAlgoliaHits(items) {
      return items;
    },
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
  components: {
    AisInstantSearch,
    AisSearchBox,
    AisHits,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
