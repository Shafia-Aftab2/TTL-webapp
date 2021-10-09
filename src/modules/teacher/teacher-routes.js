import Vue from 'vue';
import Router from 'vue-router';

/**
 * Import layouts
 */
// import AppLayout from '@/layouts/AppLayout';
import PublicLayout from '@/layouts/PublicLayout';
import MinimalLayout from '@/layouts/MinimalLayout';

/**
 * Import Views
 */
import TeacherLogin from '@/modules/teacher/TeacherLogin';
import TeacherSignup from '@/modules/teacher/TeacherSignup';
import OnboardingTeacherOne from '@/modules/teacher/onboarding/OnboardingOne';


Vue.use(Router);

export default [
  {
    path: '/teacher/login',
    component: PublicLayout,
    children: [
      {
        name: 'teacher-login',
        path: '',
        component: TeacherLogin,
      },
    ],
  },
  {
    path: '/teacher/signup',
    component: PublicLayout,
    children: [
      {
        name: 'teacher-signup',
        path: '',
        component: TeacherSignup,
      },
    ],
  },
  {
    path: '/teacher/start',
    component: MinimalLayout,
    children: [
      {
        name: 'teacher-onboarding-1',
        path: '',
        component: OnboardingTeacherOne,
      },
    ],
  },
];
