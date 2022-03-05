<template>
  <div class="">
    <loading-spinner v-if="loading" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <!--
      <div class="container">
        <div v-for="post in posts" class="post-item" :key="post._id">
          <router-link :to="`/sanity-blog-test/${post.slug.current}`">
            <h2>{{ post.title }}</h2>
          </router-link>
          <SanityBlocks v-if="post.excerpt" :blocks="post.excerpt"/>
          <hr />
        </div>
      </div>
      -->
    <div>
      <div v-for="(post, index) in posts" :key="post._id">
        <CardSinglePost
          :slug="post.slug.current"
          :nbPosts="posts.length"
          :indexPosts="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import CardSinglePost from "@/components/Cards/CardSinglePost.vue";
import LoadingSpinner from "@/components/Utilities/ComponentLoadingSpinner.vue";

import sanityClient from "@sanity/client";

const query = `*[_type == "post"]{
  _id,
  publishedAt,
  title,
  slug,
  excerpt
}[0...50]| order(publishedAt desc)`;

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
    this.fetchData();
  },
  components: {
    SanityBlocks, // eslint-disable-line
    CardSinglePost,
    LoadingSpinner,
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanityClient({
        projectId: process.env.VUE_APP_SANITY_PROJECT_ID,
        dataset: process.env.VUE_APP_SANITY_DATASET,
        token: process.env.VUE_APP_SANITY_READ_TOKEN,
        useCdn: true,
        apiVersion: process.env.VUE_APP_SANITY_VERSION,
      })
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
