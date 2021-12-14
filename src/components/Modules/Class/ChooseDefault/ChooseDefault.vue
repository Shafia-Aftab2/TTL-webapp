<template>
  <div class="class-choose-default-wrapper">
    <talkie-loader :size="'large'" v-if="loading" />
  </div>
</template>

<script>
import { TalkieLoader } from "@/components/UICore";
import authUser from "@/utils/helpers/auth";

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
      user.schools && user.schools.length > 0 ? user.schools[0].classes : null;
    if (!classes) return this.$router.push("/404");

    // get user first class id
    const firstClassId = classes.length > 0 ? classes[0] : null;
    if (!firstClassId) return this.$router.push("/404");

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
