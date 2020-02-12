import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from './requests';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { store } from "./src/store";

import login from './src/components/login';
import maincontent from "./src/components/maincontent";
import picturePlugin from './src/utils/ImgSvg.plugin';
import plus from "./src/components/plus";
import loadButton from './src/components/loadButton'
import adminInput from './src/components/adminInput'

Vue.prototype.$axios = axios;
Vue.prototype.$baseUrl = "https://webdev-api.loftschool.com/";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: maincontent
    },
    {
      path: "/login",
      name: "login",
      component: login
    }
  ]
});

async function isAuthentificated() {
  let result = false;
  if (localStorage.getItem("token")) {
    await axios
      .get("/user")
      .then(response => {
        Vue.prototype.$user = response.data.user;
        result = true;
      })
      .catch(error => {
        result = false;
      });
  } else {
    result = false;
  }
  return result;
}

router.beforeEach((to, from, next) => {
  if (to.path != "/login") {
    !isAuthentificated().then(result => {
      if (!result) {
        next("/login");
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

Vue.component('plus', plus);
Vue.component('loadButton', loadButton);
Vue.component('admininput', adminInput);
Vue.use(VueRouter);
Vue.use(picturePlugin);

Vue.prototype.$axios = axios;

new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});