<template>
  <button
    :class="[
      'talkie-icon-wrapper',
      `talkie-icon-${variant.toString()}-wrapper`,
      isActive && 'talkie-icon-wrapper-highlight',
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
    variant: {
      type: String,
      default: "default",
      validator: (val) =>
        [
          "primary",
          "secondary",
          "success",
          "danger",
          "neutral",
          "transparent",
          "default",
        ].includes(val),
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    loadedIcon() {
      return defineAsyncComponent(() =>
        import(`../SVGs/Icon${this.getIconName(this.name)}.vue`)
      );
    },
  },
  methods: {
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    getIconName: (name) =>
      name
        .split("-")
        .map((x) => this.capitalize(x))
        .join(""),
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
  background-color: var(--bg-color);
}
.talkie-icon-wrapper > svg {
  fill: var(--icon-color);
  width: var(--responsive-size) !important;
  height: var(--responsive-size) !important;
}

/* Active Variant */
.talkie-icon-wrapper-highlight {
  background-color: var(--bg-color);
}

/* Color Variant */
.talkie-icon-primary-wrapper,
.talkie-icon-primary-wrapper:hover {
  --icon-color: rgb(247, 212, 30);
  --bg-color: rgba(247, 212, 30, 0.2);
}
.talkie-icon-secondary-wrapper,
.talkie-icon-secondary-wrapper:hover {
  --icon-color: rgb(255, 161, 95);
  --bg-color: rgba(255, 161, 95, 0.2);
}
.talkie-icon-success-wrapper,
.talkie-icon-success-wrapper:hover {
  --icon-color: rgb(40, 167, 69);
  --bg-color: rgba(40, 167, 69, 0.2);
}
.talkie-icon-danger-wrapper,
.talkie-icon-danger-wrapper:hover {
  --icon-color: rgb(225, 78, 15);
  --bg-color: rgba(225, 78, 15, 0.2);
}
.talkie-icon-neutral-wrapper,
.talkie-icon-neutral-wrapper:hover {
  --icon-color: rgb(107, 107, 107);
  --bg-color: rgba(107, 107, 107, 0.1);
}
.talkie-icon-transparent-wrapper,
.talkie-icon-transparent-wrapper:hover {
  --icon-color: var(--t-black);
  --bg-color: transparent;
}
.talkie-icon-default-wrapper,
.talkie-icon-default-wrapper:hover {
  --icon-color: var(--t-black);
  --bg-color: var(--t-gray-100);
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
