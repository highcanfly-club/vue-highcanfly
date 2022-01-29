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
import OpenLayersMap from 'vue3-openlayers';
import 'vue3-openlayers/dist/vue3-openlayers.css';

//Global functions
import Highcanfly from "@/plugins/highcanfly";
// routes


const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: () => import("@/layouts/Admin.vue"),
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        path: "/admin/settings",
        component: () => import("@/views/admin/Settings.vue"),
      },
      {
        path: "/admin/tables",
        component: () => import("@/views/admin/Tables.vue"),
      },
      {
        path: "/admin/maps",
        component: () => import("@/views/admin/Maps.vue"),
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: () => import("@/layouts/Auth.vue"),
    children: [
      {
        path: "/auth/login",
        component: () => import("@/views/auth/Login.vue"),
      },
      {
        path: "/auth/register",
        component: () => import("@/views/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/policy",
    component: () => import("@/views/Policy.vue"),
    name: "Policy",
  },
  {
    path: "/landing",
    component: () => import("@/views/Landing.vue"),
    name: "Landing",
  },
  {
    path: "/blog",
    component: () => import("@/views/Blog.vue"),
    name: "Blog",
  },
  {
    path: "/about",
    component: () => import("@/views/About.vue"),
    name: "À propos",
  },
  {
    path: "/index-new",
    component: () => import("@/views/Index.vue"),
  },
  {
    path: "/contact",
    component: () => import("@/views/Contact.vue"),
    name: 'contactez-nous'
  },
  {
    path: "/windy",
    component: () => import("@/views/Windy.vue"),
    name: 'Le vent (Windy)'
  },
  {
    path: "/map-sites-de-pratique",
    component: () => import("@/views/SitesDePratique.vue"),
    name:"Sites de pratique",
  },
  {
    path: "/",
    component: () => import("@/views/Landing.vue"),
    name: 'index',
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/site-map", component: () => import("@/views/Sitemap.vue")},
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

app.use(router);
app.use(OpenLayersMap);
app.use(Highcanfly);
app.mixin(metaMixin);

const vm = app.mount("#app"); //eslint-disable-line
