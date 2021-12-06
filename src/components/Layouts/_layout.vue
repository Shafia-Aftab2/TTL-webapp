<template>
  <talkie-header :onSidebarIconClick="handleSidebarToggle" />
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
    type: {
      type: String,
      default: "default",
      validator: (val) => ["default", "sidebar"].includes(val),
    },
  },
  methods: {
    handleSidebarToggle() {
      this.hideSidebar = !this.hideSidebar;
    },
  },
};
</script>
