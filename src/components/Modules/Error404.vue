<template>
  <div class="error-404-wrapper">
    <h5 class="h5">404 Not Found</h5>
    <talkie-button
      :size="'medium'"
      :onClick="handleBackClick"
      :noHighlights="true"
    >
      Go Back
    </talkie-button>
  </div>
</template>

<script>
import { TalkieButton } from "@/components/UICore";

export default {
  name: "Error404",
  components: {
    TalkieButton,
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.error-404-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

/* Responsive Variants */
@media (max-width: 599px) {
  .error-404-wrapper {
    gap: var(--t-space-12);
    flex-direction: column;
  }
}
@media (min-width: 600px) {
  .error-404-wrapper {
    gap: var(--t-space-24);
    flex-direction: row;
  }
}
</style>
