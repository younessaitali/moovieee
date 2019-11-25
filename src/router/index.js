import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import display from "../views/display.vue";
import searchDisplay from "../views/searchdisplay.vue";
import movie from "../views/movie.vue";
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
    component: display
  },
  {
    path: "/trending",
    name: "trending",
    component: display
  },
  {
    path: "/search",
    name: "search",
    component: searchDisplay
  },
  {
    path: "/browse-movies",
    name: "browse-movies",
    component: searchDisplay
  },
  {
    path: "/movie",
    name: "movies",
    component: movie
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
