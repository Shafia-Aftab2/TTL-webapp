<template>
  <talkie-header />
  <div class="talkie-layout-wrapper">
    <router-view />
  </div>
</template>

<script>
import TalkieHeader from "./Header.vue";

export default {
  name: "LayoutWrapper",
  components: { TalkieHeader },
};
</script>

<style>
/* Responsive variants */
@media (max-width: 599px) {
  .talkie-layout-wrapper {
    margin: auto;
    max-width: var(--t-grid-small);
  }
}
@media (min-width: 600px) {
  .talkie-layout-wrapper {
    margin: auto;
    max-width: var(--t-grid-large);
  }
}
</style>
