import Vue from 'vue';
import App from './App.vue';
import picturePlugin from './src/utils/ImgSvg.plugin';
import plus from './src/components/plus.vue';

Vue.component('plus', plus);
Vue.use(picturePlugin)

new Vue({
  el: "#app",
  render: h => h(App)
});