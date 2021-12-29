import authUser from "@/utils/helpers/auth";

export default {
  created() {
    this.handleAlreadyLoggedIn();
  },
  methods: {
    handleAlreadyLoggedIn() {
      const user = authUser.getUser();
      const accessToken = authUser.getAccessToken();
      const refreshToken = authUser.getRefreshToken();

      // redirect to home if already logged in
      if (user && accessToken && refreshToken) {
        this.$router.push("/");
      }
    },
  },
};
