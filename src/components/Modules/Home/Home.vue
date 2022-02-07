<template>
  <div class="home-wrapper">
    <talkie-loader :size="'large'" v-if="loading" />
    <template v-if="!loading">
      <student-home />
    </template>
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";
import { roles } from "@/utils/constants";
import StudentHome from "./Student";

export default {
  name: "Home",
  components: {
    TalkieLoader,
    StudentHome,
  },
  data() {
    return {
      loading: false,
      isStudent: false,
    };
  },
  created() {
    // update page state
    this.loading = true;

    // require login if not authenticated
    const user = authUser.getUser();
    const accessToken = authUser.getAccessToken();
    const refreshToken = authUser.getRefreshToken();
    if (!user || !accessToken || !refreshToken) {
      this.$router.push(`/auth/login`);
      return;
    }

    // get user role
    const userRole = user?.role;
    if (!userRole) {
      // TODO: handle broken account
      this.$router.push(`/auth/login`);
      return;
    }

    // redirect teacher to classes
    if (userRole === roles.TEACHER) {
      this.$router.push(`/classes`);
      return;
    }

    // redirect admin to dashboard
    if (userRole === roles.ADMIN) {
      this.$router.push(`/admin/users`);
      return;
    }

    // redirect student to home
    if (userRole === roles.STUDENT) {
      this.isStudent === true;
    }

    // update page state
    this.loading = false;
  },
};
</script>

<style scoped>
.home-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
</style>
