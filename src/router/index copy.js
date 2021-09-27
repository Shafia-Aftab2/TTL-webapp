import Vue from 'vue';
import Router from 'vue-router';
import PublicLayout from '../layouts/PublicLayout';
import AppLayout from '../layouts/AppLayout';

/**
 * Import views here
 */
import Home from '../views/Home';
import Login from '../views/Login';

/**
 * Import route files here
 */
import teacherRoutes from './teacher-routes';

Vue.use(Router);

const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: AppLayout,
    children: [
      {
        path: '',
        component: Home,
      },
    ],
  },
  {
    path: '/login',
    component: PublicLayout,
    children: [
      {
        path: '',
        component: Login,
      },
    ],
  },
];

const routes = baseRoutes.concat(teacherRoutes);
export default new Router({
  routes,
});
