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
import ChooseTopic from '@/modules/teacher/onboarding/ChooseTopic';
import CreateClass from '@/modules/teacher/onboarding/CreateClass';
import InviteStudent from '@/modules/teacher/onboarding/InviteStudent';
import StartConvo from '@/modules/teacher/onboarding/StartConvo';


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
      {
        name: 'choose-topic',
        path: '',
        component: ChooseTopic,
      },
      {
        name: 'create-class',
        path: '',
        component: CreateClass,
      },
      {
        name: 'invite-student',
        path: '',
        component: InviteStudent,
      },
      {
        name: 'start-convo',
        path: '',
        component: StartConvo,
      },

    ],
  },
];
