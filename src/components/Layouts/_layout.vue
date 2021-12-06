<template>
  <talkie-header
    :onSidebarIconClick="handleSidebarToggle"
    :hideSideBarIconOn="
      type === 'sidebar'
        ? ['tablet', 'desktop']
        : ['phone', 'tablet', 'desktop']
    "
  />
  <wrapper-layout v-if="type === 'default'" />
  <sidebar-layout v-if="type === 'sidebar'" :hideSidebar="hideSidebar" />
</template>

<script>
import TalkieHeader from "./Header.vue";
import WrapperLayout from "./WrapperLayout.vue";
import SidebarLayout from "./SidebarLayout.vue";

export default {
  name: "Layout",
  data() {
    return {
      hideSidebar: false,
    };
  },
  components: {
    TalkieHeader,
    WrapperLayout,
    SidebarLayout,
  },
  props: {
    variant: {
      type: String,
      default: "light",
      validator: (val) => ["light", "dark"].includes(val),
    },
    type: {
      type: String,
      default: "default",
      validator: (val) => ["default", "sidebar"].includes(val),
    },
  },
  created() {
    const color =
      this.variant === "light" ? "var(--t-white)" : "var(--t-white-100)";

    this.handleBodyBackColorChange(color);
  },
  methods: {
    handleBodyBackColorChange(color) {
      document.body.style.backgroundColor = color;
    },
    handleSidebarToggle() {
      this.hideSidebar = !this.hideSidebar;
    },
  },
};
</script>
