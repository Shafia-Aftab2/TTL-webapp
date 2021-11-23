<template>
  <button
    :class="[
      'talkie-icon-wrapper',
      isActive && 'talkie-icon-wrapper-highlight',
      transparent && 'talkie-icon-wrapper-transparent',
    ]"
    :style="`--size: ${size}px;`"
    @click="onClick"
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
    transparent: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
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
  width: calc(var(--responsive-size) * 1.5);
  height: calc(var(--responsive-size) * 1.5);
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
  width: var(--responsive-size) !important;
  height: var(--responsive-size) !important;
}

/* Active Variant */
.talkie-icon-wrapper-highlight {
  background-color: var(--t-gray-100);
}

/* Transparent Variant */
.talkie-icon-wrapper-transparent {
  background: transparent !important;
}
.talkie-icon-wrapper-transparent:hover {
  background: transparent !important;
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-icon-wrapper {
    --responsive-size: calc(var(--size) * 0.8);
    min-width: var(--t-space-36);
    min-height: var(--t-space-36);
  }
}
@media (min-width: 600px) {
  .talkie-icon-wrapper {
    --responsive-size: calc(var(--size) * 0.9);
    min-width: var(--t-space-40);
    min-height: var(--t-space-40);
  }
}
@media (min-width: 1200px) {
  .talkie-icon-wrapper {
    --responsive-size: var(--size);
    min-width: var(--t-space-44);
    min-height: var(--t-space-44);
  }
}
</style>
