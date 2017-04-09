import uikitless from 'uikit/src/less/uikit.less';
import uikittheme from 'uikit/src/less/uikit.theme.less';
import css from './less/main.less';
import uikit from 'uikit';

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from 'app.vue';
import Navbar from 'components/navbar.vue';
import HomePage from 'components/homepage.vue';
import Blog from 'components/blog.vue';
import Projects from 'components/projects.vue';
import Resume from 'components/resume.vue';
import Contact from 'components/contact.vue';
import NotFoundPage from 'components/404.vue';

Vue.use(VueRouter);

// var navbar
Vue.component('navbar', Navbar);
Vue.component('app', App);

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
  router
}).$mount('#app');
