<template>
  <talkie-header />
  <wrapper-layout v-if="type === 'default'" />
  <sidebar-layout v-if="type === 'sidebar'" />
</template>

<script>
import TalkieHeader from "./Header.vue";
import WrapperLayout from "./WrapperLayout.vue";
import SidebarLayout from "./SidebarLayout.vue";

export default {
  name: "Layout",
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
};
</script>
