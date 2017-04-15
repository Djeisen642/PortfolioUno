import css from './less/main.less';
import uikit from 'uikit';

import Vue from 'vue';

// importing it makes it available to the window
import pjs from 'print.js';

import Navbar from 'components/navbar.vue';
import router from 'appRoutes';
import store from 'appStore';

// var navbar
Vue.component('navbar', Navbar);

new Vue({
  router,
  store
}).$mount('#app');
