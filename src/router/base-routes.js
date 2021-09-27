import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layouts
 */
import AppLayout from '../layouts/AppLayout';
import PublicLayout from '../layouts/PublicLayout';

/**
 * Import views
 */
import Home from '../views/Home';
import Login from '../views/Login';


Vue.use(Router);

export default [
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
