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
</template>

<script>
import TalkieHeader from "./Header.vue";
import WrapperLayout from "./WrapperLayout.vue";

export default {
  name: "PsLayout",
  data() {
    return {
      hideSidebar: false,
    };
  },
  components: {
    TalkieHeader,
    WrapperLayout,
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
    this.handleUpdateBackgroundColor();
  },
  updated() {
    this.handleUpdateBackgroundColor();
  },
  methods: {
    handleUpdateBackgroundColor() {
      const color =
        this.variant === "light" ? "var(--t-white)" : "var(--t-white-100)";

      document.body.style.backgroundColor = color;
    },
    handleSidebarToggle() {
      this.hideSidebar = !this.hideSidebar;
    },
  },
};
</script>
