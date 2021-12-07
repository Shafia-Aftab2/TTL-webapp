import { createRouter, createWebHistory } from "vue-router";
// base
import AppLayout from "../components/Layouts/Wrapper.vue";
import HomeLayout from "../components/Layouts/HomeWrapper.vue";
import Layout from "../components/Layouts/_layout.vue";
import Home from "../views/Home.vue";
import TeacherSignup from "../components/Modules/Teachers/Signup";
import TeacherClassCreate from "../components/Modules/Teachers/Classes/Create";
import TeacherClassChooseTopics from "../components/Modules/Teachers/Classes/ChooseTopics";
import TeacherClassInviteStudents from "../components/Modules/Teachers/Classes/InviteStudents";
import StudentSignUp from "../components/Modules/Students/Onboarding/Signup";
import StudentClassJoin from "../components/Modules/Students/Onboarding/Join";
import StudentHomePage from "../components/Modules/Students/Home";
import StudentFeedback from "../components/Modules/Students/Feedback";
import StudentInbox from "../components/Modules/Students/Inbox";
import StudentLeaderboard from "../components/Modules/Students/Leaderboard";
import StudentStatistics from "../components/Modules/Students/Stats";
import StudentQA from "../components/Modules/Students/QA";
import StudentCaption from "../components/Modules/Students/Caption";
import StudentTranslation from "../components/Modules/Students/Translation";
import TeacherStartConvo from "../components/Modules/Teachers/StartConvo";
// modular
// import teacherRoutes from "../modules/teacher/teacher-routes";
// import studentRoutes from "../modules/student/student-routes";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        name: "Home",
        path: "",
        component: Home,
      },
    ],
  },
  {
    path: "/teachers",
    component: Layout,
    children: [
      {
        name: "TeacherSignup",
        path: "/teachers/signup",
        component: TeacherSignup,
      },
      {
        name: "TeacherClassCreate",
        path: "/teachers/classes/create",
        component: TeacherClassCreate,
      },
      {
        name: "TeacherClassChooseTopics",
        path: "/teachers/classes/choose-topics",
        component: TeacherClassChooseTopics,
      },
    ],
  },
  {
    path: "/teachers",
    component: Layout,
    props: { variant: "dark" },
    children: [
      {
        name: "TeacherClassInviteStudents",
        path: "/teachers/classes/invite-students",
        component: TeacherClassInviteStudents,
      },
      {
        name: "TeacherStartConvo",
        path: "/teachers/start-convo",
        component: TeacherStartConvo,
      },
    ],
  },
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        name: "StudentSignup",
        path: "/students/signup",
        component: StudentSignUp,
      },
      {
        name: "StudentClassJoin",
        path: "/students/classes/join",
        component: StudentClassJoin,
      },
    ],
  },
  {
    path: "/students",
    component: HomeLayout,
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
];

// routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
