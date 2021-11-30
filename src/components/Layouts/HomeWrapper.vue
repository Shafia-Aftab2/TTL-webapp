<template>
  <talkie-header />
  <div class="home-container">
    <div class="talkie-layout-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TalkieHeader from "./HomeHeader.vue";

export default {
  name: "LayoutHomeWrapper",
  components: { TalkieHeader },
};
</script>

/* Responsive variants */
<style>
.home-container {
  background-color: var(--t-white-100);
}
@media (max-width: 599px) {
  .talkie-layout-wrapper {
    margin: auto;
  }
}
@media (min-width: 600px) {
  .talkie-layout-wrapper {
    margin: auto;
    max-width: var(--t-grid-large);
  }
}
</style>
