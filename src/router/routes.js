import Vue from 'vue';
import Router from 'vue-router';

/**
 * Import route files here
 * Do not add routes in this file
 * Add routes to folders in this route folder and import here
 */
import teacherRoutes from '@/modules/teacher/teacher-routes';
import studentRoutes from '@/modules/student/student-routes';
import baseRoutes from './base-routes';

Vue.use(Router);

// add routes to concat
const routes = baseRoutes.concat(
  teacherRoutes,
  studentRoutes,
);

export default new Router({
  routes,
});
