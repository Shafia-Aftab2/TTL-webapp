<template>
  <button
    type="button"
    :class="[
      'talkie-chip',
      `talkie-chip-${size.toString()}`,
      `talkie-chip-${variant.toString()}`,
      disabled && `talkie-chip-disabled`,
    ]"
    @click="async (e) => (!disabled ? await onClick(e) : () => {})"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "TalkieChip",
  props: {
    label: {
      type: String,
      default: "Chip",
    },
    onClick: { type: Function, default: () => {} },
    size: {
      type: String,
      default: "medium",
      validator: (val) => ["small", "medium", "large"].includes(val),
    },
    variant: {
      type: String,
      default: "primary",
      validator: (val) =>
        ["primary", "secondary", "success", "danger", "neutral"].includes(val),
    },
    customClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.talkie-chip {
  display: inline-block;
  color: var(--t-black-100);
  background: transparent;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  border: transparent;
  transition: 0.1s ease;
}
.talkie-chip:hover {
  filter: opacity(0.8);
}

/* Size variants */
.talkie-chip-small {
  --size: var(--t-space-5);
  --font-size: var(--t-fs-small);
}
.talkie-chip-medium {
  --size: var(--t-space-8);
  --font-size: var(--t-fs-base);
}
.talkie-chip-large {
  --size: var(--t-space-10);
  --font-size: var(--t-fs-body);
}

/* Color variants */
.talkie-chip-primary {
  background: var(--t-primary);
}
.talkie-chip-secondary {
  background: var(--t-secondary);
}
.talkie-chip-success {
  background: var(--t-green);
  color: var(--t-white-100);
}
.talkie-chip-danger {
  background: var(--t-orange);
}
.talkie-chip-neutral {
  background: var(--t-white-200);
}

/* Disabled variant */
.talkie-chip-disabled {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
  cursor: not-allowed;
}
.talkie-chip-disabled:hover {
  background: var(--t-white-300);
  border-color: var(--t-white-300);
  color: var(--t-gray-50);
}

/* Responsive variants */
@media (max-width: 599px) {
  .talkie-chip {
    padding: calc(var(--size) * 0.5) calc(((var(--size) * 0.5) * 1.5));
    font-size: calc(var(--font-size) / 1.4);
    border-radius: var(--t-br-medium);
  }
}
@media (min-width: 600px) {
  .talkie-chip {
    padding: calc(var(--size) * 0.8) calc(((var(--size) * 0.8) * 1.5));
    font-size: calc(var(--font-size) / 1.2);
    border-radius: var(--t-br-large);
  }
}
@media (min-width: 1200px) {
  .talkie-chip {
    padding: calc(var(--size) * 0.9) calc(((var(--size) * 0.9) * 1.5));
    font-size: calc(var(--font-size) / 1.1);
  }
}
</style>
