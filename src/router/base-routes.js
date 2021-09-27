import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layouts
 */
import AppLayout from '@/layouts/AppLayout';

/**
 * Import views
 */
import Home from '@/views/Home';

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
];
