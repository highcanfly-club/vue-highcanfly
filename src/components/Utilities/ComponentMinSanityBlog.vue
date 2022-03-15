<template>
  <div class="">
    <loading-spinner v-if="loading" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div>
      <ul>
        <div v-for="post in posts" :key="post._id">
          <li>
            <router-link :to="`/sanity-blog/${post.slug.current}`">{{
              post.title
            }}</router-link>
          </li>
          <div class="h-0 mx-4 my-2 border border-solid border-slate-100" />
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from "@/components/Utilities/ComponentLoadingSpinner.vue";

import sanityClient from "@sanity/client";
import { useAuth0 } from "@/plugins/auth0";

const query = `*[_type == "post"]{
  _id,
  publishedAt,
  title,
  slug
}| order(publishedAt desc)[0...10]`;

export default {
  // name: "Home",
  data() {
    return {
      loading: true,
      posts: [],
      error: null,
    };
  },
  created() {
    const { initializationCompleted } = useAuth0();
    initializationCompleted().then(()=>{this.fetchData()})
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      const sanityConf = {
        projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
        dataset: process.env.VUE_APP_SANITY_DATASET,
        useCdn: true,
        apiVersion: process.env.VUE_APP_SANITY_VERSION,
      };
      if (this.$auth0.isAuthenticated.value){
        sanityConf.token = this.$auth0.user.value["https://www.highcanfly.club/sanity_token"];
       // sanityConf.useCdn = false;
      }
      sanityClient(sanityConf)
        .fetch(query)
        .then(
          (posts) => {
            this.loading = false;
            this.posts = posts;
          },
          (error) => {
            this.error = error;
          }
        );
    },
  },
};
</script>
