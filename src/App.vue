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
    v-if="
      computedSubscription?.isRequired &&
      computedSubscription?.isTrialOver &&
      !computedHasClosedModal
    "
  />
</template>

<script>
import { TalkieModal } from "@/components/UICore";
import "./styles/app.css";

export default {
  name: "App",
  computed: {
    computedSubscription() {
      return this.$store.state.subscription;
    },
    computedHasClosedModal() {
      return this.$store.state.hasClosedModal;
    },
  },
  async created() {
    this.$store.dispatch("calculateSubscription");
  },
  components: {
    TalkieModal,
  },
  methods: {
    handleUpgradeModalClose() {
      // just to hide the modal | the trial is not over
      this.$store.state.hasClosedModal = true;
    },
    handleUpgradeMyAccount() {
      // just to hide the modal | the trial is not over
      this.$store.state.hasClosedModal = true;

      // redirect to pricing page
      this.$router.push(`/services/upgrade/plans`);
    },
  },
};
</script>
