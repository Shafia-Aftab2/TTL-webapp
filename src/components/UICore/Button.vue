<template>
  <button
    :type="type"
    :class="[
      'talkie-button',
      `talkie-button-${variant.toString()}`,
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
.talkie-button-secondary {
  background-color: var(--t-secondary);
  border-color: var(--t-secondary);
}
.talkie-button-success {
  background-color: var(--t-green);
  border-color: var(--t-green);
}
.talkie-button-danger {
  background-color: var(--t-orange);
  border-color: var(--t-orange);
}
.talkie-button-transparent {
  background-color: transparent;
  border-color: transparent;
}
</style>
