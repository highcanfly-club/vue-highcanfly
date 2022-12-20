/*!
=========================================================
* © 2018-2022 Ronan LE MEILLAT for Association Highcanfly
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- Vue Notus theme from Creative Tim (MIT License)
- And many others
*/
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
//import App from '@/App.vue'
import metaMixin from "@/mixins/MetaMixin";
import Highcanfly from "@/plugins/highcanfly";
import type { RedirectCallback } from "@/plugins/auth0";
import { initAuth0 } from "@/plugins/auth0";
import auth0conf from "@/config/auth0-conf.json";
import { sanityConf } from "@/plugins/auth0/sanityStore";
import type { Auth0Instance } from "@/plugins/auth0";
import type { SanityConf } from "@/plugins/auth0/sanityStore";
import type { Router } from "vue-router";
import { addJsonLD } from "@/config/StructuredLDJson";
// styles
import "@/assets/styles/index.css";

const routes = [
  {
    path: "/policy",
    component: () => import("@/views/ViewPolicy.vue"),
    name: "Policy",
  },
  {
    path: "/landing",
    component: () => import("@/views/ViewLanding.vue"),
    name: "Landing",
  },
  {
    path: "/blog",
    component: () => import("@/views/ViewBlog.vue"),
    name: "Blog",
  },
  {
    path: "/about",
    component: () => import("@/views/ViewAbout.vue"),
    name: "À propos",
  },
  {
    path: "/index-new",
    component: () => import("@/views/ViewIndexWhite.vue"),
  },
  {
    path: "/contact",
    component: () => import("@/views/ViewContact.vue"),
    name: "contactez-nous",
  },
  {
    path: "/trackjoiner",
    component: () => import("@/views/ViewTrackjoiner.vue"),
    name: "Joignez vos traces",
  },
  {
    path: "/trackjoiner/:help",
    component: () => import("@/views/ViewTrackjoiner.vue"),
  },
  {
    path: "/windy",
    component: () => import("@/views/ViewWindy.vue"),
    name: "Le vent (Windy)",
  },
  {
    path: "/map-sites-de-pratique",
    component: () => import("@/views/SitesDePratique.vue"),
    name: "Sites de pratique",
  },
  {
    path: "/",
    component: () => import("@/views/ViewLanding.vue"),
    name: "index",
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/site-map", component: () => import("@/views/ViewSitemap.vue") },
  {
    path: "/sanity-blog/:slug",
    component: () => import("@/views/SinglePost.vue"),
  },
  {
    path: "/meteo",
    name: "meteo",
    component: () => import("@/views/ViewMeteo.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/ViewLogin.vue"),
  },
  {
    path: "/payment",
    name: "payment",
    component: () => import("@/views/ViewPayment.vue"),
  },
  {
    path: "/meteo/:slug",
    component: () => import("@/views/ViewMeteo.vue"),
  },
  {
    path: "/add-shortlink",
    component: () => import("@/views/AddShortLink.vue"),
    name: "Add short link",
  },
  {
    path: "/list-shortlinks",
    component: () => import("@/views/ListShortLinks.vue"),
    name: "list short links",
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const REDIRECT_CALLBACK: RedirectCallback = () =>
  window.history.replaceState(
    {},
    document.title,
    `${window.location.origin}/login`
  );

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $auth0: Auth0Instance;
    $sanityConf: SanityConf;
    $router: Router;
  }
}

declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

import("./App.vue").then((App) => {
  const app = createApp(App.default);
  addJsonLD();
  app.use(router);
  app.config.globalProperties.$auth0 = initAuth0({
    onRedirectCallback: REDIRECT_CALLBACK,
    authorizationParams: {
      redirect_uri: `${window.location.origin}/login`
    },
    ...auth0conf,
  } as never); // never because cacheLocation:"localstorage" is type as string but as CacheLocation = "localstorage" | "memory" in Auth0SDK
  app.config.globalProperties.$sanityConf = sanityConf;
  app.config.globalProperties.$sanityConf.preview =
    app.config.globalProperties.$sanityConf.preview === undefined
      ? false
      : app.config.globalProperties.$sanityConf.preview;
  app.use(Highcanfly);
  app.mixin(metaMixin);

  app.mount("#app");
});
