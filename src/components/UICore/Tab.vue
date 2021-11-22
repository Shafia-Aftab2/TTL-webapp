<template>
  <button
    type="button"
    :class="[
      'talkie-tab-wrapper',
      `talkie-tab-${variant.toString()}`,
      `talkie-tab-${size.toString()}`,
      active && `talkie-tab-${variant.toString()}-active`,
      customClass.toString(),
    ]"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TalkieTab",
  props: {
    label: {
      type: String,
      default: "Tab",
    },
    active: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (val) => ["primary", "secondary"].includes(val),
    },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
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
.talkie-tab-wrapper {
  display: inline-block;
  color: var(--t-black-100);
  background: transparent;
  width: fit-content;
  font-family: "Inter";
  cursor: pointer;
  border: transparent;
  transition: 0.1s ease;
  text-transform: capitalize;
  border-radius: var(--t-space-3);
  border-style: solid;
  border-color: transparent;
}
.talkie-tab-wrapper:hover {
  filter: opacity(0.8);
}

/* Size variants */
.talkie-tab-small {
  --size: var(--t-space-4);
  --font-size: var(--t-fs-base);
}
.talkie-tab-medium {
  --size: var(--t-space-5);
  --font-size: var(--t-fs-body);
}
.talkie-tab-large {
  --size: var(--t-space-8);
  --font-size: var(--t-fs-sub);
}

/* Color variants */
.talkie-tab-primary:hover {
  border-bottom-color: var(--t-primary);
}
.talkie-tab-secondary:hover {
  border-bottom-color: var(--t-secondary);
}

/* Active variants */
.talkie-tab-primary-active {
  border-bottom-color: var(--t-primary);
}
.talkie-tab-secondary-active {
  border-bottom-color: var(--t-secondary);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-tab-wrapper {
    border-bottom-width: var(--t-bw-medium);
    padding: var(--size) calc((var(--size) * 1.5) - (var(--size) / 1.2));
    padding-bottom: calc((var(--size) * 1.5) - var(--size));
    font-size: calc(var(--font-size) * 0.8);
  }
}
@media (min-width: 600px) {
  .talkie-tab-wrapper {
    border-bottom-width: var(--t-bw-large);
    padding: var(--size) calc((var(--size) * 2) - (var(--size) / 1.5));
    padding-bottom: calc((var(--size) * 2) - var(--size));
    font-size: calc(var(--font-size) * 0.9);
  }
}
@media (min-width: 1200px) {
  .talkie-tab-wrapper {
    padding: var(--size) calc((var(--size) * 3) - (var(--size) / 2));
    padding-bottom: calc((var(--size) * 3) - var(--size));
    font-size: var(--font-size);
  }
}
</style>
