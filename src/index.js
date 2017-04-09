import uikitless from 'uikit/src/less/uikit.less';
import uikittheme from 'uikit/src/less/uikit.theme.less';
import css from './less/main.less';
var zionUrl = require('./images/Zion.jpg');

import Vue from 'vue';
import uikit from 'uikit';
import navbar from './components/navbar.vue';
import VueRouter from 'vue-router';
import HomePage from './components/homepage.vue';
import Blog from './components/blog.vue';
import Projects from './components/projects.vue';
import Resume from './components/resume.vue';
import Contact from './components/contact.vue';
import NotFoundPage from './components/404.vue';

// var navbar
Vue.component('navbar', navbar);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/blog', component: Blog },
  { path: '/projects', component: Projects },
  { path: '/resume', component: Resume },
  { path: '/contact', component: Contact },
  { path: '*', component: NotFoundPage }
];

const router = new VueRouter({
  routes
});

new Vue({
  data: {
    zionUrl
  },
  router
}).$mount('#app');
