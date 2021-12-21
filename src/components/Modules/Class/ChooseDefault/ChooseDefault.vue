<template>
  <div class="class-choose-default-wrapper">
    <talkie-loader :size="'large'" v-if="loading" />
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";
import roles from "@/utils/constants/roles";

export default {
  name: "ClassChooseDefault",
  components: {
    TalkieLoader,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    // update page state
    this.loading = true;

    // get user
    const user = authUser.getUser();

    // get user classes
    const classes =
      user?.schools?.length > 0 ? user?.schools[0]?.classes : null;

    // check if user has no classes
    if (!classes || classes?.length === 0) {
      // redirect student to join class
      if (user.role === roles.STUDENT) {
        return this.$router.push("/classes/join");
      }

      // redirect teacher to create class
      if (user.role === roles.TEACHER) {
        return this.$router.push("/classes/create");
      }
    }

    // get user first class id
    const firstClassId = classes[0];

    // update page state
    this.loading = false;

    // redirect to class
    this.$router.push(`/classes/${firstClassId}`);
  },
};
</script>

<style scoped>
.class-choose-default-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  padding: var(--t-space-24);
}
</style>
