<template>
  <div class="">
      <div class="loading" v-if="loading">
            <h1>High Can Fly blog</h1>
        Récupération des données...</div>
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
        <div v-for="(post,index) in posts" :key="post._id">
          <CardSinglePost :slug="post.slug.current" :nbPosts="posts.length" :indexPosts="index"/>
        </div>
      </div>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import CardSinglePost from "@/components/Cards/CardSinglePost.vue";

import sanity from "@/plugins/sanity-client";

const query = `*[_type == "post"]{
  _id,
  publishedAt,
  title,
  slug,
  excerpt
}[0...50]| order(publishedAt desc)`;

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  components:{
    SanityBlocks, // eslint-disable-line
    CardSinglePost,
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
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