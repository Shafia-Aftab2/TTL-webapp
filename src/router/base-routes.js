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
    component: AppLayout,
    children: [
      {
        name: 'home',
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
