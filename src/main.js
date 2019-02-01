import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import vhCheck from 'vh-check';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

let vh = vhCheck();
window.addEventListener('resize', () => {
  vh.recompute();
});
