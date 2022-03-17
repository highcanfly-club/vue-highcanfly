<template>
  <div class="">
    <loading-spinner v-if="loading" />
    <div>
      <div v-for="(post, index) in posts" :key="post._id">
        <lazy-observer :id="index" @on-change="onlazyBlog">
          <CardSinglePost
            ref="card_single_post"
            :lazy="true"
            :slug="post.slug.current"
            :nbPosts="posts.length"
            :indexPosts="index"
          />
        </lazy-observer>
      </div>
    </div>
  </div>
</template>

<script>
import CardSinglePost from "@/components/Cards/CardSinglePost.vue";
import LoadingSpinner from "@/components/Utilities/ComponentLoadingSpinner.vue";
import LazyObserver from "@/components/Utilities/LazyObserver.vue";
import { useAuth0 } from "@/plugins/auth0";
import sanityClient from "@sanity/client";
import { sanityConf } from "@/plugins/auth0/sanityStore";

const query = `*[_type == "post"]{
  _id,
  publishedAt,
  title,
  slug,
  excerpt
}| order(publishedAt desc)[0...50]`;

export default {
  data() {
    return {
      loading: true,
      posts: [],
      error: null,
    };
  },
  created() {
    const { initializationCompleted, user, isAuthenticated } = useAuth0();
    initializationCompleted().then(() => {
      if (isAuthenticated.value) {
        sanityConf.token =
          user.value["https://www.highcanfly.club/sanity_token"].toString();
      }
      this.fetchData();
    });
  },
  components: {
    CardSinglePost,
    LoadingSpinner,
    LazyObserver,
  },
  methods: {
    onlazyBlog(entry, unobserve, id) {
      if (
        entry.isIntersecting &&
        this.$refs.card_single_post[id] !== undefined
      ) {
        unobserve();
        this.posts[id].loaded = true;
        this.$refs.card_single_post[id].fetchData(this.posts[id].slug.current);
      }
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanityClient(sanityConf)
        .fetch(query)
        .then(
          (posts) => {
            this.loading = false;
            this.posts = posts;
            this.posts.forEach((post) => {
              post.loaded = false;
            });
          },
          (error) => {
            this.error = error;
          }
        );
    },
  },
};
</script>
