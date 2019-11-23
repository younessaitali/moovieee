import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const http = axios.create({
  baseURL: process.env.BACKEND_URL
    ? process.env.BACKEND_URL
    : "https://api.themoviedb.org/"
});

Vue.prototype.$http = http;

const apikey = "8e44577d6448a20430c37799d8b6f3f6";

Vue.prototype.$api = apikey;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
