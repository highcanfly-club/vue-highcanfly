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

// views without layouts

import Landing from "@/views/Landing.vue";
import Policy from "@/views/Policy.vue";
import Blog from "@/views/Blog.vue";
import Demo from "@/views/Demo.vue";
import About from "@/views/About.vue";
import Index from "@/views/Index.vue";
import IndexOrig from "@/views/Index.orig.vue";
import MapFlers from "@/views/MapFlers.vue";
import SitesDePratique from "@/views/SitesDePratique.vue";

//sitemap
import Sitemap from "@/views/Sitemap.vue";
//vue3 openlayers
import OpenLayersMap from 'vue3-openlayers';

import 'vue3-openlayers/dist/vue3-openlayers.css';
import Test from "@/views/OpenLayersTest.vue";

//Global functions
import Highcanfly from "@/plugins/highcanfly";
import hCaptcha from "@/views/EmailForm.vue";
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
    path: "/index-orig",
    component: IndexOrig,
  },
  {
    path: "/map-flers",
    component: MapFlers,
  },
  {
    path: "/demo",
    component: Demo,
  },
  {
    path: "/map-sites-de-pratique",
    component: SitesDePratique,
    name:"Sites de pratique",
  },
  {
    path: "/openlayer-test",
    component: Test,
  },
  {
    path: "/hcaptcha-test",
    component: hCaptcha,
  },
  {
    path: "/",
    component: Landing,
    name: 'index',
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
  { path: "/sitemap", component: Sitemap},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(OpenLayersMap);
app.use(Highcanfly);

const vm = app.mount("#app"); //eslint-disable-line
