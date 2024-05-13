<template>
  <div :class="['talkie-layout-wrapper']">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "WrapperLayout",
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
}
@media (min-width: 600px) {
  .talkie-layout-wrapper {
    max-width: var(--t-grid-large);
    padding-top: var(--t-space-58);
  }
}
@media (min-width: 1200px) {
  .talkie-layout-wrapper {
    padding-top: var(--t-space-70);
  }
}
</style>
