import Vue from 'vue';
import Router from 'vue-router';

/**
 * Import route files here
 * Do not add routes in this file
 * Add routes to folders in this route folder and import here
 */
import baseRoutes from './base-routes';
import teacherRoutes from './teacher-routes';


Vue.use(Router);

const routes = baseRoutes.concat(teacherRoutes);
export default new Router({
  routes,
});
