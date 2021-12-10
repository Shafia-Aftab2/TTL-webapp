<template>
  <div class="error-404-wrapper">
    <h5 class="h5">404 Not Found</h5>
    <talkie-button :size="'medium'" :noHighlights="true">
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
};
</script>

<style scoped>
.error-404-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  gap: var(--t-space-24);
  flex-direction: row;
}
</style>
