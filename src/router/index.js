import { createRouter, createWebHistory } from "vue-router";
// base
import AppLayout from "../components/Layouts/Wrapper.vue";
import Home from "../views/Home.vue";
import TeacherSignup from "../components/Modules/Teachers/Signup";
import TeacherClassCreate from "../components/Modules/Teachers/Classes/Create";
import TeacherClassChooseTopics from "../components/Modules/Teachers/Classes/ChooseTopics";
import TeacherClassInviteStudents from "../components/Modules/Teachers/Classes/InviteStudents";
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
    component: AppLayout,
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
];

// routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
