import Vue from 'vue';
import Router from 'vue-router';

/**
 * Import layouts
 */
// import AppLayout from '@/layouts/AppLayout';
import PublicLayout from '@/layouts/PublicLayout';

/**
 * Import Views
 */
import TeacherLogin from '@/modules/student/StudentLogin';
import StudentSignUp from '@/modules/student/StudentSignUp';
import OnboardingOne from '@/modules/student/onboarding/OnboardingOne';


Vue.use(Router);

export default [
  {
    path: '/student/login',
    component: PublicLayout,
    children: [
      {
        name: 'student-login',
        path: '',
        component: TeacherLogin,
      },
    ],
  },
  {
    path: '/student/sign-up',
    component: PublicLayout,
    children: [
      {
        name: 'student-signup',
        path: '',
        component: StudentSignUp,
      },
    ],
  },
  {
    path: '/student/start',
    component: PublicLayout,
    children: [
      {
        name: 'student-onboarding-1',
        path: '',
        component: OnboardingOne,
      },
    ],
  },
];
