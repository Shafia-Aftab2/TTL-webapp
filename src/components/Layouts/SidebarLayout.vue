<template>
  <div class="talkie-sidebar-layout-wrapper">
    <div
      :class="['talkie-sidebar-navigation-wrapper']"
      id="talkie-sidebar-navigation-wrapper"
    ></div>
    <div :class="['talkie-sidebar-content-wrapper']">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarLayout",
};
</script>

<style scoped>
.talkie-sidebar-layout-wrapper {
  width: 100%;
}
.talkie-sidebar-navigation-wrapper {
  position: fixed;
  height: 100%;
  min-width: var(--sidebar-width);
  border: var(--t-space-1) solid var(--t-gray-175);
  box-shadow: var(--t-shadow-dark);
  background-color: var(--t-white);
  transition: 0.15s ease-in-out;
  overflow-y: scroll;
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar-track {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper::-webkit-scrollbar-thumb {
  display: none !important;
}
.talkie-sidebar-navigation-wrapper:-webkit-scrollbar {
  display: none !important;
}
.talkie-sidebar-content-wrapper {
  margin: auto;
  transition: 0.15s ease;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-28) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-16);
    margin-top: var(--t-space-50);
  }
  .talkie-sidebar-content-wrapper {
    margin: auto;
    max-width: var(--t-grid-small);
    padding-top: var(--t-space-50);
  }
}
@media (min-width: 600px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-20) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    transform: translateX(0);
    padding: var(--t-space-12);
    margin-top: var(--t-space-58);
  }
  .talkie-sidebar-content-wrapper {
    margin: auto;
    max-width: var(--t-grid-large);
    margin-left: calc(
      var(--sidebar-width) + (var(--sidebar-width) / 10)
    ) !important;
    padding-top: var(--t-space-58);
  }
}
@media (min-width: 900px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-26) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-18);
  }
}
@media (min-width: 1200px) {
  .talkie-sidebar-layout-wrapper {
    --sidebar-width: calc(var(--t-space-32) * 10);
  }
  .talkie-sidebar-navigation-wrapper {
    padding: var(--t-space-20);
    margin-top: var(--t-space-70);
  }
  .talkie-sidebar-content-wrapper {
    padding-top: var(--t-space-70);
  }
}
</style>
