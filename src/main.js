import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueResource from 'vue-resource'
import axios from 'axios'

window.axios = axios;

Vue.config.productionTip = false;
Vue.use(VueResource);


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
