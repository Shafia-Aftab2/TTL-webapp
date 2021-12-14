import { createRouter, createWebHistory } from "vue-router";
// base
import Layout from "../components/Layouts/_layout.vue";
import Home from "../views/Home.vue";
import AuthLogin from "../components/Modules/Auth/Login";
import AuthSignup from "../components/Modules/Auth/Signup";
import ClassJoin from "../components/Modules/Class/Join";
import ClassCreate from "../components/Modules/Class/Create";
import ClassChooseTopics from "../components/Modules/Class/ChooseTopics";
import ClassInviteStudents from "../components/Modules/Class/InviteStudents";
import ClassTaskCreate from "../components/Modules/Class/Tasks/Create";
import TeacherClassHome from "../components/Modules/Teachers/Classes/Home";
import TeacherClassStudents from "../components/Modules/Teachers/Classes/Students";
import StudentClassJoin from "../components/Modules/Students/Onboarding/Join";
import StudentHomePage from "../components/Modules/Students/Home";
import StudentFeedback from "../components/Modules/Students/Feedback";
import StudentInbox from "../components/Modules/Students/Inbox";
import StudentLeaderboard from "../components/Modules/Students/Leaderboard";
import StudentStatistics from "../components/Modules/Students/Stats";
import StudentQA from "../components/Modules/Students/QA";
import StudentCaption from "../components/Modules/Students/Caption";
import StudentTranslation from "../components/Modules/Students/Translation";
import Error404 from "../components/Modules/Error404";
// modular
// import teacherRoutes from "../modules/teacher/teacher-routes";
// import studentRoutes from "../modules/student/student-routes";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "Home",
        path: "",
        component: Home,
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
    ],
  },
  {
    path: "/classes",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "ClassJoin",
        path: "/classes/:id/join",
        component: ClassJoin,
      },
      {
        name: "ClassInviteStudents",
        path: "/classes/:id/invite-students",
        component: ClassInviteStudents,
      },
      {
        name: "ClassTaskCreate",
        path: "/classes/:id/tasks/create",
        component: ClassTaskCreate,
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
      },
      {
        name: "ClassChooseTopics",
        path: "/classes/:id/choose-topics",
        component: ClassChooseTopics,
      },
    ],
  },
  {
    path: "/teachers",
    component: Layout,
    props: { variant: "dark", type: "sidebar" },
    children: [
      {
        name: "TeacherClassHome",
        path: "/teachers/classes/home",
        component: TeacherClassHome,
      },
      {
        name: "TeacherClassStudents",
        path: "/teachers/class/students",
        component: TeacherClassStudents,
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        name: "StudentClassJoin",
        path: "/students/classes/join",
        component: StudentClassJoin,
      },
    ],
  },
  {
    path: "/students",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "StudentHomePage",
        path: "/students",
        component: StudentHomePage,
      },
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
];

// routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
