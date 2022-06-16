<template>
  <div
    :class="[
      'talkie-layout-wrapper',
      computedSubscription?.remainingTrialDays > 0 &&
        computedSubscription?.remainingTrialDays < 15 &&
        !computedSubscription?.hideTrialBar &&
        'talkie-wrapper-trial-pad',
    ]"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "WrapperLayout",
  computed: {
    computedSubscription() {
      return this.$store.state.subscription;
    },
  },
};
</script>

<style scoped>
.talkie-layout-wrapper {
  margin: auto;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-layout-wrapper {
    max-width: var(--t-grid-small);
    padding-top: var(--t-space-50);
  }
  .talkie-wrapper-trial-pad {
    margin-top: 25px; /* TODO: get from variables */
  }
}
@media (min-width: 600px) {
  .talkie-layout-wrapper {
    max-width: var(--t-grid-large);
    padding-top: var(--t-space-58);
  }
  .talkie-wrapper-trial-pad {
    margin-top: var(--t-space-32);
  }
}
@media (min-width: 1200px) {
  .talkie-layout-wrapper {
    padding-top: var(--t-space-70);
  }
}
</style>
