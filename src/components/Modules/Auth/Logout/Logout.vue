<template>
  <div class="auth-logout-wrapper">
    <talkie-loader :size="'large'" v-if="loading" />
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";
import { AuthService } from "@/api/services";

export default {
  name: "AuthLogout",
  components: {
    TalkieLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    await this.handleUserLogout();
  },
  methods: {
    handleRemoveUserCookies() {
      authUser.deleteUser();
      authUser.deleteAccessToken();
      authUser.deleteRefreshToken();
    },
    async handleUserLogout() {
      // update page state
      this.loading = true;

      // get user refresh token
      const refreshToken = authUser.getRefreshToken();

      // redirect to login if no refresh token
      if (!refreshToken) {
        this.handleRemoveUserCookies();
        this.$router.push("/auth/login");
        return;
      }

      // payload
      const payload = { refreshToken };

      // api call
      await AuthService.Logout(payload).then().catch();

      // update page state
      this.loading = false;

      // update global state
      this.handleStoreMutation("user", {});

      // redirect to login
      this.handleRemoveUserCookies();
      this.$router.push("/auth/login");
    },
    handleStoreMutation(key, value) {
      this.$store.state[key] = value;
    },
  },
};
</script>

<style scoped>
.auth-logout-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
</style>
