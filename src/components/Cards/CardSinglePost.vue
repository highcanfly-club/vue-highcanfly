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
  <section v-if="post" class="relative py-16 bg-slate-200">
    <div
      class="container -mt-60 mx-auto px-4"
      :class="indexPosts < nbPosts - 1 ? 'mb-32' : ''"
    >
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
      >
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div class="relative">
                <img
                  class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 max-w-150-px"
                  v-if="post.image"
                  :src="
                    imageUrlFor(post.image)
                      .auto('format')
                      .width(150)
                      .height(150)
                      .fit('crop')
                  "
                  :alt="post.image.asset.altText"
                  @click="lightBox(post.image, $event)"
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
                    class="text-xl font-semibold block tracking-wide text-slate-600"
                  >
                    {{
                      new Date($data.post.publishedAt).toLocaleString("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </span>
                  <span class="text-sm text-slate-400"
                    >Par {{ post.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-justify prose-sm prose-a:text-blue-600 hover:prose-a:text-blue-500 md:prose-base lg:prose-base"
            v-if="post"
          >
            <h3
              class="text-xl font-bold uppercase leading-normal text-slate-700 mb-2"
            >
              {{ post.title }}
              <!--index={{indexPosts}} total={{nbPosts}}-->
            </h3>
            <SanityBlocks :blocks="blocks" :serializers="postSerializers" />
          </div>
          <div class="text-right text-sm text-slate-400 pt-10">
            <router-link
              v-if="post.slug"
              :to="`/sanity-blog/${post.slug.current}`"
            >
              # {{ post.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanityClient from "@sanity/client";
import { sanityReplaceReferences } from "@/components/Utilities/SanityReferenceWalker";
import imageUrlBuilder from "@sanity/image-url";
import SanityGallerySerializer from "@/components/Utilities/SanityGallerySerializer.vue";
import SanityLazyImgSerializer from "@/components/Utilities/SanityLazyImgSerializer.vue";
import SanityBlockquoteSerializer from "@/components/Utilities/SanityBlockquoteSerializer.vue";
import SanityYoutubeSerializerVue from "@/components/Utilities/SanityYoutubeSerializer.vue";
import SanityVimeoSerializerVue from "../Utilities/SanityVimeoSerializer.vue";
import * as basiclightbox from "basiclightbox";

const query = `*[slug.current == $slug] {
  _id,
  _createdAt,
  publishedAt,
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

const postSerializers = {
  types: {
    image: SanityLazyImgSerializer,
    gallery: SanityGallerySerializer,
    youtube: SanityYoutubeSerializerVue,
    vimeo: SanityVimeoSerializerVue,
  },
  marks: {
    mark: (props, children) => {
      return h("mark", children[0]);
    },
    underlined: (props, children) => {
      return h("span", { class: "underline" }, children[0]);
    },
    barred: (props, children) => {
      return h("span", { class: "line-through" }, children[0]);
    },
    overlined: (props, children) => {
      return h("span", { class: "overline" }, children[0]);
    },
  },
  styles: {
    blockquote: SanityBlockquoteSerializer,
  },
};

export default defineComponent({
  name: "SinglePost",
  components: { SanityBlocks },
  error: null,
  props: {
    slug: String,
    lazy: {
      type: Boolean,
      default: false,
    },
    nbPosts: Number,
    indexPosts: Number,
  },
  data() {
    return {
      loading: true,
      post: [],
      blocks: [],
      postSerializers,
      error: this.error,
    };
  },
  mounted() {
   const slug = this.slug !== undefined ? this.slug : this.$route.params.slug;
    this.loading = true;
    if (!this.$props.lazy) {
      this.fetchData(slug);
    }
  },
  methods: {
    lightBox: (image) => {
      const url = imageUrlBuilder(sanityClient(this.$sanityConf)).image(image).auto("format").toString();
      basiclightbox
        .create(`<img src="${url}" />`)
        .show(() => console.log(`lightbox ${image.url} now visible`));
    },
    imageUrlFor(source:string) {
      return imageUrlBuilder(sanityClient(this.$sanityConf)).image(source);
    },
    fetchData(slug:string) {
        if (this.$props.lazy) console.log(`lazy loading /sanity-blog/${slug}`);
        this.error = this.post = null;
        const client = sanityClient(this.$sanityConf);
        client.fetch(query, { slug: slug }).then(
          (post) => {
            const _post = post;
            sanityReplaceReferences(_post, client).then(() => {
              this.loading = false;
              this.post = _post;
              this.blocks = _post.body;
            });
          },
          (error) => {
            this.error = error;
          }
        );

    },
  },
});
</script>
