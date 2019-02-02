import Vue from 'vue';
import Router from 'vue-router';
import Practice from './views/Practice.vue';
import Settings from './views/Settings.vue';
import History from './views/History.vue';
import Session from './views/Session.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'practice',
      component: Practice
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/session/:id',
      name: 'session',
      component: Session
    }
  ]
});
