import { createRouter, createWebHistory } from "vue-router";
// base
import Layout from "../components/Layouts/_layout.vue";
import Home from "../components/Modules/Home";
import AuthLogin from "../components/Modules/Auth/Login";
import AuthSignup from "../components/Modules/Auth/Signup";
import AuthForgotPassword from "../components/Modules/Auth/ForgotPassword";
import AuthResetPassword from "../components/Modules/Auth/ResetPassword";
import AuthLogout from "../components/Modules/Auth/Logout";
import ClassChooseDefault from "../components/Modules/Class/ChooseDefault";
import ClassHome from "../components/Modules/Class/Home";
import ClassJoinModule from "../components/Modules/Class/Join/Module";
import ClassJoinLink from "../components/Modules/Class/Join/Link";
import ClassCreate from "../components/Modules/Class/Create";
import ClassChooseTopics from "../components/Modules/Class/ChooseTopics";
import ClassStudentsInvite from "../components/Modules/Class/Students/Invite";
import ClassTaskChooseDefault from "../components/Modules/Class/Tasks/ChooseDefault";
import ClassTaskCreate from "../components/Modules/Class/Tasks/Create";
import ClassTaskEdit from "../components/Modules/Class/Tasks/Update";
import ClassTaskStatus from "../components/Modules/Class/Tasks/Status";
import ClassTaskHome from "../components/Modules/Class/Tasks/Home";
import ClassTasksInbox from "../components/Modules/Class/Tasks/Inbox";
import ClassPractice from "../components/Modules/Class/Practice";
import ClassManage from "../components/Modules/Class/Manage";
import ClassLeaderboard from "../components/Modules/Class/Leaderboard";
import ClassStats from "../components/Modules/Class/Stats";
import ProfileSelf from "../components/Modules/Profile/Self";
import ServicesUpgrade from "../components/Modules/Services/Upgrade";
import Error404 from "../components/Modules/Error404";
import ComingSoon from "../components/Modules/ComingSoon";
import AdminSummary from "../components/Modules/Admin/Summary";
import TeachersFree from "../components/Modules/Admin/Free";
import TeachersPaid from "../components/Modules/Admin/Paid";
import QuizStats from "../components/Modules/Admin/Stats";
import StudentsStats from "../components/Modules/Admin/Students";
// route middlware
import authMiddlware from "./middlewares/auth";
import accessControlMiddleware from "./middlewares/accessControl";
// user roles
import roles from "../utils/constants/roles";
// user data
import authUser from "../utils/helpers/auth";
// global store
import store from "../store";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "Home",
        path: "/",
        component: Home,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
          },
        },
      },
    ],
  },
  {
    path: "/auth",
    component: Layout,
    children: [
      {
        name: "AuthLogin",
        path: "/auth/login",
        component: AuthLogin,
      },
      {
        name: "AuthLoginStudent",
        alias: "/auth/signup",
        path: "/auth/signup/student",
        component: AuthSignup,
        props: { signupMode: "student" },
      },
      {
        name: "AuthLoginTeacher",
        path: "/auth/signup/teacher",
        component: AuthSignup,
        props: { signupMode: "teacher" },
      },
      {
        name: "AuthLogout",
        path: "/auth/logout",
        component: AuthLogout,
      },
      {
        name: "AuthForgotPassword",
        path: "/auth/forgot-password",
        component: AuthForgotPassword,
      },
      {
        name: "AuthResetPassword",
        path: "/auth/reset-password/:resetPasswordToken",
        component: AuthResetPassword,
      },
    ],
  },
  {
    path: "/classes",
    component: Layout,
    props: { type: "sidebar", variant: "dark" },
    children: [
      {
        name: "ClassChooseDefault",
        path: "/classes",
        component: ClassChooseDefault,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassHome",
        path: "/classes/:id",
        component: ClassHome,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassTaskChooseDefault",
        path: "/classes/:classId/tasks",
        component: ClassTaskChooseDefault,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassTaskHome",
        path: "/classes/:classId/tasks/:taskId",
        component: ClassTaskHome,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
    ],
  },
  {
    path: "/classes",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ClassJoinModule",
        path: "/classes/join",
        component: ClassJoinModule,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.TEACHER],
          },
        },
      },
      {
        name: "ClassTasksInbox",
        path: "/classes/tasks/inbox",
        alias: "/inbox",
        component: ClassTasksInbox,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.TEACHER],
          },
        },
      },
      {
        name: "ClassLeaderboard",
        path: "/classes/:id/leaderboard",
        component: ClassLeaderboard,
      },
      {
        name: "ClassPractice",
        path: "/classes/practice",
        component: ClassPractice,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.TEACHER],
          },
        },
      },
      {
        name: "ClassJoinLink",
        path: "/classes/:id/join",
        component: ClassJoinLink,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            redirectToOriginal: true,
            blockedRoles: [roles.TEACHER],
          },
        },
      },
      {
        name: "ClassStudentsInvite",
        path: "/classes/:id/students/invite",
        component: ClassStudentsInvite,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassTaskCreate",
        path: "/classes/:id/tasks/create",
        component: ClassTaskCreate,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassTaskEdit",
        path: "/classes/:id/tasks/:taskId/edit",
        component: ClassTaskEdit,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassTaskStatus",
        path: "/classes/:classId/tasks/:taskId/status",
        component: ClassTaskStatus,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassManage",
        path: "/classes/:classId/manage",
        component: ClassManage,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassStats",
        path: "/classes/stats",
        component: ClassStats,
      },
    ],
  },
  {
    path: "/classes",
    component: Layout,
    children: [
      {
        name: "ClassCreate",
        path: "/classes/create",
        component: ClassCreate,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
      {
        name: "ClassChooseTopics",
        path: "/classes/:id/choose-topics",
        component: ClassChooseTopics,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT],
          },
        },
      },
    ],
  },
  {
    path: "/profile/self",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ProfileSelf",
        path: "/profile/self",
        component: ProfileSelf,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
          },
        },
      },
    ],
  },
  {
    path: "/services",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ServicesUpgrade",
        path: "/services/upgrade",
        component: ServicesUpgrade,
      },
    ],
  },
  // 404 page
  {
    path: "/:catchAll(.*)",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "Error404",
        path: "/:catchAll(.*)",
        component: Error404,
      },
    ],
  },
  {
    path: "/404",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "NotFound",
        path: "/404",
        component: Error404,
      },
    ],
  },
  // coming soon page
  {
    path: "/coming-soon",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ComingSoon",
        path: "/coming-soon",
        component: ComingSoon,
      },
    ],
  },
];

// routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // update store with current user cookie
  const user = authUser.getUser();
  store.state.user = user || {};

  // get middleware config from route
  const { middlewareConfig } = to?.meta;

  // check if has any middleware config
  if (!middlewareConfig || Object.keys(middlewareConfig)?.length === 0) {
    return next();
  }

  // check auth and access control
  if (
    middlewareConfig?.requiresAuth &&
    middlewareConfig?.blockedRoles?.length > 0
  ) {
    await authMiddlware({
      failureCallback: () =>
        next({
          name: "AuthLogin",
          query: {
            ...(middlewareConfig.redirectToOriginal && {
              redirect_url: `${window.location.origin}${to.fullPath}`,
            }),
          },
        }),
      successCallback: () =>
        accessControlMiddleware({
          failureCallback: () => next({ name: "NotFound" }),
          successCallback: () => next(),
          blockedRoles: middlewareConfig?.blockedRoles,
        }),
    });
    return;
  }

  // check auth
  if (middlewareConfig?.requiresAuth) {
    await authMiddlware({
      failureCallback: () =>
        next({
          name: "AuthLogin",
          query: {
            ...(middlewareConfig.redirectToOriginal && {
              redirect_url: `${window.location.origin}${to.fullPath}`,
            }),
          },
        }),
      successCallback: () => next(),
    });
    return;
  }
});

export default router;
