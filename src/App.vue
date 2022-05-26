<template>
  <router-view />

  <!-- display if the trail period is over -->
  <talkie-modal
    :type="'confirm'"
    :contentPadded="true"
    :closeButton="true"
    :centered="true"
    :maxWidth="700"
    :title="'Your trial has now ended.'"
    :description="'Thank you for trying out talkie! <br> We’ll keep your existing data for now but setting new tasks and recording new feedback have been disabled.'"
    :onClose="handleUpgradeModalClose"
    :onConfirm="handleUpgradeMyAccount"
    :confirmButtonText="'I’m ready to upgrade!'"
    :confirmButtonVariant="'dark'"
    v-if="computedIsTrialOver"
  />
</template>

<script>
import { TalkieModal } from "@/components/UICore";

import "./styles/app.css";

export default {
  name: "App",
  computed: {
    computedIsTrialOver() {
      return this.$store.state.isTrialOver;
    },
  },
  components: {
    TalkieModal,
  },
  methods: {
    handleUpgradeModalClose() {
      // just to hide the modal | the trial is not over
      this.$store.state.isTrialOver = false;
    },
    handleUpgradeMyAccount() {
      // just to hide the modal | the trial is not over
      this.$store.state.isTrialOver = false;

      // redirect to upgrade page
      this.$router.push(`/services/upgrade`);
    },
  },
};
</script>
