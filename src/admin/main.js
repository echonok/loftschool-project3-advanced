import Vue from 'vue';
import App from './App.vue'

new Vue({
  el: "#app-root",
  render: h => h(App)
});

new Vue({
  render: h => h(App)
}).$mount('#app')