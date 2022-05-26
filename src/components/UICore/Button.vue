<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    :class="[
      'talkie-button',
      `talkie-button-${variant.toString()}`,
      !noHighlights &&
        !loading &&
        `talkie-button-${variant.toString()}-interaction`,
      `talkie-button-${size.toString()}`,
      outlined && `talkie-button-outlined`,
      outlined && variant === 'dark' && `talkie-button-dark-outlined`,
      fullWidth && `talkie-button-fullWidth`,
      loading && `talkie-button-loading`,
      disabled && `talkie-button-disabled`,
      customClass.toString(),
    ]"
    @click="onClick"
  >
    <slot />
    <talkie-loader
      v-if="loading"
      :variant="variant"
      :size="size"
      customClass="talkie-button-loader"
    />
  </button>
</template>

<script>
import TalkieLoader from "./Loader.vue";

export default {
  name: "TalkieButton",
  components: { TalkieLoader },
  props: {
    type: {
      type: String,
      default: "submit",
    },
    variant: {
      type: String,
      default: "primary",
      validator: (val) =>
        [
          "primary",
          "secondary",
          "success",
          "danger",
          "transparent",
          "light",
          "dark",
        ].includes(val),
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    noHighlights: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    customClass: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.talkie-button {
  background: transparent;
  border: transparent;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  transition: 0.1s ease;
  color: var(--t-black-100);
  font-family: var(--t-ff-regular);
  border-style: solid;
}

/* Color variants */
.talkie-button-primary {
  background-color: var(--t-primary);
  border-color: var(--t-primary);
}
.talkie-button-primary-interaction:hover {
  background: transparent;
}
.talkie-button-secondary {
  background-color: var(--t-secondary);
  border-color: var(--t-secondary);
}
.talkie-button-secondary-interaction:hover {
  background: transparent;
}
.talkie-button-success {
  background-color: var(--t-green);
  border-color: var(--t-green);
}
.talkie-button-success-interaction:hover {
  background: transparent;
}
.talkie-button-danger {
  background-color: var(--t-orange);
  border-color: var(--t-orange);
}
.talkie-button-danger-interaction:hover {
  background: transparent;
}
.talkie-button-transparent {
  background-color: transparent;
  border-color: transparent;
}
.talkie-button-light {
  background-color: var(--t-white);
  border-color: transparent;
}
.talkie-button-light-interaction:hover {
  filter: opacity(0.8);
}
.talkie-button-dark {
  background-color: var(--t-black);
  color: var(--t-white);
  border-color: var(--t-black);
}
.talkie-button-dark-outlined {
  color: var(--t-black);
}
.talkie-button-dark-interaction:hover {
  filter: opacity(0.8);
}

/* Size variants */
.talkie-button-small {
  --size: var(--t-space-10);
  --font-size: var(--t-fs-base);
}
.talkie-button-medium {
  --size: var(--t-space-14);
  --font-size: var(--t-fs-body);
}
.talkie-button-large {
  --size: var(--t-space-16);
  --font-size: var(--t-fs-sub);
}

/* Outline variant */
.talkie-button-outlined {
  background: transparent;
}

/* Full width variant */
.talkie-button-fullWidth {
  width: 100%;
}

/* Loading variant */
.talkie-button-loading {
  filter: opacity(0.8);
  cursor: not-allowed;
}
/* Loader */
.talkie-button-loader {
  position: absolute;
  margin: auto;
}

/* Disabled variant */
.talkie-button-disabled {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
  cursor: not-allowed;
}
.talkie-button-disabled:hover {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-button {
    border-width: var(--t-bw-small);
    border-radius: var(--t-br-small);
    padding: calc(var(--size) / 2) calc((var(--size) / 2) * 3);
    font-size: calc(var(--font-size) / 1.35);
  }
}
@media (min-width: 600px) {
  .talkie-button {
    border-width: var(--t-bw-medium);
    border-radius: var(--t-br-medium);
    padding: calc(var(--size) / 1.5) calc((var(--size) / 1.5) * 3);
    font-size: calc(var(--font-size) / 1.2);
  }
}
@media (min-width: 1200px) {
  .talkie-button {
    padding: calc(var(--size)) calc((var(--size)) * 3);
    font-size: calc(var(--font-size));
  }
}
</style>
