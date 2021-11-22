<template>
  <talkie-back-drop>
    <talkie-loader :customClass="'talkie-backdrop-loader'" />
  </talkie-back-drop>
</template>

<script>
import TalkieBackDrop from "./BackDrop.vue";
import TalkieLoader from "./Loader.vue";

export default {
  name: "TalkieBackDropLoader",
  components: { TalkieBackDrop, TalkieLoader },
  props: {
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-backdrop-loader {
  width: var(--size) !important;
  height: var(--size) !important;
  border-width: var(--border-width) !important;
  transition: 0.2s ease;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-backdrop-loader {
    --size: var(--t-space-50);
    --border-width: var(--t-space-3);
  }
}
@media (min-width: 600px) {
  .talkie-backdrop-loader {
    --size: var(--t-space-58);
    --border-width: var(--t-space-4);
  }
}
@media (min-width: 1200px) {
  .talkie-backdrop-loader {
    --size: var(--t-space-64);
    --border-width: var(--t-space-5);
  }
}
</style>
