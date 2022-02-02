import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles
import "@/assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// mouting point for the whole app

import App from "@/App.vue";

// Title mixin
import metaMixin from "@/mixins/MetaMixin";


//vue3 openlayers
//import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';

//Global functions
import Highcanfly from "@/plugins/highcanfly";
// routes


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
    name: 'contactez-nous'
  },
  {
    path: "/windy",
    component: () => import("@/views/ViewWindy.vue"),
    name: 'Le vent (Windy)'
  },
  {
    path: "/map-sites-de-pratique",
    component: () => import("@/views/SitesDePratique.vue"),
    name:"Sites de pratique",
  },
  {
    path: "/",
    component: () => import("@/views/ViewLanding.vue"),
    name: 'index',
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/site-map", component: () => import("@/views/ViewSitemap.vue")},
  {
    path: "/sanity-blog/:slug",
    component: () => import("@/views/SinglePost.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
window.app = app;
app.use(router);
//app.use(OpenLayersMap);
app.use(Highcanfly);
app.mixin(metaMixin);

const vm = app.mount("#app"); //eslint-disable-line
