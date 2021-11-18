<template>
  <button
    :type="type"
    :class="[
      'talkie-button',
      `talkie-button-${variant.toString()}`,
      `talkie-button-${variant.toString()}-interaction`,
      `talkie-button-${size.toString()}`,
      outlined && `talkie-button-outlined`,
      fullWidth && `talkie-button-fullWidth`,
      customClass.toString()
    ]"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "TalkieButton",
  components: {},
  props: {
    type: {
      type: String,
      default: "submit"
    },
    variant: {
      type: String,
      default: "primary",
      validator: val =>
        ["primary", "secondary", "success", "danger", "transparent"].includes(
          val
        )
    },
    size: {
      type: String,
      default: "medium",
      validator: val => ["small", "medium", "large"].includes(val)
    },
    outlined: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
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
  border-radius: var(--t-br-medium);
  font-family: var(--t-ff-regular);
  border-width: var(--t-bw-medium);
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

/* Size variants */
.talkie-button-small {
  padding: var(--t-space-10) var(--t-space-30);
  font-size: var(--t-fs-base);
}
.talkie-button-medium {
  padding: var(--t-space-14) var(--t-space-40);
  font-size: var(--t-fs-body);
}
.talkie-button-large {
  padding: var(--t-space-16) var(--t-space-50);
  font-size: var(--t-fs-sub);
}

/* Outline variant */
.talkie-button-outlined {
  background: transparent;
}

/* Full width variant */
.talkie-button-fullWidth {
  width: 100%;
}
</style>
