
<template>
  <section v-if="post" class="relative py-16 bg-slate-200">
    <div class="container -mt-60 mb-32 mx-auto px-4">
      <div
        class="
          relative
          flex flex-col
          min-w-0
          break-words
          bg-white
          w-full
          mb-6
          shadow-xl
          rounded-lg
          mt-16
        "
      >
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div class="relative">
                <img
                  class="
                    shadow-xl
                    rounded-full
                    h-auto
                    align-middle
                    border-none
                    absolute
                    -m-16
                    -ml-20
                    max-w-150-px
                  "
                  v-if="post.image"
                  :src="imageUrlFor(post.image).width(480)"
                />
              </div>
            </div>
            <div class="loading" v-if="loading">Loading...</div>

            <div v-if="error" class="error">
              {{ error }}
            </div>
            <div class="w-full px-4 text-center mt-20">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                <div class="mr-4 p-3 text-center">
                  <span
                    class="
                      text-xl
                      font-semibold
                      block
                      tracking-wide
                      text-slate-600
                    "
                  >
                    {{
                      new Date($data.post._createdAt).toLocaleString(
                        undefined,
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    }}
                  </span>
                  <span class="text-sm text-slate-400"
                    >Par {{ post.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-2" v-if="post">
            <h3
              class="
                text-xl
                font-bold
                uppercase
                leading-normal
                mb-2
                text-slate-700
                mb-2
              "
            >
              {{ post.title }}
            </h3>
            <SanityBlocks :blocks="blocks" />
          </div>
          <div class="text-right text-sm text-slate-400 pt-10">
              <router-link :to="`/sanity-blog/${post.slug.current}`">
                # {{ post.title }}
              </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import SanityClient from "@/plugins/sanity-client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(SanityClient);

const query = `*[slug.current == $slug] {
  _id,
  _createdAt,
  title,
  slug,
  body, 
 "image": mainImage{
  asset->{
  _id,
  url
}
},
"name":author->name,
"authorImage":author->image
}[0]
`;

export default {
  name: "SinglePost",
  components: { SanityBlocks },
  props: ["slug"],
  data() {
    return {
      loading: true,
      post: [],
      blocks: [],
    };
  },
  setup() {},
  created() {
    let slug = this.slug != undefined ? this.slug : this.$route.params.slug;
    this.fetchData(slug);
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData(slug) {
      this.error = this.post = null;
      this.loading = true;

      SanityClient.fetch(query, { slug: slug }).then(
        (post) => {
          this.loading = false;
          this.post = post;
          this.blocks = post.body;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>
