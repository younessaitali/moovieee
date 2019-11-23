import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import trending from "../views/trending.vue";
import discovery from "../views/discovery.vue";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css";
Vue.use(Vuesax);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/discovery",
    name: "discovery",
    component: discovery
  },
  {
    path: "/trending",
    name: "trending",
    component: trending
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
