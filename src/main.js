import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue  from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VCalendar from 'v-calendar';
// import Axios from 'axios'

// Axios.defaults.baseURL = 'http://localhost:8080/';

var truncate = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};


Vue.filter('truncate', truncate);
Vue.use(BootstrapVue)
Vue.use(VCalendar)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
