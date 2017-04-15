import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import HomePage from 'components/homepage.vue';
import Blog from 'components/blog.vue';
import Projects from 'components/projects.vue';
import Resume from 'components/resume.vue';
import Contact from 'components/contact.vue';
import NotFoundPage from 'components/404.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/blog', component: Blog },
  { path: '/projects', component: Projects },
  { path: '/resume', component: Resume },
  { path: '/contact', component: Contact },
  { path: '*', component: NotFoundPage }
];

export default new VueRouter({
  routes
});
