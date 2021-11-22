import { createRouter, createWebHistory } from "vue-router";
// base
import AppLayout from "../layouts/AppLayout.vue";
import Home from "../views/Home.vue";
// modular
import teacherRoutes from "../modules/teacher/teacher-routes";
import studentRoutes from "../modules/student/student-routes";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        name: "home",
        path: "",
        component: Home,
      },
    ],
  },
];

routes.concat(teacherRoutes, studentRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
