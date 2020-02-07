import Vue from 'vue';
import App from './App.vue';
import picturePlugin from './src/utils/ImgSvg.plugin';
import plus from './src/components/plus.vue';
import router from './router';

Vue.use(picturePlugin)

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});