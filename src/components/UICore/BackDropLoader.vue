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
  width: var(--t-space-58) !important;
  height: var(--t-space-58) !important;
  border-width: var(--t-space-4) !important;
}
</style>
