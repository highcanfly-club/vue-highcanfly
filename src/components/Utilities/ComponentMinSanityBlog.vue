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

const query = `*[_type == "post" ]{
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
      this.fetchData();
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanityClient(this.$sanityConf)
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
