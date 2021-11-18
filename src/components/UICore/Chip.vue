<template>
  <button
    type="button"
    :class="[
      'talkie-chip',
      `talkie-chip-${size.toString()}`,
      `talkie-chip-${variant.toString()}`
    ]"
    @click="onClick"
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
      default: "Chip"
    },
    onClick: { type: Function, default: () => {} },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    variant: {
      type: String,
      default: "primary",
      validator: val =>
        ["primary", "secondary", "success", "danger", "neutral"].includes(val)
    },
    customClass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.talkie-chip {
  display: inline-block;
  color: var(--t-black-100);
  background: transparent;
  border-radius: var(--t-br-large);
  width: fit-content;
  cursor: pointer;
  border: transparent;
  transition: 0.1s ease;
  text-transform: capitalize;
  background: var(--t-primary);
  padding: var(--size) calc(var(--size) * 2);
}
.talkie-chip:hover {
  filter: opacity(0.8);
}

/* Size variants */
.talkie-chip-small {
  --size: var(--t-space-5);
  font-size: var(--t-fs-small);
}
.talkie-chip-medium {
  --size: var(--t-space-8);
  font-size: var(--t-fs-base);
}
.talkie-chip-large {
  --size: var(--t-space-10);
  font-size: var(--t-fs-body);
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
</style>
