<template>
  <button
    type="button"
    :class="[
      'talkie-tab-wrapper',
      `talkie-tab-${size.toString()}`,
      customClass.toString()
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
      default: "Tab"
    },
    active: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    customClass: {
      type: String,
      default: ""
    }
  }
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
  border-bottom: var(--t-bw-large) solid transparent;
  padding: var(--size) calc((var(--size) * 3) - (var(--size) / 2));
  padding-bottom: calc((var(--size) * 3) - (var(--size) / 2));
  font-size: var(--font-size);
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
</style>
