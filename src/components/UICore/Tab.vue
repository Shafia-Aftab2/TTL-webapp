<template>
  <button
    type="button"
    :class="['talkie-tab-wrapper', customClass.toString()]"
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
}
.talkie-tab-wrapper:hover {
  filter: opacity(0.8);
}
</style>
