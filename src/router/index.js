import { createRouter, createWebHistory } from "vue-router";
// base
import Layout from "../components/Layouts/_layout.vue";
import Home from "../components/Modules/Home";
import AuthLogin from "../components/Modules/Auth/Login";
import AuthSignup from "../components/Modules/Auth/Signup";
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
import ClassTaskStatus from "../components/Modules/Class/Tasks/Status";
import ClassTaskHome from "../components/Modules/Class/Tasks/Home";
import ClassTaskResponse from "../components/Modules/Class/Tasks/Response";
import ClassTasksInbox from "../components/Modules/Class/Tasks/Inbox";
import TeacherClassStudents from "../components/Modules/Teachers/Classes/Students";
import StudentFeedback from "../components/Modules/Students/Feedback";
import StudentInbox from "../components/Modules/Students/Inbox";
import StudentLeaderboard from "../components/Modules/Students/Leaderboard";
import StudentStatistics from "../components/Modules/Students/Stats";
import StudentQA from "../components/Modules/Students/QA";
import StudentCaption from "../components/Modules/Students/Caption";
import StudentTranslation from "../components/Modules/Students/Translation";
import Error404 from "../components/Modules/Error404";
import ComingSoon from "../components/Modules/ComingSoon";
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
      {
        name: "ClassTaskResponse",
        path: "/classes/:classId/tasks/:taskId/respond",
        component: ClassTaskResponse,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
            blockedRoles: [roles.TEACHER],
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
        name: "ClassJoinLink",
        path: "/classes/:id/join",
        component: ClassJoinLink,
        meta: {
          middlewareConfig: {
            requiresAuth: true,
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
    path: "/teachers",
    component: Layout,
    props: { variant: "dark", type: "sidebar" },
    children: [
      {
        name: "TeacherClassStudents",
        path: "/teachers/class/students",
        component: TeacherClassStudents,
      },
    ],
  },
  {
    path: "/students",
    component: Layout,
    props: { variant: "dark", type: "sidebar" },
    children: [
      {
        name: "StudentFeedback",
        path: "/students/feedback",
        component: StudentFeedback,
      },
      {
        name: "StudentInbox",
        path: "/students/inbox",
        component: StudentInbox,
      },
      {
        name: "StudentLeaderboard",
        path: "/students/leaderboard",
        component: StudentLeaderboard,
      },
      {
        name: "StudentStatistics",
        path: "/students/statistics",
        component: StudentStatistics,
      },
      {
        name: "StudentQA",
        path: "/students/qa",
        component: StudentQA,
      },
      {
        name: "StudentCaption",
        path: "/students/caption",
        component: StudentCaption,
      },
      {
        name: "StudentTranslation",
        path: "/students/translation",
        component: StudentTranslation,
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
      failureCallback: () => next({ name: "AuthLogin" }),
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
      failureCallback: () => next({ name: "AuthLogin" }),
      successCallback: () => next(),
    });
    return;
  }
});

export default router;
