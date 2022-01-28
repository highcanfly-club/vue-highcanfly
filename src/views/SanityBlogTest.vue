<template>
  <div>
    <h1>High Can Fly blog</h1>
    <div>
      <div class="loading" v-if="loading">Loading...</div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div class="container">
        <div v-for="post in posts" class="post-item" :key="post._id">
          <router-link :to="`/sanity-blog-test/${post.slug.current}`">
            <h2>{{ post.title }}</h2>
          </router-link>
          <p>{{post.excerpt}}</p>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sanity from "@/plugins/sanity-client";

const query = `*[_type == "post"]{
  _id,
  title,
  slug,
  excerpt
}[0...50]`;

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