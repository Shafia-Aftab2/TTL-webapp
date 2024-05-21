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
import ClassStudentsInfo from "../components/Modules/Class/Students/Info";
import ClassTaskChooseDefault from "../components/Modules/Class/Tasks/ChooseDefault";
import ClassTaskCreate from "../components/Modules/Class/Tasks/Create";
import ClassCreateBulkTask from "../components/Modules/Class/Tasks/Create/Bulk";
import ClassTaskEdit from "../components/Modules/Class/Tasks/Update";
import ClassTaskStatus from "../components/Modules/Class/Tasks/Status";
import ClassTaskHome from "../components/Modules/Class/Tasks/Home";
import ClassTasksInbox from "../components/Modules/Class/Tasks/Inbox";
import ClassTasksAttemptFlow from "../components/Modules/Class/Tasks/AttemptFlow";
import ClassPractice from "../components/Modules/Class/Practice";
import ClassManage from "../components/Modules/Class/Manage";
import ClassLeaderboard from "../components/Modules/Class/Leaderboard";
import ClassStats from "../components/Modules/Class/Stats";
import ProfileSelf from "../components/Modules/Profile/Self";
import ProfileSettingsAccount from "../components/Modules/Profile/Settings/Account";
import ProfileSubscriptionHalt from "../components/Modules/Profile/Settings/Subscription/Halt";
import ServicesUpgrade from "../components/Modules/Services/Upgrade/Home";
import ServicesUpgradeSuccess from "../components/Modules/Services/Upgrade/Success";
import ServicesUpgradePlans from "../components/Modules/Services/Upgrade/Plans";
import ServicesPrivacyPolicy from "../components/Modules/Services/PrivacyPolicy";
import ServicesTermsOfService from "../components/Modules/Services/TermsOfService";
import ServicesContact from "../components/Modules/Services/Contact";
import Error404 from "../components/Modules/Error404";
import ComingSoon from "../components/Modules/ComingSoon";
import AdminUsersHome from "../components/Modules/Admin/Users/Home";
import AdminUserAnalytics from "../components/Modules/Admin/Users/Analytics";
import AdminQuizzesHome from "../components/Modules/Admin/Quizzes/Home";
import AdminQuizzesUpdate from "../components/Modules/Admin/Quizzes/Update";
import AdminQuizzesCreate from "../components/Modules/Admin/Quizzes/Create";
import QuizzesCreateBulk from "../components/Modules/Admin/Quizzes/Create/Bulk";
// route middlware
import authMiddlware from "./middlewares/auth";
import accessControlMiddleware from "./middlewares/accessControl";
// user roles
import roles from "../utils/constants/roles";
// user data
import authUser from "../utils/helpers/auth";
// global store
import store from "../store";
import PaymentMethod from "../components/Modules/PrivateStudent/PaymentMethod";
import PsLayout from "../components/Modules/PrivateStudent/Layouts/layout.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    props: { variant: "dark" },
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
  /**
   * START:
   * Private Student Payment method
   */
  {
    path: "/ps-student",
    component: PsLayout,
    props: { variant: "dark" },
    children: [
      {
        name: "PaymentMethod",
        path: "/ps-student/payment-method/:accessToken",
        alias: "/ps-student",
        component: PaymentMethod,
        // meta: {
        //   middlewareConfig: {
        //     requiresAuth: false,
        //     blockedRoles: [roles.TEACHER, roles.ADMIN],
        //   },
        // },
      },
    ],
  },
  /**
   * END:
   * Private Student Payment method
   */
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
        name: "AuthSignup",
        path: "/auth/signup",
        component: AuthSignup,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.TEACHER, roles.ADMIN],
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
            blockedRoles: [roles.TEACHER, roles.ADMIN],
          },
        },
      },
      {
        name: "ClassTasksAttemptFlow",
        path: "/classes/tasks/attempt-flow",
        component: ClassTasksAttemptFlow,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.TEACHER, roles.ADMIN],
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
            blockedRoles: [roles.TEACHER, roles.ADMIN],
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
            blockedRoles: [roles.TEACHER, roles.ADMIN],
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
          },
        },
      },
      {
        name: "ClassTaskCreateBulk",
        path: "/classes/:id/tasks/create/bulk",
        component: ClassCreateBulkTask,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
    props: { type: "sidebar", variant: "dark" },
    children: [
      {
        name: "ClassStudentsInfo",
        path: "/classes/:classId/students/:studentId",
        component: ClassStudentsInfo,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
          },
        },
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
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
            blockedRoles: [roles.STUDENT, roles.ADMIN],
            blockedWhenTrialOver: true,
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
    path: "/profile/settings",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ProfileSettingsAccount",
        path: "/profile/settings/account",
        alias: "/profile/settings",
        component: ProfileSettingsAccount,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
          },
        },
      },
      {
        name: "ProfileSubscriptionPause",
        path: "/profile/settings/pause-subscription",
        props: { haltMode: "pause" },
        component: ProfileSubscriptionHalt,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
          },
        },
      },
      {
        name: "ProfileSubscriptionCancel",
        path: "/profile/settings/cancel-subscription",
        props: { haltMode: "cancel" },
        component: ProfileSubscriptionHalt,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
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
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
          },
        },
      },
      {
        name: "ServicesUpgradePlans",
        path: "/services/upgrade/plans",
        alias: "/pricing",
        component: ServicesUpgradePlans,
      },
      {
        name: "ServicesUpgradeSuccess",
        path: "/services/upgrade/success",
        component: ServicesUpgradeSuccess,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.ADMIN],
          },
        },
      },
      {
        name: "ServicesPrivacyPolicy",
        path: "/services/privacy-policy",
        component: ServicesPrivacyPolicy,
      },
      {
        name: "ServicesTermsOfService",
        path: "/services/terms",
        component: ServicesTermsOfService,
      },
    ],
  },
  {
    path: "/services",
    component: Layout,
    children: [
      {
        name: "ServicesContact",
        path: "/services/contact",
        alias: "/contact",
        component: ServicesContact,
      },
    ],
  },
  // admin pages
  {
    path: "/admin",
    component: Layout,
    props: { type: "sidebar", variant: "dark" },
    children: [
      {
        name: "AdminUsersHome",
        path: "/admin/users",
        component: AdminUsersHome,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
      },
      {
        name: "AdminUserAnalytics",
        path: "/admin/users/:userId",
        component: AdminUserAnalytics,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
      },
      {
        name: "AdminQuizzesHome",
        path: "/admin/quizzes",
        component: AdminQuizzesHome,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
      },
    ],
  },
  {
    path: "/admin",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "AdminQuizzesCreate",
        path: "/admin/quizzes/create",
        component: AdminQuizzesCreate,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
      },
      {
        name: "AdminQuizzesCreateBulk",
        path: "/admin/quizzes/create/bulk",
        component: QuizzesCreateBulk,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
      },
      {
        name: "AdminQuizzesUpdate",
        path: "/admin/quizzes/:taskId/edit",
        component: AdminQuizzesUpdate,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.STUDENT, roles.TEACHER],
          },
        },
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

  // get subscription
  const subscription = store.state.subscription;
  const isSubscriptionOver =
    subscription.isRequired &&
    subscription.isTrialOver &&
    subscription.isCalculated;

  // get middleware config from route
  const { middlewareConfig } = to?.meta;

  // check if route is to be blocked
  const blockRoute =
    isSubscriptionOver && middlewareConfig?.blockedWhenTrialOver;
  if (blockRoute) store.state.hasClosedModal = false;

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
              redirect_route: to.fullPath,
            }),
          },
        }),
      successCallback: () =>
        accessControlMiddleware({
          failureCallback: () => next({ name: "NotFound" }),
          successCallback: () =>
            blockRoute ? next({ name: "ClassChooseDefault" }) : next(),
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
              redirect_route: to.fullPath,
            }),
          },
        }),
      successCallback: () =>
        blockRoute ? next({ name: "ClassChooseDefault" }) : next(),
    });
    return;
  }
});

export default router;
