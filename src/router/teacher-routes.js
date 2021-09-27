import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from '../layouts/AppLayout';
import TeacherLogin from '../modules/teacher/Login';

Vue.use(Router);

export default [
  {
    path: '/teacher/login',
    name: 'teacher-login',
    component: AppLayout,
    children: [
      {
        path: '',
        component: TeacherLogin,
      },
    ],
  },
];
