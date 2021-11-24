import { createRouter, createWebHistory } from "vue-router";
// base
import AppLayout from "../components/Layouts/Wrapper.vue";
import Home from "../views/Home.vue";
import TeacherSignup from "../components/Modules/Teachers/Signup";
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
    ],
  },
];

// routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
