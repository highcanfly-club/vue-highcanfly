import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles
import "@/assets/styles/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

// Title mixin
import metaMixin from "@/mixins/MetaMixin";

// views without layouts

import Landing from "@/views/Landing.vue";
import Policy from "@/views/Policy.vue";
import Blog from "@/views/Blog.vue";
import Contact from "@/views/Contact.vue";
import About from "@/views/About.vue";
import Index from "@/views/Index.vue";
import SitesDePratique from "@/views/SitesDePratique.vue";
import Windy from "@/views/Windy.vue";

//sitemap
import Sitemap from "@/views/Sitemap.vue";

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
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
    ],
  },
  {
    path: "/policy",
    component: Policy,
    name: "Policy",
  },
  {
    path: "/landing",
    component: Landing,
    name: "Landing",
  },
  {
    path: "/blog",
    component: Blog,
    name: "Blog",
  },
  {
    path: "/about",
    component: About,
    name: "À propos",
  },
  {
    path: "/index-new",
    component: Index,
  },
  {
    path: "/contact",
    component: Contact,
    name: 'contactez-nous'
  },
  {
    path: "/windy",
    component: Windy,
    name: 'Le vent (Windy)'
  },
  {
    path: "/map-sites-de-pratique",
    component: SitesDePratique,
    name:"Sites de pratique",
  },
  {
    path: "/",
    component: Landing,
    name: 'index',
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/site-map", component: Sitemap},
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
