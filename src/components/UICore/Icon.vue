<template>
  <button
    :class="[
      'talkie-icon-wrapper',
      isActive && 'talkie-icon-wrapper-highlight',
    ]"
    :style="`--size: ${size}px;`"
  >
    <component :is="loadedIcon" />
  </button>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "TalkieIcon",
  data: () => ({
    icon: "",
  }),
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    size: {
      type: Number,
      required: true,
      default: 25,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loadedIcon() {
      return defineAsyncComponent(() =>
        import(`../SVGs/Icon${this.capitalize(this.name)}.vue`)
      );
    },
  },
  methods: {
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  },
};
</script>

<style scoped>
.talkie-icon-wrapper {
  width: calc(var(--size) * 1.5);
  height: calc(var(--size) * 1.5);
  min-width: var(--t-space-44);
  min-height: var(--t-space-44);
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border-radius: 50%;
  border: transparent;
  width: fit-content;
  text-transform: capitalize;
  cursor: pointer;
  transition: 0.1s ease;
}
.talkie-icon-wrapper:hover {
  filter: opacity(0.8);
  background-color: var(--t-gray-100);
}
.talkie-icon-wrapper > svg {
  width: var(--size) !important;
  height: var(--size) !important;
}

/* Active Variant */
.talkie-icon-wrapper-highlight {
  background-color: var(--t-gray-100);
}
</style>
