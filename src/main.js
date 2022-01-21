import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

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
import About from "@/views/About.vue";
import Index from "@/views/Index.vue";
import MapFlers from "@/views/MapFlers.vue";
import SitesDePratique from "@/views/SitesDePratique.vue";

//vue3 openlayers
import OpenLayersMap from 'vue3-openlayers';

import 'vue3-openlayers/dist/vue3-openlayers.css';
import Test from "@/views/OpenLayersTest.vue";
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
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/map-flers",
    component: MapFlers,
  },
  {
    path: "/map-sites-de-pratique",
    component: SitesDePratique,
  },
  {
    path: "/openlayer-test",
    component: Test,
  },
  {
    path: "/",
    component: Landing,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(OpenLayersMap);

const vm = app.mount("#app"); //eslint-disable-line
